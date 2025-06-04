function buildJsonTableColumns(schema) {
  const props = schema.properties;
  return Object.entries(props)
    .map(([key, value]) => {
      const sqlType = mapJsonTypeToSqlType(value.type);
      return `${key} ${sqlType} PATH '$.${key}'`;
    })
    .join(",\n");
}
