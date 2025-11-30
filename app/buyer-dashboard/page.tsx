"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NextLayout from "@/layouts/NextLayout";
import Link from "next/link";

export default function BuyerDashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  // Fetch user data from database
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          let response = await fetch(`/api/users/${user.id}`);
          
          // If user doesn't exist in database yet, create them
          if (response.status === 404) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            response = await fetch(`/api/users/${user.id}`);
          }
          
          if (response.ok) {
            const data = await response.json();
            
            // Check if coming from buyer signup or role needs to be set
            const urlParams = new URLSearchParams(window.location.search);
            const isNewSignup = urlParams.get('newSignup') === 'true';
            const roleParam = urlParams.get('role');
            
            // If user is not a buyer, update their role (especially if new signup or role param is BUYER)
            // Only update if user is not already a seller
            if (data.role !== 'BUYER' && data.role !== 'SELLER' && (roleParam === 'BUYER' || isNewSignup)) {
              console.log('Updating user role to BUYER', { currentRole: data.role, roleParam, isNewSignup });
              const updateResponse = await fetch('/api/users/update-role', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: 'BUYER' }),
              });
              
              if (updateResponse.ok) {
                const updatedData = await updateResponse.json();
                setUserData(updatedData);
                console.log('Role updated to BUYER successfully', updatedData);
                // Remove query params after role is set
                if (isNewSignup || roleParam) {
                  window.history.replaceState({}, '', '/buyer-dashboard');
                }
                // Small delay to let Clerk metadata update, then reload to update header
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              } else {
                console.error('Failed to update role to BUYER', await updateResponse.text());
                setUserData(data);
              }
            } else if (data.role === 'SELLER') {
              // If user is a seller, redirect to seller dashboard
              console.log('User is a SELLER, redirecting to seller dashboard');
              router.push('/seller-dashboard');
            } else {
              setUserData(data);
              // Remove query params if exists
              if (isNewSignup || roleParam) {
                window.history.replaceState({}, '', '/buyer-dashboard');
              }
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
      <section className="buyer-dashboard-section" style={{
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
                  Buyer Dashboard
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
                  backgroundColor: '#E0F2FE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px'
                }}>
                  <i className="fas fa-shopping-bag" style={{ fontSize: '24px', color: '#0EA5E9' }} />
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
                  backgroundColor: '#FEF3C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px'
                }}>
                  <i className="fas fa-heart" style={{ fontSize: '24px', color: '#F59E0B' }} />
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
                  Wishlist Items
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
                  <i className="fas fa-star" style={{ fontSize: '24px', color: '#10B981' }} />
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
                  Reviews Given
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
                  backgroundColor: '#FFF4F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px'
                }}>
                  <i className="fas fa-shopping-cart" style={{ fontSize: '24px', color: '#F58967' }} />
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
                  Cart Items
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
                  <Link href="/" className="theme-btn" style={{
                    padding: '15px',
                    backgroundColor: '#F58967',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease'
                  }}>
                    <i className="fas fa-search me-2" />
                    Browse Products
                  </Link>
                  <Link href="/buyer-dashboard/orders" className="theme-btn" style={{
                    padding: '15px',
                    backgroundColor: '#f3f4f6',
                    color: '#101828',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease'
                  }}>
                    <i className="fas fa-list me-2" />
                    View Orders
                  </Link>
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
                  Account Status
                </h3>
                <div>
                  <p style={{ color: '#667085', marginBottom: '10px' }}>
                    <strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}
                  </p>
                  <p style={{ color: '#10B981', fontWeight: '500' }}>
                    <i className="fas fa-check-circle me-2" />
                    Account is active
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </NextLayout>
  );
}

