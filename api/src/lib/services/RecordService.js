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

    if (results.length === 0) {
      throw new Error("No records found.");
    }
    const records = results[0].result;

    return records;
  }

  async getTableRecords(userId, projectName, tableName) {
    const [results] = await this.db.execute(
      ` SELECT records->'$.${tableName}' AS result 
        FROM User_Projects 
        WHERE user_id = ? AND project_name = ?`,
      [userId, projectName]
    );

    if (results.length === 0) {
      throw new Error("No records found");
    }

    const records = results[0].result;

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
    if (validationObject.valid) {
      this.db.execute(
        `UPDATE User_Projects
        set records = JSON_ARRAY_APPEND(records, '$.${tableName}', CAST (? AS JSON))
        WHERE user_id = ? AND project_name = ?
        `,
        [JSON.stringify(data), userId, projectName]
      );
    }
    return validationObject;
  }
}
export default RecordService;
