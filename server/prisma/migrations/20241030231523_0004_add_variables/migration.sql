-- CreateTable
CREATE TABLE "Variable" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Variable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Variable_projectId_idx" ON "Variable"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Variable_projectId_key_key" ON "Variable"("projectId", "key");

-- AddForeignKey
ALTER TABLE "Variable" ADD CONSTRAINT "Variable_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
