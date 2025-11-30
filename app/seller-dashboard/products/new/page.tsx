"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NextLayout from "@/layouts/NextLayout";
import Link from "next/link";

export default function AddProductPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    originalPrice: '',
    categoryId: '',
  });

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.categoryId) {
      alert('Please select a category');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        }),
      });

      if (response.ok) {
        router.push('/seller-dashboard/products');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64 for now (you can use uploadthing later)
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  if (!isLoaded || !user) {
    return (
      <NextLayout header={2}>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div>Loading...</div>
        </div>
      </NextLayout>
    );
  }

  return (
    <NextLayout header={2}>
      <section style={{
        minHeight: '100vh',
        padding: '80px 20px',
        backgroundColor: '#f8f9fa'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{ marginBottom: '30px' }}>
              <Link href="/seller-dashboard/products" style={{
                color: '#667085',
                textDecoration: 'none',
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px'
              }}>
                <i className="fas fa-arrow-left" />
                Back to Products
              </Link>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#101828',
                marginBottom: '10px'
              }}>
                Add New Product
              </h1>
              <p style={{ color: '#667085', fontSize: '1rem' }}>
                Add a new digital tool to your store
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Product Image */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: '#101828',
                  marginBottom: '10px'
                }}>
                  Product Image <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px'
                }}>
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Product preview"
                      style={{
                        width: '150px',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        border: '2px solid #e5e7eb'
                      }}
                    />
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      id="image-upload"
                      required
                    />
                    <label
                      htmlFor="image-upload"
                      style={{
                        display: 'inline-block',
                        padding: '12px 24px',
                        backgroundColor: '#f3f4f6',
                        color: '#101828',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e5e7eb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
                    >
                      <i className="fas fa-upload me-2" />
                      {formData.image ? 'Change Image' : 'Upload Image'}
                    </label>
                  </div>
                </div>
              </div>

              {/* Product Name */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: '#101828',
                  marginBottom: '10px'
                }}>
                  Product Name <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    color: '#000000',
                    backgroundColor: '#ffffff'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#F58967';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                />
              </div>

              {/* Category */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: '#101828',
                  marginBottom: '10px'
                }}>
                  Category <span style={{ color: '#EF4444' }}>*</span>
                </label>
                {loadingCategories ? (
                  <p>Loading categories...</p>
                ) : (
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backgroundColor: '#ffffff',
                      color: '#000000'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#F58967';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                    }}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Price */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: '#101828',
                  marginBottom: '10px'
                }}>
                  Price ($) <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    color: '#000000',
                    backgroundColor: '#ffffff'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#F58967';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                />
              </div>

              {/* Original Price */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: '#101828',
                  marginBottom: '10px'
                }}>
                  Original Price ($) <span style={{ color: '#667085', fontSize: '0.85rem' }}>(Optional)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    color: '#000000',
                    backgroundColor: '#ffffff'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#F58967';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: '#101828',
                  marginBottom: '10px'
                }}>
                  Description <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your product..."
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                    color: '#000000',
                    backgroundColor: '#ffffff'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#F58967';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'flex-end'
              }}>
                <Link
                  href="/seller-dashboard/products"
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#f3f4f6',
                    color: '#101828',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    display: 'inline-flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: loading ? '#d1d5db' : '#F58967',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check" />
                      Create Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </NextLayout>
  );
}



