import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import "./ShoutoutForm.css";
import ShoutoutContext from "../context/ShoutoutContext";
import AuthContext from "../context/AuthContext";
import Shoutout from "../models/Shoutout";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseApp";

interface Props {
  userName: string | undefined;
}

const ShoutoutForm = ({ userName }: Props) => {
  const { user } = useContext(AuthContext);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState(user?.displayName || "");
  const [shoutout, setShoutout] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { addNewShout } = useContext(ShoutoutContext);

  useEffect(() => {
    if (userName) {
      setTo(userName);
    } else {
      setTo("");
    }
  }, [userName]);

  useEffect(() => {
    if (user) {
      setFrom(user.displayName || "");
    } else {
      setFrom("");
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newShoutOut: Shoutout = { to, from, text: shoutout };
    if (user && user.photoURL) {
      newShoutOut.photoUrl = user.photoURL;
    }

    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const newFile = files[0];
      const storageRef = ref(storage, "shoutout-files/" + newFile.name);
      try {
        // sending the photo to storage bucket(like database)
        const snapshot = await uploadBytes(storageRef, newFile);
        // Get that photo reference from the storage bucket
        const downloadURL = await getDownloadURL(snapshot.ref);

        newShoutOut.shoutoutImg = downloadURL;
        save(newShoutOut);
        console.log(downloadURL);
      } catch (error) {
        console.log("Fail", error);
      }
    } else {
      save(newShoutOut);
    }
  };

  function save(newShoutOut: Shoutout) {
    addNewShout(newShoutOut);
    setTo(userName || "");
    setFrom(user?.displayName || "");
    setShoutout("");
    formRef.current?.reset();
  }

  return (
    <form
      ref={formRef}
      className="ShoutoutForm"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2>Leave a Shout Out</h2>
      <label htmlFor="to">To</label>
      <input
        type="text"
        name="to"
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={userName !== ""}
      />
      <label htmlFor="from">From</label>
      <input
        type="text"
        name="from"
        id="from"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={user !== null}
      />
      <label htmlFor="file">Upload image:</label>
      <input type="file" name="file" id="file" ref={fileInputRef} />
      <label htmlFor="shoutout">Shoutout</label>
      <textarea
        rows={4}
        name="shoutout"
        id="shoutout"
        value={shoutout}
        onChange={(e) => setShoutout(e.target.value)}
      />
      <button type="submit">Submit Shout Out</button>
    </form>
  );
};

export default ShoutoutForm;
