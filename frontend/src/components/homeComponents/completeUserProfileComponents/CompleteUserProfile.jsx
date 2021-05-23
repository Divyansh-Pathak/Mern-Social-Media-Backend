import "./CompleteUserProfile.css";
import UserProfileForm from './userProfileForm';
import { useState } from "react";

function CompleteUserProfile({ close }) {

    const localtag = ["Painting", "Artworks", "Coding", "Designing", "Photography", "Corona", "Computer Science", "Motivation"];

    const [activeBar , changeActiveBar]= useState({ pageOne: "active-progress-bar", pageTwo: "tab", pageThree: "tab" });

    const handleActiveBar = (pageNo) => {
        
            if(pageNo === 0){
                changeActiveBar({ pageOne: "active-progress-bar", pageTwo: "tab", pageThree: "tab" });
                
              }else if (pageNo === 1) {
                changeActiveBar({ pageOne: "tab", pageTwo: "active-progress-bar", pageThree: "tab" })
              
              } else if (pageNo === 2) {
                changeActiveBar({ pageOne: "tab", pageTwo: "tab", pageThree: "active-progress-bar" })
             
              }
        
    }
    
    return (
        <div className="cup">

        <div className = "cup__backdrop"></div>

            <div className="cup__main">
                <div className="cup__head">
                    <h1>Complete Your Profile...</h1>
                    <p>It will just take few steps...</p>
                   
                    {/* <button>skip</button>
                    <button onClick={() => skip()} >skip all</button> */}
                </div>
                <div className = "step-bar ">
                        <div className={activeBar.pageOne}></div>
                        <div className={activeBar.pageTwo}></div>
                        <div className={activeBar.pageThree}></div>
                </div>
                <div className="cup__body">
                    <UserProfileForm close={() => close()} renderPage = {handleActiveBar}/>
                </div>
                <div className="cup__foot">
                    {/* <button>Next</button> */}
                </div>
            </div>


        </div>
    )
}

export default CompleteUserProfile;