import { Link } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  link: string;
  image: string;
}

const CategoryCard = ({ name, link, image }: CategoryCardProps) => {
  return (
    <Link 
      to={`/shop?category=${link}`}
      className="transform transition-transform hover:scale-105"
    >
      <div className="category-card">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;