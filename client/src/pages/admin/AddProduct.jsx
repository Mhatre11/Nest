import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Label, TextInput, Select, Textarea, FileInput, Button, Card } from 'flowbite-react';
import { HiPlus, HiArrowLeft, HiPhotograph, HiCurrencyDollar, HiInformationCircle, HiX } from 'react-icons/hi';
import api from '../../config/axios';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    stock: '',
    description: '',
    image: null
  });

  const categories = [
    'Vegetables & Fruits',
    'Dairy & Breakfast',
    'Beverages',
    'Snacks & Munchies',
    'Tea & Coffee'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.name || !formData.category || !formData.price || !formData.quantity || !formData.stock || !formData.description || !formData.image) {
      toast.error('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('description', formData.description);
      
      // Append image if exists
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await api.post('/api/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' // Override for this specific request
        }
      });
      
      if (response.data) {
        toast.success('Product added successfully!');
        navigate('/admin/products');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add product';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                color="gray"
                pill
                size="sm"
                onClick={() => navigate('/admin/products')}
                className="mr-4"
              >
                <HiArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Add New Product</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image Upload */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="flex items-center text-lg font-medium text-gray-900 mb-2">
                    <HiPhotograph className="mr-2 h-5 w-5 text-purple-500" />
                    Product Image
                  </h3>
                  <p className="text-sm text-gray-500">
                    Upload a high-quality product image. Recommended size: 800x800px
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    {previewImage ? (
                      <div className="relative w-full h-full">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                        <button
                          onClick={() => {
                            setPreviewImage(null);
                            setFormData({ ...formData, image: null });
                          }}
                          className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all"
                        >
                          <HiX className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <HiPhotograph className="h-20 w-20 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <FileInput
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    required
                    accept="image/*"
                    helperText="PNG, JPG up to 5MB"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:col-span-2">
            <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <div className="p-4">
                  <div className="mb-6">
                    <h3 className="flex items-center text-lg font-medium text-gray-900 mb-4">
                      <HiInformationCircle className="mr-2 h-5 w-5 text-purple-500" />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="name" value="Product Name" />
                        </div>
                        <TextInput
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter product name"
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="category" value="Category" />
                        </div>
                        <Select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="flex items-center text-lg font-medium text-gray-900 mb-4">
                      <HiCurrencyDollar className="mr-2 h-5 w-5 text-purple-500" />
                      Pricing & Inventory
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="price" value="Price (₹)" />
                        </div>
                        <TextInput
                          id="price"
                          name="price"
                          type="number"
                          value={formData.price}
                          onChange={handleChange}
                          required
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          icon={HiCurrencyDollar}
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="quantity" value="Unit Size" />
                        </div>
                        <TextInput
                          id="quantity"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                          placeholder="e.g., 1 kg, 500 ml"
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="stock" value="Stock Quantity" />
                        </div>
                        <TextInput
                          id="stock"
                          name="stock"
                          type="number"
                          value={formData.stock}
                          onChange={handleChange}
                          required
                          min="0"
                          placeholder="Available units"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="description" value="Product Description" />
                    </div>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Enter a detailed description of the product..."
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
            </form>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Button
              color="gray"
              onClick={() => navigate('/admin/products')}
            >
              Cancel
            </Button>
            <div className="flex gap-3">
              <Button
                color="light"
                onClick={() => {
                  setFormData({
                    name: '',
                    category: '',
                    price: '',
                    quantity: '',
                    stock: '',
                    description: '',
                    image: null
                  });
                  setPreviewImage(null);
                }}
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                form="product-form"
                gradientDuoTone="purpleToBlue"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                    Adding Product...
                  </>
                ) : (
                  <>
                    <HiPlus className="mr-2 h-5 w-5" />
                    Add Product
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
