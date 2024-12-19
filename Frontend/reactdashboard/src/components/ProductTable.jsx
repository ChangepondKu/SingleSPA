import React from 'react';
import 'toastify-js/src/toastify.css';


const ProductTable = ({ products, onEdit, onDelete }) => {

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="img-thumbnail"
                  style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                />
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.type}</td>
              <td>
                <button
                  onClick={() => onEdit(product)}
                  className="btn btn-outline-primary btn-sm me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
