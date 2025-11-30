"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthButtons() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          // First try to get role from Clerk metadata
          const clerkRole = user.publicMetadata?.role;
          if (clerkRole) {
            setUserRole(clerkRole);
            setIsLoading(false);
            return;
          }

          // If not in metadata, fetch from API
          const response = await fetch(`/api/users/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            if (data.role) {
              setUserRole(data.role);
              // Also update Clerk metadata for future
              if (data.role !== clerkRole) {
                try {
                  await fetch('/api/users/update-role', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ role: data.role }),
                  });
                } catch (e) {
                  // Ignore metadata update errors
                }
              }
            }
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          // On error, try to show Seller Dashboard if user signed up as seller
          // This helps even if API fails temporarily
        } finally {
          setIsLoading(false);
        }
      } else if (isLoaded) {
        setIsLoading(false);
      }
    };

    if (isLoaded) {
      fetchUserRole();
    }
  }, [isLoaded, isSignedIn, user]);

  // Check if user has signed in before (after signout)
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Check if user has signed in before (stored in localStorage)
      const hasSignedInBefore = localStorage.getItem('hasSignedInBefore');
      if (!hasSignedInBefore) {
        // First time visitor - will show Sign Up
        localStorage.setItem('hasSignedInBefore', 'false');
      }
    } else if (isLoaded && isSignedIn) {
      // User is signed in - mark that they've signed in before
      localStorage.setItem('hasSignedInBefore', 'true');
    }
  }, [isLoaded, isSignedIn]);

  // Show sign up button if not loaded yet (default for new users)
  if (!isLoaded) {
    return (
      <div className="header-button d-flex gap-2">
        <Link href="/sign-up" className="theme-btn" style={{
          padding: '10px 20px',
          fontSize: '0.9rem',
          textDecoration: 'none',
          backgroundColor: '#F58967',
          color: '#ffffff',
          borderRadius: '8px',
          transition: 'all 0.3s ease'
        }}>
          Sign Up
        </Link>
      </div>
    );
  }

  if (!isSignedIn) {
    // Check if user has signed in before
    const hasSignedInBefore = typeof window !== 'undefined' ? localStorage.getItem('hasSignedInBefore') === 'true' : false;
    
    if (hasSignedInBefore) {
      // Show Sign In for existing users who signed out
      return (
        <div className="header-button d-flex gap-2">
          <Link href="/sign-in" className="theme-btn bg-2" style={{
            padding: '10px 20px',
            fontSize: '0.9rem',
            textDecoration: 'none',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}>
            Sign In
          </Link>
        </div>
      );
    } else {
      // Show Sign Up for new users
      return (
        <div className="header-button d-flex gap-2">
          <Link href="/sign-up" className="theme-btn" style={{
            padding: '10px 20px',
            fontSize: '0.9rem',
            textDecoration: 'none',
            backgroundColor: '#F58967',
            color: '#ffffff',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}>
            Sign Up
          </Link>
          <Link href="/sign-in" className="theme-btn bg-2" style={{
            padding: '10px 20px',
            fontSize: '0.9rem',
            textDecoration: 'none',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            border: '1px solid #e5e7eb'
          }}>
            Sign In
          </Link>
        </div>
      );
    }
  }

  // Show loading state while fetching role, but still show buttons
  if (isLoading) {
    return (
      <div className="d-flex align-items-center gap-3">
        <Link href="/dashboard" className="theme-btn" style={{
          padding: '10px 20px',
          fontSize: '0.9rem',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#F58967',
          color: '#ffffff',
          borderRadius: '8px',
          transition: 'all 0.3s ease'
        }}>
          <i className="fas fa-tachometer-alt" />
          Dashboard
        </Link>
        <Link href="/store" className="theme-btn bg-2" style={{
          padding: '10px 20px',
          fontSize: '0.9rem',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          border: '1px solid #e5e7eb'
        }}>
          <i className="fas fa-store" />
          Store
        </Link>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                width: '40px',
                height: '40px'
              }
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center gap-3">
      <Link href="/dashboard" className="theme-btn" style={{
        padding: '10px 20px',
        fontSize: '0.9rem',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#F58967',
        color: '#ffffff',
        borderRadius: '8px',
        transition: 'all 0.3s ease'
      }}>
        <i className="fas fa-tachometer-alt" />
        Dashboard
      </Link>
      <Link href="/store" className="theme-btn bg-2" style={{
        padding: '10px 20px',
        fontSize: '0.9rem',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        border: '1px solid #e5e7eb'
      }}>
        <i className="fas fa-store" />
        Store
      </Link>
      <UserButton 
        afterSignOutUrl="/"
        afterSignOutCallback={() => {
          // Mark that user has signed in before (so they see Sign In after signout)
          if (typeof window !== 'undefined') {
            localStorage.setItem('hasSignedInBefore', 'true');
          }
        }}
        appearance={{
          elements: {
            avatarBox: {
              width: '40px',
              height: '40px'
            }
          }
        }}
      />
    </div>
  );
}

