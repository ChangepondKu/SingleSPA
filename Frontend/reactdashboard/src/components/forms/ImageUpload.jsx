import React, { useState } from 'react';

const ImageUpload = ({ onChange, currentImage }) => {
  const [preview, setPreview] = useState(currentImage || '');
  const [imageUrl, setImageUrl] = useState(currentImage || '');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImageUrl(''); // Clear URL field if a file is selected
        if (onChange) {
          onChange(reader.result);
        }
      };
      reader.onerror = () => {
        console.error('Error reading file');
        setPreview('');
      };
      reader.readAsDataURL(file);
    } else {
      console.warn('No file selected');
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url) {
      setPreview(url);
      if (onChange) {
        onChange(url);
      }
    } else {
      setPreview('');
    }
  };

  return (
    <div className="mb-4">
      <label className="form-label">Product Image</label>
      <div className="d-flex flex-column align-items-center w-100">
        {/* Preview Section */}
        {preview && (
          <div className="mb-3">
            <img
              src={preview}
              alt="Preview"
              className="img-fluid rounded"
              style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* File Upload Input */}
        <label className="w-100 d-flex flex-column align-items-center p-4 bg-light border border-dashed border-secondary rounded cursor-pointer text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="32"
            height="32"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-muted">Click to upload or drag and drop</span>
          <input
            type="file"
            className="d-none"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        {/* URL Input Field */}
        <div className="mt-3 w-100">
          <label htmlFor="imageUrl" className="form-label">
            Or paste an image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            className="form-control"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={handleUrlChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
