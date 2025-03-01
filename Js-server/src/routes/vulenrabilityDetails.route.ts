import { Router } from "express";
import { vulnerabilityDetail } from "../controllers";
import verifyJWTToken from "../middleware/VerifyJWT.middleware";
import verifyReport from "../middleware/VerifyReport.middleware";

const router = Router();

router.post(
  "/",
  verifyJWTToken,
  verifyReport,
  vulnerabilityDetail.createVulnerabilityDetails
);
router.put("/", verifyJWTToken, vulnerabilityDetail.updateVulnerabilityDetails);
router.delete(
  "/",
  verifyJWTToken,
  verifyReport,
  vulnerabilityDetail.deleteVulnerabilityDetails
);

export default router;
