import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
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
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("error fetching product", error);
      }
    };
    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMaxPrice(undefined);
    setMinPrice(undefined);
    setKeyword("");
  };
  return (
    <div className="w-64 h-screen p-5">
      <h1 className="mt-4 text-2xl font-bold mb-18">React Store</h1>

      <section>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-2 mt-3 border-2 rounded sm:mb-0"
          type="text"
          placeholder="Search Product"
        />
        <div className="flex items-center justify-between ">
          <input
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
            className="w-full px-5 py-3 mb-3 mr-2 border-2"
            type="text"
            placeholder="min"
          />{" "}
          <input
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
            className="w-full px-5 py-3 mb-3 border-2"
            type="text"
            placeholder="max"
          />
        </div>

        {/* categories Section  */}
        <div className="mb-3 ">
          <h2 className="mb-3 text-xl font-semibold">Categories</h2>
        </div>
        <section>
          {categories.map((category, index) => (
            <label className="block mb-2" key={index}>
              <input
                type="radio"
                name="category"
                value={category}
                className="m-1 size-[16px]"
                checked={selectedCategory === category}
                onChange={() => {
                  handleRadioChangeCategories(category);
                }}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        {/* Keywords Section  */}

        <div className="mb-bottom">
          <h2 className="mb-3 text-xl font-semibold ">Keywords</h2>
          {keyWords.map((keyword, index) => (
            <button
              onClick={() => handleKeywordClick(keyword)}
              key={index}
              className="block w-full px-2 py-2 mb-2 text-left border rounded hover:bg-gray-200"
            >
              {keyword.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          onClick={handleResetFilters}
          className="w-full py-2 mt-5 mb-3 font-semibold text-white bg-black rounded"
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
