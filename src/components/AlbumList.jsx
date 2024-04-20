import { useFetchAlbumsQuery } from "../store"


function AlbumList({ user }) {
    const { data, isError, isFetching } = useFetchAlbumsQuery(user)
    return (
        <div>{user.name} Album</div>
    )
}

export default AlbumList