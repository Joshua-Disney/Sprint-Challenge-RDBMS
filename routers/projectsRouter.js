const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await db("projects");
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve project data"
    });
  }
});

// Get project by id
router.get("/:id", async (req, res) => {
  try {
    const project = await db("projects as p")
      .select("p.id", "p.name", "p.description", "p.completed")
      .where({ id: req.params.id })
      .first();
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve project data"
    });
  }
});

// Get all actions in a project
router.get("/:id/actions", async (req, res) => {
  try {
    const projectactions = await db("actions as a")
      .join("projects as p", "p.id", "a.project_id")
      .select("a.description", "a.notes", "a.completed", "p.name as project")
      .where("a.project_id", req.params.id);
    if (projectactions) {
      res.status(200).json(projectactions);
    } else {
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to retrieve project data"
    });
  }
});

// Create new project
router.post("/", async (req, res) => {
  try {
    const [id] = await db("projects").insert(req.body);
    const project = await db("projects")
      .where({ id })
      .first();
    res.status(201).json({
      project,
      message: "Successfully created project data"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to create project data"
    });
  }
});

// Update existing project
router.put("/:id", async (req, res) => {
  try {
    const count = await db("projects")
      .where({ id: req.params.id })
      .update(req.body);
    if (count > 0) {
      const project = await db("projects")
        .where({ id: req.params.id })
        .first();
      res.status(200).json({
        project,
        message: "Successfully updated project data"
      });
    } else {
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to update project data"
    });
  }
});

// Delete existing project
router.delete("/:id", async (req, res) => {
  try {
    const count = await db("projects")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Failed to delete project data"
    });
  }
});

module.exports = router;
