import { jwtDecode } from "jwt-decode";

const verifyTokenTimerIsValid = () => {
    const token = localStorage.getItem("token")
    if (token == null) {
        return null
    } 
    let decodedToken = jwtDecode(token)
    console.log(decodedToken)
    let currentDate = new Date();
    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        return false
    } else {
        return true
    }
}
const validateTokenTimer = () => {
    const isValid = verifyTokenTimerIsValid();
    if (isValid !== null && isValid === false) {
        alert("Token has expired! return to login...");
        localStorage.clear();
        window.location.href = "/";
    }
};
const getExpiredTime = () => {
    const token = localStorage.getItem("token")
    if (token == null) {
        return null
    }
    let decodedToken = jwtDecode(token)
    return decodedToken.exp
}

const getTokenSeconds = () => {
    const token = localStorage.getItem("token")
    let seconds 
    try {
        let decodedToken = jwtDecode(token)
        let d = new Date(decodedToken.exp * 1000)
        let currentDate = new Date()
        seconds = Math.max((d.getTime() - currentDate.getTime()) / 1000, 0)
    } catch (error) {
        seconds = "0"
    }
    return seconds
}

export { verifyTokenTimerIsValid, getExpiredTime, validateTokenTimer, getTokenSeconds } 