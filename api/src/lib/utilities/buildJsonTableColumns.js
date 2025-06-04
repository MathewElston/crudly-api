import mapJsonToSqlType from "./mapJsonToSqlType.js";

function buildJsonTableColumns(schema) {
  const props = schema.properties;
  return Object.entries(props)
    .map(([key, value]) => {
      const sqlType = mapJsonToSqlType(value.type);
      return `${key} ${sqlType} PATH '$.${key}'`;
    })
    .join(",\n");
}

export default buildJsonTableColumns;
