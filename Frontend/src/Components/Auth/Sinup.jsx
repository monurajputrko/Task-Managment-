import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import classes from "./AuthenticationTitle.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../Redux/AuthReducer/action";

export function Signup() {

    const [signupData, setSignupData] = useState({
      name: "",
      password: "",
      email: "",
    });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup =async () => {
       try {
         if (signupData.name !== "" && signupData.email !== "" && signupData.password !== "") {
          //  console.log(" ok ", signupData);
           dispatch(signup(signupData));
          //  console.log("Function End");
          //  console.log(dispatch(signup(signupData)));
           navigate("/login");
         } else {
           alert("Please enter Required fields");
         }
       } catch (error) {
        //  console.log(error);
       }
    };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Sign Up!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Alredy have an account.{" "}
        <Link to="/login">
          <Anchor size="sm" component="button">
            Log in
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          type="text"
          value={signupData.name}
          onChange={(e) =>
            setSignupData({ ...signupData, name: e.target.value })
          }
          label="Name"
          placeholder="John Doe"
          required
        />
        <TextInput
          type="text"
          value={signupData.email}
          onChange={(e) =>
            setSignupData({ ...signupData, email: e.target.value })
          }
          label="Email"
          placeholder="you@mantine.dev"
          required
        />
        <PasswordInput
          type="text"
          value={signupData.password}
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
          }
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
        </Group>
        <Button onClick={handleSignup} fullWidth mt="xl">
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
}
