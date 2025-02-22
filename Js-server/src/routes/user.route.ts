import { Router } from "express";
import { loginUser, logOutUser, singUpUser } from "../controllers";
import verifyJWTToken from "../middleware/VerifyJWT.middleware";

const router = Router();

router.get("/logout", verifyJWTToken, logOutUser);
router.post("/login", loginUser);
router.post("/singUp", singUpUser);

export default router;
