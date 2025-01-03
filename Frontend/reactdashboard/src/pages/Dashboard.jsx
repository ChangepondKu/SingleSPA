import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductTable from '../components/ProductTable';
import AddProductForm from '../components/AddProductForm';
import Modal from '../components/forms/Modal';
import { mockProducts } from '../data/mockProducts';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import Chart from 'chart.js/auto';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const token = Cookies.get('authToken');
  const chartRef = useRef(null); // Ref to store chart instance

  const ws = useRef(null);
  useEffect(() => {
    const websocketURL = 'ws://localhost:9321';
    ws.current = new WebSocket(websocketURL);

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.current.onmessage = (event) => {
      try {
        const websocketResponse = JSON.parse(event.data);
        if (websocketResponse?.data) {
          if (websocketResponse?.type === 'product_updated') {
            setProducts((prev) =>
              prev.map((p) => (p.id === websocketResponse?.data?.id ? websocketResponse?.data : p))
            );
            fetchSummary(); // Re-fetch summary
          } else if (websocketResponse?.type === 'product_created') {
            setProducts((prev) => [...prev, websocketResponse?.data]);
            fetchSummary(); // Re-fetch summary
          } else if (websocketResponse?.type === 'product_deleted') {
            setProducts((prev) =>
              prev ? prev.filter((product) => product.id !== websocketResponse.data.id) : []
            );
            fetchSummary(); // Re-fetch summary
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = (event) => {
      console.log('WebSocket connection closed:', event.reason || 'Unknown reason');
    };

    // Cleanup WebSocket on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/dashboard/summary', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setSummary(response.data);
    } catch (err) {
      console.error('Error fetching dashboard summary:', err);
    }
  };

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
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts(mockProducts)
      }
    };

    fetchProducts();
    fetchSummary();
  }, [token]);

  useEffect(() => {
    if (summary) {
      const ctx = document.getElementById('productTypeChart').getContext('2d');

      // Destroy the existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart
      chartRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: summary.productsByType.map((item) => item.type),
          datasets: [
            {
              label: 'Products by Type',
              data: summary.productsByType.map((item) => item.count),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
          ],
        },
      });
    }
  }, [summary]);
  console.log(products);
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // setProducts((prev) => prev.filter((product) => product.id !== productId));
      // fetchSummary(); // Re-fetch summary

      Toastify({
        text: 'Product deleted successfully',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#28a745',
      }).showToast();
    } catch (error) {
      console.error('Error deleting product:', error);

      Toastify({
        text: 'Failed to delete product',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#dc3545',
      }).showToast();
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      await axios.post(
        'http://localhost:5000/api/products',
        newProduct,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        Toastify({
          text: 'Product added successfully',
          duration: 3000,
          close: true,
          gravity: 'top',
          position: 'right',
          backgroundColor: '#28a745',
        }).showToast();

        // setProducts(prev => [...prev, response.data.product]);
      });

      // fetchSummary(); // Re-fetch summary
      setShowAddForm(false);
    } catch (error) {
      Toastify({
        text: 'Failed to add product',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#dc3545',
      })
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/update/${updatedProduct.id}`,
        updatedProduct,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // setProducts((prev) =>
      //   prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      // );
      // fetchSummary(); // Re-fetch summary
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCloseModal = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4">Dashboard</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary d-flex align-items-center"
        >
          <svg className="me-2" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4v8m4-4H4" />
          </svg>
          Add Product
        </button>
      </div>

      {summary && (
        <section className="mb-4">
          <h2 className="h4">Products Overview</h2>
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ maxWidth: '300px', margin: '0 auto' }}>
              <canvas id="productTypeChart" width="300" height="200"></canvas>
            </div>
            <div style={{ marginLeft: '20px' }}>
              <h5 className="mb-3">Product Quantities by Type</h5>
              <ul className="list-unstyled">
                {summary.productsByType.map((item) => (
                  <li key={item.type} className="mb-2">
                    <strong>{item.type}:</strong> {item.count}
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                <strong>Total Products:</strong> {summary.totalProducts}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4">Featured Products</h2>
          <Link to="/products" className="text-primary">
            View All Products
            <svg className="ms-1" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5 3l4 4-4 4" />
            </svg>
          </Link>
        </div>
        <div className="row g-3">
          {products.slice(0, 3).map((product) => (
            <div className="col-md-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="h4 mb-3">Product Management</h2>
        <ProductTable
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </section>

      <Modal
        isOpen={showAddForm || editingProduct !== null}
        onClose={handleCloseModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <AddProductForm
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          initialData={editingProduct}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
