import { useParams } from "react-router-dom"

export function ExtendedCard({ users }) {

    const { id } = useParams();
    const user = users.find(u => u.id === Number(id))

    if (!user) return <div>User not found</div>;

    return (
        <div>
            <img src={user.avatar} alt={user.username} />
            <p><span>Name: </span>{user.fullname}</p>
            <p><span>User Name: </span>{user.username}</p>
            <p><span>Password: </span>{user.password}</p>
            <p><span>Email: </span>{user.email}</p>
            <p><span>Phone: </span>{user.phone}</p>
            <p><span>Address: </span>{user.address}</p>
        </div>
    )
}