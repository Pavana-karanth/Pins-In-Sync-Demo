const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Express API',
        description: 'API documentation'
    },
    host: 'localhost:8000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server'); // Your project's root file
});
