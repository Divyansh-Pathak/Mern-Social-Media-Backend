import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import "./userProfileForm.css";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/Phone';
import PeopleIcon from '@material-ui/icons/People';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import userRoute from '../../../apiCall/user';
import MySelect from './mySelect';
import dataRoutes from '../../../apiCall/dataFromBackend';

const UserProfileForm = ({ renderPage, close }) => {
    const [communitiesOptions, setCommunity] = useState([]);
    //const userDetails = useContext(userContext);

    useEffect(() => {
        //Calling communities options from the server and pushing it in communitiesOptions array such that it can be used with react-select
        dataRoutes.requestAllCommunities().then((response) => {
            response.map((interests) => {
                communitiesOptions.push({
                    value: interests.communityName,
                    label: interests.communityName,
                });
            });
        }).catch(err => console.log("Something went wrong during calling interests Data", err))
    }, []);

    const [isErr, setErr] = useState(false);
    const [divClass, setDivClass] = useState({ pageOne: "show-div", pageTwo: "no-div", pageThree: "no-div" });
    const [hobbiesOptions, setHobbies] = useState(
        [{ value: 'Reading Books', label: 'Reading Books' },
        { value: 'Football', label: 'Foodball' },
        { value: 'Cricket', label: 'Cricket' },
        { value: 'Painting', label: 'Painting' },
        { value: 'Photography', label: 'Photography' },
        { value: 'Mathematics', label: 'Mathematics' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Public Speaking', label: 'Public Speaking' }])

    const handleFormPage = (buttonNumber) => {
        console.log("Next Clicked");
        if (buttonNumber === 0) {
            setDivClass({ pageOne: "show-div", pageTwo: "no-div", pageThree: "no-div" });
            renderPage(0);
        } else if (buttonNumber === 1) {
                setDivClass({ pageOne: "no-div", pageTwo: "show-div", pageThree: "no-div" })
                renderPage(1);
        } else if (buttonNumber === 2) {
            setDivClass({ pageOne: "no-div", pageTwo: "no-div", pageThree: "show-div" })
            renderPage(2);
        }


    }





    // formik Implementation starts...

    // Initializing Formik Form Value
    const initialValues = {
        birthPlace: "",
        currentCity: "",
        profession: "",
        phone: "",
        bio: "",
        interests: []
    };

    //Creating Validation Schema
    const validation = yup.object().shape({
        birthPlace: yup.string(),
        currentCity: yup.string().required("*current city is required"),
        profession: yup.string().required("*profession is required"),
        phone: yup.number().typeError('Amount must be a number'),
        bio: yup.string(),
        interests: yup.array()
            .min(3, 'Pick at least 3 interests you have')
            .of(
                yup.object().shape({
                    label: yup.string().required(),
                    value: yup.string().required(),
                })
            ),
    });

    //Handling the formik form on submit
    const handleSubmit = (values, { setSubmitting }) => {
        const userUpdatedData = {
            ...values,
            interests: values.interests.map(t => t.value),
        }
        userRoute.editProfileRequest(userUpdatedData).then((res)=>{
            if(res.data.isUpdated){
                close();  
            }else{
                console.log("Error In updating", res);
            }  
        });
        setSubmitting(false);
       
    };


    return (
        <div className="main-upf">
            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={handleSubmit}
            >
                {({ values,
                    touched,
                    errors,
                    setFieldValue,
                    setFieldTouched,
                    isSubmitting, }) => {
                    return (
                        <Form>
                            <div className={`form__details ${divClass.pageOne}`}>
                                <div className="input-div">
                                    <div className="left-inputs">
                                        <p><ErrorMessage name="birthPlace" /></p>
                                        <div style={{ "display": "flex" }}>
                                            <label style={{ "padding": "10px" }}><HomeIcon /></label>
                                            <Field placeHolder="Birth Place" type="text" name="birthPlace" />
                                        </div>
                                        <p><ErrorMessage name="currentCity" /></p>
                                        <div style={{ "display": "flex" }}>
                                            <label style={{ "padding": "10px" }}><LocationOnIcon /></label>
                                            <Field placeHolder="Lives In*" type="text" name="currentCity" />
                                        </div>
                                    </div>
                                    <div className="right-inputs">
                                        <p><ErrorMessage name="profession" /></p>
                                        <div style={{ "display": "flex" }}>
                                            <label style={{ "padding": "10px" }}><WorkIcon /></label>
                                            <Field placeHolder="Profession*" type="text" name="profession" />
                                        </div>
                                        <p><ErrorMessage name="phone" /></p>
                                        <div style={{ "display": "flex" }}>
                                            <label style={{ "padding": "10px" }}><PhoneIcon /></label>
                                            <Field placeHolder="Phone" type="text" name="phone" />
                                        </div>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button onClick={() => {
                                        handleFormPage(1);
                                    }} type="button">Next</button>
                                </div>
                            </div>

                            <div className={`form__details ${divClass.pageTwo}`}>
                                <div className="input-div">
                                    <div className="left-inputs">
                                        <p><ErrorMessage name="interests" /></p>
                                        <div style={{ "display": "flex", "margin-top":"10px" }}>
                                            <label style={{ "padding": "10px" }}><PeopleIcon /></label>
                                            <div className="my-select">
                                                <MySelect
                                                    name="interests"
                                                    values={values.interests}
                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}
                                                    error={errors.interests}
                                                    touched={touched.interests}
                                                    options={communitiesOptions}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-inputs">
                                        <h2>This will help us to show you best contents suitable for you...</h2>
                                        {/* <p><ErrorMessage name="hobbies" /></p>
                                        <div style={{ "display": "flex" }}>
                                            <label style={{ "padding": "10px" }}><SentimentVerySatisfiedIcon /></label>
                                            <div className="my-select">
                                                <MySelect
                                                    name="hobbies"
                                                    values={values.hobbies}
                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}
                                                    error={errors.hobbies}
                                                    touched={touched.hobbies}
                                                    options={hobbiesOptions}
                                                />
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="buttons">
                                    {errors.interests && touched.interests || errors.hobies && touched.hobies ? setErr(true) : setErr(false)}
                                    <button onClick={() => handleFormPage(2)} type="button">Next</button>
                                </div>
                                <div className="prev-button">
                                    <button onClick={() => handleFormPage(0)} type="button">Prev</button>
                                </div>

                            </div>

                            <div className={`form__details ${divClass.pageThree}`}>
                                <div className="input-div">
                                    <div className="left-inputs">
                                        <h2>Write something about yourself which defines you best...</h2>
                                    </div>
                                    <div className="right-inputs">
                                        <p><ErrorMessage name="bio" /></p>
                                        <div style={{ "display": "flex" }}>
                                            <label style={{ "padding": "10px" }}><EmojiPeopleIcon /></label>
                                            <Field placeHolder="Write Something About Yourself" type="text" name="bio" as="textarea" />
                                        </div>
                                    </div>
                                    <div className="buttons">
                                        <button disabled={isSubmitting} type="submit">
                                            submit
                  </button>
                                    </div>
                                    <div className="prev-button">
                                        <button onClick={() => handleFormPage(1)} type="button">Prev</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default UserProfileForm;



//###############################################################################################################################################
// const colourOptions = [{
//   value: "ocean",
//   label: "Ocean",
//   color: "#eeeeee",
//   isFixed: true
// }, {
//   value: "ocean",
//   label: "Ocean",
//   color: "#00B8D9",
//   isFixed: true
// },{
//   value: "ocean",
//   label: "Ocean",
//   color: "#00B8D9",
//   isFixed: true
// }, "privete", "Limited"]

//   <Select
//                                                     {...field}
//                                                     placeholder="Select Your interests..."
//                                                     value={communitiesSelected}
//                                                     onChange={handleCommunityChange}
//                                                     defaultValue={""}
//                                                     isMulti
//                                                     name="colors"
//                                                     options={communitiesOptions}
//                                                     className="basic-multi-select"
//                                                     classNamePrefix="select"
//                                                 />

//-------------------------------------------------------Fieldd----------------------------------------------------------

{/* <p> <ErrorMessage name="interests" /></p>
                                        <div style={{ "display": "flex" }}>
                                            <label style={{ "padding": "10px" }}><PeopleIcon /></label>
                                            <Field placeHolder="Select Your interests" type="text" name="" />

                                        </div> */}
{/* <Field name="interests" value="hello word">
                                            {({ field, form, meta }) => (
                                                
                                            )}
                                        </Field> */}





                                        // setFieldTouched("birthPlace", true);
                                        // setFieldTouched("currentCity", true);
                                        // setFieldTouched("profession", true);
                                        // setFieldTouched("phone", true);
                                        // setErr(errors.birthPlace && touched.birthPlace || errors.currentCity && touched.currentCity || errors.profession && touched.profession
                                        //     || errors.phone && touched.phone);

                                        // if (!isErr) {
                                        //     console.log(isErr);
                                        //     handleFormPage(1);
                                        // }







                                        // <ErrorMessage name="currentCity">{msg => {
                                        //     if (msg) {
                                        //         console.log("Error from currenctCity", msg);
                                        //         setErr(true);
                                        //     } else {
                                        //         console.log("No err from currentCity");
                                        //     }
                                        //     return (<p>{msg}</p>);
                                        // }}</ErrorMessage>





                                         // hobbies: yup.array().of(
        //     yup.object().shape({
        //         label: yup.string().required(),
        //         value: yup.string().required(),
        //     })
        // ),