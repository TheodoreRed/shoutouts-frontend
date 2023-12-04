import { useContext } from "react";
import "./ShoutoutList.css";
import ShoutoutContext from "../context/ShoutoutContext";
import ShoutoutForm from "./ShoutoutForm";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

interface Props {
  userName: string;
}

const ShoutoutList = ({ userName }: Props) => {
  const { shoutouts, deleteSOhandler, deleteAllShoutOuts } =
    useContext(ShoutoutContext);

  const { user } = useContext(AuthContext);

  return (
    <div className="ShoutoutList">
      {user ? <ShoutoutForm userName={userName} /> : <p>Sign In</p>}
      <ul>
        {shoutouts ? (
          shoutouts.map((shout) => {
            return (
              <li key={shout._id}>
                <h2>
                  Shout out to <Link to={`/user/${shout.to}`}>{shout.to}</Link>
                </h2>
                <p className="fromUser">
                  From:<Link to={`/user/${shout.from}`}>{shout.from}</Link>
                  {shout.photoUrl && <img src={shout.photoUrl} />}
                </p>
                <p className="text">{shout.text}</p>
                {shout.shoutoutImg && <img src={shout.shoutoutImg} alt="" />}
                <button onClick={() => deleteSOhandler(shout._id!)}>
                  Delete
                </button>
              </li>
            );
          })
        ) : (
          <p>Loading</p>
        )}
      </ul>
      <button className="deleteAllBtn" onClick={() => deleteAllShoutOuts()}>
        DELETE ALL
      </button>
    </div>
  );
};

export default ShoutoutList;
