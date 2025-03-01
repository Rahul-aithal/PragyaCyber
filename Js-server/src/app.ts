import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route";
import vulenrabilityDetailsRoute from "./routes/vulenrabilityDetails.route";
import evidenceRoute from "./routes/evidence.route";
import testPerformedRoute from "./routes/testPerformed.router";
import userDetailRoute from "./routes/userDeatil.route";
import vulnerabilityRoute from "./routes/vulenrabilityDetails.route";
import targeScopeRoute from "./routes/targetScope.route";
import reportRoute from "./routes/report.route";

app.use("/user", userRouter);
app.use("/vulenrabilityDetails", vulenrabilityDetailsRoute);
app.use("/evidence", evidenceRoute);
app.use("/testPerformed", testPerformedRoute);
app.use("/userDetials", userDetailRoute);
app.use("/vulnerability", vulnerabilityRoute);
app.use("/targeScope", targeScopeRoute);
app.use("/report", reportRoute);

export default app;
