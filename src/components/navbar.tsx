import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const signUserOut = async () => {
    await signOut(auth);
  };
  const [user] = useAuthState(auth);
  return (
    <div className="navbar">
      <div className="links">
        <Link to={"/"}>Home </Link>
        {user ? (
          <Link to={"/createpost"}> Create Post</Link>
        ) : (
          <Link to={"/login"}> Login</Link>
        )}
      </div>
      <div className="user">
        {user && (
          <>
            <p style={{ gap: 10, fontWeight: 40 }}>{user?.displayName}</p>
            <img
              src={user?.photoURL || " "}
              width="40"
              height="40"
              referrerPolicy="no-referrer"
            />
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};
