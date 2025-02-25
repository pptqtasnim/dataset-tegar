-- CreateTable
CREATE TABLE "Dataset" (
    "id" SERIAL NOT NULL,
    "instruction" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Dataset_pkey" PRIMARY KEY ("id")
);
