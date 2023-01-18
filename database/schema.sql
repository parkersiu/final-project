CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'now()',
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."projects" (
	"projectId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"isArchived" BOOLEAN NOT NULL DEFAULT 'false',
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'now()',
	"userId" integer NOT NULL,
	"isDeleted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "projects_pk" PRIMARY KEY ("projectId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."tasks" (
	"taskId" serial NOT NULL,
	"taskName" TEXT NOT NULL,
	"isCompleted" BOOLEAN NOT NULL DEFAULT 'false',
	"projectId" integer NOT NULL,
  "milestoneId" integer NOT NULL,
	"isDeleted" BOOLEAN NOT NULL DEFAULT 'false',
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'now()',
	CONSTRAINT "tasks_pk" PRIMARY KEY ("taskId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."milestones" (
	"milestoneId" serial NOT NULL,
	"milestoneName" TEXT NOT NULL,
	"dueDate" DATE,
	"projectId" integer NOT NULL,
	"isDeleted" BOOLEAN NOT NULL DEFAULT 'false',
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'now()',
	CONSTRAINT "milestones_pk" PRIMARY KEY ("milestoneId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "projects" ADD CONSTRAINT "projects_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "tasks" ADD CONSTRAINT "tasks_fk0" FOREIGN KEY ("projectId") REFERENCES "projects"("projectId");
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_fk1" FOREIGN KEY ("milestoneId") REFERENCES "milestones"("milestoneId");

ALTER TABLE "milestones" ADD CONSTRAINT "milestones_fk0" FOREIGN KEY ("projectId") REFERENCES "projects"("projectId");
