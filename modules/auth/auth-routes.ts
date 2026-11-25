import { Router } from "express";
import { validate } from "zod";
import * as controller from "../auth/auth-controller"


const router = Router();


router.post("/register",controller.register);

router.get("/login",controller.login);