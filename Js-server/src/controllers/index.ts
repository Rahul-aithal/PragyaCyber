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

import {
  createTestPerformed,
  addStep,
  deleteTestPerformed,
  getAllTestPerformed,
  getTestPerformed,
  removeStep,
  updateStep,
  updateTestPerformed,
} from "./testPerforme.controller";

import {
  createUserDetail,
  deleteUserDetail,
  findUserDetailByUsername,
  getAllUserDetails,
  getUserDetailById,
  updateUserDetail,
} from "./userDetail.controller";

import {
  createVulnerability,
  deleteVulnerability,
  updateVulnerability,
  getAllVulnerabilities,
  getVulnerabilityById,
  getVulnerabilityByVid,
  toggleVulnerabilityFail,
  toggleVulnerabilityPass,
} from "./vulnerability.controller";

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

export const testPerformed = {
  createTestPerformed,
  addStep,
  deleteTestPerformed,
  getAllTestPerformed,
  getTestPerformed,
  removeStep,
  updateStep,
  updateTestPerformed,
};

export const userDetail = {
  createUserDetail,
  deleteUserDetail,
  findUserDetailByUsername,
  getAllUserDetails,
  getUserDetailById,
  updateUserDetail,
};

export const vulnerability = {
  createVulnerability,
  deleteVulnerability,
  updateVulnerability,
  getAllVulnerabilities,
  getVulnerabilityById,
  getVulnerabilityByVid,
  toggleVulnerabilityFail,
  toggleVulnerabilityPass,
};
