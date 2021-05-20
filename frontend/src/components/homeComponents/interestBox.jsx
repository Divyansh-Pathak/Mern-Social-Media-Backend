import React from 'react';
import './interestBox.css';

export default () => {
    const listItems = ["Painting", "Artworks", "Coding", "Designing", "Photography", "Corona", "Computer Science", "Motivation"];
    const handleChange = (event) => {
        console.log("Interest Box Change", {event});
    };
    return (
        <div className="interest-box">
            <p>Choose your Feed type...</p>
            {listItems.map((item) => {
              return ( <div className="interest-box-input">
              <p>
              <input onChange={handleChange} type="checkbox" id={item} name={item} value={item} />
                <label for={item}>{item}</label>
              </p>
                  
                </div>);
            })}

        </div>
    )
}