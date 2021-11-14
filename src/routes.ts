import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateCompanyController } from "./controllers/CreateCompanyController";
import { ListCompanyUsersController } from "./controllers/ListCompanyUsersController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAccessLevel } from "./middlewares/ensureAccessLevel";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureCompanyType } from "./middlewares/ensureCompanyType";
import { ListCompaniesController } from "./controllers/ListCompaniesController";
import { GetCompanyController } from "./controllers/GetCompanyController";
import { GetUserController } from "./controllers/GetUserController";
import { ListUsersController } from "./controllers/ListUsersController";
import { GetUserFullController } from "./controllers/GetUserFullController";
import { AlterCompanyController } from "./controllers/AlterCompanyController";
import { AlterUserController } from "./controllers/AlterUserController";
import { PasswordRecoveryController } from "./controllers/PasswordRecoveryController";


const router = Router();

const authenticateUserController = new AuthenticateUserController();
const passwordRecoveryController = new PasswordRecoveryController();
const createUserController = new CreateUserController();
const alterUserController = new AlterUserController();
const getUserController = new GetUserController();
const getUserFullController = new GetUserFullController();
const listUsersController = new ListUsersController();
const createCompanyController = new CreateCompanyController();
const alterCompanyController = new AlterCompanyController();
const getCompanyController = new GetCompanyController();
const listCompaniesController = new ListCompaniesController();
const listCompanyUsersController = new ListCompanyUsersController();


router.post("/company", ensureAuthenticated, ensureAccessLevel, ensureCompanyType, createCompanyController.handle);
router.get("/company", ensureAuthenticated, ensureAccessLevel, ensureCompanyType, listCompaniesController.handle);
router.get("/company/:id", ensureAuthenticated, ensureAccessLevel, getCompanyController.handle);
router.get("/company/users", ensureAuthenticated, listCompanyUsersController.handle);
router.put("/company/:id", ensureAuthenticated, ensureAccessLevel, alterCompanyController.handle);
router.post("/user", ensureAuthenticated, ensureAccessLevel, createUserController.handle);
router.get("/user", ensureAuthenticated, listUsersController.handle);
router.get("/user/:id", ensureAuthenticated, getUserController.handle);
router.get("/user_company/:id", ensureAuthenticated, getUserFullController.handle);
router.put("/user/:id", ensureAuthenticated, alterUserController.handle);
router.post("/login", authenticateUserController.handle)
router.post("/reset/pass", passwordRecoveryController.handle)

export { router };