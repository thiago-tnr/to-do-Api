import {Request, Response}  from 'express';
import JWT from "jsonwebtoken";
import { User } from '../models/Auth';
import dotenv from "dotenv";

dotenv.config();


export const register = async (req:Request, res:Response) => {
    if(req.body.email && req.body.password){
        let {email, password} = req.body;
        let hasUser = await User.findOne({where:{email}});

        if(!hasUser){
            let newUser = await User.create({email, password});

            const token = JWT.sign(
                {id: newUser.id, email: newUser.email},
                process.env.JWT_SECRET_KEY as string,
                {expiresIn: 60}
            );

            res.status(201)
            res.json({ id: newUser.id, token });
        }
        else{
            res.json({error: "Email already exists"})
        }
    }else{
        res.json({error: "email and/or passowrd not send"})
    }
}

export const login =async (req:Request, res:Response) => {
    if(req.body.email && req.body.password){
        try {
        let email: string = req.body.email;
        let password: string = req.body.password;

        let findEmail = await User.findOne({where: {email}})

        let user = await User.findOne({
            where: {email, password}
        })
        if(user){
            const token = JWT.sign(
                {id: user.id, email: user.email},
                process.env.JWT_SECRET_KEY as string,
                {expiresIn: 60}
            );

            res.json({status: true, token });
            return
        }
        if(!findEmail){
            res.status(404).json("User not found")
        }
            
        } catch (error) {
            console.log(error)
        }
        
    }
    res.status(406).json("user or password incorrect")
}