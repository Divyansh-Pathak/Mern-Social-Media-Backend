import React from 'react';
import { Redirect } from 'react-router';

export default ({isLoading}) =>{
    if(isLoading){
        return <div>
            <h1>Loading...</h1>
        </div>
    }else{
        return <Redirect to='/'/>;
    }
};