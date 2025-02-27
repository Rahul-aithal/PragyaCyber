import mongoose from "mongoose";

const testPerformedSchema = new mongoose.Schema({
  name: 
  
  step: [
    {
      name: "Conduct Search Engine Discovery Reconnaissance for Information Leakage",
      pass: false,
      fail: false,
      noAns: false,
    },
    {
      name: "Fingerprint Web Server",
      pass: false,
      fail: false,
      noAns: false,
    },
    {
      name: "Review Webserver Metafiles for Information Leakage",
      pass: true,
      fail: true,
      noAns: false,
    },
    {
      name: "Enumerate Applications on Webserver",
      pass: true,
      fail: false,
      noAns: true,
    },
    {
      name: "Review Webpage Content for Information Leakage",
      pass: false,
      fail: true,
      noAns: false,
    },
    {
      name: "Identify Application Entry Points",
      pass: true,
      fail: false,
      noAns: true,
    },
    {
      name: "Map Execution Paths Through Application",
      pass: false,
      fail: false,
      noAns: false,
    },
    {
      name: "Fingerprint Web Application Framework",
      pass: true,
      fail: false,
      noAns: false,
    },
    {
      name: "Fingerprint Web Application",
      pass: true,
      fail: true,
      noAns: true,
    },
    {
      name: "Map Application Architecture",
      pass: false,
      fail: false,
      noAns: true,
    },
  ],
});

const TestPerformed = mongoose.model("TestPerformed", testPerformedSchema);
