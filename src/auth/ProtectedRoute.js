import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate} from "react-router-dom";
import Cookies from "universal-cookie";


const cookie = new Cookies();



export const ProtectedRoute = ({ children }) => {
    const token = cookie.get("STUDENTTOKEN")
    return token ? children : window.location.href = "/login"

};