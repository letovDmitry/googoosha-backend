/*
  Warnings:

  - Made the column `fullName` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateOfBirth` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "fullName" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "dateOfBirth" SET NOT NULL;
