import React, { useEffect, useState } from "react";

interface Product {
  categories: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const [categories, setcategories] = useState<string[]>([]);
  const [keyWords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        console.log(data);
      } catch (error) {
        console.error("error fetching product", error);
      }
    };
    fetchCategories();
  }, []);
  return <div>Sidebar</div>;
};

export default Sidebar;
