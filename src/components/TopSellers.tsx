import axios from "axios";
import { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5");
        const data = await response.json();
        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));
        setAuthors(authorsData);
      } catch (error) {
        console.error(`filed author data fetching:${error}`);
      }
    };
    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthor) =>
      prevAuthor.map((item, i) =>
        i === index ? { ...item, isFollowing: !item.isFollowing } : item
      )
    );
  };
  return (
    <div className="p-5 h-auto m-4 border w-[23rem]">
      <p className="font-bold">Top Sellers</p>
      <ul className="mt-3 space-y-3">
        {authors.map((item: Author, index: number) => (
          <li key={index} className="flex items-center justify-between">
            <section className="flex items-center justify-center gap-4">
              <img
                src={item.image}
                alt="author_profile"
                className="rounded-full size-10"
              />
              <p className="flex-1">{item.name}</p>
            </section>
            <button
              onClick={() => handleFollowClick(index)}
              className={`px-2 py-1 text-white font-bold rounded ${
                item.isFollowing ? "bg-red-600" : "bg-black"
              }`}
            >
              {item.isFollowing ? "UnFollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TopSellers;
