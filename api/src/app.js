import express from "express";

import db from "./lib/database/db.js";

import RecordService from "./lib/services/RecordService.js";

import stripProperty from "./lib/utilities/stripProperty.js";

const testUser = {
  userId: 1,
  projectId: 2,
  projectName: "Ordering",
};

const recordService = new RecordService(db);

const app = express();
app.use(express.json());

app.get("/project/:project", async (req, res) => {
  const { project } = req.params;

  try {
    const results = await recordService.getAllProjectRecords(
      testUser.userId,
      project
    );
    res.json(results);
  } catch (error) {
    console.error(error.status);
    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/projects/:project/tables/:table", async (req, res) => {
  const { project, table } = req.params;

  try {
    const [results] = await db.execute(
      `SELECT records->'$.${table}' as result FROM User_Projects WHERE project_name = ?`,
      [project]
    );
    const records = results[0].result;
    res.json(records);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "There was an internal error on the server." });
  }
});

app.get("/projects/:project/tables/:table/:id", async (req, res) => {
  const { project, table, id } = req.params;

  const result = await recordService.getRecord(
    testUser.userId,
    project,
    table,
    id
  );

  res.json(result);
});

app.post("/projects/:project/tables/:table", async (req, res) => {
  const { project, table } = req.params;
  const { data } = req.body;
  try {
    const { valid, errors } = await recordService.createRecord(
      testUser.userId,
      project,
      table,
      data
    );
    if (valid) {
      return res.status(200).json({ message: "Record added!" });
    } else {
      return res.status(400).json({ error: errors });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Server Error" });
  }
});

// Testing Grounds
app.get("/", async (req, res) => {
  const schema = await recordService.getProjectSchema(
    testUser.userId,
    testUser.projectName
  );

  const cleanedSchema = stripProperty(schema, "example");

  for (const table in cleanedSchema) {
    recordService.schemaEnforcer.registerSchema(table, cleanedSchema[table]);
  }
  //
  res.json(cleanedSchema);
});

const PORT = process.env.API_SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
