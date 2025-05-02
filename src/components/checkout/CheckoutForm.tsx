import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useOrders } from '../../contexts/OrderContext';
import { createRazorpayOrder, initRazorpay } from '../../services/razorpay';

interface CheckoutFormProps {
  onSuccess: (orderId: string) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const { items, subtotal, tax, shipping, discount, total, clearCart } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  
  const [selectedAddress, setSelectedAddress] = useState(
    user?.addresses.find(addr => addr.isDefault)?.id || user?.addresses[0]?.id || ''
  );
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(e.target.value);
  };
  
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAddress) {
      setError('Please select a shipping address');
      return;
    }
    
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // In a real app, we'd create an order on the backend first
      // For this example, we'll simulate Razorpay integration
      
      if (paymentMethod === 'cod') {
        // For cash on delivery, create order directly
        const { success, orderId } = await createOrder('cod');
        
        if (success && orderId) {
          onSuccess(orderId);
        } else {
          setError('Failed to create order. Please try again.');
        }
      } else {
        // For other payment methods, use Razorpay
        const orderId = await createRazorpayOrder(total * 100); // Convert to paisa
        
        const options = {
          key: 'rzp_test_mockKey', // This would be your actual Razorpay key in production
          amount: total * 100, // In paisa
          currency: 'INR',
          name: 'CrystalReadymade',
          description: 'Payment for your order',
          order_id: orderId,
          prefill: {
            name: user?.name || '',
            email: user?.email || '',
            contact: user?.phone || '',
          },
          notes: {
            address_id: selectedAddress,
            shipping_method: 'standard',
          },
          theme: {
            color: '#3B82F6', // Blue color
          },
        };
        
        const razorpayInstance = await initRazorpay(options);
        
        razorpayInstance.on('payment.success', async (response: any) => {
          // In a real app, we'd verify this payment on the backend
          // For this example, we'll assume the payment is successful
          const { success, orderId } = await createOrder(paymentMethod);
          
          if (success && orderId) {
            onSuccess(orderId);
          } else {
            setError('Failed to create order. Please try again.');
          }
        });
        
        razorpayInstance.open();
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('An error occurred during checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {/* Shipping Address */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
        
        {user?.addresses && user.addresses.length > 0 ? (
          <div>
            <select
              id="address"
              name="address"
              value={selectedAddress}
              onChange={handleAddressChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select an address</option>
              {user.addresses.map(address => (
                <option key={address.id} value={address.id}>
                  {address.name}: {address.line1}, {address.city}, {address.state} {address.postalCode}
                </option>
              ))}
            </select>
            
            <div className="mt-2">
              <button
                type="button"
                onClick={() => navigate('/account/addresses/new?redirect=checkout')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                + Add a new address
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mb-4">
            <p>You don't have any saved addresses.</p>
            <button
              type="button"
              onClick={() => navigate('/account/addresses/new?redirect=checkout')}
              className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              + Add a new address
            </button>
          </div>
        )}
      </div>
      
      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
        
        <div className="space-y-4">
          <label className="flex items-center p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment-method"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={handlePaymentMethodChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <div className="ml-3">
              <span className="block text-sm font-medium text-gray-900">Credit/Debit Card</span>
              <span className="block text-sm text-gray-500">Pay securely with your card</span>
            </div>
          </label>
          
          <label className="flex items-center p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment-method"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={handlePaymentMethodChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <div className="ml-3">
              <span className="block text-sm font-medium text-gray-900">UPI</span>
              <span className="block text-sm text-gray-500">Pay using UPI ID or QR code</span>
            </div>
          </label>
          
          <label className="flex items-center p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment-method"
              value="wallet"
              checked={paymentMethod === 'wallet'}
              onChange={handlePaymentMethodChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <div className="ml-3">
              <span className="block text-sm font-medium text-gray-900">Mobile Wallet</span>
              <span className="block text-sm text-gray-500">Pay using PhonePe, Paytm, etc.</span>
            </div>
          </label>
          
          <label className="flex items-center p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment-method"
              value="netbanking"
              checked={paymentMethod === 'netbanking'}
              onChange={handlePaymentMethodChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <div className="ml-3">
              <span className="block text-sm font-medium text-gray-900">Net Banking</span>
              <span className="block text-sm text-gray-500">Pay through your bank account</span>
            </div>
          </label>
          
          <label className="flex items-center p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment-method"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={handlePaymentMethodChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <div className="ml-3">
              <span className="block text-sm font-medium text-gray-900">Cash on Delivery</span>
              <span className="block text-sm text-gray-500">Pay when you receive your order</span>
            </div>
          </label>
        </div>
      </div>
      
      {/* Order Summary */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2 flex justify-between font-medium text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={loading || !selectedAddress || items.length === 0}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;