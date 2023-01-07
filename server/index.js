require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.get('/api/tasks/:projectId', (req, res, next) => {
  const projectId = Number(req.params.projectId);
  if (!projectId) {
    throw new ClientError(400, 'projectId must be a positive integer');
  }
  const sql = `
    select "taskId",
           "taskName",
           "isCompleted",
           "projectId",
           "milestoneId",
           "isDeleted"
      from "tasks"
     where "projectId" = $1
  `;
  const params = [projectId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows) {
        throw new ClientError(404, `cannot find product with projectId ${projectId}`);
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/milestones/:projectId', (req, res, next) => {
  const projectId = Number(req.params.projectId);
  if (!projectId) {
    throw new ClientError(400, 'projectId must be a positive integer');
  }
  const sql = `
    select "milestoneId",
           "milestoneName",
           "dueDate",
           "projectId",
           "isDeleted"
      from "milestones"
     where "projectId" = $1
  `;
  const params = [projectId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows) {
        throw new ClientError(404, `cannot find product with projectId ${projectId}`);
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/projects', (req, res, next) => {
  const { title, description, userId } = req.body;
  if (!title || !description || !userId) {
    throw new ClientError(400, 'title, description, and userId are required fields');
  }
  if (!Number.isInteger(userId) || userId < 0) {
    throw new ClientError(400, 'userId must be a positive integer');
  }
  const sql = `
  insert into "projects" ("title", "description", "userId")
  values ($1, $2, $3)
  returning *
  `;
  const params = [title, description, userId];
  db.query(sql, params)
    .then(result => {
      const [newProject] = result.rows;
      res.status(201).json(newProject);
    })
    .catch(err => next(err));
});

app.post('/api/milestones', (req, res, next) => {
  const { milestoneName, projectId } = req.body;
  parseInt(projectId);
  if (!milestoneName || !projectId) {
    throw new ClientError(400, 'milestoneName and projectId are required fields');
  }
  if (!Number.isInteger(projectId) || projectId < 0) {
    throw new ClientError(400, 'projectId must be a positive integer');
  }
  const sql = `
  insert into "milestones" ("milestoneName", "projectId")
  values ($1, $2)
  returning *
  `;
  const params = [milestoneName, projectId];
  db.query(sql, params)
    .then(result => {
      const [newMilestone] = result.rows;
      res.status(201).json(newMilestone);
    })
    .catch(err => next(err));
});

app.post('/api/tasks', (req, res, next) => {
  const { taskName } = req.body;
  const projectId = Number(req.body.projectId);
  const milestoneId = Number(req.body.milestoneId);
  if (!taskName || !projectId) {
    throw new ClientError(400, 'taskName and projectId are required fields');
  }
  if (!Number.isInteger(projectId) || projectId < 0) {
    throw new ClientError(400, 'projectId must be a positive integer');
  }
  const sql = `
  insert into "tasks" ("taskName", "projectId", "milestoneId")
  values ($1, $2, $3)
  returning *
  `;
  const params = [taskName, projectId, milestoneId];
  db.query(sql, params)
    .then(result => {
      const [newTask] = result.rows;
      res.status(201).json(newTask);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
