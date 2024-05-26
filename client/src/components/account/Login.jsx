import React, { useState } from "react";
import { Box, TextField, Button, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  margin-top: 120px;
`;
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const Heading = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: green;
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  height: 48px;
  border-radius: 2px;
  color: #fff;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  height: 48px;
  border-radius: 2px;
  color: #2874f0;
  border: none;
  box-shadow: 0px 2px 8px rgb(0, 0, 0, 0.3);
`;

const Text = styled(Typography)`
  color: green;
  text-align: center;
`;

const Login = () => {
  const [account, toggleAccount] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = account === "login" ? "/api/login" : "/api/signup";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      // Handle response, e.g., store token, redirect, etc.
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const toggleSignup = () => {
    toggleAccount((prev) => (prev === "signup" ? "login" : "signup"));
    setFormData({ username: "", email: "", password: "" }); // Reset form data
  };

  return (
    <Component>
      <Wrapper>
        <Heading>{account === "login" ? "Login" : "SignUp"}</Heading>
        {account === "signup" && (
          <TextField
            label="Enter Username"
            variant="standard"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        )}
        <TextField
          label="Enter Email"
          variant="standard"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Enter Password"
          variant="standard"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <LoginButton variant="contained" onClick={handleSubmit}>
          {account === "login" ? "Login" : "SignUp"}
        </LoginButton>
        <Text>OR</Text>
        <SignupButton variant="outlined" onClick={toggleSignup}>
          {account === "login" ? "Create an account" : "Already have an account"}
        </SignupButton>
      </Wrapper>
    </Component>
  );
};

export default Login;
