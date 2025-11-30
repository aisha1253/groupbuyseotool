"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NextLayout from "@/layouts/NextLayout";
import Link from "next/link";

export default function ProductsPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (user) {
        try {
          const response = await fetch('/api/products');
          if (response.ok) {
            const data = await response.json();
            setProducts(data.products || []);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (isLoaded && user) {
      fetchProducts();
    }
  }, [isLoaded, user]);

  const handleDelete = async (productId: string) => {
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

  if (!isLoaded || !user) {
    return (
      <NextLayout header={2} footer={4} single>
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
    <NextLayout header={2} footer={4} single>
      <section style={{
        minHeight: '100vh',
        padding: '80px 20px',
        backgroundColor: '#f8f9fa'
      }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div>
                <Link href="/seller-dashboard" style={{
                  color: '#667085',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '15px'
                }}>
                  <i className="fas fa-arrow-left" />
                  Back to Dashboard
                </Link>
                <h1 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#101828',
                  marginBottom: '5px'
                }}>
                  My Products
                </h1>
                <p style={{ color: '#667085', fontSize: '1rem', margin: 0 }}>
                  Manage your digital tools and products
                </p>
              </div>
              <Link
                href="/seller-dashboard/products/new"
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
                Add New Product
              </Link>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #F58967',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 20px'
                }}></div>
                <p style={{ color: '#667085' }}>Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px'
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
                  href="/seller-dashboard/products/new"
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
                          <span style={{
                            padding: '4px 12px',
                            backgroundColor: '#f0fdf4',
                            color: '#10b981',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            fontWeight: '500'
                          }}>
                            {product.category?.name || 'Uncategorized'}
                          </span>
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '10px'
                        }}>
                          <Link
                            href={`/seller-dashboard/products/${product.id}/edit`}
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
                            onClick={() => handleDelete(product.id)}
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

            <style jsx>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </section>
    </NextLayout>
  );
}



