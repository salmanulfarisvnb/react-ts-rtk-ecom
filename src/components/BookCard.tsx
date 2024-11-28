import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
  return (
    <div className="p-2 border shadow-sm">
      <Link to={`product/${id}`}>
        <img src={image} alt="" />
        <h2 className="font-bold">{title}</h2>
        <p>{price}</p>
      </Link>
    </div>
  );
};

export default BookCard;
