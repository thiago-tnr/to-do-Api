import { Request, Response, NextFunction } from "express"
import Jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export const middlewareAuth = {
    private: (req: Request, res:Response, next: NextFunction) => {
        
        let sucess = false;
        let email = req.body.email;

        if(req.headers.authorization){
            const [authJwt, token] = req.headers.authorization.split(' ');
            try {
                if(authJwt === "Bearer"){
                    Jwt.verify(
                        token, 
                        process.env.JWT_SECRET_KEY as string,
                    );
                }
                sucess = true;
            } catch (error) {
                
            }
            
        }

        if(sucess){
            next();
        }else{
            res.status(401).json("Unauthorized");
        }
    }
}
