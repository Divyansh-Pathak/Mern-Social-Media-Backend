import instance, {multipartInstance} from './instance';

export default {
    getPosts: async () =>{
        return (
            await instance({
                'method':'GET',
                'url':'/posts',
                'params': {
                    'search':'parameter',
                },
            })	.then((response) => {
                if(response.status === 200){
                const posts= response.data;
                return(posts);
                }else{
                  return("NO POST YET");
                } 
              }).catch(err => "No Post Yet")
        );
    },

    postPosts: async (getfile, caption, tags, userName, setProgress) => {
        let formData = new FormData();
        for (let i = 0; i < getfile.length; i++) {
          formData.append('files', getfile[i])
        }
        formData.append("caption", caption);
        formData.append("tags", tags);
        formData.append("uploadedBy", userName);
       return( multipartInstance({
            'method':'POST',
            'url':'/upload',
            'data': formData,
            onUploadProgress: function (progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
                console.log("This IS progress event", percentCompleted);
              },
        }) .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        }));
      },

      postText: async ( caption, tags, userName, setProgress) => {
       return( instance({
            'method':'POST',
            'url':'/uploadText',
            'data': {
              caption: caption,
              tags: tags,
              userName: userName,
            },
            onUploadProgress: function (progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
                console.log("This IS progress event", percentCompleted);
              },
        }) .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        }));
      },
    
    postComment: async (commentData) =>
     instance({
        'method': 'POST',
        'url':'/comment',
        'data': commentData,
    }).then((response)=>console.log(response)).catch(err => "Error in Commenting")
}