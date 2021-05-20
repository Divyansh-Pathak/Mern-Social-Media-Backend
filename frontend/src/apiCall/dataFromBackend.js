import instance from './instance';

export default {
    requestAllCommunities: async () => {
        return (
            instance({
                "method":"GET",
                "url":"/communities",

            }).then((response)=>{
                return(response.data);
            }).catch(err => console.log(err))
        );
    }
}