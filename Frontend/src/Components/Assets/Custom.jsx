import { useState } from "react";
import axios from "axios";

const usePostTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postTodo = async (newTodo) => {
    setLoading(true);
    const token = sessionStorage.getItem("token");

    try {
      const resp = await axios.post(
        `https://green-mentor-h5c2.onrender.com/todoadd`,
        newTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      return resp.data;
    } catch (error) {
      setLoading(false);
      setError(error);
      return null;
    }
  };

  return { postTodo, loading, error };
};

export default usePostTodo;
