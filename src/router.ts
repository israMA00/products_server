import { Router } from "express";
import { createProduct, getProducts, getProductByID, updateProduct, updateAvailable, deleteProduct } from "./handlers/products-handlers";
import { body, param } from "express-validator";
import ShowErrors from "./middlewares/ShowErrors";

const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: the product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: the product name
 *                      example: "monitor"
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 4000
 *                  available:
 *                      type: boolean
 *                      description: theproduct availability
 *                      example: true
 * 
 */


router.post('/',
    body('name')
        .notEmpty().withMessage('Escribe un producto')
        .custom(value => isNaN(value)).withMessage("No es un nombre válido")
        .isLength({ min: 2 }).withMessage('Minimo 2 caracteres'),
    body("price")
        .notEmpty().withMessage('Escribe un precio')
        .isNumeric().withMessage('No es una cantidad válida')
        .custom(value => value > 0).withMessage("El valor debe ser mayor a 0"),
    ShowErrors,
    createProduct
);

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: get a list of products
 *          tags:
 *              - Products
 *          description: return a list of products
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "monitor"
 *                              price:
 *                                  type: number
 *                                  example: 6000
 *          responses:
 *              201:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              400:
 *                  description: Bad request / invalid input data
 *              
 *             
 */

                                           
router.get('/', getProducts);

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: get all products
 *          tags:
 *              - Products
 *          description: return a list of all products
 *          responses:
 *              200:
 *                  description: Successfuly response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Product"
 *                     
 */



router.get('/:id',
    param('id')
        .isInt().withMessage('ID no válido'),
    ShowErrors,
    getProductByID
)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: get a product by ID
 *          tags:
 *              - Products
 *          description: return a product by ID
 *          parameters:
 *            - in: path
 *              required: true
 *              name: id
 *              description: the product ID for retreived
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              400:
 *                  description: Bad request / invalid input data
 *              404:
 *                  description: Not Found
 *          
 *              
 *              
 * 
 */

router.put('/:id',
    param('id')
        .isInt().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('Escribe un producto')
        .custom(value => isNaN(value)).withMessage("No es un nombre válido")
        .isLength({ min: 2 }).withMessage('Minimo 2 caracteres'),
    body("price")
        .notEmpty().withMessage('Escribe un precio')
        .isNumeric().withMessage('No es una cantidad válida')
        .custom(value => value > 0).withMessage("El valor debe ser mayor a 0"),
    body('available')
        .notEmpty().withMessage('selecciona la disponibilidad')
        .isBoolean().withMessage('Sin disponibilidad de producto'),

    ShowErrors,

    updateProduct

);

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: get a product updated
 *          tags:
 *              - Products
 *          description: return a product updated
 *          parameters:
 *              - in: path
 *                required: true
 *                name: id
 *                description: the ID product to update
 *                schema:
 *                      type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "monitor"
 *                              price:
 *                                  type: number
 *                                  example: 5000
 *                              available:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              400:
 *                  description: Bad request / invalid input data
 *              404:
 *                  description: Not found
 *              
 */

router.patch('/:id',
    param('id').isInt().withMessage('ID no válido'),
    ShowErrors,
    updateAvailable
);

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Get an updated product available
 *          tags:
 *              - Products
 *          description: Return a product available 
 *          parameters:
 *              - in: path
 *                required: true
 *                name: id
 *                description: the ID product 
 *                schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: Not found
 *          
 */

router.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    ShowErrors,
    deleteProduct
);


/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a product
 *          tags:
 *              - Products
 *          description: Return a product delete message
 *          parameters:
 *              - in: path
 *                required: true
 *                name: id
 *                description: the ID product
 *                schema:
 *                      type: integer
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: string
 *                                      value: "Producto eliminado"
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: Not found
 */


export default router;