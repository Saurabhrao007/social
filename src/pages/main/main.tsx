import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./post";

export interface Post {
  id: string;
  description: string;
  title: string;
  userid: string;
  username: string;
}

export const Main = () => {
  const [postlist, setpostlist] = useState<Post[] | null>(null);
  const postsref = collection(db, "posts");

  const getposts = async () => {
    const post = await getDocs(postsref);
    setpostlist(
      post.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };
  useEffect(() => {
    getposts();
  }, []);

  return (
    <div>
      {postlist?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};
