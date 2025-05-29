import express from "express";

const app = express();

import FileEnforcer from "../library/enforcer/FileEnforcer.mjs";

const fileEnforcer = new FileEnforcer({
  allowedContentTypes: ["application/yaml"],
  allowedExtensionTypes: ["yaml", "yml"],
  maxFileSize: 255 * 1024 * 1024,
});
app.get("/", (req, res) => {
  res.send("Were online yo");
});

app.listen(3001, () => {
  console.log("Test Server Listening on 3001");
});
