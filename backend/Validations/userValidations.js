const yup = require('yup');

const userValidationSchema = yup.object({
    birthPlace: yup.string(),
    currentCity: yup.string().required("*current city is required"),
    profession: yup.string().required("*profession is required"),
    phone: yup.number().transform(value => (isNaN(value) ? undefined : value)),
    hobbies: yup.array()
        .min(1, 'Pick at least 1 tags'),
    bio: yup.string(),
    community: yup.array()
        .min(1, 'Pick at least 1 tags'),

});

module.exports = userValidationSchema;