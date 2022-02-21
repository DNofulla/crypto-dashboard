import { Alert, AlertIcon, Text } from "@chakra-ui/react";
import React from "react";
import { Navigate } from "react-router";
import { Routes as Switch, Route, Link } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import NavBar from "./components/NavBar/NavBar";
import PhoneVerification from "./components/Verification/PhoneVerification";
import Welcome from "./components/WelcomePage/Welcome";
import { useAuthState } from "./utils/AuthContext";

const App = () => {
  const { state } = useAuthState();

  return (
    <div style={{ backgroundColor: "#121212", height: "100vh", width: "100%" }}>
      <NavBar />

      <Switch>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/phone/verify" element={<PhoneVerification />} />
        <Route path="*" element={<Navigate />} />
      </Switch>

      {state.isAuth && !state.user.verified ? (
        <Alert position="absolute" bottom={0} status="info">
          <AlertIcon />

          <Link to="/phone/verify">
            <Text>
              Looks like your phone number is not verified! Click here to verify
              it!
            </Text>
          </Link>
        </Alert>
      ) : null}
    </div>
  );
};

export default App;
