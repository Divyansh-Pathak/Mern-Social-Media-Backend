import {useContext} from 'react';

// const [isAuth , setAuth] = useContext(false);
// const [user, setUser] = useContext({user:'noUser'});

let isAuth = false;

const setAuth = (value) => {
    isAuth = value;
  };

let user = "noUser";

const setUser = (value) => {
    user = value;
};

export {isAuth , setAuth, user, setUser};