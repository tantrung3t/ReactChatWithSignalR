import { useState } from "react"

type props = {
    joinRoom: any
}

export const JoinRoom = (props: props) => {
    const [user, setUser] = useState<string>();
    const [room, setRoom] = useState<string>();

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.joinRoom(user, room);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
            <input placeholder="name" onChange={(e) => setUser(e.target.value)} />
            </div>
            <div>
            <input placeholder="room" onChange={(e) => setRoom(e.target.value)} />
            </div>
            <button type="submit">Join</button>
        </form>
    )
}