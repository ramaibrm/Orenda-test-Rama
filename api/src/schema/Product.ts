import path from 'path';
import { createGenerator } from "ts-json-schema-generator";
import fs from 'fs';


export class Product {
  name!: string;
  unit!: number;
  price!: number;
}

const config = {
  path: __filename,
  tsconfig: path.join(__dirname, '..', '..', 'tsconfig.json'),
  type: "*",
}

const schemaGenerator = createGenerator(config)
const schema = schemaGenerator.createSchema('Product')

const productSchema = schema.definitions![Product.name] as any

console.log(productSchema, 'schema')

const schemaString = JSON.stringify(schema, null, 2);
fs.writeFile(path.join(__dirname, '..', '..') + "/product_swagger_schema.json", schemaString, (err) => {
    if (err) throw err;
});