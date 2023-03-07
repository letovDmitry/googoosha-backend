/*
  Warnings:

  - Added the required column `name` to the `gifts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gifts" ADD COLUMN     "name" TEXT NOT NULL;
