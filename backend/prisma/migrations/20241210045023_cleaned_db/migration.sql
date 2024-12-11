/*
  Warnings:

  - You are about to drop the column `secret` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `session` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "auth"."Sessions" DROP CONSTRAINT "Sessions_userId_fkey";

-- DropIndex
DROP INDEX "auth"."Users_secret_key";

-- DropIndex
DROP INDEX "auth"."Users_session_key";

-- DropIndex
DROP INDEX "auth"."Users_token_key";

-- AlterTable
ALTER TABLE "auth"."Users" DROP COLUMN "secret",
DROP COLUMN "session",
DROP COLUMN "token";

-- DropTable
DROP TABLE "auth"."Sessions";
