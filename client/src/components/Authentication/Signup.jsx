import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const history = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    await register(username, password, email, phoneNumber, history);

    setUsername("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
  };

  return (
    <>
      <Box as="section" w="100%">
        <Container
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="calc(94vh - 1px)"
          minH="calc(85vh - 1px)"
        >
          <form
            style={{
              padding: 20,
              width: "100%",
            }}
            onSubmit={(e) => onSubmit(e)}
          >
            <FormControl isRequired>
              <FormLabel color="white" htmlFor="username">
                Username
              </FormLabel>
              <Input
                color="white"
                placeholder="Username"
                id="username"
                type="text"
                backgroundColor="#323232"
                letterSpacing={2}
                border="none"
                value={username}
                onChange={(e) => {
                  e.preventDefault();
                  setUsername(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mt={3} isRequired>
              <FormLabel color="white" htmlFor="email">
                Email
              </FormLabel>
              <Input
                color="white"
                placeholder="Email Address"
                id="email"
                type="email"
                backgroundColor="#323232"
                letterSpacing={2}
                border="none"
                value={email}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mt={3} isRequired>
              <FormLabel color="white" htmlFor="phoneNumber">
                Phone Number
              </FormLabel>
              <Input
                color="white"
                placeholder="Phone Number"
                id="phoneNumber"
                type="text"
                backgroundColor="#323232"
                letterSpacing={2}
                border="none"
                value={phoneNumber}
                onChange={(e) => {
                  e.preventDefault();
                  setPhoneNumber(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={3} isRequired>
              <FormLabel color="white" htmlFor="password">
                Password
              </FormLabel>
              <Input
                color="white"
                placeholder="Password"
                id="password"
                type="password"
                backgroundColor="#323232"
                letterSpacing={2}
                border="none"
                value={password}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={5}>
              <Input
                color="white"
                focusBorderColor="red"
                type="submit"
                value="Sign up"
                style={{ cursor: "pointer" }}
                backgroundColor="#121344"
                border="none"
              />
            </FormControl>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Signup;
