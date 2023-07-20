import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { siginWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Wrong password!");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email!");
          break;
        default:
          console.log("error when sigining in", error);
      }
    }
  };

  //general function
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const signInWithGoogle = async () => {
    await siginWithGooglePopup();
  };
  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            required: true,
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />

        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password,
          }}
        />

        <ButtonsContainer>
          <Button buttonOptions={{ type: "submit" }}>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            buttonOptions={{ type: "button", onClick: signInWithGoogle }}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
