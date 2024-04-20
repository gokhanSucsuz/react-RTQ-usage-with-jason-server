
import { Button, CircularProgress, Skeleton } from "@mui/material";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store"
import PhotoListItem from "./PhotoListItem";


function PhotoList({ album }) {
    const { data, isError, isFetching } = useFetchPhotosQuery(album)
    const [addPhoto, results] = useAddPhotoMutation()

    const handlePhotoAdd = () => {
        addPhoto(album)
    }
    let content;
    if (isFetching) {
        content = (
            <Skeleton variant="rectangular" sx={{ width: "100%", height: "200px", borderRadius: "20px" }} />
        )
    } else if (isError) {
        content = <div>Error!</div>
    } else {
        content = data.map((photo) => {
            return <PhotoListItem key={photo.id} photo={photo} />
        })
    }

    return (
        <>
            <div className="topArrangement">
                <h1>{album.title}</h1>
                <Button variant="outlined" onClick={handlePhotoAdd}>{results.isLoading ? (
                    <CircularProgress />) : <span>Add Photo +</span>
                }</Button>

            </div>
            <div className="photoDiv">
                {content}
            </div>
        </>
    )

}


export default PhotoList
