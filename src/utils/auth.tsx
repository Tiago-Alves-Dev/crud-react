import { Constants } from "../config/constants";

export const isAuthenticated = () => {
    if (localStorage.getItem(Constants.currentUser)) {
    // logged in so return true
        return true;
    }

    // not logged in so return false 
    return false;
};