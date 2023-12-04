import { ReactNode, useContext, useEffect, useState } from "react";
import ShoutoutContext from "./ShoutoutContext";
import Shoutout from "../models/Shoutout";
import {
  createShoutout,
  deleteShoutoutById,
  deleteShoutouts,
  getShoutouts,
} from "../services/shoutoutApi";
import AuthContext from "./AuthContext";

interface Props {
  children: ReactNode;
}

const ShoutoutContextProvider = ({ children }: Props) => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const [nameShoutouts, setNameShoutOuts] = useState<Shoutout[]>([]);
  const [profile, setProfile] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getShoutouts().then((res) => setShoutouts(res));
  }, []);

  useEffect(() => {
    if (profile) {
      getShoutouts().then((res) => {
        const filteredRes = res.filter(
          (shout) =>
            shout.to === user?.displayName || shout.from === user?.displayName
        );
        setShoutouts(filteredRes);
      });
    } else {
      getShoutouts(user?.displayName);
    }
  }, [profile]);

  const getUserShoutouts = async (name: string) => {
    setNameShoutOuts(await getShoutouts(name));
  };

  // POST
  const addNewShout = async (shout: Shoutout): Promise<void> => {
    await createShoutout(shout);
    setShoutouts(await getShoutouts());
  };

  //DELETE Every shoutout
  const deleteAllShoutOuts = async (): Promise<void> => {
    await deleteShoutouts();
    setShoutouts(await getShoutouts());
  };

  //DELETE
  const deleteSOhandler = async (id: string): Promise<void> => {
    await deleteShoutoutById(id);
    setShoutouts(await getShoutouts());
  };

  return (
    <ShoutoutContext.Provider
      value={{
        shoutouts,
        nameShoutouts,
        addNewShout,
        getUserShoutouts,
        deleteSOhandler,
        deleteAllShoutOuts,
        setProfile,
      }}
    >
      {children}
    </ShoutoutContext.Provider>
  );
};

export default ShoutoutContextProvider;
