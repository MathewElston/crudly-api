/*
ToDo

- Walk through the openapi spec and think how to programatically add the schemas into the 
  template w/o removing the error sechams
- Update the "oneOf" sections with each of the schema listings.
*/

import fs from "fs";
import yaml from "js-yaml";
import db from "../database/db.js";

// Assumes that parameters are parsed into Javascript objects already.
class SpecInjector {
  constructor(baseSpec, injectSpec, pathToInject) {
    this.baseSpec = baseSpec;
    this.injectSpec = injectSpec;
    this.pathToInject = pathToInject;
  }

  inject() {}
}

const templateObject = yaml.load(
  fs.readFileSync("../../../assets/openapi-template.yaml")
);

const injectObject = yaml.load(
  fs.readFileSync("../../../assets/upload-template.yaml")
);

//console.log(templateObject.components.schemas);
//console.log("----------------------------------");
//console.log(JSON.stringify(templateObject.components.schemas, null, 2));
//console.log(injectObject.schemas);
//console.log(JSON.stringify(injectObject.schemas, null, 2));

//templateObject.components.schemas = injectObject.schemas;
//console.log(templateObject.components.schemas);
//console.log(JSON.stringify(templateObject.components.schemas, null, 2));

// Read the test yaml and set user project 1 to the schema
// const file = fs.readFileSync("../../../assets/openapi-test.yaml");
// const testUpload = yaml.load(file);

// const jsonString = JSON.stringify(testUpload);

// const [results, fields] = await db.execute(
//   "UPDATE User_Projects SET schema_definition=? WHERE id=?",
//   [jsonString, 1]
// );

// console.log(jsonString);
