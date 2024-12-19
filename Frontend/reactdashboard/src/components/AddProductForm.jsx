import React, { useState } from 'react';
import FormInput from './forms/FormInput';
import FormTextArea from './forms/FormTextArea';
import FormSelect from './forms/FormSelect';
import ImageUpload from './forms/ImageUpload';

const productTypes = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Other'];

const AddProductForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    price: '',
    stock: '',
    type: '',
    image_url: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (imageData) => {
    setFormData(prev => ({ ...prev, image_url: imageData }));
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      {/* Image Upload */}
      <div className="col-12">
        <ImageUpload
          onChange={handleImageChange}
          currentImage={formData.image_url}
        />
      </div>

      {/* Name and Type Fields */}
      <div className="col-md-6">
        <FormInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <FormSelect
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={productTypes}
          required
        />
      </div>

      {/* Description Field */}
      <div className="col-12">
        <FormTextArea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Price and Stock Fields */}
      <div className="col-md-6">
        <FormInput
          label="Price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          step="0.01"
          min="0"
        />
      </div>
      <div className="col-md-6">
        <FormInput
          label="Stock"
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
          min="0"
        />
      </div>

      {/* Submit Button */}
      <div className="col-12 text-end">
        <button
          type="submit"
          className="btn btn-primary"
        >
          {initialData ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
