import React from "react";
import { Route } from "react-router-dom";
import AuthGuard from "../guards/AuthGuard";
import LoggedScreen from "../components/screens/account/LoggedScreen"

const AuthRoutes = [
    <Route key="ScreenLoged" path="/logged" element={<AuthGuard component={<LoggedScreen />} />} />,
]

export default AuthRoutes;