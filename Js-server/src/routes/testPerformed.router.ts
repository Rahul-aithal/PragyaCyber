import { Router } from "express";
import { testPerformed } from "../controllers";
import verifyJWTToken from "../middleware/VerifyJWT.middleware";
import verifyReport from "../middleware/VerifyReport.middleware";

const router = Router();

router.post(
  "/",
  verifyJWTToken,
  verifyReport,
  testPerformed.createTestPerformed
);
router.put(
  "/:testPerformedId",
  verifyJWTToken,
  verifyReport,
  testPerformed.updateTestPerformed
);
router.put(
  "/:testPerformedId",
  verifyJWTToken,
  verifyReport,
  testPerformed.addStep
);
router.put(
  "/:testPerformedId",
  verifyJWTToken,
  verifyReport,
  testPerformed.updateStep
);
router.delete(
  "/:testPerformedId/:stepIndex",
  verifyJWTToken,
  verifyReport,
  testPerformed.removeStep
);
router.delete(
  "/:testPerformedId",
  verifyJWTToken,
  verifyReport,
  testPerformed.deleteTestPerformed
);

export default router;
