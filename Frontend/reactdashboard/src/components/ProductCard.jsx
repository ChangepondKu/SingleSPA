import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="col">
      <Link to={`/products/${product.id}`} className="text-decoration-none">
        <div className="card h-100 product-card">
          <img
            src={product.image_url}
            className="card-img-top product-image"
            alt={product.name}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-truncate">
              {product.name.length > 50
                ? `${product.name.slice(0, 47)}...`
                : product.name}
            </h5>
            <p className="card-text text-muted text-truncate">
              {product.description.length > 100
                ? `${product.description.slice(0, 97)}...`
                : product.description}
            </p>
            <div className="mt-auto">
              <div className="d-flex justify-content-between align-items-center">
                <span className="h5 mb-0">${product.price}</span>
                <span className="badge bg-secondary">Stock: {product.stock}</span>
              </div>
              <span className="badge bg-primary mt-2">{product.type}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
