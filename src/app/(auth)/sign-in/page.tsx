import SignInForm from "./components/sign-in";

function SignInPage() {
  return (
    <div className="w-full h-full bg-gradient-to-t from-[#ffffff] to-primary">
      <div className="max-w-md mx-auto min-h-screen flex justify-center items-center p-3">
        <SignInForm />
      </div>
    </div>
  );
}

export default SignInPage;
