import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import Cookies from 'js-cookie';
import axios from 'axios';


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product,setProduct] =useState( mockProducts.find(p => p.id === parseInt(id)));
  const token = Cookies.get('authToken');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/getproduct/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  
  if (!product) {
    return (
      <>
        {
          loading ? <div className="text-start py-5">Loading products...</div> :

            <div className="container mt-4">
              <div className="text-center">
                <h1 className="display-6 text-danger mb-3">Product Not Found</h1>
                <button
                  onClick={() => navigate('/products')}
                  className="btn btn-link"
                >
                  Back to Products
                </button>
              </div>
            </div>

        }
      </>
    );
  }

  return (
    <div className="container mt-4">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline-primary mb-3"
      >
        Back
      </button>

      <div className="card shadow-lg">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={product.image_url}
              alt={product.name}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h1 className="card-title h3 text-dark">{product.name}</h1>
                  <span className="badge bg-secondary mb-3">{product.type}</span>
                </div>
                <div className="text-end">
                  <h2 className="text-primary">${product.price}</h2>
                  <div className="text-muted">{product.stock} in stock</div>
                </div>
              </div>

              <h2 className="h5 mt-4">Description</h2>
              <p className="card-text text-muted">
                {product.description}
              </p>

              <div className="mt-4 d-flex gap-3">
                <button className="btn btn-primary flex-fill">
                  Add to Cart
                </button>
                <button className="btn btn-outline-secondary">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
