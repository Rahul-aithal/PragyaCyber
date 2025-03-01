import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route";
import vulenrabilityDetailsRoute from "./routes/vulenrabilityDetails.route";
import evidenceRout from "./routes/evidence.route";

app.use("/user", userRouter);
app.use("/vulenrabilityDetails", vulenrabilityDetailsRoute);
app.use("/evidence", evidenceRout);

export default app;
