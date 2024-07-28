function formatError(input: string): string {
  const matches: { [key: string]: string } = {
    "invalid password": "The password you provided is incorrect.",
    "user does not exist": "No user exists with the provided credentials.",
    "no user exists with the provided credentials":
      "No user exists with the provided credentials.",
    "account has not been activated": "Please activate your account.",
    "invalid email": "The email you provided is invalid.",
    "user with provided email exists": "A user with the provided email exists.",
    "user with provided phone_number exists":
      "A user with the provided phone_number exists.",
    "failed to read request body":
      "There was an issue processing your request.",
    "unauthorized request": "You are not authorized to perform this action.",
    "token is invalid": "The token provided is invalid.",
    "account has already been activated": "Your account is already activated.",
    "failed to create listing": "There was an issue creating your listing.",
    "failed to get listings": "There was an issue retrieving the listings.",
    "failed to get listing": "There was an issue retrieving the listing.",
    "failed to update listing": "There was an issue updating your listing.",
    "failed to delete listing": "There was an issue deleting your listing.",
    "failed to upload image": "There was an issue uploading the image.",
    "failed to open file": "There was an issue opening the file.",
    "invalid file": "The file provided is invalid.",
    "failed to update image": "There was an issue updating the image.",
    "failed to delete image from Cloudinary":
      "There was an issue deleting the image from Cloudinary.",
    "internal server error":
      "An internal server error occurred. Please try again later.",
    "unable to parse request body": "The request body could not be parsed.",
    "unable to hash password": "There was an issue hashing the password.",
    "unable to create accessToken":
      "There was an issue creating the access token.",
    "Failed to generate tokens": "There was an issue generating the tokens.",
    "expired refresh token": "The refresh token has expired.",
    "invalid refresh token": "The refresh token provided is invalid.",
    "account created. please activate your account":
      "Your account has been created. Please check your email to activate it.",
    "password change successful":
      "Your password has been successfully changed.",
    "logged in": "You have successfully logged in.",
    "account has been activated":
      "Your account has been successfully activated.",
    "listing created": "Your listing has been successfully created.",
    "listing deleted successfully":
      "Your listing has been successfully deleted.",
  };

  return matches[input] || "An unknown error occurred. Please try again.";
}

export { formatError };
