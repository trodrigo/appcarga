import { Router } from "express";
import { CreateCompanyController } from "./controllers/CreateCompanyController";


const router = Router();

const createCompanyController = new CreateCompanyController();

router.post("/company", createCompanyController.handle);

export { router };