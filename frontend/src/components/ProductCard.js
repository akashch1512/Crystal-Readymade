import React from "react";

const ProductCard = ({ productPair }) => (
  <div className="product-card-container">
    {Object.keys(productPair).map((platform) => {
      const product = productPair[platform];

      // Only render if product is not null
      if (!product) return null;

      return (
        <div key={platform} className="platform-card">
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ₹{product.price}</p>
          <p>Rating: {product.rating}⭐</p>
          <a href={product.url} target="_blank" rel="noopener noreferrer">
            Buy on {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </a>
        </div>
      );
    })}
  </div>
);

export default ProductCard;
