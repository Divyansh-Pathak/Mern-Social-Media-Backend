import React, { useEffect, useState, useContext } from 'react';
import userContext from '../../helpers/userContext';
import './userProfilePage.css';

export default () => {

    const userDetails = useContext(userContext);
    const user = userDetails.personalInformation ? userDetails.personalInformation.name : "User";

    // const [userDetails, setDetails] = useState({});

    useEffect(()=>{
        // let newDetails = {};

        // const d =  user.personalInformation? new Date(user.personalInformation.DOB): new Date();
        // user.personalInformation? 
        // newDetails= {
        //     name: user.personalInformation.name,
        //     dob: `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`,
        // }
        // : <></>
        // console.log(newDetails);
    }, [user]);

    return <div classname="userProfile row" id="row">
    <div class="left"><img src="user.jpeg"/>
        <h3>Divyansh Pathak</h3>
        <button>Edit</button>
    </div>

    <div class="right"><h2>About</h2>

    <hr></hr>
       
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
        <h2>Profile Details</h2>

        <hr></hr>
  

        <table id="customers">

<tr>
<td>Gender</td>
<td>Male</td>

</tr>
<tr>
<td>Age</td>
<td>21</td>

</tr>

<tr>
<td>Birthday</td>
<td>28th Oct 1999</td>

</tr>
<tr>
<td>Address</td>
<td>UP, Varanasi</td>

</tr>
<tr>
<td>Interest</td>
<td>Basketball, Reading Books</td>

</tr>

</table>

    </div>
</div>;
};