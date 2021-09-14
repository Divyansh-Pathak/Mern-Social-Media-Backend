import React, { useEffect, useState, useContext } from 'react';
import userContext from '../../helpers/userContext';
import './userProfilePage.css';
import ChangeProfileImage from './changeProfileImage';
import CompleteUserProfile from '../homeComponents/completeUserProfileComponents/CompleteUserProfile';
import CropperBox from './CropperBox';
import ReanderUserPosts from './RenderUserPosts';
import Footer from '../Header/Footer';
import { Button } from '@material-ui/core';
export default () => {

    const userDetails = useContext(userContext);
    // const user = userDetails.personalInformation ? userDetails.personalInformation.name : "User";

    const [user, setUser] = useState({});

    const [profileComplete, setProfileComplete] = useState(true);

    // const [showCropper, setShowCropper] = useState(false);

    


    function calAge(birthDate) {

        let date1 = new Date(birthDate);
        let date2 = new Date();
        var Difference_In_Time = date2.getTime() - date1.getTime();
        let diffInDays = Math.round(Difference_In_Time / (1000 * 60 * 60 * 24));

        return Math.round(diffInDays / 365);

    }

    function calBirthday(date) {

        let birthDate = new Date(date).getDate();
        let birthMonthInNo = new Date(date).getMonth();
        let birthMonth;
        switch (birthMonthInNo) {
            case 0:
                birthMonth = "January";
                break;
            case 1:
                birthMonth = "February";
                break;
            case 2:
                birthMonth = "March";
                break;
            case 3:
                birthMonth = "April";
                break;
            case 4:
                birthMonth = "May";
                break;
            case 5:
                birthMonth = "June";
                break;
            case 6:
                birthMonth = "July";
                break;
            case 7:
                birthMonth = "August";
                break;
            case 8:
                birthMonth = "September";
                break;
            case 9:
                birthMonth = "October";
                break;
            case 10:
                birthMonth = "November";
                break;
            case 11:
                birthMonth = "December";
                break;
        }

        let birthYear = new Date(date).getFullYear();

        return `${birthDate} ${birthMonth}, ${birthYear}`

    };

    useEffect(() => {
        const name = userDetails.personalInformation ? userDetails.personalInformation.name : null;
        const age = userDetails.personalInformation ? calAge(userDetails.personalInformation.DOB) : null;
        const birthday = userDetails.personalInformation ? calBirthday(userDetails.personalInformation.DOB) : null;
        const city = userDetails.personalInformation ? userDetails.personalInformation.currentCity : null;
        const profession = userDetails.personalInformation ? userDetails.personalInformation.profession : null;
        const email = userDetails.contactDetails ? userDetails.contactDetails.email : null;
        const about = userDetails.Bio ? userDetails.Bio : null;
        const community = userDetails.community ? userDetails.community : null;
        const interests = userDetails.interests ? userDetails.interests : null;

        const newUser = {

            name: name,
            age: age,
            birthday: birthday,
            city: city,
            profession: profession,
            email: email,
            about: about,
            community: community,
            interests: interests,

        }

        setUser(newUser);

        // profileImageURL: String,
        // coverImageURL: String,
        // userProfileURL: String,



    }, [userDetails]);

    return <div>

    

    
    
    
    
    <div className="userProfile" id="row">
    {(!profileComplete) ? <CompleteUserProfile close={() => setProfileComplete(true)} /> : <></>}

        <div className="left">
        <div className="avtar-holder">
        <ChangeProfileImage />
        </div>
            <h3 style={{marginTop:"20px"}} >{user.name}</h3>
            <Button onClick={() => setProfileComplete(false)}>Edit Profile</Button>
        </div>

        <div class="right">
            {user.about ?
                <>
                    <h2>About</h2>
                    <hr></hr>
                    <h4 style={{marginBottom:"20px"}}>{user.about}</h4>
                </>
                : <></>}

            <h2>Profile Details</h2>
            <hr></hr>
            <table id="customers">

                {user.age ?
                    <tr>
                        <td>Age</td>
                        <td>{user.age}</td>
                    </tr>
                    : <></>}

                {user.birthday ?
                    <tr>
                        <td>Birthday</td>
                        <td>{user.birthday}</td>
                    </tr>
                    : <></>}

                {user.city ?
                    <tr>
                        <td>City</td>
                        <td>{user.city}</td>

                    </tr>
                    : <></>}

                {user.interests ?
                    <tr>
                        <td>Interest</td>
                        <td>{user.interests.map((interest) => `${interest}, `)}</td>

                    </tr>
                    : <></>}

            </table>

        </div>
        
    </div>

    <div style={{margin:"20px", textAlign:"center"}}>
    <h3>Stories Posted...</h3>
    </div>
    
    <div className="userPost-main">
    
    <div className="userPosts">
    <ReanderUserPosts/>
    </div>
    </div>

    
   {/* <Footer/> */}
   
    </div>;
};