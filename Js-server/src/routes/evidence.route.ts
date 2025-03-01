import { Router } from "express";
import { evidence } from "../controllers";
import verifyJWTToken from "../middleware/VerifyJWT.middleware";

const router = Router();

router.post("/:vulnerabilityDetailId", verifyJWTToken, evidence.createEvidence);
router.put(
  "/:vulnerabilityDetailId/:evidenceId",
  verifyJWTToken,
  evidence.updateEvidence
);
router.delete(
  "/:vulnerabilityDetailId/:evidenceId",
  verifyJWTToken,
  evidence.deleteEvidence
);

export default router;
