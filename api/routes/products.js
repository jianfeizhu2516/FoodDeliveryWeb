import express from "express";
import { fetchAllProducts } from "../controllers/productController.js";

const router = express.Router();
router.get('/', (req, res) => {
    res.send('Product list'); // 测试返回
  });
router.get("/",fetchAllProducts)

export default router;