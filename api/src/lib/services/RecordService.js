import SchemaEnforcer from "../enforcer/SchemaEnforcer.js";
import stripProperty from "../utilities/stripProperty.js";
import buildJsonTableColumns from "../utilities/buildJsonTableColumns.js";

class RecordService {
  constructor(db) {
    this.db = db;
    this.schemaEnforcer = new SchemaEnforcer();
  }

  async getProjectSchema(userId, projectName) {
    const [results] = await this.db.execute(
      ` SELECT schema_definition->'$.components.schemas' AS result 
        FROM User_Projects
        WHERE user_id=? AND project_name = ?`,
      [userId, projectName]
    );
    if (results.length === 0) {
      throw new Error("No records found.");
    }

    const records = results[0].result;

    return records;
  }

  async getAllProjectRecords(userId, projectName) {
    const [results] = await this.db.execute(
      ` SELECT records AS result 
        FROM User_Projects  
        WHERE user_id = ? AND project_name = ?`,
      [userId, projectName]
    );

    return results;
  }

  async getTableRecords(userId, projectName, tableName) {
    const [results] = await this.db.execute(
      ` SELECT records->'$.${tableName}' AS result 
        FROM User_Projects 
        WHERE user_id = ? AND project_name = ?`,
      [userId, projectName]
    );

    let records = results[0].result;
    if (typeof records === "string") {
      records = JSON.parse(records);
    }
    return records;
  }
  async getRecord(userId, projectName, tableName, recordId) {
    const projectSchema = await this.getProjectSchema(userId, projectName);
    const tableSchema = projectSchema[tableName];

    if (!tableSchema) {
      throw new Error(`No schema for table ${tableName}`);
    }

    const cleanedSchema = stripProperty(tableSchema, "example");
    const columnsBlock = buildJsonTableColumns(cleanedSchema);

    const [results] = await this.db.execute(
      `
        SELECT orders.*
        from User_Projects,
        JSON_TABLE(
        records->'$.${tableName}',
        '$[*]' COLUMNS (
        ${columnsBlock}
        )
    ) 
    AS orders
    WHERE orders.id = ? AND User_Projects.user_id = ? AND project_name = ?`,
      [recordId, userId, projectName]
    );
    console.log(results[0]);
    return results[0];
  }

  async createRecord(userId, projectName, tableName, data) {
    const projectSchema = await this.getProjectSchema(userId, projectName);
    const tableSchema = projectSchema[tableName];

    if (!tableSchema) {
      throw new Error(`No schema for table ${tableName}`);
    }

    const cleanedSchema = stripProperty(tableSchema, "example");

    this.schemaEnforcer.clearSchema();
    this.schemaEnforcer.registerSchema(tableName, cleanedSchema);
    const validationObject = this.schemaEnforcer.enforce(tableName, data);

    if (!validationObject.valid) {
      return validationObject;
    }

    const [results] = await this.db.execute(
      `UPDATE User_Projects
        set records = JSON_ARRAY_APPEND(records, '$.${tableName}', CAST (? AS JSON))
        WHERE user_id = ? AND project_name = ?
        `,
      [JSON.stringify(data), userId, projectName]
    );

    validationObject.results = results;
    validationObject.updatedData = data;

    return validationObject;
  }

  async createRecords(userId, projectName, tableName, dataList) {
    // Validate all the records add schemas before creating all records
    for (const data of dataList) {
      await this.createRecord(userId, projectName, tableName, data);
    }
  }

  async updateRecord(userId, projectName, tableName, recordId, data) {
    const projectSchema = await this.getProjectSchema(userId, projectName);
    const tableSchema = projectSchema[tableName];

    if (!tableSchema) {
      throw new Error(`No schema for table ${tableName}`);
    }

    const cleanedSchema = stripProperty(tableSchema, "example");

    this.schemaEnforcer.clearSchema();
    this.schemaEnforcer.registerSchema(tableName, cleanedSchema);
    const validationObject = this.schemaEnforcer.enforcePartial(
      tableName,
      data
    );

    if (validationObject.valid) {
      const currentRecord = await this.getTableRecords(
        userId,
        projectName,
        tableName
      );

      const index = currentRecord.findIndex((item) => item.id === recordId);

      // spread the ...currentRecord keys and values and overwrite it with the spread ...data
      const updateRecord = { ...currentRecord[index], ...data };
      currentRecord[index] = updateRecord;
      console.log(currentRecord);

      const [results] = await this.db.execute(
        `UPDATE User_Projects
        SET records = JSON_SET(records, '$.${tableName}', CAST(? as JSON))
        WHERE user_id = ? AND project_name = ?`,
        [JSON.stringify(currentRecord), userId, projectName]
      );
      validationObject.results = results;
      validationObject.updateRecord = updateRecord;
      return validationObject;
    }

    validationObject.results = null;
    validationObject.updateRecord = null;
    return validationObject;
  }

  async partialUpdateRecord(
    userId,
    projectName,
    tableName,
    recordId,
    partialData
  ) {
    const projectSchema = await this.getProjectSchema(userId, projectName);
    const tableSchema = projectSchema[tableName];

    if (!tableSchema) {
      throw new Error(`No schema for table ${tableName}`);
    }

    const cleanedSchema = stripProperty(tableSchema, "example");

    this.schemaEnforcer.clearSchema();
    this.schemaEnforcer.registerSchema(tableName, cleanedSchema);
    const validationObject = this.schemaEnforcer.enforcePartial(
      tableName,
      partialData
    );

    if (validationObject.valid) {
      const currentRecord = await this.getTableRecords(
        userId,
        projectName,
        tableName
      );
      const index = currentRecord.findIndex((item) => item.id === recordId);
      // spread the ...currentRecord key sand values and overwrite it with the spead ...partialData
      const updateRecord = { ...currentRecord[index], ...partialData };
      currentRecord[index] = updateRecord;
      console.log(currentRecord);

      const [results] = await this.db.execute(
        `UPDATE User_Projects
        SET records = JSON_SET(records, '$.${tableName}', CAST(? as JSON))
        WHERE user_id = ? AND project_name = ?`,
        [JSON.stringify(currentRecord), userId, projectName]
      );
      validationObject.results = results;
      validationObject.updateRecord = updateRecord;
      return validationObject;
    }
    validationObject.results = null;
    validationObject.updateRecord = null;
    return validationObject;
  }
  async deleteRecord(userId, projectName, tableName, recordId) {
    const currentRecords = await this.getTableRecords(
      userId,
      projectName,
      tableName
    );
    if (!currentRecords || currentRecords.length === 0) {
      return false;
    }
    const filteredRecords = currentRecords.filter(
      (record) => record.id != recordId
    );
    const [results] = await this.db.execute(
      `UPDATE User_Projects
        SET records = JSON_SET(records, '$.${tableName}', CAST(? as JSON))
        WHERE user_id = ? AND project_name = ?`,
      [JSON.stringify(filteredRecords), userId, projectName]
    );
    if (results.affectedRows > 0) {
      return true;
    }
    return false;
  }
}
export default RecordService;
