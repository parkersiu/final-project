insert into "users" ("userId", "username", "password")
values (1, 'demo@user.com', '$argon2id$v=19$m=4096,t=3,p=1$zeu+KFlZtybAEhWWNqueXQ$cHHJZnsl12o1MD5awJAT2OAqDi3j4MkEUTzx4WM+YWE')
-- Create project 1
insert into "projects" ("projectId", "title", "description", "userId")
values (1, 'Project 1', 'Project 1 dummy description.', 1)
-- Create milestone 1 for project 1
insert into "milestones" ("milestoneId", "milestoneName", "projectId", "milestoneIndex")
values (1, 'Dummy Milestone 1', 1, 0)
-- Create 3 tasks for milestone 1/project1
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 1', 1, 1)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 2', 1, 1)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 3', 1, 1)
-- Create milestone 2 for project 1
insert into "milestones" ("milestoneId", "milestoneName", "projectId", "milestoneIndex")
values (2, 'Dummy Milestone 2', 1, 1)
-- Create 3 tasks for milestone 2/project 1
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 1', 1, 2)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 2', 1, 2)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 3', 1, 2)
-- Create milestone 3 for project 1
insert into "milestones" ("milestoneId", "milestoneName", "projectId", "milestoneIndex")
values (3, 'Dummy Milestone 3', 1, 2)
--Create 3 tasks for milestone 3/project 1
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 1', 1, 3)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 2', 1, 3)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 3', 1, 3)
-- Create project 2
insert into "projects" ("projectId", "title", "description", "userId")
values (2, 'Project 2', 'Project 2 dummy description', 1)
-- Create milestone 1 for project 2
insert into "milestones" ("milestoneId", "milestoneName", "projectId", "milestoneIndex")
values (4, 'Dummy Milestone 1', 2, 0)
-- Create 3 tasks for milestone 1/project 2
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 1', 2, 4)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 2', 2, 4)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 3', 2, 4)
-- Create milestone 2 for project 2
insert into "milestones" ("milestoneId", "milestoneName", "projectId", "milestoneIndex")
values (5, 'Dummy Milestone 2', 2, 1)
-- Create 3 tasks for milestone 2/project 2
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 1', 2, 5)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 2', 2, 5)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 3', 2, 5)
-- Create milestone 3 for project 2
insert into "milestones" ("milestoneId", "milestoneName", "projectId", "milestoneIndex")
values (6, 'Dummy Milestone 3', 2, 2)
--Create 3 tasks for milestone 3/project 2
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 1', 2, 6)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 2', 2, 6)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 3', 2, 6)
-- Create project 3
insert into "projects" ("projectId", "title", "description", "userId")
values (3, 'Project 3', 'Project 3 dummy description', 1)
-- Create milestone 1 for project 3
insert into "milestones" ("milestoneId", "milestoneName", "projectId", "milestoneIndex")
values (7, 'Dummy Milestone 1', 3, 0)
-- Create 3 tasks for milestone 1/project 3
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 1', 3, 7)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 2', 3, 7)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 3', 3, 7)
-- Create milestone 2 for project 3
insert into "milestones" ("milestoneId", "milestoneName", "projectId", "milestoneIndex")
values (8, 'Dummy Milestone 2', 3, 1)
-- Create 3 tasks for milestone 2/project 3
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 1', 3, 8)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 2', 3, 8)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 3', 3, 8)
-- Create milestone 3 for project 3
insert into "milestones" ("milestoneId", "milestoneName", "projectId", "milestoneIndex")
values (9, 'Dummy Milestone 3', 3, 2)
--Create 3 tasks for milestone 3/project 3
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 1', 3, 9)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 2', 3, 9)
insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 3', 3, 9)
