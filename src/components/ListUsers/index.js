import { useSelector } from "react-redux";
import ListUsersItem from "./ListUsersItem";

export default function ListUsers() {
  const users = useSelector((state) => state.search.users);

  if (users.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="p-2 border-bottom font-weight-bold text-center">
        Usuarios
      </div>
      {users.map((user) => (
        <ListUsersItem user={user} key={user._id} />
      ))}
    </div>
  );
}
