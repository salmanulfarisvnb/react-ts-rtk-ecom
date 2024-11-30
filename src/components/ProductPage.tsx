import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  rating: number;
  images: string[];
}

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>();

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((Error) => console.error(`fetching filed ${Error}`));
  }, [id]);

  if (!product) return <h1>Loading.....</h1>;

  return (
    <div className="w-[80%] p-5">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 text-white bg-black rounded-md "
      >
        Back
      </button>
      <img
        src={product?.images[0]}
        alt="product_image"
        className="w-[40%] mb-5 h-[500px] object-contain"
      />
      <h2 className="mb-5 text-xl font-semibold">{product.title}</h2>
      <p className="w-[70%] text-sm text-gray-700">{product.description}</p>
      <div className="flex gap-4 mt-5 text-sm text-black">
        <p>Price:{product.price}</p>
        <p>Rating:{product.rating}</p>
      </div>
    </div>
  );
};
export default ProductPage;
