require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

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

app.get('/api/projects/:projectId', (req, res, next) => {
  const projectId = Number(req.params.projectId);
  if (!projectId) {
    throw new ClientError(400, 'projectId must be a positive integer');
  }
  const sql = `
    select "projectId",
           "title",
           "description",
           "isArchived",
           "isDeleted"
      from "projects"
     where "projectId" = $1
  `;
  const params = [projectId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows) {
        throw new ClientError(404, `cannot find project with projectId ${projectId}`);
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});

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
        throw new ClientError(404, `cannot find project with projectId ${projectId}`);
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
           "isDeleted",
           "milestoneIndex"
      from "milestones"
     where "projectId" = $1
     order by "milestoneIndex"
  `;
  const params = [projectId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows) {
        throw new ClientError(404, `cannot find project with projectId ${projectId}`);
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/projects', (req, res, next) => {
  const { title, description } = req.body;
  const userId = parseInt(req.body.userId);
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
  const { milestoneName, projectId, milestoneIndex } = req.body;
  parseInt(projectId);
  parseInt(milestoneIndex);
  if (!milestoneName || !projectId) {
    throw new ClientError(400, 'milestoneName and projectId are required fields');
  }
  if (!Number.isInteger(projectId) || projectId < 0) {
    throw new ClientError(400, 'projectId must be a positive integer');
  }
  if (!Number.isInteger(milestoneIndex)) {
    throw new ClientError(400, 'milestoneIndex must be an integer');
  }
  const sql = `
  insert into "milestones" ("milestoneName", "projectId", "milestoneIndex")
  values ($1, $2, $3)
  returning *
  `;
  const params = [milestoneName, projectId, milestoneIndex];
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

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "users" ("username", "password")
      values ($1, $2)
      returning *
      `;
      const params = [username, hashedPassword];
      db.query(sql, params)
        .then(result => {
          const [newUser] = result.rows;
          res.status(201).json(newUser);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.patch('/api/tasks/:taskId', (req, res, next) => {
  const taskId = Number(req.params.taskId);
  const { taskName, isDeleted } = req.body;
  if (!taskId || taskId < 1) {
    throw new ClientError(400, 'taskId is required and must be a positive integer');
  }
  const sql = `
    update "tasks"
      set "taskName" = $1,
      "isDeleted"    = $2
      where "taskId" = $3
    returning *
  `;
  const params = [taskName, isDeleted, taskId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows) {
        throw new ClientError(404, `cannot find task with taskId ${taskId}`);
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
  select "userId",
         "username",
         "password"
  from   "users"
  where  "username" = $1`;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(401, 'invalid login');
      }
      const hashedPassword = result.rows[0].password;
      argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const [user] = result.rows;
          const signedToken = jwt.sign(user, process.env.TOKEN_SECRET);
          const auth = { signedToken, user };
          res.status(200).json(auth);
        })
        .catch(err => next(err));
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
