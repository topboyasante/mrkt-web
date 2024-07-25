import React from "react";
import ForgotPasswordForm from "./components/forgot-password";

function ForgotPasswordPage() {
  return (
    <div className="w-full h-full bg-gradient-to-t from-[#ffffff] to-primary">
      <div className="max-w-md mx-auto min-h-screen flex justify-center items-center p-3">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
