import React from 'react';
import './About.css'; // Importing the plain CSS file

function About() {
  // Features data with text and image
  const features = [
    {
      text: 'Compare products across multiple platforms in real-time.',
      image: 'about1.jpg', // Replace with your image path
    },
    {
      text: 'Interactive and responsive user interface with dark theme support.',
      image: 'about4.jpg', // Replace with your image path
    },
    {
      text: 'Category-wise product filters for easy navigation.',
      image: 'about3.jpeg', // Replace with your image path
    },
    {
      text: 'Developer profiles for transparency and updates.',
      image: 'about2.jpeg', // Replace with your image path
    },
  ];

  return (
    <div className="about-container">
      <h1 className="heading">About ProCompare</h1>
      <p className="description">
        ProCompare is your go-to platform for finding the best deals across multiple online retailers. Compare products from Flipkart, Amazon, and Myntra, and make informed purchasing decisions with ease.
      </p>
      <p className="description">
        Our mission is to save your time and money by providing a seamless comparison experience. With ProCompare, you can quickly access the best offers, view product details, and compare prices across categories, all in one place.
      </p>

      <h2 className="subheading">How to Use ProCompare</h2>
      <ol className="steps">
        <li>
          <strong>Create an Account:</strong> Sign up or log in to get started. This ensures a personalized and secure experience.
        </li>
        <li>
          <strong>Select a Category:</strong> Choose from a wide range of product categories like electronics, fashion, home appliances, and more.
        </li>
        <li>
          <strong>Search for Products:</strong> Use the search bar to find specific products or explore top deals in your chosen category.
        </li>
        <li>
          <strong>Compare Prices:</strong> View detailed product comparisons, including prices, ratings, and key features across Flipkart, Amazon, and Myntra.
        </li>
        <li>
          <strong>Make a Decision:</strong> Click on the link to your preferred retailer and complete your purchase with confidence.
        </li>
      </ol>

      <h2 className="subheading">Features</h2>
      <ul className="features">
        {features.map((feature, index) => (
          <li key={index}>
            <img src={feature.image} alt={`Feature ${index + 1}`} className="feature-image" />
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <p className="description">
        Stay tuned for exciting new features, including AI-powered product recommendations and enhanced user profiles!
      </p>
    </div>
  );
}

export default About;
