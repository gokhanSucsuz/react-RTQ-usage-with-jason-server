import { Skeleton } from "@mui/material";
import { useFetchUsersQuery } from "../store"
import { UserListItem } from "./UserListItem";

export const UserList = () => {
    const { data, isError, isFetching } = useFetchUsersQuery();

    let content;
    if (isFetching) {
        content = (
            <Skeleton variant="rectangular" sx={{ width: "100%", height: "600px" }} />
        )
    } else if (isError) {
        content = <div>Error!</div>
    } else {
        content = data.map((user, index) => {
            return <UserListItem key={index} user={user} />
        })
    }

    return (
        <div>{content}</div>
    )
}
