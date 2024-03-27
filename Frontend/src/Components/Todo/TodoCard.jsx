import { ActionIcon, Card, Group, Text } from '@mantine/core';
import React, { useState } from 'react'
import { Trash } from 'tabler-icons-react';
import { deleteTodo, getDataTodos, updateTodo } from '../../Redux/TodoReducer/action';
import { useDispatch } from 'react-redux';

export default function TodoCard({ task }) {
    const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };
const [updatedTodo, setUpdatedTodo] = useState({
  title: task.title,
  description: task.description,
  status: true,
});
  const [updatedTodo1, setUpdatedTodo1] = useState({
    title: task.title,
    description: task.description,
    status: false,
  });

  const handleUpdate = (id) => {
      if (task.status == "true") {
    dispatch(updateTodo(id, updatedTodo1));
      } else {  
    dispatch(updateTodo(id, updatedTodo));
      }
  };

  return (
    <Card withBorder key={task._id} mt={"sm"}>
      <Group position={"apart"}>
        <Text weight={"bold"}>{task.title}</Text>
        <ActionIcon
          onClick={() => {
            handleDelete(task._id);
            dispatch(getDataTodos());
          }}
          color={"red"}
          variant={"transparent"}
        >
          <Trash />
        </ActionIcon>
      </Group>

      <Text color={"dimmed"} size={"md"} mt={"sm"}>
        {task.description
          ? task.description
          : "No summary was provided for this task"}
      </Text>
      <br />
      {task.status === "true" ? (
        <Text
          onClick={() => {
            handleUpdate(task._id);
          }}
          style={{ textAlign: "center",cursor:"pointer" }}
          weight={"bold"}
        >
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
            alt="check-mark-emoji"
          />
        </Text>
      ) : (
        <Text
          onClick={() => {
            handleUpdate(task._id);
          }}
          style={{ textAlign: "center",cursor:"pointer" }}
          weight={"bold"}
        >
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/color/96/cancel--v1.png"
            alt="cancel--v1"
          />
        </Text>
      )}
    </Card>
  );
}
