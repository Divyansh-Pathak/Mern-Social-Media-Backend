import React, { useState } from 'react';
import './tagdropdown.css';
//limit lgana bcha h
export default (props) => {
    const localtag = ["Painting", "Artworks", "Coding", "Designing", "Photography", "Corona", "Computer Science", "Motivation"];
    const [open, setOpen] = useState("false");
    const [tags, setTags] = useState([]);
    const listClicked =  (event) => {
        setTags((prevValue) => {
            return ([
                ...prevValue,
                event.target.getAttribute('name')
            ])
        })
        
        
    }
    props.reciveTags(tags);
    return (
        <div className="tag__container">
            
            
            {(open === "true")? 
                <div className="tagholder">

                    <div className ="dropdown">
                        <ul onClick={listClicked}>
                            <li>
                                {/* <label htmlFor = "tagInput">Hello</label> */}
                                <input id= "tagInput" placeholder="Search tags"></input>
                            </li>
                            <div className = "scrollable">
                            {localtag.map((tag, i) => {
                                            return (
                                                <li key={i} name={tag} value={tag} onClick={() => setOpen("false")}>{tag}</li>

                                                
                                            );
                                        })}

                            </div>
                            
                        </ul>

                    </div>
                    
                    <div className = "backDrop" onClick={() => setOpen("false")}>

                    </div>
                </div>
            : <div className = "trigger__body"> 
                <div id="tagInput" className="tagInput__div" onClick={() => setOpen("true")}>
                    <p>{tags.toString()}</p>
                </div>
                <button type="button" className="tag__button" onClick={() => setOpen("true")}>
                    ☰
                </button>
            
            </div>}

        </div>
    )
}