function mapJsonToSqlType(jsonType) {
  switch (jsonType) {
    case "integer":
      return "INT";
    case "number":
      return "DOUBLE";
    case "string":
      return "VARCHAR(255)";
    case "boolean":
      return "BOOLEAN";
    default:
      return "VARCHAR(255)";
  }
}

export default mapJsonToSqlType;
