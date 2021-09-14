import React from 'react';
import './interestBox.css';

export default () => {
    const listItems = ["Painting", "Artworks", "Coding", "Designing", "Photography", "Corona", "Computer Science", "Motivation"];
    const handleChange = (event) => {
        console.log("Interest Box Change", {event});
    };
    return (
        <div className="interest-box">
            <p>Choose your Feed type...</p>
            {listItems.map((item) => {
              return ( <div className="interest-box-input">
              <p>
              <input onChange={handleChange} type="checkbox" id={item} name={item} value={item} />
                <label for={item}>{item}</label>
              </p>
                  
                </div>);
            })}

        </div>
    )
}

{
    import React, { useContext, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import "./cropper.css";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import getCroppedImg, { generateDownload } from "./utils/cropImage";
import { Grid, IconButton, makeStyles, Paper } from "@material-ui/core";
import { SnackbarContext } from "../HelperComponents/snackbar";
import { dataURLtoFile } from "./utils/dataURLtoFile";
import userContext from '../../helpers/userContext';
import axios from 'axios';



const useStyles = makeStyles( (theme)=>({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        margin: 0,
        width: "100%",
        height: "100%"
      },
    iconButton: {
        position: "absolute",
        top: "20px",
        right: "20px",
    },
    cancelIcon: {
        color: "#00a3c8",
        // fontSize: "50px",
        "&:hover": {
            color: "red",
        },

    },
    mainContainer: {
        // display: "flex",
        // justifyContent: "center",
        height: "70%",
        width: "80%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        alignItems: "stretch",
    },
    mainGrid:{
        height:"100%",
    },
    containerCropper: {
        height: "100%",
        padding: "10px",
        // flexGrow: "1",
        // backgroundColor: "red",
    },
    cropperGrid: {
        height: "100%",
    },
    containerButtons: {
        border: "1px solid #f5f5f5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "white",
    },
    buttonGrid: {
        height: "100%",
    },
}));

export default function CropperBox({ handleCropper }) {
    const classes = useStyles();
    const userDetails = useContext(userContext);
    const userProfileImage = userDetails ? userDetails.profileImageURL : "User";

    const inputRef = React.useRef();

    const triggerFileSelectPopup = () => inputRef.current.click();

    const setStateSnackbarContext = React.useContext(SnackbarContext);

    const [image, setImage] = React.useState(null);
    const [croppedArea, setCroppedArea] = React.useState(null);
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    const [zoom, setZoom] = React.useState(1);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) =>
        setCroppedArea(croppedAreaPixels);

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", () => {
                console.log(reader.result);
                setImage(reader.result);
            });
        }
    };



    const onClear = () => {
        if (!image)
            return setStateSnackbarContext(
                true,
                "Please select an image!",
                "warning"
            );

        setImage(null);
    };

    const onUpload = async () => {
        if (!image)
            return setStateSnackbarContext(
                true,
                "Please select an image!",
                "warning"
            );

        const canvas = await getCroppedImg(image, croppedArea);
        const canvasDataUrl = canvas.toDataURL("image/jpeg");
        const convertedUrlToFile = dataURLtoFile(
            canvasDataUrl,
            "cropped-image.jpeg"
        );
        let formData = new FormData();
        formData.append("file", convertedUrlToFile);
        formData.append("check", "this is check");

        console.log(formData);

        try {


            const res = await fetch("http://localhost:4000/uploadProfileImage", {
                method: "POST",
                body: formData,
                headers: {
                    'Access-Control-Allow-Origin': '*',

                },
                withCredentials: true,
                credentials: 'include',
            });

            const res2 = await res.json();
            setStateSnackbarContext(
                true,
                "Image updated successfully",
                "success"
            );
            console.log(res2);
        } catch (err) {
            console.warn(err);
        }
    };

    return (



        <Container maxWidth="sm" className={classes.mainContainer}>
            {/* <IconButton className={classes.iconButton} onClick={handleCropper}>
                <CancelIcon className={classes.cancelIcon} />
            </IconButton> */}

            <Paper className={classes.paper}>
                <Grid container spacing={2} className= {classes.mainGrid}>
                    <Grid item className={classes.buttonGrid}>
                    <Container maxWidth="sm" className={classes.containerButtons}>
                <input
                    type='file'
                    accept='image/*'
                    ref={inputRef}
                    onChange={onSelectFile}
                    style={{ display: "none" }}
                />

                <Button
                    onClick={() => onClear()}
                    variant='contained'
                    color='primary'
                    style={{ marginRight: "10px" }}
                >
                    Clear
				</Button>

                <Button
                    variant='contained'
                    color='primary'
                    onClick={triggerFileSelectPopup}
                    style={{ marginRight: "10px" }}
                >
                    Choose
				</Button>


                <Button variant='contained' color='secondary' onClick={onUpload}>
                    Upload
				</Button>
            </Container>
                    </Grid>
                    <Grid item xs={12} sm container className={classes.cropperGrid}>
                    <Container maxWidth='sm' className={classes.containerCropper}>
                {image ? (
                    <>
                     
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                      

                        <div className='slider'>
                            <Slider
                                min={1}
                                max={3}
                                step={0.1}
                                value={zoom}
                                onChange={(e, zoom) => setZoom(zoom)}
                                color='secondary'
                            />
                        </div>
                    </>
                ) : null}
            </Container>
                    </Grid>
                </Grid>
            </Paper>

           


            



        </Container>
    );
}




//--------------------------------------------

 // function getInitialImage(url) {
    //     axios.get(url,
    //         {
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*',
    //                 'Content-Type': 'application/json'
    //             },
    //             withCredentials: true
    //         })
    //         .then((response) => {
    //             return response.blob()
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //     };

    // useEffect(() => {

    //     const blob = getInitialImage("http://localhost:4000/image/fbbb1b7e5613b859acd71a509ded31d3.jpeg");

    //     console.log(blob);











    //     // console.log("userDetails", userDetails);
    //     // // let url = `http://localhost:4000/image/${userDetails.profileImageURL}`;
    //     // const toDataURL = (url) => fetch("http://localhost:4000/image/fbbb1b7e5613b859acd71a509ded31d3.jpeg")
    //     //     .then(response => response.blob())
    //     // //   .then(blob => new Promise((resolve, reject) => {
    //     // //   const reader = new FileReader()
    //     // //   reader.onloadend = () => resolve(reader.result)
    //     // //   reader.onerror = reject
    //     // //   reader.readAsDataURL(blob)
    //     // //   setImage(reader.result);
    //     // //  }));

    //     // const blob = toDataURL();
    //     // console.log(blob);
    // }, userProfileImage);





     // const onDownload = () => {
    //     // if (!image)
    //     // 	return setStateSnackbarContext(
    //     // 		true,
    //     // 		"Please select an image!",
    //     // 		"warning"
    //     // 	);

    //     generateDownload(image, croppedArea);
    // };
}