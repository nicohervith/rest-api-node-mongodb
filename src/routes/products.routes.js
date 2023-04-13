import { Router } from "express";
//Para importar todas las funciones
import {
  getProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  getProductById,
} from "../controllers/products.controller.js";
const router = Router();

router.get("/", getProducts);

router.get("/:productId", getProductById);

router.post("/", [verifyToken, isModerator], createProduct);

router.put("/:productId", [verifyToken, isModerator], updateProductById);

router.delete("/:productId", [verifyToken, isAdmin], deleteProductById);

export default router;
