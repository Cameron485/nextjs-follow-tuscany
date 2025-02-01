import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const customersTable = pgTable('customers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }).notNull(),
  LastName: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
})
