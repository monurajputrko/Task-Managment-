
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Todo = require("./Model/Todo.js");
const User = require("./Model/User.js");
const cors = require("cors");
const app = express();
const { connection } = require("./Config/db.js");
const authentication = require("./Middlewares/Authentication.js");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (req, res) => {
  res.send("Hello World");
});

//..............................signup at here...................................................

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const is_user = await User.findOne({ email });
    if (is_user) {
      res.send("Email Already Present Please Login");
    } else {
      const hash = await bcrypt.hash(password, 10); // Use async/await for bcrypt
      const data = new User({
        name,
        email,
        password: hash,
      });
        await data.save();
        res.status(200).json({ message: "Sign Up Successfull" });
      // const user = await new User({ email, username, password: hashpassword });
    //   res.send(data);
    }
  } catch (err) {
    console.log("something wrong", err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

//...................LOGIN............................

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const is_user = await User.findOne({ email });
    if (is_user) {
      const userPassword = is_user.password;
      const result = await bcrypt.compare(password, userPassword);
      if (result) {
        const token = jwt.sign({ userID: is_user._id }, "kuntal", {
          expiresIn: "7d",
        });
        res.send({ msg: "login successful", token: token, is_user: is_user });
      } else {
        res.send("login fail, password miss matched");
      }
    } else {
      res.send("Email not found,Please Signup");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// app.get("/user", async (req, res) => {
//   try {
//     const data = await User.find();
//     res.send(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ msg: "Internal Server Error" });
//   }
// });

// *****************************************Todo here ************************************************

// app.get("/todo", async (req, res) => {
//     const { id } = req.body;
//   try {
//     // const data = await Todo.find();
//     // console.log(data.title);
//       // res.send(data);
//        const todolist = await Todo.find().sort({
//          user: "66032d2cd08dd656bd1e5ec6",
//        });
//        if (todolist.length !== 0) {
//          res.status(200).json({ todolist: todolist });
//        }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ msg: "Internal Server Error" });
//   }
// });
app.get("/todo", async (req, res) => {
//   const { userId } = req.query; // Assuming userId is passed as a query parameter, e.g., /todo?userId=66032d2cd08dd656bd1e5ec6
    try {
       const token = req.headers.authorization?.split(" ")[1];
       const decodedToken = jwt.verify(token, "kuntal");
       const userId = decodedToken.userID;
    const todolist = await Todo.find({ user: userId });
    if (todolist.length !== 0) {
      res.status(200).json({ todolist: todolist });
    } else {
      res.status(404).json({ msg: "No todos found for the user" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});


app.post("/todoadd", authentication, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    // const data = await TodoModel.create({
    //   title,
    //   description,
    //   status,
    // });
    // res.send(data);
    // const { title, body } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, "kuntal");
    const userId = decodedToken.userID;

    // Find the user in the database using the user ID
    const existingUser = await User.findById(userId);
    console.log(" hello ", existingUser);
    if (existingUser) {
      const list = new Todo({
        title,
        description,
        status,
        user: existingUser,
      });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.status(200).json({ todo: updatedTodo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});


// app.put("/todo/:todoId", authentication, async (req, res) => {
//   try {
    // const update = await TodoModel.findByIdAndUpdate(
    //     req.params.todoId,
    //     req.body,
    //     { new: true, runValidators: true } // Ensure 'new: true' to return the updated document
    // );
    // if (update) {
    //     res.status(200).send("Updated successfully: " + update);
    // } else {
    //     console.log("Failed to update");
    //     res.status(404).send("Failed to update");
    // }
//     const { title, body } = req.body;
//     const list = await Todo.findByIdAndUpdate(req.params.id, {
//       title,
//       body,
//     });
//     list.save().then(() => res.status(200).json({ message: "Task Updated" }));
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "Bad Request" });
//   }
// });

// DELETE /products/:productID endpoint part
app.delete("/todo/:todoId", authentication, async (req, res) => {
  try {
    // const deletemadi = await TodoModel.findByIdAndDelete(
    //     req.params.todoId
    // );
    // if (deletemadi) {
    //     res.status(200).send("Deleted" + deletemadi);
    // }
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Task Deleted" })
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

const port = 8080;
app.listen(port, async () => {
  try {
    await connection();
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database: ", err);
  }

  console.log("App is running on port :", port);
});
