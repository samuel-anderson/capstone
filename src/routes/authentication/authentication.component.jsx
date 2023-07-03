import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import "./authentication.styles.scss";

const Authentication = () => {
  // useEffect(() => {
  //   const getResponse = async () => {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   };

  //   getResponse();
  // }, []); //empty array, run once, when mounts

  return (
    <div className="authetication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
