"use client";

import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import NextLayout from "@/layouts/NextLayout";

export default function BuyerSignUpPage() {
  const router = useRouter();

  return (
    <NextLayout header={2} footer={4} single>
      <section className="buyer-signup-section" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        backgroundColor: '#f8f9fa'
      }}>
        <div className="container" style={{ maxWidth: '500px' }}>
          <div className="text-center mb-4">
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#101828',
              marginBottom: '10px'
            }}>
              Create Buyer Account
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              color: '#667085'
            }}>
              Sign up to start buying digital tools at affordable prices
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <SignUp 
              routing="hash"
              signInUrl="/sign-in"
              afterSignUpUrl="/buyer-dashboard?newSignup=true&role=BUYER"
              appearance={{
                elements: {
                  rootBox: {
                    width: '100%',
                    maxWidth: '500px'
                  },
                  card: {
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    borderRadius: '15px'
                  }
                }
              }}
            />
          </div>

          <div className="text-center mt-4">
            <button
              onClick={() => router.push('/sign-up')}
              style={{
                background: 'none',
                border: 'none',
                color: '#667085',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              ← Back to account selection
            </button>
          </div>
        </div>
      </section>
    </NextLayout>
  );
}

