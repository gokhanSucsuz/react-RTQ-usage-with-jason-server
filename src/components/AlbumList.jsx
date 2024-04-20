import { Button, CircularProgress, Skeleton } from "@mui/material";
import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store"
import AlbumListItem from "./AlbumListItem";


function AlbumList({ user }) {
    const { data, isError, isFetching } = useFetchAlbumsQuery(user)
    const [addAlbum, results] = useAddAlbumMutation()

    const handleAlbumAdd = () => {
        addAlbum(user)
    }
    let content;
    if (isFetching) {
        content = (
            <Skeleton variant="rectangular" sx={{ width: "100%", height: "200px", borderRadius: "20px" }} />
        )
    } else if (isError) {
        content = <div>Error!</div>
    } else {
        content = data.map((album) => {
            return <AlbumListItem key={album.id} album={album} />
        })
    }

    return (
        <>
            <div className="topArrangement">
                <h1>{user.name}</h1>
                <Button variant="outlined" onClick={handleAlbumAdd}>{results.isLoading ? (
                    <CircularProgress />) : <span>Add Album +</span>
                }</Button>

            </div>
            <div >
                {content}
            </div>
        </>
    )

}

export default AlbumList