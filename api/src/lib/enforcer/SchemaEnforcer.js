import ajv from "ajv";
import stripProperty from "../utilities/stripProperty.js";
class SchemaEnforcer {
  constructor() {
    this.ajv = new ajv();
    this.schemas = {};
  }

  registerSchema(name, schema) {
    this.schemas[name] = {
      fullValidator: this.ajv.compile(schema),
      patchValidator: this.ajv.compile(stripProperty(schema, "required")),
    };
  }
  clearSchema() {
    this.schemas = {};
  }

  enforce(schemaName, data) {
    const validate = this.schemas[schemaName].fullValidator;
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
  enforcePartial(schemaName, data) {
    const validate = this.schemas[schemaName].patchValidator;
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
