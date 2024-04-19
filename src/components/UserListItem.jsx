/* eslint-disable react/prop-types */
import { GoTrash } from "react-icons/go"
import AlbumList from "./AlbumList"
import ExpandablePanel from "./ExpandablePanel"
import { useRemoveUserMutation } from "../store"
import { CircularProgress } from "@mui/material"

export const UserListItem = ({ user }) => {

    const [removeUser, results] = useRemoveUserMutation()
    const handleClick = () => {
        removeUser(user)
    }
    const header = (
        <>
            {results.isLoading ? (
                <CircularProgress style={{ width: 20, height: 20, marginRight: 3 }} />) : <button style={{ marginRight: 30, border: "none", cursor: "pointer" }} onClick={handleClick}><GoTrash /></button>}
            {user.name}

        </>
    )
    return (
        <div>
            <ExpandablePanel header={header} >
                <AlbumList user={user} />
            </ExpandablePanel>
        </div>
    )
}
