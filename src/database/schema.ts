import { int, sqliteTable, text, real} from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm"; // Needed for defining table relationships

/**
 * Account Table
 * Represents financial accounts like checking, savings, credit cards, or cash.
 * Refactored to align with general accounting types: Assets and Liabilities.
 */
export const accountTable = sqliteTable('account', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(), // e.g., "Checking Account", "Credit Card", "Savings", "Mortgage"
  // Type refactored to ['Asset', 'Liability']
  type: text('type', {
    enum: ['Asset', 'Liability']
  }).notNull(),
  color: text('color'), // e.g., "#FF0000" for a color associated with the account
  currency: text('currency'), // e.g., "USD", "EUR", "JPY"
  icon: text('icon'), // e.g., "fas fa-piggy-bank" for an icon
  description: text('description'), // Optional longer description for the account
  initialBalance: real('initial_balance').notNull().default(0.0), // Balance when the account was first added
  currentBalance: real('current_balance').notNull().default(0.0), // Current balance of the account
  status: text('status', {
    enum: ['Active', 'Inactive', 'Closed']
  }).notNull().default('Active'), // Status of the account
  createdAt: int('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: int('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});
/**
 * Category Table
 * Used to classify financial movements.
 * Refactored to align with general accounting types: Income, Expense, and Equity.
 */
export const categoryTable = sqliteTable('category', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(), // e.g., "Groceries", "Salary", "Rent", "Owner's Contribution"
  // Type refactored to ['Income', 'Expense', 'Equity']
  type: text('type', { enum: ['Income', 'Expense', 'Equity'] }).notNull(), // Whether it's an income, expense, or equity category
});

/**
 * Transaction Table
 * Records individual financial movements. Each transaction links to an account and a category.
 */
export const transactionTable = sqliteTable('transaction', {
  id: int('id').primaryKey({ autoIncrement: true }),
  amount: real('amount').notNull(),
  date: text('date').notNull().default(sql`(datetime('now','localtime'))`), // Transaction date, stored as ISO 8601 string (YYYY-MM-DD)
  description: text('description'), // Optional detailed description of the transaction
  payee: text('payee'), // Who the transaction was with (e.g., "Walmart", "Employer")
  accountId: int('account_id')
    .notNull()
    .references(() => accountTable.id), // Foreign key linking to the associated account (Asset or Liability)
  categoryId: int('category_id')
    .notNull()
    .references(() => categoryTable.id), // Foreign key linking to the transaction category (Income, Expense, or Equity)
  transactionType: text('transaction_type').$type(), // e.g., 'upcoming', 'subscription', 'repetitive'
  notes: text('notes'),
  attachments: text('attachments',{mode: 'json'}), // Storing as JSON string of file paths or IDs
});
/**
 * Budget Table
 * Defines spending limits for specific categories or periods.
 */
export const budgetTable = sqliteTable('budget', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(), // e.g., "Monthly Food Budget", "Annual Travel Budget"
  amount: real('amount').notNull(), // The budgeted amount for the period
  periodType: text('period_type', {
    enum: ['monthly', 'weekly', 'yearly', 'one-time']
  }).notNull(),
  startDate: text('start_date').notNull(), // Start date of the budget period (ISO 8601)
  endDate: text('end_date'), // Optional end date for one-time or specific period budgets (ISO 8601)
  categoryId: int('category_id')
    .references(() => categoryTable.id), // Foreign key to the category this budget applies to (can be null if budget is for overall spending)
  createdAt: int('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: int('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

/**
 * Goal Table
 * Tracks financial goals like saving for a down payment or retirement.
 */
export const goalTable = sqliteTable('goal', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(), // e.g., "House Down Payment", "Retirement Fund"
  targetAmount: real('target_amount').notNull(), // The total amount needed to achieve the goal
  currentAmount: real('current_amount').notNull().default(0.0), // The current amount saved towards the goal
  targetDate: text('target_date').notNull(), // The target date to achieve the goal (ISO 8601)
  description: text('description'), // Optional description of the goal
  createdAt: int('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: int('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

// --- Table Relations ---
// These define how tables are linked, enabling powerful joins and queries.

export const accountTableRelations = relations(accountTable, ({ many }) => ({
  transactions: many(transactionTable), // An account can have many transactions
}));

export const categoryTableRelations = relations(categoryTable, ({ many }) => ({
  transactions: many(transactionTable), // A category can be applied to many transactions
  budgets: many(budgetTable), // A category can have many budgets
}));

export const transactionTableRelations = relations(transactionTable, ({ one }) => ({
  account: one(accountTable, {
    fields: [transactionTable.accountId],
    references: [accountTable.id],
  }), // A transaction belongs to one account
  category: one(categoryTable, {
    fields: [transactionTable.categoryId],
    references: [categoryTable.id],
  }), // A transaction belongs to one category
}));

export const budgetTableRelations = relations(budgetTable, ({ one }) => ({
  category: one(categoryTable, {
    fields: [budgetTable.categoryId],
    references: [categoryTable.id],
  }), // A budget can belong to one category (if specified)
}));
