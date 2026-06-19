import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  jsonb,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

// Better Auth Tables
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refreshToken: text('refreshToken'),
    accessToken: text('accessToken'),
    expiresAt: integer('expiresAt'),
    tokenType: text('tokenType'),
    scope: text('scope'),
    idToken: text('idToken'),
    sessionState: text('sessionState'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
  },
  (table) => ({
    providerIdx: uniqueIndex('provider_idx').on(
      table.provider,
      table.providerAccountId
    ),
  })
)

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// Gaming App Tables
export const leaderboardEntry = pgTable(
  'leaderboard_entry',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    rank: integer('rank'),
    score: integer('score').notNull().default(0),
    wins: integer('wins').notNull().default(0),
    losses: integer('losses').notNull().default(0),
    winRate: decimal('winRate', { precision: 5, scale: 2 }),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
  },
  (table) => ({
    userIdIdx: uniqueIndex('leaderboard_userId_idx').on(table.userId),
  })
)

export const activityLog = pgTable('activity_log', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  activityType: text('activityType').notNull(),
  description: text('description'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('createdAt').defaultNow(),
})

export const nftItem = pgTable('nft_item', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  imageUrl: text('imageUrl'),
  rarity: text('rarity'),
  tokenId: text('tokenId'),
  contractAddress: text('contractAddress'),
  createdAt: timestamp('createdAt').defaultNow(),
})

export const gameMatch = pgTable('game_match', {
  id: text('id').primaryKey(),
  player1Id: text('player1Id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  player2Id: text('player2Id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  winnerId: text('winnerId').references(() => user.id, { onDelete: 'set null' }),
  player1Score: integer('player1Score').default(0),
  player2Score: integer('player2Score').default(0),
  status: text('status').default('pending'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})
