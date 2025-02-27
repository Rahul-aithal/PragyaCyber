import { Router } from "express";
import { vulnerabilityDetail } from "../controllers";
import verifyJWTToken from "../middleware/VerifyJWT.middleware";

const router = Router();

router.post(
  "/",
  verifyJWTToken,
  vulnerabilityDetail.createVulnerabilityDetails
);
router.put("/", verifyJWTToken, vulnerabilityDetail.updateVulnerabilityDetails);
router.delete(
  "/",
  verifyJWTToken,
  vulnerabilityDetail.deleteVulnerabilityDetails
);

export default router;
