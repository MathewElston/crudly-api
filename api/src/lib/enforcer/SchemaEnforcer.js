import ajv from "ajv";
class SchemaEnforcer {
  constructor() {
    this.ajv = new ajv();
    this.schemas = {};
  }

  registerSchema(name, schema) {
    this.schemas[name] = this.ajv.compile(schema);
  }

  enforce(schemaName, data) {
    const validate = this.schemas[schemaName];
    if (!validate) {
      throw new Error(`Schema "${schemaName}" not registered`);
    }

    const valid = validate(data);
    if (!valid) {
      return {
        valid: false,
        errors: validate.errors,
      };
    }
    return {
      valid: true,
      errors: null,
    };
  }
}

export default SchemaEnforcer;
