import { Router } from "express";
import { evidence } from "../controllers";
import verifyJWTToken from "../middleware/VerifyJWT.middleware";

const router = Router();

router.post("/", verifyJWTToken, evidence.createEvidence);
router.put("/", verifyJWTToken, evidence.updateEvidence);
router.delete("/", verifyJWTToken, evidence.deleteEvidence);

export default router;
