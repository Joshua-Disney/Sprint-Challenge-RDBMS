const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

// Get all actions
router.get("/", async (req, res) => {
  try {
    const actions = await db("actions");
    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve action data"
    });
  }
});

// Get action by id
router.get("/:id", async (req, res) => {
  try {
    const action = await db("actions as a")
      .select("a.id", "a.description", "a.notes", "a.completed")
      .where("a.id", req.params.id)
      .first();
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({
        message: "The action with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve action data"
    });
  }
});

// Create new action
router.post("/", async (req, res) => {
  try {
    const [id] = await db("actions").insert(req.body);
    const action = await db("actions")
      .where({ id })
      .first();
    res.status(201).json({
      action,
      message: "Successfully created action data"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to create action data"
    });
  }
});

// Update existing action
router.put("/:id", async (req, res) => {
  try {
    const count = await db("actions")
      .where({ id: req.params.id })
      .update(req.body);
    if (count > 0) {
      const action = await db("actions")
        .where({ id: req.params.id })
        .first();
      res.status(200).json({
        action,
        message: "Successfully updated action data"
      });
    } else {
      res.status(404).json({
        message: "The action with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to update action data"
    });
  }
});

// Delete existing action
router.delete("/:id", async (req, res) => {
  try {
    const count = await db("actions")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: "The action with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to delete action data"
    });
  }
});

module.exports = router;
