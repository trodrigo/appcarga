import { Router } from "express";
import { CreateCompanyController } from "./controllers/CreateCompanyController";
import { CreateUserController } from "./controllers/CreateUserController";


const router = Router();

const createCompanyController = new CreateCompanyController();
const createUserController = new CreateUserController();

router.post("/company", createCompanyController.handle);
router.post("/user", createUserController.handle);

export { router };