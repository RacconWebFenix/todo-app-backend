-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "isDone" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "deletedAt" TEXT NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);
