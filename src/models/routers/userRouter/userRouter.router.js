import { Router } from "express";
import {
  UserLogin,
  UserRegister,
} from "../../controller/userController/userController.Controller.js";

const router = Router();

router.post("/UserRegister", UserRegister);
router.post("/UserLogin", UserLogin);
export default router;
