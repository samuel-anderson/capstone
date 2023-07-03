import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  siginWithGooglePopup,
  //signinWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";

const SignIn = () => {
  useEffect(() => {
    const getResponse = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    };

    getResponse();
  }, []); //empty array, run once, when mounts

  const logGoogleUser = async () => {
    const { user } = await siginWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <Button buttonType="google" buttonOptions={{ onClick: logGoogleUser }}>
        Sign in with Google Popup
      </Button>
      <SignUpForm />

      {/* <button onClick={signinWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
    </div>
  );
};

export default SignIn;
