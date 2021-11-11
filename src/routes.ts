import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateCompanyController } from "./controllers/CreateCompanyController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAccessLevel } from "./middlewares/ensureAccessLevel";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureCompanyType } from "./middlewares/ensureCompanyType";


const router = Router();

const createCompanyController = new CreateCompanyController();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

router.post("/company", ensureAuthenticated, ensureAccessLevel, ensureCompanyType, createCompanyController.handle);
router.post("/user", ensureAuthenticated, ensureAccessLevel, createUserController.handle);
router.post("/login", authenticateUserController.handle)

export { router };