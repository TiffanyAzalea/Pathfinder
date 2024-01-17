import React from 'react';

const useLogin = () => {
    let foundUser = "";
    const loggedInUser = localStorage.getItem("user");
    const loggedInToken = localStorage.getItem("token");
    if (loggedInToken === "token123") {
        foundUser = loggedInUser;
    }
    return foundUser;
}

export default useLogin;