import { CircularProgress } from "@mui/material"
import { useRemoveAlbumMutation } from "../store"
import ExpandablePanel from "./ExpandablePanel"
import PhotoList from "./PhotoList"
import { GoTrash } from "react-icons/go"

const AlbumListItem = ({ album }) => {

    const [removeAlbum, results] = useRemoveAlbumMutation(album)

    const handleClick = () => {
        removeAlbum(album)
    }

    const header = (
        <>
            {results.isLoading ? (
                <CircularProgress style={{ width: 20, height: 20, marginRight: 3 }} />) : <button style={{ marginRight: 30, border: "none", cursor: "pointer" }} onClick={handleClick}><GoTrash /></button>}
            {album.title}

        </>
    )

    return (
        <div>
            <ExpandablePanel header={header} >
                <PhotoList album={album} />
            </ExpandablePanel>
        </div>
    )
}

export default AlbumListItem