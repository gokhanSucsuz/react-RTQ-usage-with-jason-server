import { Button, CircularProgress, Skeleton } from "@mui/material";
import { useAddUserMutation, useFetchUsersQuery } from "../store"
import { UserListItem } from "./UserListItem";

export const UserList = () => {
    const { data: record, isError, isFetching } = useFetchUsersQuery();
    const [addUser, results] = useAddUserMutation();

    const handleUserAdd = () => {
        addUser()
    }
    let content;
    if (isFetching) {
        content = (
            <Skeleton variant="rectangular" sx={{ width: "100%", height: "600px" }} />
        )
    } else if (isError) {
        content = <div>Error!</div>
    } else {
        content = record.map((user, index) => {
            return <UserListItem key={index} user={user} />
        })
    }

    return (
        <div>
            <div className="topArrangement">
                <h1>Contacts</h1>
                <Button variant="outlined" onClick={handleUserAdd}>{results.isLoading ? (
                    <CircularProgress />) : <span>Add Contact +</span>
                }</Button>
            </div>
            {content}</div>
    )
}
