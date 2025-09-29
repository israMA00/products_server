import request from 'supertest';
import server from '../../server';

describe('POST from /api/products', () => {

    test('should create a new product', async () => {

        const response = await request(server).post('/api/products').send({
            name: "Monitor",
            price: 8000,
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data")
        expect(response.headers["content-type"]).toMatch("/json")

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("errors")
    
    });

    test("should check if price is not a number", async () => {

        const response = await request(server).post("/api/products").send({
            name: "monitor",
            price: "hola"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("data")
        expect(response.body.errors).not.toHaveLength(1)


    });

    test("should check if price more than 0" , async() => {

        const response = await request(server).post("/api/products").send({
            name: "monitor",
            price: 0
        });
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("data")
        expect(response.body.errors).not.toHaveLength(2)

    });

});

describe("GET from  /api/products", () => {

    test("should get a list of products", async () => {

        const response = await request(server).get("/api/products");

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        expect(response.headers["content-type"]).toMatch("/json")

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty("errors")

        
    });

});

describe("GET by ID /api/products", () => {

    const productID = 1;

    test("should get a product by ID", async () => {

        const response = await request(server).get(`/api/products/${productID}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty("errors");
    });

    test("should show a error message if urlID is not valid", async() => {

        const response = await request(server).get("/api/products/hola");

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors[0].msg).toBe("ID no válido");
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("data");
        
    });

    test("should show an error message if product is not found", async() => {

        const response = await request(server).get("/api/products/0");

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toBe("Producto no encontrado");

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("data");
    });

});

describe("PUT from /api/products", () => {

     const productID = 1;

    test("should update a product by ID", async() => {
        const response = await request(server).put(`/api/products/${productID}`).send({
            name: "monitor",
            price: 2000,
            available: true
        });
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        expect(response.status).not.toBe(202)
        expect(response.body).not.toHaveProperty("errors")
    });

    test("should show a error message if urlID is not valid", async() => {

         const response = await request(server).put(`/api/products/hola}`).send({
            name: "monitor",
            price: 2000,
            available: true
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors[0].msg).toBe("ID no válido");
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("data");
        
    });

    test("should show an error message if product is not found", async() => {

         const response = await request(server).put(`/api/products/100`).send({
            name:"monitor",
            price:2000,
            available: true
        });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toBe("Producto no encontrado");

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("data");
      
        
    });

    test("should check if price is not a number", async () => {

        const response = await request(server).put(`/api/products/1`).send({
            name:"monitor",
            price:"hola",
            available: true
        });


        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("data")
        expect(response.body.errors).not.toHaveLength(1)


    });

    test("should check if price more than 0" , async() => {

        const response = await request(server).put(`/api/products/1`).send({
            name:"monitor",
            price: 0,
            available: true
        });

        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("data")
        expect(response.body.errors).not.toHaveLength(2)

    });

    test("check if available is a boolean", async () => {

         const response = await request(server).put(`/api/products/1`).send({
            name:"monitor",
            price: 1000,
            available: 1000
        });

         expect(response.status).toBe(400);
         expect(response.body).toHaveProperty("errors");
         expect(response.body.errors).toHaveLength(1);
         expect(response.body.errors[0].msg).toBe("Sin disponibilidad de producto");

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("data");

    });

});

describe("PATCH from /api/products", () => {

    test("should change a available state", async () => {

        const response = await request(server).patch("/api/products/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data.available).toBe(false);
    
    });

    test("should show a error message if urlID is not valid", async() => {

        const response = await request(server).patch("/api/products/10.1416");


        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors[0].msg).toBe("ID no válido");
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("data");
        
    });

    test("should show an error message if product is not found", async() => {

        const response = await request(server).patch("/api/products/0");


        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toBe("Producto no encontrado");

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("data");
      
        
    });

});

describe("DELETE from /api/products", () => {

    test("should delete a product by ID", async () => {

        const response = await request(server).delete("/api/products/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toBe("Producto eliminado")

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("errors")
    });

    test("should show a error message if urlID is not valid", async() => {

        const response = await request(server).delete("/api/products/hola");


        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors[0].msg).toBe("ID no válido");
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("data");
        
    });

     test("should show an error message if product is not found", async() => {

        const response = await request(server).delete("/api/products/0");


        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toBe("Producto no encontrado");

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("data");
      
        
    });

});











