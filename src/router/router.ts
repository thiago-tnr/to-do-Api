import { Router } from "express";
import { middlewareAuth } from "../middlewares/middleware";

import * as ApiController from "../controllers/ApiController";
import * as UserControlle from "../controllers/UserControllers";

export const router = Router();

const auth = middlewareAuth.private;

router.post('/register', UserControlle.register);
router.post('/login', UserControlle.login);

router.get('/tasks',auth, ApiController.alltasks)
router.get('/task/:id',auth, ApiController.getone)
router.post('/newtask',auth, ApiController.newTask)
router.put('/maketask/:id',auth, ApiController.maketask)
router.delete('/delete/:id',auth, ApiController.deleteTask)