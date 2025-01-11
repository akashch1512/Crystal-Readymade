import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      setResponseMessage(response.data.message);
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setResponseMessage('Failed to send the message. Please try again later.');
    }
  };

  return (
    <div className="contact-container">
      <h1 className="heading">Contact Us</h1>
      <p className="description">
        Have questions or feedback? We'd love to hear from you! Fill out the form below, and our team will get back to you shortly.
      </p>
      <div className="contact-details">
        <p><strong>Email:</strong> support@procompare.com</p>
        <p><strong>Phone:</strong> +91 12345 67890</p>
        <p><strong>Address:</strong> 123, Tech Street, Innovation City, India</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="form-textarea"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}

export default Contact;
