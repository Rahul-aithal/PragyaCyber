import { Router } from "express";
import { targetScope } from "../controllers";
import verifyJWTToken from "../middleware/VerifyJWT.middleware";
import verifyReport from "../middleware/VerifyReport.middleware";

const router = Router();

router.post("/", verifyJWTToken, verifyReport, targetScope.createTargetScope);
router.put("/:id", verifyJWTToken, targetScope.updateTargetScope);
router.delete(
  "/:id",
  verifyJWTToken,
  verifyReport,
  targetScope.deleteETargetScope
);
router.get("/countApplicationType",verifyJWTToken,targetScope.getTotalApplicationType)

export default router;
