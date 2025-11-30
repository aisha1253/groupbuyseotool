"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardRedirectPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Mark that user has signed in before (so they see Sign In after signout)
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSignedInBefore', 'true');
    }
  }, []);

  useEffect(() => {
    const redirectUser = async () => {
      if (!isLoaded || !user) {
        return;
      }

      try {
        // Fetch user role from database with retry
        let response = await fetch(`/api/users/${user.id}`);
        let retries = 3;
        let delay = 1000;
        
        while (!response.ok && retries > 0) {
          // If user doesn't exist in DB yet, wait and retry
          await new Promise(resolve => setTimeout(resolve, delay));
          response = await fetch(`/api/users/${user.id}`);
          retries--;
          delay *= 2; // Exponential backoff
        }
        
        if (response.ok) {
          const data = await response.json();
          console.log('User role from database:', data.role);
          
          // Redirect to unified dashboard
          router.push('/dashboard');
        } else {
          console.error('Failed to fetch user data after retries');
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error redirecting:', error);
        router.push('/');
      } finally {
        setIsChecking(false);
      }
    };

    redirectUser();
  }, [isLoaded, user, router]);

  if (!isLoaded || isChecking) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #F58967',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ color: '#667085', fontSize: '1rem' }}>Loading...</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return null;
}

