import { Link } from "react-router-dom";
import { categories } from "./categoryData";

const ScrollableCategories = () => {
  return (
    <section className="scrollable-section">
      <div className="video-background-container">
        <video autoPlay muted loop className="video-loop">
          <source src="/placeholder.svg" type="video/mp4" />
        </video>
        <div className="scrollable-container">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to={`/shop?category=${category.link}`}
              className="category-card flex-shrink-0"
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-32 object-cover rounded-md"
              />
              <p className="mt-2 font-medium">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollableCategories;