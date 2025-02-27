import { Router } from "express";
import { user } from "../controllers";
import verifyJWTToken from "../middleware/VerifyJWT.middleware";

const router = Router();

router.get("/logout", verifyJWTToken, user.logOutUser);
router.post("/login", user.loginUser);
router.post("/singUp", user.singUpUser);

export default router;
