import { Request, Response } from "express";
import { ToDo} from "../models/BaseApi";

export const alltasks = async(req: Request, res: Response)=>{
    const list = await ToDo.findAll();
    res.json({list}) 
}

export const getone =async (req:Request, res:Response) => {
    let id = req.params.id;
    const oneTask = await ToDo.findByPk(id);
    if(oneTask){
        res.status(200).json(oneTask)
    }else{
        res.status(404).json("Task Not Found")
    }
}

export const newTask =async (req:Request, res:Response) => {
    if(req.body.title){
        let task = await ToDo.create({
            title: req.body.title,
            done: req.body.done ? true : false
        })
        res.status(201).json({message: task})
    }

}

export const maketask = async (req:Request, res:Response) => {
    let id = req.params.id;
    const findtask = await ToDo.findByPk(id);
    if(findtask){
        if(req.body.title){
            findtask.title +=' '+ req.body.title;
        }
        if(req.body.done){
            switch(req.body.done.toLowerCase()){
                case 1:
                case "1":
                case true:
                case "true":
                    findtask.done = true;
                    break;
                case 0:
                case "0":
                case false:
                case "false":
                    findtask.done = false;
                    break;
            }
          await findtask.save();  
        }
        res.status(200).json(findtask);
    }
    res.status(404).json("Task not found, make a GET request and check existing tasks");
}

export const deleteTask = async (req:Request, res:Response) => { 
    let id = req.params.id;
    const remove = await ToDo.destroy({where:{id}})
}