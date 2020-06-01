# Migration `20200601010452-init`

This migration has been generated at 6/1/2020, 1:04:52 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Post" (
"authorId" integer  NOT NULL ,"content" text  NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" SERIAL,"published" boolean  NOT NULL DEFAULT false,"title" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Profile" (
"bio" text   ,"id" SERIAL,"userId" integer  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."User" (
"email" text  NOT NULL ,"id" SERIAL,"name" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "Profile.userId" ON "public"."Profile"("userId")

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Profile" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200601010452-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,36 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Post {
+  id        Int      @default(autoincrement()) @id
+  title     String
+  content   String
+  published Boolean  @default(false)
+  createdAt DateTime @default(now())
+  author    User     @relation(fields: [authorId], references: [id])
+  authorId  Int
+}
+
+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  user   User    @relation(fields: [userId], references: [id])
+  userId Int     @unique
+}
+
+model User {
+  id      Int      @default(autoincrement()) @id
+  name    String
+  email   String   @unique
+  posts   Post[]
+  profile Profile?
+}
```


