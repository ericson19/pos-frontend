import { useEffect } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { useContext } from "react";

export default function NameDisplay() {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <p className="inline my-2 px-2">Guest!</p>;
  }

  return <p className="inline my-2 px-2">{user.name}!</p>;
}
