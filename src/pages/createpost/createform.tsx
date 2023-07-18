import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  interface CreateFormData {
    title: string;
    description: string;
  }
  const schema = yup.object().shape({
    title: yup.string().required("please write the title"),
    description: yup.string().required("please write the description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsref = collection(db, "posts");

  const submitform = async (data: CreateFormData) => {
    await addDoc(postsref, {
      description: data.description,
      title: data.title,
      userid: user?.uid,
      username: user?.displayName,
    });
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitform)}>
        <input placeholder="Enter the title" {...register("title")} />
        <p style={{ color: "red" }}>{errors.title?.message}</p>
        <textarea
          placeholder="Enter the description"
          {...register("description")}
        />
        <p style={{ color: "red" }}>{errors.description?.message}</p>
        <input type="submit" className="submitForm" />
      </form>
    </div>
  );
};
