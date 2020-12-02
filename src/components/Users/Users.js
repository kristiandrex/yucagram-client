import React from "react";
import { useSelector } from "react-redux";
import User from "./User";

export default function Users() {
    const users = useSelector((state) => state.results.users);

    if (users.length === 0) {
        return null;
    }

    return (
        <div>
            <div className="p-2 border-bottom font-weight-bold text-center">Usuarios</div>
            {
                users.map(user =>
                    <User user={user} key={user._id} />
                )
            }
        </div>
    );
}
