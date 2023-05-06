import path from 'path';
import { createGenerator } from "ts-json-schema-generator";
import fs from 'fs';


export class Customer {
  name!: string;
  phone!: string;
  email!: string;
  address!: string;
}

const config = {
  path: __filename,
  tsconfig: path.join(__dirname, '..', '..', 'tsconfig.json'),
  type: "*",
}

const schemaGenerator = createGenerator(config)
const schema = schemaGenerator.createSchema('Customer')

const customerSchema = schema.definitions![Customer.name] as any

console.log(customerSchema, 'schema')

const schemaString = JSON.stringify(schema, null, 2);
fs.writeFile(path.join(__dirname, '..', '..') + "/swagger_schema.json", schemaString, (err) => {
    if (err) throw err;
});