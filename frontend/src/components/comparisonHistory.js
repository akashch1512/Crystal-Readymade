import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ComparisonHistory.css'; // Import the CSS file

const ComparisonHistory = ({ username }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/comparison-history?username=${username}`
        );
        setHistory(response.data);
      } catch (err) {
        console.error('Error fetching comparison history:', err);
        setError('Failed to fetch comparison history.');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchHistory();
    }
  }, [username]);

  if (loading) {
    return <p>Loading your comparison history...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section id="comparison-history">
      <h2>Your Comparison History</h2>
      {history.length === 0 ? (
        <p>No comparison history found.</p>
      ) : (
        <div className="history-list">
          {history.map((log, index) => (
            <div key={index} className="history-item">
              <h3>Category: {log.category}</h3>
              <p>Search Term: {log.search}</p>
              <p>Platforms: {log.platforms.join(', ')}</p>
              <p>Timestamp: {new Date(log.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ComparisonHistory;
