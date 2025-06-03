import express from "express";

import db from "./lib/database/db.js";

import RecordService from "./lib/services/RecordService.js";

const testUser = {
  userId: 1,
  projectId: 2,
  projectName: "Ordering",
};

const recordService = new RecordService(db);

const app = express();

app.get("/:project/:table", async (req, res) => {
  const { project, table } = req.params;

  /*  No class  try {
    const [results, fields] = await db.execute(
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
  } */
});

app.get("/:project", async (req, res) => {
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
      return res.status(404), json({ message: error.message });
    }
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Testing Grounds
app.get("/", async (req, res) => {
  const data = await recordService.getProjectSchema(
    testUser.userId,
    testUser.projectName
  );
  const schema = {};
  console.log(data);
  for (const table in data) {
    console.log(`Table: ${table}`);
    const fields = data[table].properties;
    for (const fieldName in fields) {
      const field = fields[fieldName];
      console.log(
        `Field: ${fieldName}, Type: ${field.type}, Example: ${field.example}`
      );
    }
  }
  res.json(data);
});

const PORT = process.env.API_SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
