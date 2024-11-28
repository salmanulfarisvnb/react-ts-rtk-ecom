import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { LuTally3 } from "react-icons/lu";
import axios from "axios";
import BookCard from "./BookCard";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const itemPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemPerPage}&skip=${
      (currentPage - 1) * itemPerPage
    }`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((Error) => {
        console.error("error fetch data", Error);
      });
  }, []);

  const getFilterProducts = () => {
    let filterProducts = products;

    if (selectedCategory) {
      filterProducts = filterProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filterProducts = filterProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filterProducts = filterProducts.filter(
        (products) => products.price <= maxPrice
      );
    }

    if (searchQuery) {
      filterProducts = filterProducts.filter((products) =>
        products.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "expensive":
        return filterProducts.sort((a, b) => b.price - a.price);

      case "cheap":
        return filterProducts.sort((a, b) => a.price - b.price);

      case "popular":
        return filterProducts.sort((a, b) => b.rating - a.rating);

      default:
        return filterProducts;
    }
  };

  const filterProducts = getFilterProducts();

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem]">
      <div className="mb-5">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="relative mt-5 mb-5">
            <button className="flex items-center px-4 py-2 border rounded-full">
              <LuTally3
                onClick={() => {
                  setDropDownOpen(!dropDownOpen);
                }}
                className="mr-2"
              />
              {filter === "all"
                ? filter
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>

            {dropDownOpen && (
              <div className="absolute w-full border border-gray-300 rounded sm:w-40">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {filterProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainContent;
