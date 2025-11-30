"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NextLayout from "@/layouts/NextLayout";
import Link from "next/link";

export default function StorePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [showCreateStore, setShowCreateStore] = useState(false);
  const [storeFormData, setStoreFormData] = useState({
    name: '',
    description: '',
    icon: '',
  });
  const [creatingStore, setCreatingStore] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  // Fetch store and products
  useEffect(() => {
    const fetchStoreData = async () => {
      if (user) {
        try {
          // Fetch user's store
          const storeResponse = await fetch('/api/stores');
          if (storeResponse.ok) {
            const storeData = await storeResponse.json();
            setStore(storeData.store || null);
            
            // If store exists, fetch products
            if (storeData.store) {
              const productsResponse = await fetch('/api/products');
              if (productsResponse.ok) {
                const productsData = await productsResponse.json();
                // Filter products for this store
                const myProducts = (productsData.products || []).filter(
                  (p: any) => p.storeId === storeData.store.id
                );
                setProducts(myProducts);
              }
            }
          }
        } catch (error) {
          console.error('Error fetching store data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (isLoaded && user) {
      fetchStoreData();
    }
  }, [isLoaded, user]);

  // Fetch categories for product creation
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
      }
    };

    if (store) {
      fetchCategories();
    }
  }, [store]);

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingStore(true);

    try {
      const response = await fetch('/api/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeFormData),
      });

      if (response.ok) {
        const data = await response.json();
        setStore(data.store);
        setShowCreateStore(false);
        setStoreFormData({ name: '', description: '', icon: '' });
        // Refresh the page to load products
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to create store');
      }
    } catch (error) {
      console.error('Error creating store:', error);
      alert('Failed to create store');
    } finally {
      setCreatingStore(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setStoreFormData({ ...storeFormData, icon: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== productId));
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  if (!isLoaded || !user || loading) {
    return (
      <NextLayout header={2}>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #F58967',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </NextLayout>
    );
  }

  // Show create store form if no store exists
  if (!store && !showCreateStore) {
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
              padding: '60px 40px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#FFF4F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 30px'
              }}>
                <i className="fas fa-store" style={{ fontSize: '48px', color: '#F58967' }} />
              </div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#101828',
                marginBottom: '15px'
              }}>
                Create Your Store
              </h1>
              <p style={{
                fontSize: '1rem',
                color: '#667085',
                marginBottom: '30px',
                lineHeight: '1.6'
              }}>
                Start selling digital tools by creating your store. Add products and reach thousands of buyers.
              </p>
              <button
                onClick={() => setShowCreateStore(true)}
                style={{
                  padding: '14px 32px',
                  backgroundColor: '#F58967',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e67756';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F58967';
                }}
              >
                <i className="fas fa-plus me-2" />
                Create Store
              </button>
            </div>
          </div>
        </section>
      </NextLayout>
    );
  }

  // Show create store form
  if (!store && showCreateStore) {
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
                <button
                  onClick={() => setShowCreateStore(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#667085',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '20px',
                    padding: 0
                  }}
                >
                  <i className="fas fa-arrow-left" />
                  Back
                </button>
                <h1 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#101828',
                  marginBottom: '10px'
                }}>
                  Create Your Store
                </h1>
                <p style={{ color: '#667085', fontSize: '1rem' }}>
                  Set up your store to start selling digital tools
                </p>
              </div>

              <form onSubmit={handleCreateStore}>
                {/* Store Image */}
                <div style={{ marginBottom: '30px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    color: '#101828',
                    marginBottom: '10px'
                  }}>
                    Store Image
                  </label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                  }}>
                    {storeFormData.icon && (
                      <img
                        src={storeFormData.icon}
                        alt="Store preview"
                        style={{
                          width: '100px',
                          height: '100px',
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
                        id="icon-upload"
                      />
                      <label
                        htmlFor="icon-upload"
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
                        Upload Image
                      </label>
                    </div>
                  </div>
                </div>

                {/* Store Name */}
                <div style={{ marginBottom: '25px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    color: '#101828',
                    marginBottom: '10px'
                  }}>
                    Store Name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={storeFormData.name}
                    onChange={(e) => setStoreFormData({ ...storeFormData, name: e.target.value })}
                    placeholder="Enter store name"
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

                {/* Store Description */}
                <div style={{ marginBottom: '30px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    color: '#101828',
                    marginBottom: '10px'
                  }}>
                    Store Description
                  </label>
                  <textarea
                    value={storeFormData.description}
                    onChange={(e) => setStoreFormData({ ...storeFormData, description: e.target.value })}
                    placeholder="Describe your store..."
                    rows={5}
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
                  <button
                    type="button"
                    onClick={() => setShowCreateStore(false)}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#f3f4f6',
                      color: '#101828',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      cursor: 'pointer',
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
                  </button>
                  <button
                    type="submit"
                    disabled={creatingStore || !storeFormData.name}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: creatingStore || !storeFormData.name ? '#d1d5db' : '#F58967',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      cursor: creatingStore || !storeFormData.name ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {creatingStore ? (
                      <>
                        <i className="fas fa-spinner fa-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check" />
                        Create Store
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

  // Show store with products
  return (
    <NextLayout header={2}>
      <section style={{
        minHeight: '100vh',
        padding: '80px 20px',
        backgroundColor: '#f8f9fa'
      }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          {/* Store Header */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            padding: '30px 40px',
            marginBottom: '30px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
          }}>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {store.icon && (
                  <img
                    src={store.icon}
                    alt={store.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '12px',
                      objectFit: 'cover'
                    }}
                  />
                )}
                <div>
                  <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#101828',
                    marginBottom: '5px'
                  }}>
                    {store.name}
                  </h1>
                  {store.description && (
                    <p style={{
                      fontSize: '1rem',
                      color: '#667085',
                      margin: '0'
                    }}>
                      {store.description}
                    </p>
                  )}
                </div>
              </div>
              <Link
                href="/store/products/new"
                className="theme-btn"
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#F58967',
                  color: '#ffffff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}
              >
                <i className="fas fa-plus" />
                Add Product
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '15px',
              padding: '60px 40px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <i className="fas fa-box" style={{
                fontSize: '64px',
                color: '#d1d5db',
                marginBottom: '20px'
              }}></i>
              <h3 style={{ color: '#101828', marginBottom: '10px' }}>
                No Products Yet
              </h3>
              <p style={{ color: '#667085', marginBottom: '25px' }}>
                Start selling by adding your first product
              </p>
              <Link
                href="/store/products/new"
                className="theme-btn"
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#F58967',
                  color: '#ffffff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className="fas fa-plus" />
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              {products.map((product) => (
                <div key={product.id} className="col-md-6 col-lg-4">
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#F58967';
                    e.currentTarget.style.boxShadow = '0 5px 20px rgba(245, 137, 103, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{
                      width: '100%',
                      height: '200px',
                      overflow: 'hidden',
                      backgroundColor: '#f3f4f6'
                    }}>
                      <img
                        src={product.image || '/placeholder-product.png'}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        color: '#101828',
                        marginBottom: '10px'
                      }}>
                        {product.name}
                      </h3>
                      <p style={{
                        color: '#667085',
                        fontSize: '0.9rem',
                        marginBottom: '15px',
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {product.description}
                      </p>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '15px'
                      }}>
                        <div>
                          <span style={{
                            fontSize: '1.3rem',
                            fontWeight: '700',
                            color: '#F58967'
                          }}>
                            ${product.price}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span style={{
                              fontSize: '0.9rem',
                              color: '#667085',
                              textDecoration: 'line-through',
                              marginLeft: '8px'
                            }}>
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '10px'
                      }}>
                        <Link
                          href={`/store/products/${product.id}/edit`}
                          style={{
                            flex: 1,
                            padding: '10px',
                            backgroundColor: '#f3f4f6',
                            color: '#101828',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            textAlign: 'center',
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
                          <i className="fas fa-edit me-2" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          style={{
                            padding: '10px',
                            backgroundColor: '#fef2f2',
                            color: '#ef4444',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#fee2e2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#fef2f2';
                          }}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </NextLayout>
  );
}

