import instance from './instance';
import userRoutes from './user.js';
export default {
    getUser:  () =>{
        return (
             instance({
                'method':'GET',
                'url':'/user',
            })	.then((response) => {
                if(response.status === 200){
                return(response.data);
                }else{
                  return("noUser");
                } 
              }).catch(err => "noUser")
        );
    },
    
    postLoginRequest: async (email , password) => {
        return (

            await instance({
                'method': 'POST',
                'url':'/login',
                'data': {
                    email: email,
                    password: password
                }
            }).then((response) => {
                return (response.data);
            }).catch((error) => {
               return {errMessege: error.response.data };
            })
        );
    },

    logoutRequest: async () => {
        return (
            await instance({
                'method':'GET',
                'url':'/logout',
            })
            .then((response)=>{
                return (response.data);
            })
            .catch((error) => {
                return {errMessege: error.response.data};
            })
        );

    },

    postSignupRequest: async (email , password, name , date) => {
        return (
            await instance({
                'method' : 'POST',
                'url': '/register',
                'data': {
                        email: email,
                        password: password,
                        name: name,
                        dateOfBirth: date
                }
            }).then((response) => {
                console.log("response of register", response);
                if(response.data.isSignUpSuccessfull){
                    userRoutes.postLoginRequest(response.data.email , response.data.password)
                    .then((res)=> {
                        //dekhna h abhi
                    })
                    return {success: response.data.isSignUpSuccessfull};
                }
            }).catch(err => {
                return {success: false, errMessege: err.response.data };
            }
               
                
        ));
    },
    editProfileRequest: async (profileData) => {
        return(
            await instance({
                'method' : 'POST',
                'url': '/editProfile',
                'data': profileData
                
            }).then((response) => {
                return(response);
            }).catch(err => console.log(err))
        )
    }
}