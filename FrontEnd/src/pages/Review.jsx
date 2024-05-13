import React from 'react';

const Review = () => {
  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h1>Leave a Review</h1>
      <p>You are about to leave Curt's Dirt website to leave a review on our Google My Business page. Thank you for taking the time to provide your feedback!</p>
      <a 
        href="https://g.page/r/CQcJHq61sAZjEAI/review"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'white', backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px' }}
      >
        Proceed to Google Reviews
      </a>
    </div>
  );
}

export default Review;