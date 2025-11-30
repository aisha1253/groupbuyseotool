"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NextLayout from "@/layouts/NextLayout";
import Link from "next/link";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          let response = await fetch(`/api/users/${user.id}`);
          
          if (response.status === 404) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            response = await fetch(`/api/users/${user.id}`);
          }
          
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (isLoaded && user) {
      fetchUserData();
    }
  }, [isLoaded, user]);

  if (!isLoaded || !user || loading) {
    return (
      <NextLayout header={2} footer={4} single>
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

  return (
    <NextLayout header={2} footer={4} single>
      <section style={{
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
                  Dashboard
                </h1>
                <p style={{ 
                  fontSize: '1rem', 
                  color: '#667085',
                  margin: '0'
                }}>
                  Welcome back, {user.firstName || user.emailAddresses[0]?.emailAddress}!
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <Link href="/store" style={{ textDecoration: 'none' }}>
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '30px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
                }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#FFF4F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <i className="fas fa-store" style={{ fontSize: '28px', color: '#F58967' }} />
                  </div>
                  <h3 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: '600', 
                    color: '#101828',
                    marginBottom: '10px'
                  }}>
                    Manage Store
                  </h3>
                  <p style={{ 
                    fontSize: '0.95rem', 
                    color: '#667085',
                    margin: '0'
                  }}>
                    Create your store and start selling products
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link href="/store" style={{ textDecoration: 'none' }}>
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '30px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
                }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <i className="fas fa-box" style={{ fontSize: '28px', color: '#0EA5E9' }} />
                  </div>
                  <h3 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: '600', 
                    color: '#101828',
                    marginBottom: '10px'
                  }}>
                    My Products
                  </h3>
                  <p style={{ 
                    fontSize: '0.95rem', 
                    color: '#667085',
                    margin: '0'
                  }}>
                    Add and manage your products
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                height: '100%'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#F0FDF4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <i className="fas fa-shopping-cart" style={{ fontSize: '28px', color: '#10B981' }} />
                </div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '600', 
                  color: '#101828',
                  marginBottom: '10px'
                }}>
                  Orders
                </h3>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: '#667085',
                  margin: '0'
                }}>
                  View your orders and sales
                </p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            padding: '30px 40px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              color: '#101828',
              marginBottom: '20px'
            }}>
              Account Information
            </h2>
            <div className="row g-4">
              <div className="col-md-6">
                <div>
                  <label style={{
                    fontSize: '0.9rem',
                    color: '#667085',
                    fontWeight: '500',
                    marginBottom: '5px',
                    display: 'block'
                  }}>
                    Email
                  </label>
                  <p style={{
                    fontSize: '1rem',
                    color: '#101828',
                    margin: '0'
                  }}>
                    {user.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label style={{
                    fontSize: '0.9rem',
                    color: '#667085',
                    fontWeight: '500',
                    marginBottom: '5px',
                    display: 'block'
                  }}>
                    Name
                  </label>
                  <p style={{
                    fontSize: '1rem',
                    color: '#101828',
                    margin: '0'
                  }}>
                    {user.firstName || 'Not set'} {user.lastName || ''}
                  </p>
                </div>
              </div>
              {userData && (
                <div className="col-md-6">
                  <div>
                    <label style={{
                      fontSize: '0.9rem',
                      color: '#667085',
                      fontWeight: '500',
                      marginBottom: '5px',
                      display: 'block'
                    }}>
                      Account Type
                    </label>
                    <p style={{
                      fontSize: '1rem',
                      color: '#101828',
                      margin: '0'
                    }}>
                      {userData.role || 'BUYER'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </NextLayout>
  );
}

