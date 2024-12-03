import db from "../db.js"
import { collection, getDocs } from "firebase/firestore";
export const fetchAllProducts = async (req,res)=>{
  try {
    // 引用 Firestore 中的 "products" 集合
    const productsCollection = collection(db, "products");

    // 获取集合中所有文档
    const querySnapshot = await getDocs(productsCollection);
    // 遍历每个文档并提取数据
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id, // 文档 ID
      ...doc.data() // 文档数据
    }));
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

