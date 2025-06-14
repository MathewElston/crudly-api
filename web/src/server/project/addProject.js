async function addProject(userId, schema, projectName) {
  const [results] = await db.execute(
    `   INSERT INTO User_Projects 
        (user_id, security_config_id, project_name, schema_definition, created_at)
        VALUES (?, ?, ?, ?, NOW())
    `,
    [userId, 1, projectName, schema]
  );
}
