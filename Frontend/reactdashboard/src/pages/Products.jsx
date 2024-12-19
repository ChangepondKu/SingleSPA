import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import Cookies from 'js-cookie';
import { mockProducts } from '../data/mockProducts';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get('authToken');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/getproduct', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
        setProducts(mockProducts)
      }
    };

    fetchProducts();
  }, [token]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const handleFilterType = (e) => {
    setFilterType(e.target.value);
  };

  const handleSortOption = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    let updatedProducts = [...products];

    // Search filter
    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    // Type filter
    if (filterType) {
      updatedProducts = updatedProducts.filter(
        (product) => product.type === filterType
      );
    }

    // Sorting
    if (sortOption === 'price-asc') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
      updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, filterType, sortOption, products]);

  if (loading) {
    return <div className="text-center py-5">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">{error}</div>;
  }

  return (
    <div>
      {/* Page Header */}
      <div className="bg-light py-4 mb-4">
        <div className="container">
          <h1 className="display-4">All Products</h1>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mb-4">
        <div className="row gy-3 align-items-center">
          <div className="col-md-4">
            <input
              type="search"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-4">
            <select className="form-select" value={filterType} onChange={handleFilterType}>
              <option value="">Filter by type</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
          </div>
          <div className="col-md-4">
            <select className="form-select" value={sortOption} onChange={handleSortOption}>
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container">
        <div className="row g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col-12 col-md-6 col-lg-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="text-center py-5">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;