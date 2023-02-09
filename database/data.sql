insert into "users" ("userId", "username", "password")
values (1, 'demo@user.com', '$argon2id$v=19$m=4096,t=3,p=1$zeu+KFlZtybAEhWWNqueXQ$cHHJZnsl12o1MD5awJAT2OAqDi3j4MkEUTzx4WM+YWE');

insert into "projects" ("projectId", "title", "description", "userId")
values (1, 'Project 1', 'Project 1 dummy description.', 1),
values (2, 'Project 2', 'Project 2 dummy description', 1),
values (3, 'Project 3', 'Project 3 dummy description', 1);

insert into "milestones" ("milestoneId", "milestoneName", "projectId", "milestoneIndex")
values (1, 'Dummy Milestone 1', 1, 0),
values (2, 'Dummy Milestone 2', 1, 1),
values (3, 'Dummy Milestone 3', 1, 2),
values (4, 'Dummy Milestone 1', 2, 0),
values (5, 'Dummy Milestone 2', 2, 1),
values (6, 'Dummy Milestone 3', 2, 2),
values (7, 'Dummy Milestone 1', 3, 0),
values (8, 'Dummy Milestone 2', 3, 1),
values (9, 'Dummy Milestone 3', 3, 2);

insert into "tasks" ("taskName", "projectId", "milestoneId")
values ('Task 1', 1, 1),
values ('Task 2', 1, 1),
values ('Task 3', 1, 1),
values ('Task 1', 1, 2),
values ('Task 2', 1, 2),
values ('Task 3', 1, 2),
values ('Task 1', 1, 3),
values ('Task 2', 1, 3),
values ('Task 3', 1, 3),
values ('Task 1', 2, 4),
values ('Task 2', 2, 4),
values ('Task 3', 2, 4),
values ('Task 1', 2, 5),
values ('Task 2', 2, 5),
values ('Task 3', 2, 5),
values ('Task 1', 2, 6),
values ('Task 2', 2, 6),
values ('Task 3', 2, 6),
values ('Task 1', 3, 7),
values ('Task 2', 3, 7),
values ('Task 3', 3, 7),
values ('Task 1', 3, 8),
values ('Task 2', 3, 8),
values ('Task 3', 3, 8),
values ('Task 1', 3, 9),
values ('Task 2', 3, 9),
values ('Task 3', 3, 9);
