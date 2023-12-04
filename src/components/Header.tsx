import { useContext } from "react";
import { firebaseConfig, signInWithGoogle, signOut } from "../firebaseApp";
import "./Header.css";
import AuthContext from "../context/AuthContext";

interface Props {
  userName: string;
}

const Header = ({ userName }: Props) => {
  const { user } = useContext(AuthContext);
  console.log(user);

  console.log(firebaseConfig);

  return (
    <header className="Header">
      {userName ? (
        <h1>Shout Outs for {`${userName}`}</h1>
      ) : (
        <h1>All Shout Outs</h1>
      )}
      {!user ? (
        <button onClick={signInWithGoogle}>Sign In</button>
      ) : (
        <>
          <button onClick={signOut}>Sign Out</button>
          <p>Welcome, {user.displayName}</p>
          <img src={user.photoURL || "img"} alt="" />
        </>
      )}
    </header>
  );
};

export default Header;
