/* eslint-disable react/prop-types */
import { GoTrash } from "react-icons/go"
import { useRemovePhotoMutation } from "../store"
import { CircularProgress } from "@mui/material";

const PhotoListItem = ({ photo }) => {

    const [removePhoto, results] = useRemovePhotoMutation();

    const handleRemovePhoto = () => {
        removePhoto(photo)
    }


    return (
        <div style={{ position: "relative" }}>
            <img src={photo.url} alt="" />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} >
                {results.isLoading ? (<CircularProgress style={{ width: "20px", height: "20px" }} />) : (<GoTrash style={{ fontSize: "30px", cursor: "pointer" }} onClick={handleRemovePhoto} color="red" />)}

            </div>
        </div >
    )
}

export default PhotoListItem