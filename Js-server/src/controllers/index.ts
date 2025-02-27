import { logOutUser, loginUser, singUpUser } from "./user.controller";
import {
  createVulnerabilityDetails,
  updateVulnerabilityDetails,
  deleteVulnerabilityDetails,
} from "./vulnerabilityDetail.controller";

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
