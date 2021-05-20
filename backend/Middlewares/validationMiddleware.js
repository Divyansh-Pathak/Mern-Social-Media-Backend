const yup = require('yup');
const  userValidationSchema = require('../Validations/userValidations');


const validateUserDetails = (req, res, next) => {
    
    userValidationSchema.validate(req.body)
    .then((isValid) => {
        
        next();
    })
    .catch((error)=> res.json(`User Validity Error ${error}`));
}





module.exports = {validateUserDetails};

// const product1 = {
//   id: 1,
//   name: 'The Imitation Game',
//   description: 'Movie about Alan Turing',
//   price: 19.99,
//   category: 'movie',
// };

// const product2 = {
//   id: 2,
//   name: 'The Theory of Everything',
//   price: '$14.95',
//   category: 'movie',
// };

// productSchema
//   .isValid(product1)
//   .then((isValid) => console.log(`product1 valid? ${isValid}`));
// productSchema
//   .isValid(product2)
//   .then((isValid) => console.log(`product2 valid? ${isValid}`));