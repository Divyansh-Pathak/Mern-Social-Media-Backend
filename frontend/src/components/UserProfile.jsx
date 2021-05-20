import React, { useContext } from 'react';
import userContext from '../helpers/userContext';



export default () => {
    const userDetails = useContext(userContext);
    const user = userDetails.personalInformation ? userDetails.personalInformation.name : "User";
    console.log(userDetails);
    return <p>Here is your profile Mr. {user}</p>
}