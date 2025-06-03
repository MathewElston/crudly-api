class RecordService {
  constructor(db) {
    this.db = db;
  }

  async getProjectSchema(userId, projectName) {
    const [results] = await this.db.execute(
      ` SELECT schema_definition->'$.components.schemas' AS result 
        FROM User_Projects`,
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
    const [results] = await this.db.execute(`
        SELECT orders.*
        from User_Projects,
        JSON_TABLE(
        records->'$.${tableName}',
        '$[*]' COLUMNS (
        id INT PATH '$.id',
        userId INT PATH '$.userId',
        item VARCHAR(100) PATH '$.item',
        price DOUBLE PATH '$.price',
        quantity INT PATH '$.quantity'
        )
    ) 
    AS orders
    WHERE orders.id = ${recordId}`);
  }
}
export default RecordService;
