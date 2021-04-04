import React from 'react';
import './input.css';

 const Input = (props) => {
return <div>
    <label htmlFor={props.name}>{props.label1}</label>
    <input type={props.type} id={props.name} name={props.name}></input>
</div> 
};


export default Input;