import { logOutUser, loginUser, singUpUser } from "./user.controller";
import {
  createVulnerabilityDetails,
  updateVulnerabilityDetails,
  deleteVulnerabilityDetails,
} from "./vulnerabilityDetail.controller";
import {
  createEvidence,
  updateEvidence,
  deleteEvidence,
} from "./evidence.controller";

export const user = {
  logOutUser,
  loginUser,
  singUpUser,
};

export const vulnerabilityDetail = {
  createVulnerabilityDetails,
  updateVulnerabilityDetails,
  deleteVulnerabilityDetails,
};

export const evidence = {
  createEvidence,
  updateEvidence,
  deleteEvidence,
};
