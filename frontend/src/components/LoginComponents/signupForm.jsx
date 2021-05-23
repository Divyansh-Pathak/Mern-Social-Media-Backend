import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router';
import userRoutes from '../../apiCall/user';
import * as yup from "yup";






const SignupForm = ({setLog}) => {
  const [dateOfBirth, setDateOfBirth] = useState(false);

  const History = useHistory();

  const initialValues = {
    email: "",
    password: "",
    name: "",
    dob: "",
  };

  const validation = yup.object().shape({
    email: yup.string().email('*Must be a valid email').max(255).required('*Email is required...'),
    password: yup.string().required('*Set your password').min(4, '*Must be at least 6 characters long'),
    name: yup.string().required("*Enter Your Name..."),
    dob: yup.date().required("*Birthday is required..."),
   
});

  function handleSubmit(values, { setSubmitting }) {

    // alert(`"Email": ${values.email}, "Password": ${values.password}," NAme": ${values.name}, "DOB": ${values.dob}`);

    userRoutes.postSignupRequest(values.email, values.password, values.name, values.dob)
      .then((res) => {
        if (res.success) {
          console.log("Logged in Block" , res);
          setLog("loggedIn");
          History.push('/');
        } else {
          alert(res.errMessege);
          History.push('/login');
        }
      })
    setSubmitting(false);
  }
  return (

    
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
        isSubmitting, }) => <Form>

        <h1>Create Account</h1>

          <ErrorMessage name="name" />
          <div style={{ "display": "flex" }}>
            {/* <label style={{ "padding": "10px" }}>Name</label> */}
            <Field placeHolder="Enter Your Name..." type="text" name="name" />
          </div>


          <ErrorMessage name="dob" />
          <div>
            <Field name="dob">
              {({ field, form, meta }) => (
                <div>
                  <div style={{ "display": "flex" }}>
                    {/* <label>Date Of Birth</label> */}
                    <DatePicker {...field} selected={dateOfBirth} placeholderText="Your Birthday" onChange={newDate => {
                      setFieldValue("dob", newDate);
                      setDateOfBirth(newDate);
                    }} />
                  </div>
                  {/* {meta.touched &&
                    meta.error && <div className="error">{meta.error}</div>} */}
                </div>
              )}
            </Field>
          </div>


          <ErrorMessage name="email" />
          <div style={{ "display": "flex" }}>
            {/* <label style={{ "padding": "10px" }}>Email</label> */}
            <Field placeHolder="Enter Your Email..." type="email" name="email" />
          </div>

          <ErrorMessage name="password" />
          <div style={{ "display": "flex" }}>
            {/* <label style={{ "padding": "10px" }}>Password</label> */}
            <Field placeHolder="Set Password..." type="password" name="password" />
          </div>


          <button disabled={isSubmitting} type="submit">
            Sign Up
          </button>

          

        </Form>


      }

    </Formik>
  );
}

export default SignupForm;