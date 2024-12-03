import Express from "express";
const router = Express.Router();
import AuthController from "../../Controller/Auth/AuthController.js";
import validateSchema from '../../MiddleWare/Schema/ValidateScehma.js'
import AuthYup from '../../Utils/Validation/AuthYup.js';

// Test API
router.get("/", AuthController.test);

// Authentication Routes
router.post("/register", validateSchema(AuthYup.registerSchema), AuthController.signUp);
router.post("/login", validateSchema(AuthYup.loginSchema), AuthController.login);
router.post("/validateToken", validateSchema(AuthYup.validateUser), AuthController.validateToken);
router.get("/getUser/:uid", AuthController.getUser);
router.delete("/deleteUser/:uid", AuthController.deleteUser);
router.post("/reset-password", validateSchema(AuthYup.passwordReset), AuthController.sendPasswordReset);
router.get("/verifyEmail/:uid", AuthController.verifyEmail);

export default router;
