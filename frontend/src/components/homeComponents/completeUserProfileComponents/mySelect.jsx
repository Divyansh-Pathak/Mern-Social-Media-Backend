import React from 'react';
import Select from 'react-select';
import './mySelect.css';

function MySelect({name, onChange , onBlur, values, options, error, touched}) {
    const handleChange = value => {
      // this is going to call setFieldValue and manually update values.topcis
      onChange(name, value);
    };
  
   const  handleBlur = () => {
      // this is going to call setFieldTouched and manually update touched.topcis
      onBlur(name, true);
    };
  
   
      return (
        <div>
          {/* <label htmlFor="color">Select Community </label> */}
          <Select
            id={name}
            options={options}
            isMulti
            onChange={handleChange}
            onBlur={handleBlur}
            value={values}
          />
          {/* {!!error &&
            touched && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>{error}</div>
            )} */}
        </div>
      );
    
  };

  export default MySelect;