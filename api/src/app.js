import express from "express";

import db from "./lib/database/db.js";

import RecordService from "./lib/services/RecordService.js";

import stripProperty from "./lib/utilities/stripProperty.js";

const testUser = {
  userId: 1,
  projectId: 2,
  projectName: "Ordering",
};

const responseSchema = {
  success: true,
  message: "Message goes here",
  data: "data",
  errors: "errors",
};
const recordService = new RecordService(db);

const app = express();
app.use(express.json());

app.get("/projects/:project", async (req, res) => {
  const { project } = req.params;

  try {
    const results = await recordService.getAllProjectRecords(
      testUser.userId,
      project
    );

    if (results && results.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Project records successfully returned.",
        data: results,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Project records not found. Check your URI and try again.",
      data: null,
    });
  } catch (error) {
    console.error(`Error fetching project records: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
});

app.get("/projects/:project/tables/:table", async (req, res) => {
  const { project, table } = req.params;

  try {
    const results = await recordService.getTableRecords(
      testUser.userId,
      project,
      table
    );

    if (results && results.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Table records successfully returned.",
        data: results,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Table records not found. Check your URI and try again.",
      data: null,
    });
  } catch (error) {
    console.error(`Error fetching table ${table}: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
});

app.get("/projects/:project/tables/:table/:id", async (req, res) => {
  const { project, table, id } = req.params;
  const recordId = Number(id);

  try {
    const result = await recordService.getRecord(
      testUser.userId,
      project,
      table,
      recordId
    );

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Table record successfully returned.",
        data: result,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Table record not found. Check your URI and try again.",
      data: null,
    });
  } catch (error) {
    console.error(`Error fetching record from ${table}: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
});

app.post("/projects/:project/tables/:table", async (req, res) => {
  const { project, table } = req.params;
  const { data } = req.body;

  try {
    // Add check if multiple data points and then route to add 1 record or multiple
    const { results, valid, errors } = await recordService.createRecord(
      testUser.userId,
      project,
      table,
      data
    );
    if (valid) {
      if (results && results.affectedRows > 0) {
        return res.status(201).json({
          success: true,
          message: `${table} record added successfully.`,
          data: results,
        });
      }

      return res.status(404).json({
        success: false,
        message: "Table or Project not found. Check your URI and try again.",
        data: null,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Unable to create resource.",
      data: null,
      errors: errors,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
});

app.put("/projects/:project/tables/:table/:id", async (req, res) => {
  const { project, table, id } = req.params;
  const { data } = req.body;
  const recordId = Number(id);

  try {
    const { valid, errors, results } = await recordService.updateRecord(
      testUser.userId,
      project,
      table,
      recordId,
      data
    );

    if (valid) {
      if (results && results.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: `${table} record updated successfully.`,
          data: results,
        });
      }
    }

    return res.status(400).json({
      success: false,
      message: "Unable to update resource.",
      data: null,
      errors: errors,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
});

app.patch("/projects/:project/tables/:table/:id", async (req, res) => {
  const { project, table, id } = req.params;
  const { data } = req.body;
  const recordId = Number(id);

  try {
    const { valid, errors, results } = await recordService.partialUpdateRecord(
      testUser.userId,
      project,
      table,
      recordId,
      data
    );

    if (valid) {
      if (results && results.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: `${table} record updated successfully.`,
          data: results,
        });
      }
    }

    return res.status(400).json({
      success: false,
      message: "Unable to update resource.",
      data: null,
      errors: errors,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
});

app.delete("/projects/:project/tables/:table/:id", async (req, res) => {
  const { project, table, id } = req.params;
  const recordId = Number(id);
  try {
    const isDeleted = await recordService.deleteRecord(
      testUser.userId,
      project,
      table,
      recordId
    );
    if (isDeleted) {
      return res.status(200).json({
        success: true,
        message: `Table ${table} record id: ${recordId} successfully deleted.`,
        data: null,
      });
    }

    return res.status(404).json({
      success: false,
      message:
        "Project, Table, or Record not found. Check your URI and try again.",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
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
