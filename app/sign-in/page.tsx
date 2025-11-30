"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <section className="signin-section" style={{
      minHeight: '100vh',
      paddingTop: 'clamp(40px, 8vw, 80px)',
      paddingBottom: 'clamp(40px, 6vw, 60px)',
      paddingLeft: 'clamp(15px, 3vw, 20px)',
      paddingRight: 'clamp(15px, 3vw, 20px)',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10
        }}>
          <Link href="/" style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            textDecoration: 'none',
            color: '#101828',
            fontWeight: '700',
            fontSize: '20px'
          }}>
            GroupBuy<span style={{ fontSize: '14px', fontWeight: '500' }}>Tools</span>
          </Link>
        </div>
        <div className="container" style={{ 
          maxWidth: '500px',
          margin: '0 auto',
          paddingLeft: '15px',
          paddingRight: '15px',
          width: '100%'
        }}>
          <div className="text-center mb-4" style={{
            marginBottom: '30px'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(1.5rem, 5vw, 2rem)', 
              fontWeight: '700', 
              color: '#101828',
              marginBottom: '10px'
            }}>
              Welcome Back
            </h2>
            <p style={{ 
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', 
              color: '#667085'
            }}>
              Sign in to your account
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '500px'
            }}>
              <SignIn 
                routing="hash"
                signUpUrl="/sign-up"
                afterSignInUrl="/dashboard-redirect"
                appearance={{
                  elements: {
                    rootBox: {
                      width: '100%',
                      maxWidth: '100%'
                    },
                    card: {
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      borderRadius: '15px',
                      width: '100%',
                      padding: 'clamp(20px, 5vw, 40px)'
                    },
                    formButtonPrimary: {
                      backgroundColor: '#101828',
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      padding: 'clamp(10px, 2.5vw, 14px)',
                      '&:hover': {
                        backgroundColor: '#1f2937'
                      }
                    },
                    formFieldInput: {
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                    },
                    formFieldLabel: {
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                    },
                    formButtonReset: {
                      color: '#F58967',
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      '&:hover': {
                        color: '#e67756'
                      }
                    },
                    footerActionLink: {
                      color: '#F58967',
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      '&:hover': {
                        color: '#e67756'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>
  );
}

