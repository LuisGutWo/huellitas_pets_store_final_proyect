import { Button } from "react-bootstrap";

const ButtonList = ({ categories, filterCategory }) => {
  return (
    <div>
      <div className="products-section-title">
        <h1 className="mt-4 mb-0">Nuestros productos</h1>
        <p>Explora esta perfecta selección</p>
      </div>

      <div className="categories">
        {categories.map(category => (
          <Button
            type="button"
            className="btn-category"
            onClick={() => filterCategory(category)}
            key={category}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ButtonList;
