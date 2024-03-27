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
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/AuthReducer/action";
import { Loading } from "../../Loading";

export function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const mdata = useSelector((store) => store);

  const handleLogin = async () => {
    if (loginData.email !== "" && loginData.password !== "") {
      dispatch(login(loginData, dispatch));
    } else {
      alert("All Fields are required");
    }
  };
  if (mdata.authReducer.isAuth) {
    navigate("/");
  }

  if (mdata.authReducer.loading) {
    return <Loading />;
  } else {
    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Link to="/signup">
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            type="text"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            label="Email"
            placeholder="you@mantine.dev"
            required
          />
          <PasswordInput
            label="Password"
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            required
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button onClick={handleLogin} fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    );
  }
}
