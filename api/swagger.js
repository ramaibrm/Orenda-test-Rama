const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/swagger_output.json'
const endpointsFiles = ['./build/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles)