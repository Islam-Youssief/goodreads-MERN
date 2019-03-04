import React from 'react';
export default function Reviews(props) {
    return (
      <div>
        <h3>Reviews</h3>
        <button>add Review</button>
        <ul>
          <li>
          <div>
        <div className="review">
          <img src="2.jpg" alt="error" width="100" height="100"/><br/>
        </div>
        <div className="review">
          <h6>Islam Youssief</h6>
          <p>
            This is my review on this title i just 
            want to say it is working and that is it !
          </p>
        </div>
      </div>
          </li>
          <li>
          <div>
        <div className="review">
          <img src="2.jpg" alt="error" width="100" height="100"/><br/>
        </div>
        <div className="review">
          <h6>Youssief Islam</h6>
          <p>
            This is my review on this title i just 
            want to say it is working and that is it !
          </p>
        </div>
      </div>
          </li>
        </ul>
      </div>
    );
  }