// import {isAuth , setAuth, user, setUser} from './globalStates';
// import userRoutes from '../apiCall/user';

class Auth {
    constructor() {
      this.authenticated = false;
    }
  
    login() {
      this.authenticated = true;
    }
  
    logout() {
      this.authenticated = false;
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }

  export default new Auth;

// export default {
//     login: async ()=> {
//         setAuth(true);
//         userApi.getUser().then((user)=>{
//             setUser(user);
//         })
//       },
    
//       logout: (cb)=> {
//         setAuth(false);
//         setUser("noUser");
//       },
    
//       isAuthenticated: ()=> {
//         return isAuth;
//       }

// };