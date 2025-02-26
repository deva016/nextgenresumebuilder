/*
  Warnings:

  - You are about to drop the column `userId` on the `Resume` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- Drop existing foreign key
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_userId_fkey";

-- Add new `user_id` column but allow NULL temporarily
ALTER TABLE "Resume" ADD COLUMN "template" TEXT NOT NULL DEFAULT 'default';
ALTER TABLE "Resume" ADD COLUMN "user_id" TEXT;

-- Assign a default user_id for existing resumes (Replace 'some-existing-user-id' with an actual user ID)
UPDATE "Resume" SET "user_id" = '3f0ef3b3-be9d-4185-b5f7-8f29ee7786a1' WHERE "user_id" IS NULL;

-- Now make `user_id` NOT NULL
ALTER TABLE "Resume" ALTER COLUMN "user_id" SET NOT NULL;

-- Re-add foreign key constraint
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
