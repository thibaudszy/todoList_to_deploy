const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const User = require("./models").user;
const TodoList = require("./models").todoList;

const cors = require("cors");
app.use(cors());

app.listen(PORT, () => console.log(`listening to port ${PORT}`));

app.use(express.json());

app.post("/echo", (req, res, next) => {
  res.json(req.body);
});

app.get("/users", async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (e) {
    next(e);
  }
});

app.get("/users/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const id = req.params.id;
    const result = await User.findByPk(id);
    if (!result) {
      return res.status(404).send("error - User not found");
    }
    res.send(result);
  } catch (e) {
    next(e);
  }
});

app.get("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (user) {
      res.send(user.todoLists);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

app.post("/users", async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

app.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      return res.status(404).send("User not found");
    }
    const updatedUser = await userToUpdate.update(req.body);
    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
});

app.get("/todolists", async (req, res, next) => {
  try {
    const allLists = await TodoList.findAll();
    res.send(allLists);
  } catch (e) {
    next(e);
  }
});

app.post("/todolists", async (req, res, next) => {
  try {
    const user = await TodoList.create(req.body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

app.put("/todoLists/:listId", async (req, res, next) => {
  try {
    const { listId } = req.params;
    const listToUpdate = await TodoList.findByPk(listId);
    if (!listToUpdate) {
      return res.status(404).send("list not found");
    }
    const updatedlist = await listToUpdate.update(req.body);
    res.json(updatedlist);
  } catch (e) {
    next(e);
  }
});

app.get("/users/:userId/todolists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (user) {
      res.send(user.todoLists);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

app.delete("/users/:userId/todolists/:listId", async (req, res, next) => {
  try {
    const { listId } = req.params;
    const listToDelete = await TodoList.findByPk(listId);
    if (!listToDelete) {
      return res.status(404).send("List not found!");
    }
    const deletedList = await listToDelete.destroy();
    res.json("list deleted");
  } catch (e) {
    next(e);
  }
});

// Delete all user's lists
app.delete("/users/:userId/todolists", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const listsToDelete = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (!listsToDelete) {
      return res.status(404).send("Lists not found");
    }
    const deletedLists = await listsToDelete.destroy();
    res.status(204).send("All lists deleted");
  } catch (error) {
    next(error);
  }
});
