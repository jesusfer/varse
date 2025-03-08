/*
  Warnings:

  - You are about to drop the column `projectId` on the `Variable` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[groupId,key]` on the table `Variable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupId` to the `Variable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Variable" DROP CONSTRAINT "Variable_projectId_fkey";

-- DropIndex
DROP INDEX "Variable_projectId_idx";

-- DropIndex
DROP INDEX "Variable_projectId_key_key";

-- AlterTable
ALTER TABLE "Variable" DROP COLUMN "projectId",
ADD COLUMN     "groupId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Variable_groupId_idx" ON "Variable"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Variable_groupId_key_key" ON "Variable"("groupId", "key");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variable" ADD CONSTRAINT "Variable_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
