import React from "react";
import SignUpForm from "./components/sign-up";

function SignUpPage() {
  return (
    <div className="w-full h-full bg-gradient-to-t from-[#ffffff] to-primary">
      <div className="max-w-md mx-auto min-h-screen flex justify-center items-center px-3">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUpPage;
