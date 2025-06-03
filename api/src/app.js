import express from "express";

import db from "./lib/database/db.js";

const testUser = {
  userId: 1,
  projectId: 2,
  projectName: "Test Project",
};

const app = express();

app.get("/:project/:table", async (req, res) => {
  const { project, table } = req.params;
  try {
    const [results, fields] = await db.execute(
      `SELECT records->'$.${table}' as result FROM User_Projects WHERE project_name = ?`,
      [project]
    );
    const records = results[0].result;
    console.log(results);
    console.log(records);
    res.json(records);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "There was an internal error on the server." });
  }
});

app.get("/", (req, res) => {
  res.send("Hello cat!");
});
const PORT = process.env.API_SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
