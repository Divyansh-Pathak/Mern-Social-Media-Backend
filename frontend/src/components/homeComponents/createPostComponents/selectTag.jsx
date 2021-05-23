import React, { useState } from 'react';
import Select from 'react-select';

function SelectTag({ name, onChange, onBlur, values, options, error, touched }) {

  const [tagValues, setTagValues] = useState();


  const handleChange = (value) => {
    // this is going to call setFieldValue and manually update values.topcis
    console.log("from meletTag", value);
    setTagValues(value);
    const tags = [];
    value.map((tag) => {
      tags.push(tag.value)
    });
    onChange(tags);

  };

  const handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    onBlur(true);
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
        value={tagValues}
        placeholder={'Select related tags...'}
        styles={{
          placeholder: base => ({
            ...base,
            fontSize: '1em',
            fontWeight: 400,
          }),
        }}
          />
        {/* {!!error &&
            touched && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>{error}</div>
            )} */}
        </div>
      );

  };

  export default SelectTag;