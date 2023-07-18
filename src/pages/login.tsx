import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const signinwithGoogle = async () => {
    const user = await signInWithPopup(auth, provider);
    console.log(user);
    navigate("/");
  };
  return (
    <div>
      <p>Sign in with Google to Continue</p>
      <button onClick={signinwithGoogle}>Sign in with Google</button>
    </div>
  );
};
