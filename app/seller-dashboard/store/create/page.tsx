"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NextLayout from "@/layouts/NextLayout";
import Link from "next/link";

export default function CreateStorePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
  });

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/seller-dashboard');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to create store');
      }
    } catch (error) {
      console.error('Error creating store:', error);
      alert('Failed to create store');
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
      setFormData({ ...formData, icon: reader.result as string });
    };
    reader.readAsDataURL(file);
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
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{ marginBottom: '30px' }}>
              <Link href="/seller-dashboard" style={{
                color: '#667085',
                textDecoration: 'none',
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px'
              }}>
                <i className="fas fa-arrow-left" />
                Back to Dashboard
              </Link>
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

            <form onSubmit={handleSubmit}>
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
                  {formData.icon && (
                    <img
                      src={formData.icon}
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
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                <Link
                  href="/seller-dashboard"
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
                  disabled={loading || !formData.name}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: loading || !formData.name ? '#d1d5db' : '#F58967',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    cursor: loading || !formData.name ? 'not-allowed' : 'pointer',
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

