import { Router } from "express";
import { reprot } from "../controllers";
import verifyJWTToken from "../middleware/VerifyJWT.middleware";

const router = Router();

router.get("/getReportsStats", verifyJWTToken, reprot.getReportsStats);
router.get("/getAllReports", verifyJWTToken, reprot.getAllReports);
router.get("/:id", verifyJWTToken, reprot.getReportById);
router.post("/", verifyJWTToken, reprot.createReport);
router.post("/addConclusion/:id", verifyJWTToken, reprot.addConclusion);
router.post("/addSecurityTool/:id", verifyJWTToken, reprot.addSecurityTool);
router.put("/updateReport/:id", verifyJWTToken, reprot.updateReport);
router.put("/updateConclusion/:id", verifyJWTToken, reprot.updateConclusion);
router.put("/updatePieChart/:id", verifyJWTToken, reprot.updatePieChart);
router.put(
  "/updateSecurityTool/:id",
  verifyJWTToken,
  reprot.updateSecurityTool
);
router.delete("/deleteConclusion/:id", verifyJWTToken, reprot.deleteConclusion);
router.delete(
  "/deleteSecurityTool/:id",
  verifyJWTToken,
  reprot.deleteSecurityTool
);
router.delete("/:id", verifyJWTToken, reprot.deleteReport);

export default router;
