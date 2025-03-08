/*
  Warnings:

  - A unique constraint covering the columns `[projectId,key]` on the table `Variable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `Variable` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Variable_groupId_key_key";

-- AlterTable
ALTER TABLE "Variable" ADD COLUMN     "projectId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Variable_projectId_key_key" ON "Variable"("projectId", "key");

-- AddForeignKey
ALTER TABLE "Variable" ADD CONSTRAINT "Variable_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
