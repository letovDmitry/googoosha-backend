-- CreateTable
CREATE TABLE "_guests" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_guests_AB_unique" ON "_guests"("A", "B");

-- CreateIndex
CREATE INDEX "_guests_B_index" ON "_guests"("B");

-- AddForeignKey
ALTER TABLE "_guests" ADD CONSTRAINT "_guests_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_guests" ADD CONSTRAINT "_guests_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
