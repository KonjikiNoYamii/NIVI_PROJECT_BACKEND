import config from "../utils/env";
import swaggerJSDoc from "swagger-jsdoc";
const option = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'YAMI PERPUSTAKAAN API',
            version: '1.0.0',
            description: 'Dokumentasi Perpustakaan',
            contact: {
                name: 'Backend developer'
            },
        },
        servers: [
            {
                url: `http://${config.HOST}:${config.PORT}`,
                description: 'Production'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['src/routes/*.ts']
};
const swaggerSpec = swaggerJSDoc(option);
export default swaggerSpec;
//# sourceMappingURL=swagger.js.map