import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Auth from '../helpers/auth';


export default ({ component: Component, isAuthenticated: isAuthenticated, ...rest }) => {
    return <Route {...rest}
        render={(props) => {
            
            if(isAuthenticated==='loggedIn'){
                return <Component {...props} />;
            }else if(isAuthenticated==='loggedOut'){
                return <Redirect to='/login'/>;
            }else{
                return <h1>Loading in protectedRoutes</h1>
            }
           
        }}

    />

};