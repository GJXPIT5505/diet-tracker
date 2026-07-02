import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  age: integer("age"),
  weight: real("weight"),
  height: real("height"),
  activityLevel: text("activity_level"), // sedentary, light, moderate, active, very_active
  goal: text("goal"), // lose_weight, maintain, gain_muscle
  targetCalories: integer("target_calories"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const foodLogs = sqliteTable("food_logs", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  calories: integer("calories").notNull(),
  protein: real("protein"),
  carbs: real("carbs"),
  fat: real("fat"),
  imageUrl: text("image_url"),
  loggedAt: integer("logged_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});
