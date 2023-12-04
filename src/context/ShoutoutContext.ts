import { createContext } from "react";
import Shoutout from "../models/Shoutout";

interface ShoutoutContextModel {
  shoutouts: Shoutout[];
  nameShoutouts: Shoutout[];
  addNewShout: (shout: Shoutout) => void;
  getUserShoutouts: (name: string) => void;
  deleteSOhandler: (id: string) => void;
  deleteAllShoutOuts: () => void;
  setProfile: (b: boolean) => void;
}

const defaultValues: ShoutoutContextModel = {
  shoutouts: [],
  nameShoutouts: [],
  addNewShout: () => {},
  getUserShoutouts: () => {},
  deleteSOhandler: () => {},
  deleteAllShoutOuts: () => {},
  setProfile: () => {},
};

const ShoutoutContext = createContext(defaultValues);

export default ShoutoutContext;
