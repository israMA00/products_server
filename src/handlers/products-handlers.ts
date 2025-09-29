import { Request, Response } from "express"
import Products from "../models/Products"


const createProduct = async (req: Request, res: Response) => {

    const product = await Products.create(req.body);

    res.status(201).json({ data: product })

}

const getProducts = async (req: Request, res: Response) => {

    const products = await Products.findAll({
        order: [['id', 'DESC']]
    });

    res.status(200).json({ data: products })

}

const getProductByID = async (req: Request, res: Response) => {

    const { id } = req.params;

    const product = await Products.findByPk(id);

    if (!product) {
        res.status(404).json({ errors: "Producto no encontrado" })
        return;
    }

    res.status(200).json({ data: product })
}

const updateProduct = async (req: Request, res: Response) => {

    const { id } = req.params;

    const product = await Products.findByPk(id);

    if (!product) {
        res.status(404).json({ errors: "Producto no encontrado" })
        return;
    }

    await product.update(req.body)
    await product.save()

    res.status(200).json({ data: product })
}


const updateAvailable = async (req: Request, res: Response) => {

    const { id } = req.params;

    const product = await Products.findByPk(id);

    if (!product) {
        res.status(404).json({ errors: "Producto no encontrado" })
        return;
    }

    product.available = !product.dataValues.available;
    await product.save();

    res.status(200).json({ data: product })
}


const deleteProduct = async (req: Request, res: Response) => {

    const { id } = req.params;

    const product = await Products.findByPk(id);

    if (!product) {
        res.status(404).json({ errors: "Producto no encontrado" })
        return;
    }

    await product.destroy();

    res.status(200).json({ data: "Producto eliminado" })




}

export {
    createProduct,
    getProducts,
    getProductByID,
    updateProduct,
    updateAvailable,
    deleteProduct
}