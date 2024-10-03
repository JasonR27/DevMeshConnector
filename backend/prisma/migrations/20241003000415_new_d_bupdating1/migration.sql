/*
  Warnings:

  - You are about to drop the `_PostsToProfiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PostsToProfiles" DROP CONSTRAINT "_PostsToProfiles_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostsToProfiles" DROP CONSTRAINT "_PostsToProfiles_B_fkey";

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "content" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profileId" INTEGER,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "_PostsToProfiles";

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
