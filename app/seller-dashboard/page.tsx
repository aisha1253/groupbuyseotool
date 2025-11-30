"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NextLayout from "@/layouts/NextLayout";
import Link from "next/link";

export default function SellerDashboardPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  // Fetch user data from database and set role if needed
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          let response = await fetch(`/api/users/${user.id}`);
          
          // If user doesn't exist in database yet, create them
          if (response.status === 404) {
            // Wait a bit for webhook to process
            await new Promise(resolve => setTimeout(resolve, 1000));
            response = await fetch(`/api/users/${user.id}`);
          }
          
          if (response.ok) {
            const data = await response.json();
            
            // Check if coming from seller signup or role needs to be set
            const urlParams = new URLSearchParams(window.location.search);
            const isNewSignup = urlParams.get('newSignup') === 'true';
            const roleParam = urlParams.get('role');
            
            console.log('Seller Dashboard - User data:', { role: data.role, isNewSignup, roleParam });
            
            // If user is not a seller, update their role (especially if new signup or role param is SELLER)
            // IMPORTANT: Check roleParam/isNewSignup FIRST before redirecting
            if (data.role !== 'SELLER' && (roleParam === 'SELLER' || isNewSignup)) {
              console.log('Updating user role to SELLER', { currentRole: data.role, roleParam, isNewSignup });
              const updateResponse = await fetch('/api/users/update-role', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: 'SELLER' }),
              });
              
              if (updateResponse.ok) {
                const updatedData = await updateResponse.json();
                setUserData(updatedData);
                console.log('Role updated to SELLER successfully', updatedData);
                
                // Verify role was updated
                if (updatedData.role === 'SELLER') {
                  // Remove query params after role is set
                  if (isNewSignup || roleParam) {
                    window.history.replaceState({}, '', '/seller-dashboard');
                  }
                  // Small delay to let Clerk metadata update, then reload to update header
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                  return; // Don't continue after role update
                } else {
                  console.error('Role update failed - still not SELLER', updatedData);
                  setUserData(updatedData);
                }
              } else {
                console.error('Failed to update role to SELLER', await updateResponse.text());
                setUserData(data);
              }
            } 
            
            // Only redirect to buyer dashboard if:
            // 1. User is BUYER
            // 2. NOT coming from seller signup (no isNewSignup and roleParam !== 'SELLER')
            // 3. User is already in database with BUYER role (not updating)
            // 4. We're on seller dashboard page (not updating role)
            // IMPORTANT: Don't redirect if we're on seller dashboard page and role might be updating
            if (data.role === 'BUYER' && !isNewSignup && roleParam !== 'SELLER' && !roleParam && window.location.pathname === '/seller-dashboard') {
              // Double check - fetch fresh data to make sure role hasn't been updated
              const verifyResponse = await fetch(`/api/users/${user.id}`);
              if (verifyResponse.ok) {
                const verifyData = await verifyResponse.json();
                if (verifyData.role === 'SELLER') {
                  console.log('Role is SELLER after verification, showing seller dashboard');
                  setUserData(verifyData);
                  return;
                } else if (verifyData.role === 'BUYER') {
                  console.log('User is confirmed BUYER, redirecting to buyer dashboard');
                  router.push('/buyer-dashboard');
                  return;
                }
              }
            }
            
            // User is already a seller or role update is in progress
            if (data.role === 'SELLER') {
              console.log('User is a SELLER, showing seller dashboard');
            } else if (data.role === 'BUYER' && (isNewSignup || roleParam === 'SELLER')) {
              console.log('User is BUYER but coming from seller signup, waiting for role update...');
              // Don't redirect, let role update happen
            } else if (data.role === 'BUYER' && window.location.pathname === '/seller-dashboard') {
              // If user is BUYER and on seller dashboard, but no signup params, show seller dashboard anyway
              // (might be a case where user wants to switch to seller)
              console.log('User is BUYER on seller dashboard, showing seller dashboard (can switch role later)');
            }
            
            setUserData(data);
            // Remove query params if exists
            if (isNewSignup || roleParam) {
              window.history.replaceState({}, '', '/seller-dashboard');
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user, router]);

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
      <section className="seller-dashboard-section" style={{
        minHeight: '100vh',
        padding: '80px 20px',
        backgroundColor: '#f8f9fa'
      }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          {/* Dashboard Header */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            padding: '30px 40px',
            marginBottom: '30px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
          }}>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h1 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  color: '#101828',
                  marginBottom: '10px'
                }}>
                  Seller Dashboard
                </h1>
                <p style={{ 
                  fontSize: '1rem', 
                  color: '#667085',
                  margin: '0'
                }}>
                  Welcome back, {user.firstName || user.emailAddresses[0]?.emailAddress}!
                </p>
              </div>
              <div style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center'
              }}>
                <button
                  onClick={() => router.push('/seller-dashboard/store')}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#F58967',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
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
                  <i className="fas fa-store me-2" />
                  Manage Store
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="row g-4 mb-4">
            <div className="col-md-3 col-sm-6">
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '25px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#FFF4F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px'
                }}>
                  <i className="fas fa-box" style={{ fontSize: '24px', color: '#F58967' }} />
                </div>
                <h3 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  color: '#101828',
                  marginBottom: '5px'
                }}>
                  0
                </h3>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#667085',
                  margin: '0'
                }}>
                  Total Products
                </p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '25px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#E0F2FE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px'
                }}>
                  <i className="fas fa-shopping-cart" style={{ fontSize: '24px', color: '#0EA5E9' }} />
                </div>
                <h3 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  color: '#101828',
                  marginBottom: '5px'
                }}>
                  0
                </h3>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#667085',
                  margin: '0'
                }}>
                  Total Orders
                </p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '25px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#F0FDF4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px'
                }}>
                  <i className="fas fa-dollar-sign" style={{ fontSize: '24px', color: '#10B981' }} />
                </div>
                <h3 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  color: '#101828',
                  marginBottom: '5px'
                }}>
                  $0
                </h3>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#667085',
                  margin: '0'
                }}>
                  Total Revenue
                </p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '25px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#FEF3C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px'
                }}>
                  <i className="fas fa-star" style={{ fontSize: '24px', color: '#F59E0B' }} />
                </div>
                <h3 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  color: '#101828',
                  marginBottom: '5px'
                }}>
                  0.0
                </h3>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#667085',
                  margin: '0'
                }}>
                  Average Rating
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="row g-4">
            <div className="col-md-6">
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                height: '100%'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '600', 
                  color: '#101828',
                  marginBottom: '20px'
                }}>
                  Quick Actions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button
                    onClick={() => router.push('/seller-dashboard/products/new')}
                    style={{
                      width: '100%',
                      padding: '15px',
                      backgroundColor: '#F58967',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textAlign: 'left',
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
                    Add New Product
                  </button>
                  <button
                    onClick={() => router.push('/seller-dashboard/products')}
                    style={{
                      width: '100%',
                      padding: '15px',
                      backgroundColor: '#f3f4f6',
                      color: '#101828',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e5e7eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }}
                  >
                    <i className="fas fa-box me-2" />
                    View Products
                  </button>
                  <button
                    onClick={() => router.push('/seller-dashboard/plans/new')}
                    style={{
                      width: '100%',
                      padding: '15px',
                      backgroundColor: '#0EA5E9',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0c94d6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#0EA5E9';
                    }}
                  >
                    <i className="fas fa-plus me-2" />
                    Add New Plan
                  </button>
                  <button
                    onClick={() => router.push('/seller-dashboard/plans')}
                    style={{
                      width: '100%',
                      padding: '15px',
                      backgroundColor: '#f3f4f6',
                      color: '#101828',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e5e7eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }}
                  >
                    <i className="fas fa-list me-2" />
                    View Plans
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                height: '100%'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '600', 
                  color: '#101828',
                  marginBottom: '20px'
                }}>
                  Store Status
                </h3>
                {userData?.store ? (
                  <div>
                    <p style={{ color: '#000000', marginBottom: '10px' }}>
                      <strong style={{ color: '#000000' }}>Store Name:</strong> <span style={{ color: '#000000' }}>{userData.store.name}</span>
                    </p>
                    {userData.store.description && (
                      <p style={{ color: '#000000', marginBottom: '15px' }}>
                        <strong style={{ color: '#000000' }}>Description:</strong> <span style={{ color: '#000000' }}>{userData.store.description}</span>
                      </p>
                    )}
                    <p style={{ color: '#10B981', fontWeight: '500', marginBottom: '20px' }}>
                      <i className="fas fa-check-circle me-2" />
                      Store is active
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => router.push(`/seller-dashboard/store/edit`)}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#0EA5E9',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#0c94d6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#0EA5E9';
                        }}
                      >
                        <i className="fas fa-edit" />
                        Edit Store
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete your store? This will also delete all products and plans.')) {
                            try {
                              const response = await fetch('/api/stores', {
                                method: 'DELETE',
                              });
                              if (response.ok) {
                                alert('Store deleted successfully');
                                window.location.reload();
                              } else {
                                const data = await response.json();
                                alert(data.error || 'Failed to delete store');
                              }
                            } catch (error) {
                              console.error('Error deleting store:', error);
                              alert('Failed to delete store');
                            }
                          }
                        }}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#EF4444',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#dc2626';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#EF4444';
                        }}
                      >
                        <i className="fas fa-trash" />
                        Delete Store
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p style={{ color: '#667085', marginBottom: '15px' }}>
                      You haven't created a store yet. Create one to start selling!
                    </p>
                    <button
                      onClick={() => router.push('/seller-dashboard/store/create')}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#F58967',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      Create Store
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </NextLayout>
  );
}

