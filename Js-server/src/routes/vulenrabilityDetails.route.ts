import { Router } from "express";
import {
  createVulnerabilityDetails,
  updateVulnerabilityDetails,
  deleteVulnerabilityDetails,
} from "../controllers";
import verifyJWTToken from "../middleware/VerifyJWT.middleware";

const router = Router();

router.post("/", verifyJWTToken, createVulnerabilityDetails);
router.put("/", verifyJWTToken, updateVulnerabilityDetails);
router.delete("/", verifyJWTToken, deleteVulnerabilityDetails);

export default router;
