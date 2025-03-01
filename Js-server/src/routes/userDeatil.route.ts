import { Router } from "express";
import { userDetail } from "../controllers";
import verifyJWTToken from "../middleware/VerifyJWT.middleware";
import verifyReport from "../middleware/VerifyReport.middleware";

const router = Router();

router.post("/", verifyJWTToken, verifyReport, userDetail.createUserDetail);
router.put("/:id", verifyJWTToken, userDetail.updateUserDetail);
router.delete(
  "/:id",
  verifyJWTToken,
  verifyReport,
  userDetail.deleteUserDetail
);

export default router;
