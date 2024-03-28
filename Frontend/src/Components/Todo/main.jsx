

import {
  Button,
  Container,
  Text,
  Title,
  Modal,
  TextInput,
  Group,
  ActionIcon,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { MoonStars, Sun } from "tabler-icons-react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getData,
  getDataTodos,
  postTodo,
} from "../../Redux/TodoReducer/action";
import TodoCard from "./TodoCard";
import usePostTodo from "../Assets/Custom";
import { Loading } from './../../Loading';

export default function Main() {
  const [opened, setOpened] = useState(false);
  const [LoadingState, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  const [TodoData, setTodoData] = useState({
    title: "",
    description: "",
    status: false,
  });

  const dispatch = useDispatch();
  const mdata = useSelector((store) => store) || [];
  const tasks = mdata?.todosReducer?.todos?.todolist || [];
  console.log(mdata.todosReducer);
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getDataTodos());
    }, 3000);
  }, []);

 

  const navigate = useNavigate();
  const isAutheticated = useSelector((store) => store.authReducer.success);

  if (!isAutheticated) {
    navigate("/login");
    return null;
  }

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const createTask = (e) => {
    // e.preventDefault();
    if (TodoData.title !== "" && TodoData.description !== "") {
      dispatch(postTodo(TodoData));
      setOpened(false);
      dispatch(getDataTodos());
    } else {
      alert("All Fields are required");
    }
  };
  return (
    <>
     
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme, defaultRadius: "md" }}
            withGlobalStyles
            withNormalizeCSS
          >
            <div className="App">
              <Modal
                opened={opened}
                size={"md"}
                title={"New Task"}
                withCloseButton={false}
                onClose={() => {
                  setOpened(false);
                }}
                centered
              >
                <TextInput
                  mt={"md"}
                  value={TodoData.title}
                  onChange={(e) =>
                    setTodoData({ ...TodoData, title: e.target.value })
                  }
                  placeholder={"Task Title"}
                  required
                  label={"Title"}
                />
                <TextInput
                  value={TodoData.description}
                  onChange={(e) =>
                    setTodoData({ ...TodoData, description: e.target.value })
                  }
                  mt={"md"}
                  placeholder={"Task Description"}
                  required
                  label={"Description"}
                />

                <Group mt={"md"} position={"apart"}>
                  <Button
                    onClick={() => {
                      setOpened(false);
                    }}
                    variant={"subtle"}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      createTask();
                    }}
                  >
                    Create Task
                  </Button>
                </Group>
              </Modal>
              <Container size={550} my={40}>
                <Group position={"apart"}>
                  <Title
                    sx={(theme) => ({
                      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                      fontWeight: 900,
                    })}
                  >
                    My Tasks
                  </Title>
                  <ActionIcon
                    color={"blue"}
                    onClick={() => toggleColorScheme()}
                    size="lg"
                  >
                    {colorScheme === "dark" ? (
                      <Sun size={16} />
                    ) : (
                      <MoonStars size={16} />
                    )}
                  </ActionIcon>
                </Group>
                {tasks.length > 0 ? (
                  tasks.map((task) => {
                    return <TodoCard task={task} />;
                  })
                ) : (
                  <Text size={"lg"} mt={"md"} color={"dimmed"}>
                    You have no tasks
                  </Text>
                )}
                <Button
                  onClick={() => {
                    setOpened(true);
                  }}
                  fullWidth
                  mt={"md"}
                >
                  New Task
                </Button>
              </Container>
            </div>
          </MantineProvider>
        </ColorSchemeProvider>
      
    </>
  );
}
