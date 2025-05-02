// This is a mock service for Razorpay integration
// In a real application, this would interact with the Razorpay API

interface RazorpayOptions {
  key: string;
  amount: number; // in paisa (100 paisa = 1 INR)
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    [key: string]: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  on: (event: string, callback: Function) => void;
  open: () => void;
}

// Mock function to initialize Razorpay
export const initRazorpay = (options: RazorpayOptions): Promise<RazorpayInstance> => {
  return new Promise((resolve, reject) => {
    // Check if Razorpay is loaded
    if (typeof window.Razorpay === 'undefined') {
      // In a real application, we'd load the Razorpay script dynamically
      // For this mock, we'll simulate that Razorpay is already loaded
      console.log('Simulating Razorpay initialization');
      
      // Create a mock Razorpay instance
      const razorpayInstance = {
        on: (event: string, callback: Function) => {
          console.log(`Registered event listener for ${event}`);
          // Store callbacks for later triggering
          if (event === 'payment.success') {
            window.setTimeout(() => {
              callback({
                razorpay_payment_id: `pay_${Math.random().toString(36).substring(2, 15)}`,
                razorpay_order_id: options.order_id,
                razorpay_signature: `sign_${Math.random().toString(36).substring(2, 15)}`,
              });
            }, 2000);
          }
        },
        open: () => {
          console.log('Razorpay checkout opened');
          // In a real scenario, this would open the Razorpay modal
          alert('This is a mock Razorpay integration. In a real app, the Razorpay payment window would open here.');
        }
      };
      
      resolve(razorpayInstance);
    } else {
      // If Razorpay is actually loaded (in a real implementation)
      try {
        const razorpay = new window.Razorpay(options);
        resolve(razorpay);
      } catch (error) {
        reject(error);
      }
    }
  });
};

// Function to create a Razorpay order (mock)
export const createRazorpayOrder = async (amount: number): Promise<string> => {
  // In a real app, this would be an API call to your backend, which would then call Razorpay's API
  console.log(`Creating Razorpay order for amount: ${amount}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a mock order ID
  return `order_${Math.random().toString(36).substring(2, 15)}`;
};

// Function to verify payment (mock)
export const verifyPayment = async (paymentId: string, orderId: string, signature: string): Promise<boolean> => {
  // In a real app, this would be an API call to your backend, which would verify the payment
  console.log(`Verifying payment: ${paymentId} for order: ${orderId}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Always return success in this mock implementation
  return true;
};

// Add Razorpay type definitions
declare global {
  interface Window {
    Razorpay: any;
  }
}