import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { Post as Ipost } from "./main";

interface Props {
  post: Ipost;
}
interface Like {
  likeid: string;
  userid: string;
}

export const Post = (props: Props) => {
  const [likes, setlikes] = useState<Like[] | null>(null);
  const likesref = collection(db, "likes");

  const [user] = useAuthState(auth);

  const addlikes = async () => {
    try {
      const newdoc = await addDoc(likesref, {
        userid: user?.uid,
        postid: post.id,
      });
      if (user) {
        setlikes((prev) =>
          prev
            ? [...prev, { userid: user.uid, likeid: newdoc.id }]
            : [{ userid: user.uid, likeid: newdoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removelikes = async () => {
    try {
      const linkdeletequery = query(
        likesref,
        where("postid", "==", post.id),
        where("userid", "==", user?.uid)
      );

      const linkdeletedata = await getDocs(linkdeletequery);
      const likeid = linkdeletedata.docs[0].id;
      const linkdelete = doc(db, "likes", likeid);
      await deleteDoc(linkdelete);
      if (user) {
        setlikes(
          (prev) => prev && prev.filter((like) => like.likeid !== likeid)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getlikes = async () => {
    const likes = await getDocs(likesdoc);
    setlikes(
      likes.docs.map((doc) => ({ userid: doc.data().userid, likeid: doc.id }))
    );
  };
  const { post } = props;

  const likesdoc = query(likesref, where("postid", "==", post.id));

  const hasuserliked = likes?.find((like) => like.userid === user?.uid);

  useEffect(() => {
    getlikes();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="description">{post.description}</div>
      <div className="username">
        <p>@{post.username}</p>
        {hasuserliked ? (
          <button onClick={removelikes}>👎 </button>
        ) : (
          <button onClick={addlikes}>👍 </button>
        )}
        {likes && <p>Likes : {likes.length}</p>}
      </div>
    </div>
  );
};
