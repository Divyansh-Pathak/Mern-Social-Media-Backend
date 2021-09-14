import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { useHistory } from 'react-router';
import userRoutes from '../../apiCall/user';
import * as yup from "yup";
import { SnackbarContext } from '../HelperComponents/snackbar';



// const useStyles = makeStyles((theme) => ({

// }));






const SignupForm = ({ setLog }) => {
  const [dateOfBirth, setDateOfBirth] = useState(false);
  const setStateSnackbarContext = useContext(SnackbarContext);

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
    dob: yup.date("*invalid date").transform(value => (isNaN(value) ? undefined : value)).required("*Birthday is required..."),

  });

  function handleSubmit(values, { setSubmitting }) {

    userRoutes.postSignupRequest(values.email, values.password, values.name, values.dob)
      .then((res) => {
        console.log({ res })
        if (res.success) {
          console.log("Logged in Block", res);
          setLog("loggedIn");
          History.push('/');
        } else {
          setStateSnackbarContext(
            true,
            res.errMessege.error,
            "warning"
          );
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
                  <div style={{ "display": "flex", overflow: "visible" }}>
                    {/* <label>Date Of Birth</label> */}
                    <DatePicker {...field} selected={dateOfBirth} placeholderText="Your Birthday"
                      autoComplete='off'
                      dateFormat="dd/MM/yyyy"
                      isClearable
                      onChange={newDate => {
                        setFieldValue("dob", newDate);
                        setDateOfBirth(newDate);
                      }} />
                  </div>
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

          <button className="my-login-button" disabled={isSubmitting} type="submit">
            Sign Up
          </button>

        </Form>

      }

    </Formik>
  );
}

export default SignupForm;