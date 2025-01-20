import CategoryCard from "./CategoryCard";
import { categories } from "./categoryData";

const CategoriesSection = () => {
  return (
    <section className="categories-section">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Categories</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard 
              key={category.name}
              {...category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;