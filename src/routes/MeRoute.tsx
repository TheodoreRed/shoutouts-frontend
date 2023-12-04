import { useContext, useEffect } from "react";
import ShoutoutList from "../components/ShoutoutList";
import "./MeRoute.css";
import AuthContext from "../context/AuthContext";
import ShoutoutContext from "../context/ShoutoutContext";
import { useNavigate } from "react-router-dom";

const MeRoute = () => {
  const { user } = useContext(AuthContext);
  const { setProfile } = useContext(ShoutoutContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfile(true);
    } else {
      // send user back home if not logged in
      navigate("/");
    }
  });
  return (
    <div className="MeRoute">
      <h2>All shoutouts to or from myself</h2>
      <ShoutoutList userName={""} />
    </div>
  );
};

export default MeRoute;
