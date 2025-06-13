import express from "express";

import RecordService from "./lib/services/RecordService.js";
import db from "./lib/database/db.js";
import stripProperty from "./lib/utilities/stripProperty.js";
import { apiKeyAuth } from "./lib/middleware/apiKeyAuth.js";

const testUser = {
  userId: 11,
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

app.use(apiKeyAuth);

app.get("/projects/:project", async (req, res) => {
  const { project } = req.params;

  try {
    const results = await recordService.getAllProjectRecords(
      req.userId,
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
      req.userId,
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
      req.userId,
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
    let result;

    if (Array.isArray(data) && data.length > 1) {
      result = await recordService.createRecords(
        req.userId,
        project,
        table,
        data
      );
    }
    result = await recordService.createRecord(req.userId, project, table, data);

    const { updatedData, results, valid, errors } = result;
    if (valid) {
      if (results && results.affectedRows > 0) {
        return res.status(201).json({
          success: true,
          message: `${table} record added successfully.`,
          data: updatedData,
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
    const { updateRecord, valid, errors, results } =
      await recordService.updateRecord(
        req.userId,
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
          data: updateRecord,
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
    const { updateRecord, valid, errors, results } =
      await recordService.partialUpdateRecord(
        req.userId,
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
          data: updateRecord,
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
      req.userId,
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
    req.userId,
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
