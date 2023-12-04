import { Link, useParams } from "react-router-dom";
import "./UserShoutouts.css";
import { useContext, useEffect } from "react";
//import Shoutout from "../models/Shoutout";
import ShoutoutContext from "../context/ShoutoutContext";
import ShoutoutForm from "./ShoutoutForm";

interface Props {
  getUserNameFromPath: (s: string) => void;
}

const UserShoutouts = ({ getUserNameFromPath }: Props) => {
  const { shoutouts } = useContext(ShoutoutContext);
  const { name } = useParams();
  const { getUserShoutouts, nameShoutouts } = useContext(ShoutoutContext);

  useEffect(() => {
    if (name) {
      getUserShoutouts(name);
      getUserNameFromPath(name);
    }
  }, [name, shoutouts]);

  return (
    <div className="UserShoutouts">
      <Link to="/" onClick={() => getUserNameFromPath("")}>
        Back to All Shoutouts
      </Link>
      {
        <ul>
          {nameShoutouts ? (
            nameShoutouts.map((shout) => {
              return (
                <li key={shout._id}>
                  <h2>Shout out to {shout.to}</h2>
                  <p className="fromUser">
                    - from<Link to={`/user/${shout.from}`}>{shout.from}</Link>
                  </p>
                  <p className="text">{shout.text}</p>
                </li>
              );
            })
          ) : (
            <p>Loading</p>
          )}
        </ul>
      }
      <ShoutoutForm userName={name} />
    </div>
  );
};

export default UserShoutouts;
