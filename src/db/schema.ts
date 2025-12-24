import { relations } from 'drizzle-orm';
import { int, mysqlTable, serial, varchar, timestamp, text } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users_table', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({length: 255}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const questionsTable = mysqlTable('questions', {
  id: varchar('id', { length: 255 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  body: text('body').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const answersTable = mysqlTable('answers', {
  id: varchar('id', { length: 255 }).primaryKey(),
  body: text('body').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  questionId: varchar('question_id', { length: 255 })
    .notNull()
    .references(() => questionsTable.id, { onDelete: 'cascade' }),
});

// --- DEFINIÇÃO DE RELACIONAMENTOS (Opcional, mas ajuda no db.query) ---
export const usersRelations = relations(usersTable, ({ many }) => ({
  questions: many(questionsTable),
  answers: many(answersTable),
}));

export const questionsRelations = relations(questionsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [questionsTable.userId],
    references: [usersTable.id],
  }),
  answers: many(answersTable),
}));

export const answersRelations = relations(answersTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [answersTable.userId],
    references: [usersTable.id],
  }),
  question: one(questionsTable, {
    fields: [answersTable.questionId],
    references: [questionsTable.id],
  }),
}));