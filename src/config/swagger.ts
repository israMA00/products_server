import swaggerJSDoc from "swagger-jsdoc";

const options:swaggerJSDoc.Options = {

    swaggerDefinition: {

        openapi: "3.0.2",
        
        tags: [
            {
                name: "Products",
                description: "api actions related to products"
            }
        ],

        info: {
            title: "API-REST",
            version: "1.0",
            description: "api rest for products"
        }
    },
    apis: ["./src/router.ts"]

}

const swaggerRefs = swaggerJSDoc(options);

export default swaggerRefs;

