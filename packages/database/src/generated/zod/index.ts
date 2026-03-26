import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','emailVerified','image','name','password','createdAt']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const HabitScalarFieldEnumSchema = z.enum(['id','name','description','frequency','time','userId','createdAt']);

export const DailyTrackEntryScalarFieldEnumSchema = z.enum(['id','date','completed','habitId']);

export const JournalEntryScalarFieldEnumSchema = z.enum(['id','title','content','date','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.string(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  name: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.uuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.uuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// HABIT SCHEMA
/////////////////////////////////////////

export const HabitSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
  frequency: z.string().array(),
  time: z.string().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date(),
})

export type Habit = z.infer<typeof HabitSchema>

/////////////////////////////////////////
// DAILY TRACK ENTRY SCHEMA
/////////////////////////////////////////

export const DailyTrackEntrySchema = z.object({
  id: z.uuid(),
  date: z.coerce.date(),
  completed: z.boolean(),
  habitId: z.string(),
})

export type DailyTrackEntry = z.infer<typeof DailyTrackEntrySchema>

/////////////////////////////////////////
// JOURNAL ENTRY SCHEMA
/////////////////////////////////////////

export const JournalEntrySchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string(),
  date: z.coerce.date(),
  userId: z.string(),
})

export type JournalEntry = z.infer<typeof JournalEntrySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  habits: z.union([z.boolean(),z.lazy(() => HabitFindManyArgsSchema)]).optional(),
  journalEntries: z.union([z.boolean(),z.lazy(() => JournalEntryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  habits: z.boolean().optional(),
  journalEntries: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  name: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  habits: z.union([z.boolean(),z.lazy(() => HabitFindManyArgsSchema)]).optional(),
  journalEntries: z.union([z.boolean(),z.lazy(() => JournalEntryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// HABIT
//------------------------------------------------------

export const HabitIncludeSchema: z.ZodType<Prisma.HabitInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  entries: z.union([z.boolean(),z.lazy(() => DailyTrackEntryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HabitCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const HabitArgsSchema: z.ZodType<Prisma.HabitDefaultArgs> = z.object({
  select: z.lazy(() => HabitSelectSchema).optional(),
  include: z.lazy(() => HabitIncludeSchema).optional(),
}).strict();

export const HabitCountOutputTypeArgsSchema: z.ZodType<Prisma.HabitCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => HabitCountOutputTypeSelectSchema).nullish(),
}).strict();

export const HabitCountOutputTypeSelectSchema: z.ZodType<Prisma.HabitCountOutputTypeSelect> = z.object({
  entries: z.boolean().optional(),
}).strict();

export const HabitSelectSchema: z.ZodType<Prisma.HabitSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  frequency: z.boolean().optional(),
  time: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  entries: z.union([z.boolean(),z.lazy(() => DailyTrackEntryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HabitCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DAILY TRACK ENTRY
//------------------------------------------------------

export const DailyTrackEntryIncludeSchema: z.ZodType<Prisma.DailyTrackEntryInclude> = z.object({
  habit: z.union([z.boolean(),z.lazy(() => HabitArgsSchema)]).optional(),
}).strict();

export const DailyTrackEntryArgsSchema: z.ZodType<Prisma.DailyTrackEntryDefaultArgs> = z.object({
  select: z.lazy(() => DailyTrackEntrySelectSchema).optional(),
  include: z.lazy(() => DailyTrackEntryIncludeSchema).optional(),
}).strict();

export const DailyTrackEntrySelectSchema: z.ZodType<Prisma.DailyTrackEntrySelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  completed: z.boolean().optional(),
  habitId: z.boolean().optional(),
  habit: z.union([z.boolean(),z.lazy(() => HabitArgsSchema)]).optional(),
}).strict()

// JOURNAL ENTRY
//------------------------------------------------------

export const JournalEntryIncludeSchema: z.ZodType<Prisma.JournalEntryInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const JournalEntryArgsSchema: z.ZodType<Prisma.JournalEntryDefaultArgs> = z.object({
  select: z.lazy(() => JournalEntrySelectSchema).optional(),
  include: z.lazy(() => JournalEntryIncludeSchema).optional(),
}).strict();

export const JournalEntrySelectSchema: z.ZodType<Prisma.JournalEntrySelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  date: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  habits: z.lazy(() => HabitListRelationFilterSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  habits: z.lazy(() => HabitOrderByRelationAggregateInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryOrderByRelationAggregateInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    email: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  habits: z.lazy(() => HabitListRelationFilterSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional(),
});

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
});

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    sessionToken: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
});

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.strictObject({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
}));

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.strictObject({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional(),
});

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const HabitWhereInputSchema: z.ZodType<Prisma.HabitWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => HabitWhereInputSchema), z.lazy(() => HabitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HabitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HabitWhereInputSchema), z.lazy(() => HabitWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  frequency: z.lazy(() => StringNullableListFilterSchema).optional(),
  time: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  entries: z.lazy(() => DailyTrackEntryListRelationFilterSchema).optional(),
});

export const HabitOrderByWithRelationInputSchema: z.ZodType<Prisma.HabitOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  frequency: z.lazy(() => SortOrderSchema).optional(),
  time: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  entries: z.lazy(() => DailyTrackEntryOrderByRelationAggregateInputSchema).optional(),
});

export const HabitWhereUniqueInputSchema: z.ZodType<Prisma.HabitWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => HabitWhereInputSchema), z.lazy(() => HabitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HabitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HabitWhereInputSchema), z.lazy(() => HabitWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  frequency: z.lazy(() => StringNullableListFilterSchema).optional(),
  time: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  entries: z.lazy(() => DailyTrackEntryListRelationFilterSchema).optional(),
}));

export const HabitOrderByWithAggregationInputSchema: z.ZodType<Prisma.HabitOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  frequency: z.lazy(() => SortOrderSchema).optional(),
  time: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HabitCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HabitMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HabitMinOrderByAggregateInputSchema).optional(),
});

export const HabitScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HabitScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => HabitScalarWhereWithAggregatesInputSchema), z.lazy(() => HabitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HabitScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HabitScalarWhereWithAggregatesInputSchema), z.lazy(() => HabitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  frequency: z.lazy(() => StringNullableListFilterSchema).optional(),
  time: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const DailyTrackEntryWhereInputSchema: z.ZodType<Prisma.DailyTrackEntryWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DailyTrackEntryWhereInputSchema), z.lazy(() => DailyTrackEntryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DailyTrackEntryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DailyTrackEntryWhereInputSchema), z.lazy(() => DailyTrackEntryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  habitId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  habit: z.union([ z.lazy(() => HabitScalarRelationFilterSchema), z.lazy(() => HabitWhereInputSchema) ]).optional(),
});

export const DailyTrackEntryOrderByWithRelationInputSchema: z.ZodType<Prisma.DailyTrackEntryOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  habitId: z.lazy(() => SortOrderSchema).optional(),
  habit: z.lazy(() => HabitOrderByWithRelationInputSchema).optional(),
});

export const DailyTrackEntryWhereUniqueInputSchema: z.ZodType<Prisma.DailyTrackEntryWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    habitId_date: z.lazy(() => DailyTrackEntryHabitIdDateCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    habitId_date: z.lazy(() => DailyTrackEntryHabitIdDateCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  habitId_date: z.lazy(() => DailyTrackEntryHabitIdDateCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => DailyTrackEntryWhereInputSchema), z.lazy(() => DailyTrackEntryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DailyTrackEntryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DailyTrackEntryWhereInputSchema), z.lazy(() => DailyTrackEntryWhereInputSchema).array() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  habitId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  habit: z.union([ z.lazy(() => HabitScalarRelationFilterSchema), z.lazy(() => HabitWhereInputSchema) ]).optional(),
}));

export const DailyTrackEntryOrderByWithAggregationInputSchema: z.ZodType<Prisma.DailyTrackEntryOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  habitId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DailyTrackEntryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DailyTrackEntryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DailyTrackEntryMinOrderByAggregateInputSchema).optional(),
});

export const DailyTrackEntryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DailyTrackEntryScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DailyTrackEntryScalarWhereWithAggregatesInputSchema), z.lazy(() => DailyTrackEntryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DailyTrackEntryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DailyTrackEntryScalarWhereWithAggregatesInputSchema), z.lazy(() => DailyTrackEntryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  completed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  habitId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const JournalEntryWhereInputSchema: z.ZodType<Prisma.JournalEntryWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => JournalEntryWhereInputSchema), z.lazy(() => JournalEntryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JournalEntryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JournalEntryWhereInputSchema), z.lazy(() => JournalEntryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const JournalEntryOrderByWithRelationInputSchema: z.ZodType<Prisma.JournalEntryOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const JournalEntryWhereUniqueInputSchema: z.ZodType<Prisma.JournalEntryWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => JournalEntryWhereInputSchema), z.lazy(() => JournalEntryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JournalEntryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JournalEntryWhereInputSchema), z.lazy(() => JournalEntryWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const JournalEntryOrderByWithAggregationInputSchema: z.ZodType<Prisma.JournalEntryOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => JournalEntryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JournalEntryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JournalEntryMinOrderByAggregateInputSchema).optional(),
});

export const JournalEntryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JournalEntryScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => JournalEntryScalarWhereWithAggregatesInputSchema), z.lazy(() => JournalEntryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => JournalEntryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JournalEntryScalarWhereWithAggregatesInputSchema), z.lazy(() => JournalEntryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  habits: z.lazy(() => HabitCreateNestedManyWithoutUserInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  habits: z.lazy(() => HabitUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  habits: z.lazy(() => HabitUpdateManyWithoutUserNestedInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  habits: z.lazy(() => HabitUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema),
});

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional(),
});

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
});

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
});

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional(),
});

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
});

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.strictObject({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
});

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.strictObject({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
});

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.strictObject({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.strictObject({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.strictObject({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
});

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.strictObject({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.strictObject({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const HabitCreateInputSchema: z.ZodType<Prisma.HabitCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitCreatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutHabitsInputSchema),
  entries: z.lazy(() => DailyTrackEntryCreateNestedManyWithoutHabitInputSchema).optional(),
});

export const HabitUncheckedCreateInputSchema: z.ZodType<Prisma.HabitUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitCreatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.string().optional().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  entries: z.lazy(() => DailyTrackEntryUncheckedCreateNestedManyWithoutHabitInputSchema).optional(),
});

export const HabitUpdateInputSchema: z.ZodType<Prisma.HabitUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitUpdatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutHabitsNestedInputSchema).optional(),
  entries: z.lazy(() => DailyTrackEntryUpdateManyWithoutHabitNestedInputSchema).optional(),
});

export const HabitUncheckedUpdateInputSchema: z.ZodType<Prisma.HabitUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitUpdatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  entries: z.lazy(() => DailyTrackEntryUncheckedUpdateManyWithoutHabitNestedInputSchema).optional(),
});

export const HabitCreateManyInputSchema: z.ZodType<Prisma.HabitCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitCreatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.string().optional().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
});

export const HabitUpdateManyMutationInputSchema: z.ZodType<Prisma.HabitUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitUpdatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const HabitUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HabitUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitUpdatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyTrackEntryCreateInputSchema: z.ZodType<Prisma.DailyTrackEntryCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  date: z.coerce.date(),
  completed: z.boolean().optional(),
  habit: z.lazy(() => HabitCreateNestedOneWithoutEntriesInputSchema),
});

export const DailyTrackEntryUncheckedCreateInputSchema: z.ZodType<Prisma.DailyTrackEntryUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  date: z.coerce.date(),
  completed: z.boolean().optional(),
  habitId: z.string(),
});

export const DailyTrackEntryUpdateInputSchema: z.ZodType<Prisma.DailyTrackEntryUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  habit: z.lazy(() => HabitUpdateOneRequiredWithoutEntriesNestedInputSchema).optional(),
});

export const DailyTrackEntryUncheckedUpdateInputSchema: z.ZodType<Prisma.DailyTrackEntryUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  habitId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyTrackEntryCreateManyInputSchema: z.ZodType<Prisma.DailyTrackEntryCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  date: z.coerce.date(),
  completed: z.boolean().optional(),
  habitId: z.string(),
});

export const DailyTrackEntryUpdateManyMutationInputSchema: z.ZodType<Prisma.DailyTrackEntryUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyTrackEntryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DailyTrackEntryUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  habitId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JournalEntryCreateInputSchema: z.ZodType<Prisma.JournalEntryCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  content: z.string(),
  date: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutJournalEntriesInputSchema),
});

export const JournalEntryUncheckedCreateInputSchema: z.ZodType<Prisma.JournalEntryUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  content: z.string(),
  date: z.coerce.date().optional(),
  userId: z.string(),
});

export const JournalEntryUpdateInputSchema: z.ZodType<Prisma.JournalEntryUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutJournalEntriesNestedInputSchema).optional(),
});

export const JournalEntryUncheckedUpdateInputSchema: z.ZodType<Prisma.JournalEntryUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JournalEntryCreateManyInputSchema: z.ZodType<Prisma.JournalEntryCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  content: z.string(),
  date: z.coerce.date().optional(),
  userId: z.string(),
});

export const JournalEntryUpdateManyMutationInputSchema: z.ZodType<Prisma.JournalEntryUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JournalEntryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JournalEntryUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.strictObject({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional(),
});

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.strictObject({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional(),
});

export const HabitListRelationFilterSchema: z.ZodType<Prisma.HabitListRelationFilter> = z.strictObject({
  every: z.lazy(() => HabitWhereInputSchema).optional(),
  some: z.lazy(() => HabitWhereInputSchema).optional(),
  none: z.lazy(() => HabitWhereInputSchema).optional(),
});

export const JournalEntryListRelationFilterSchema: z.ZodType<Prisma.JournalEntryListRelationFilter> = z.strictObject({
  every: z.lazy(() => JournalEntryWhereInputSchema).optional(),
  some: z.lazy(() => JournalEntryWhereInputSchema).optional(),
  none: z.lazy(() => JournalEntryWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const HabitOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HabitOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const JournalEntryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.JournalEntryOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.strictObject({
  provider: z.string(),
  providerAccountId: z.string(),
});

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.strictObject({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.strictObject({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
});

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
});

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.strictObject({
  identifier: z.string(),
  token: z.string(),
});

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.strictObject({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.strictObject({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.strictObject({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.strictObject({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional(),
});

export const DailyTrackEntryListRelationFilterSchema: z.ZodType<Prisma.DailyTrackEntryListRelationFilter> = z.strictObject({
  every: z.lazy(() => DailyTrackEntryWhereInputSchema).optional(),
  some: z.lazy(() => DailyTrackEntryWhereInputSchema).optional(),
  none: z.lazy(() => DailyTrackEntryWhereInputSchema).optional(),
});

export const DailyTrackEntryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DailyTrackEntryOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const HabitCountOrderByAggregateInputSchema: z.ZodType<Prisma.HabitCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  frequency: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const HabitMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HabitMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const HabitMinOrderByAggregateInputSchema: z.ZodType<Prisma.HabitMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const HabitScalarRelationFilterSchema: z.ZodType<Prisma.HabitScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => HabitWhereInputSchema).optional(),
  isNot: z.lazy(() => HabitWhereInputSchema).optional(),
});

export const DailyTrackEntryHabitIdDateCompoundUniqueInputSchema: z.ZodType<Prisma.DailyTrackEntryHabitIdDateCompoundUniqueInput> = z.strictObject({
  habitId: z.string(),
  date: z.coerce.date(),
});

export const DailyTrackEntryCountOrderByAggregateInputSchema: z.ZodType<Prisma.DailyTrackEntryCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  habitId: z.lazy(() => SortOrderSchema).optional(),
});

export const DailyTrackEntryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DailyTrackEntryMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  habitId: z.lazy(() => SortOrderSchema).optional(),
});

export const DailyTrackEntryMinOrderByAggregateInputSchema: z.ZodType<Prisma.DailyTrackEntryMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  habitId: z.lazy(() => SortOrderSchema).optional(),
});

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const JournalEntryCountOrderByAggregateInputSchema: z.ZodType<Prisma.JournalEntryCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const JournalEntryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JournalEntryMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const JournalEntryMinOrderByAggregateInputSchema: z.ZodType<Prisma.JournalEntryMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
});

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
});

export const HabitCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.HabitCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => HabitCreateWithoutUserInputSchema), z.lazy(() => HabitCreateWithoutUserInputSchema).array(), z.lazy(() => HabitUncheckedCreateWithoutUserInputSchema), z.lazy(() => HabitUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HabitCreateOrConnectWithoutUserInputSchema), z.lazy(() => HabitCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HabitCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HabitWhereUniqueInputSchema), z.lazy(() => HabitWhereUniqueInputSchema).array() ]).optional(),
});

export const JournalEntryCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.JournalEntryCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => JournalEntryCreateWithoutUserInputSchema), z.lazy(() => JournalEntryCreateWithoutUserInputSchema).array(), z.lazy(() => JournalEntryUncheckedCreateWithoutUserInputSchema), z.lazy(() => JournalEntryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalEntryCreateOrConnectWithoutUserInputSchema), z.lazy(() => JournalEntryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalEntryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JournalEntryWhereUniqueInputSchema), z.lazy(() => JournalEntryWhereUniqueInputSchema).array() ]).optional(),
});

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
});

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
});

export const HabitUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.HabitUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => HabitCreateWithoutUserInputSchema), z.lazy(() => HabitCreateWithoutUserInputSchema).array(), z.lazy(() => HabitUncheckedCreateWithoutUserInputSchema), z.lazy(() => HabitUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HabitCreateOrConnectWithoutUserInputSchema), z.lazy(() => HabitCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HabitCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HabitWhereUniqueInputSchema), z.lazy(() => HabitWhereUniqueInputSchema).array() ]).optional(),
});

export const JournalEntryUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.JournalEntryUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => JournalEntryCreateWithoutUserInputSchema), z.lazy(() => JournalEntryCreateWithoutUserInputSchema).array(), z.lazy(() => JournalEntryUncheckedCreateWithoutUserInputSchema), z.lazy(() => JournalEntryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalEntryCreateOrConnectWithoutUserInputSchema), z.lazy(() => JournalEntryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalEntryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JournalEntryWhereUniqueInputSchema), z.lazy(() => JournalEntryWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional().nullable(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
});

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
});

export const HabitUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.HabitUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => HabitCreateWithoutUserInputSchema), z.lazy(() => HabitCreateWithoutUserInputSchema).array(), z.lazy(() => HabitUncheckedCreateWithoutUserInputSchema), z.lazy(() => HabitUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HabitCreateOrConnectWithoutUserInputSchema), z.lazy(() => HabitCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HabitUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => HabitUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HabitCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HabitWhereUniqueInputSchema), z.lazy(() => HabitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HabitWhereUniqueInputSchema), z.lazy(() => HabitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HabitWhereUniqueInputSchema), z.lazy(() => HabitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HabitWhereUniqueInputSchema), z.lazy(() => HabitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HabitUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => HabitUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HabitUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => HabitUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HabitScalarWhereInputSchema), z.lazy(() => HabitScalarWhereInputSchema).array() ]).optional(),
});

export const JournalEntryUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.JournalEntryUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => JournalEntryCreateWithoutUserInputSchema), z.lazy(() => JournalEntryCreateWithoutUserInputSchema).array(), z.lazy(() => JournalEntryUncheckedCreateWithoutUserInputSchema), z.lazy(() => JournalEntryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalEntryCreateOrConnectWithoutUserInputSchema), z.lazy(() => JournalEntryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JournalEntryUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => JournalEntryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalEntryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JournalEntryWhereUniqueInputSchema), z.lazy(() => JournalEntryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JournalEntryWhereUniqueInputSchema), z.lazy(() => JournalEntryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JournalEntryWhereUniqueInputSchema), z.lazy(() => JournalEntryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JournalEntryWhereUniqueInputSchema), z.lazy(() => JournalEntryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JournalEntryUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => JournalEntryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JournalEntryUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => JournalEntryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JournalEntryScalarWhereInputSchema), z.lazy(() => JournalEntryScalarWhereInputSchema).array() ]).optional(),
});

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
});

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
});

export const HabitUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.HabitUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => HabitCreateWithoutUserInputSchema), z.lazy(() => HabitCreateWithoutUserInputSchema).array(), z.lazy(() => HabitUncheckedCreateWithoutUserInputSchema), z.lazy(() => HabitUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HabitCreateOrConnectWithoutUserInputSchema), z.lazy(() => HabitCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HabitUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => HabitUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HabitCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HabitWhereUniqueInputSchema), z.lazy(() => HabitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HabitWhereUniqueInputSchema), z.lazy(() => HabitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HabitWhereUniqueInputSchema), z.lazy(() => HabitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HabitWhereUniqueInputSchema), z.lazy(() => HabitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HabitUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => HabitUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HabitUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => HabitUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HabitScalarWhereInputSchema), z.lazy(() => HabitScalarWhereInputSchema).array() ]).optional(),
});

export const JournalEntryUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.JournalEntryUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => JournalEntryCreateWithoutUserInputSchema), z.lazy(() => JournalEntryCreateWithoutUserInputSchema).array(), z.lazy(() => JournalEntryUncheckedCreateWithoutUserInputSchema), z.lazy(() => JournalEntryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalEntryCreateOrConnectWithoutUserInputSchema), z.lazy(() => JournalEntryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JournalEntryUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => JournalEntryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalEntryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JournalEntryWhereUniqueInputSchema), z.lazy(() => JournalEntryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JournalEntryWhereUniqueInputSchema), z.lazy(() => JournalEntryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JournalEntryWhereUniqueInputSchema), z.lazy(() => JournalEntryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JournalEntryWhereUniqueInputSchema), z.lazy(() => JournalEntryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JournalEntryUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => JournalEntryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JournalEntryUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => JournalEntryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JournalEntryScalarWhereInputSchema), z.lazy(() => JournalEntryScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema), z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema), z.lazy(() => UserUpdateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
});

export const HabitCreatefrequencyInputSchema: z.ZodType<Prisma.HabitCreatefrequencyInput> = z.strictObject({
  set: z.string().array(),
});

export const UserCreateNestedOneWithoutHabitsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutHabitsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutHabitsInputSchema), z.lazy(() => UserUncheckedCreateWithoutHabitsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHabitsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const DailyTrackEntryCreateNestedManyWithoutHabitInputSchema: z.ZodType<Prisma.DailyTrackEntryCreateNestedManyWithoutHabitInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyTrackEntryCreateWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryCreateWithoutHabitInputSchema).array(), z.lazy(() => DailyTrackEntryUncheckedCreateWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUncheckedCreateWithoutHabitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyTrackEntryCreateOrConnectWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryCreateOrConnectWithoutHabitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyTrackEntryCreateManyHabitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DailyTrackEntryWhereUniqueInputSchema), z.lazy(() => DailyTrackEntryWhereUniqueInputSchema).array() ]).optional(),
});

export const DailyTrackEntryUncheckedCreateNestedManyWithoutHabitInputSchema: z.ZodType<Prisma.DailyTrackEntryUncheckedCreateNestedManyWithoutHabitInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyTrackEntryCreateWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryCreateWithoutHabitInputSchema).array(), z.lazy(() => DailyTrackEntryUncheckedCreateWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUncheckedCreateWithoutHabitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyTrackEntryCreateOrConnectWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryCreateOrConnectWithoutHabitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyTrackEntryCreateManyHabitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DailyTrackEntryWhereUniqueInputSchema), z.lazy(() => DailyTrackEntryWhereUniqueInputSchema).array() ]).optional(),
});

export const HabitUpdatefrequencyInputSchema: z.ZodType<Prisma.HabitUpdatefrequencyInput> = z.strictObject({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
});

export const UserUpdateOneRequiredWithoutHabitsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutHabitsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutHabitsInputSchema), z.lazy(() => UserUncheckedCreateWithoutHabitsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHabitsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutHabitsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutHabitsInputSchema), z.lazy(() => UserUpdateWithoutHabitsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutHabitsInputSchema) ]).optional(),
});

export const DailyTrackEntryUpdateManyWithoutHabitNestedInputSchema: z.ZodType<Prisma.DailyTrackEntryUpdateManyWithoutHabitNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyTrackEntryCreateWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryCreateWithoutHabitInputSchema).array(), z.lazy(() => DailyTrackEntryUncheckedCreateWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUncheckedCreateWithoutHabitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyTrackEntryCreateOrConnectWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryCreateOrConnectWithoutHabitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DailyTrackEntryUpsertWithWhereUniqueWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUpsertWithWhereUniqueWithoutHabitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyTrackEntryCreateManyHabitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DailyTrackEntryWhereUniqueInputSchema), z.lazy(() => DailyTrackEntryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DailyTrackEntryWhereUniqueInputSchema), z.lazy(() => DailyTrackEntryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DailyTrackEntryWhereUniqueInputSchema), z.lazy(() => DailyTrackEntryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DailyTrackEntryWhereUniqueInputSchema), z.lazy(() => DailyTrackEntryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DailyTrackEntryUpdateWithWhereUniqueWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUpdateWithWhereUniqueWithoutHabitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DailyTrackEntryUpdateManyWithWhereWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUpdateManyWithWhereWithoutHabitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DailyTrackEntryScalarWhereInputSchema), z.lazy(() => DailyTrackEntryScalarWhereInputSchema).array() ]).optional(),
});

export const DailyTrackEntryUncheckedUpdateManyWithoutHabitNestedInputSchema: z.ZodType<Prisma.DailyTrackEntryUncheckedUpdateManyWithoutHabitNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DailyTrackEntryCreateWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryCreateWithoutHabitInputSchema).array(), z.lazy(() => DailyTrackEntryUncheckedCreateWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUncheckedCreateWithoutHabitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DailyTrackEntryCreateOrConnectWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryCreateOrConnectWithoutHabitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DailyTrackEntryUpsertWithWhereUniqueWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUpsertWithWhereUniqueWithoutHabitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DailyTrackEntryCreateManyHabitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DailyTrackEntryWhereUniqueInputSchema), z.lazy(() => DailyTrackEntryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DailyTrackEntryWhereUniqueInputSchema), z.lazy(() => DailyTrackEntryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DailyTrackEntryWhereUniqueInputSchema), z.lazy(() => DailyTrackEntryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DailyTrackEntryWhereUniqueInputSchema), z.lazy(() => DailyTrackEntryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DailyTrackEntryUpdateWithWhereUniqueWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUpdateWithWhereUniqueWithoutHabitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DailyTrackEntryUpdateManyWithWhereWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUpdateManyWithWhereWithoutHabitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DailyTrackEntryScalarWhereInputSchema), z.lazy(() => DailyTrackEntryScalarWhereInputSchema).array() ]).optional(),
});

export const HabitCreateNestedOneWithoutEntriesInputSchema: z.ZodType<Prisma.HabitCreateNestedOneWithoutEntriesInput> = z.strictObject({
  create: z.union([ z.lazy(() => HabitCreateWithoutEntriesInputSchema), z.lazy(() => HabitUncheckedCreateWithoutEntriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HabitCreateOrConnectWithoutEntriesInputSchema).optional(),
  connect: z.lazy(() => HabitWhereUniqueInputSchema).optional(),
});

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.strictObject({
  set: z.boolean().optional(),
});

export const HabitUpdateOneRequiredWithoutEntriesNestedInputSchema: z.ZodType<Prisma.HabitUpdateOneRequiredWithoutEntriesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => HabitCreateWithoutEntriesInputSchema), z.lazy(() => HabitUncheckedCreateWithoutEntriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HabitCreateOrConnectWithoutEntriesInputSchema).optional(),
  upsert: z.lazy(() => HabitUpsertWithoutEntriesInputSchema).optional(),
  connect: z.lazy(() => HabitWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => HabitUpdateToOneWithWhereWithoutEntriesInputSchema), z.lazy(() => HabitUpdateWithoutEntriesInputSchema), z.lazy(() => HabitUncheckedUpdateWithoutEntriesInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutJournalEntriesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutJournalEntriesInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutJournalEntriesInputSchema), z.lazy(() => UserUncheckedCreateWithoutJournalEntriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutJournalEntriesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutJournalEntriesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutJournalEntriesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutJournalEntriesInputSchema), z.lazy(() => UserUncheckedCreateWithoutJournalEntriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutJournalEntriesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutJournalEntriesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutJournalEntriesInputSchema), z.lazy(() => UserUpdateWithoutJournalEntriesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutJournalEntriesInputSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
});

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
});

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
});

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema), z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
});

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
});

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
});

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema), z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const HabitCreateWithoutUserInputSchema: z.ZodType<Prisma.HabitCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitCreatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  entries: z.lazy(() => DailyTrackEntryCreateNestedManyWithoutHabitInputSchema).optional(),
});

export const HabitUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.HabitUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitCreatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  entries: z.lazy(() => DailyTrackEntryUncheckedCreateNestedManyWithoutHabitInputSchema).optional(),
});

export const HabitCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.HabitCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => HabitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HabitCreateWithoutUserInputSchema), z.lazy(() => HabitUncheckedCreateWithoutUserInputSchema) ]),
});

export const HabitCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.HabitCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => HabitCreateManyUserInputSchema), z.lazy(() => HabitCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const JournalEntryCreateWithoutUserInputSchema: z.ZodType<Prisma.JournalEntryCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  content: z.string(),
  date: z.coerce.date().optional(),
});

export const JournalEntryUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.JournalEntryUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  content: z.string(),
  date: z.coerce.date().optional(),
});

export const JournalEntryCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.JournalEntryCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => JournalEntryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JournalEntryCreateWithoutUserInputSchema), z.lazy(() => JournalEntryUncheckedCreateWithoutUserInputSchema) ]),
});

export const JournalEntryCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.JournalEntryCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => JournalEntryCreateManyUserInputSchema), z.lazy(() => JournalEntryCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema), z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
});

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema), z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
});

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema), z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema), z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
});

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema), z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
});

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema), z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const HabitUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.HabitUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => HabitWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HabitUpdateWithoutUserInputSchema), z.lazy(() => HabitUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => HabitCreateWithoutUserInputSchema), z.lazy(() => HabitUncheckedCreateWithoutUserInputSchema) ]),
});

export const HabitUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.HabitUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => HabitWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HabitUpdateWithoutUserInputSchema), z.lazy(() => HabitUncheckedUpdateWithoutUserInputSchema) ]),
});

export const HabitUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.HabitUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => HabitScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HabitUpdateManyMutationInputSchema), z.lazy(() => HabitUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const HabitScalarWhereInputSchema: z.ZodType<Prisma.HabitScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => HabitScalarWhereInputSchema), z.lazy(() => HabitScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HabitScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HabitScalarWhereInputSchema), z.lazy(() => HabitScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  frequency: z.lazy(() => StringNullableListFilterSchema).optional(),
  time: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const JournalEntryUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.JournalEntryUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => JournalEntryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JournalEntryUpdateWithoutUserInputSchema), z.lazy(() => JournalEntryUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => JournalEntryCreateWithoutUserInputSchema), z.lazy(() => JournalEntryUncheckedCreateWithoutUserInputSchema) ]),
});

export const JournalEntryUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.JournalEntryUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => JournalEntryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JournalEntryUpdateWithoutUserInputSchema), z.lazy(() => JournalEntryUncheckedUpdateWithoutUserInputSchema) ]),
});

export const JournalEntryUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.JournalEntryUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => JournalEntryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JournalEntryUpdateManyMutationInputSchema), z.lazy(() => JournalEntryUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const JournalEntryScalarWhereInputSchema: z.ZodType<Prisma.JournalEntryScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => JournalEntryScalarWhereInputSchema), z.lazy(() => JournalEntryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JournalEntryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JournalEntryScalarWhereInputSchema), z.lazy(() => JournalEntryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  habits: z.lazy(() => HabitCreateNestedManyWithoutUserInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  habits: z.lazy(() => HabitUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
});

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
});

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  habits: z.lazy(() => HabitUpdateManyWithoutUserNestedInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  habits: z.lazy(() => HabitUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  habits: z.lazy(() => HabitCreateNestedManyWithoutUserInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  habits: z.lazy(() => HabitUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
});

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
});

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  habits: z.lazy(() => HabitUpdateManyWithoutUserNestedInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  habits: z.lazy(() => HabitUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateWithoutHabitsInputSchema: z.ZodType<Prisma.UserCreateWithoutHabitsInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutHabitsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutHabitsInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutHabitsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutHabitsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutHabitsInputSchema), z.lazy(() => UserUncheckedCreateWithoutHabitsInputSchema) ]),
});

export const DailyTrackEntryCreateWithoutHabitInputSchema: z.ZodType<Prisma.DailyTrackEntryCreateWithoutHabitInput> = z.strictObject({
  id: z.uuid().optional(),
  date: z.coerce.date(),
  completed: z.boolean().optional(),
});

export const DailyTrackEntryUncheckedCreateWithoutHabitInputSchema: z.ZodType<Prisma.DailyTrackEntryUncheckedCreateWithoutHabitInput> = z.strictObject({
  id: z.uuid().optional(),
  date: z.coerce.date(),
  completed: z.boolean().optional(),
});

export const DailyTrackEntryCreateOrConnectWithoutHabitInputSchema: z.ZodType<Prisma.DailyTrackEntryCreateOrConnectWithoutHabitInput> = z.strictObject({
  where: z.lazy(() => DailyTrackEntryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DailyTrackEntryCreateWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUncheckedCreateWithoutHabitInputSchema) ]),
});

export const DailyTrackEntryCreateManyHabitInputEnvelopeSchema: z.ZodType<Prisma.DailyTrackEntryCreateManyHabitInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => DailyTrackEntryCreateManyHabitInputSchema), z.lazy(() => DailyTrackEntryCreateManyHabitInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserUpsertWithoutHabitsInputSchema: z.ZodType<Prisma.UserUpsertWithoutHabitsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutHabitsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutHabitsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutHabitsInputSchema), z.lazy(() => UserUncheckedCreateWithoutHabitsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutHabitsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutHabitsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutHabitsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutHabitsInputSchema) ]),
});

export const UserUpdateWithoutHabitsInputSchema: z.ZodType<Prisma.UserUpdateWithoutHabitsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutHabitsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutHabitsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  journalEntries: z.lazy(() => JournalEntryUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const DailyTrackEntryUpsertWithWhereUniqueWithoutHabitInputSchema: z.ZodType<Prisma.DailyTrackEntryUpsertWithWhereUniqueWithoutHabitInput> = z.strictObject({
  where: z.lazy(() => DailyTrackEntryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DailyTrackEntryUpdateWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUncheckedUpdateWithoutHabitInputSchema) ]),
  create: z.union([ z.lazy(() => DailyTrackEntryCreateWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUncheckedCreateWithoutHabitInputSchema) ]),
});

export const DailyTrackEntryUpdateWithWhereUniqueWithoutHabitInputSchema: z.ZodType<Prisma.DailyTrackEntryUpdateWithWhereUniqueWithoutHabitInput> = z.strictObject({
  where: z.lazy(() => DailyTrackEntryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DailyTrackEntryUpdateWithoutHabitInputSchema), z.lazy(() => DailyTrackEntryUncheckedUpdateWithoutHabitInputSchema) ]),
});

export const DailyTrackEntryUpdateManyWithWhereWithoutHabitInputSchema: z.ZodType<Prisma.DailyTrackEntryUpdateManyWithWhereWithoutHabitInput> = z.strictObject({
  where: z.lazy(() => DailyTrackEntryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DailyTrackEntryUpdateManyMutationInputSchema), z.lazy(() => DailyTrackEntryUncheckedUpdateManyWithoutHabitInputSchema) ]),
});

export const DailyTrackEntryScalarWhereInputSchema: z.ZodType<Prisma.DailyTrackEntryScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DailyTrackEntryScalarWhereInputSchema), z.lazy(() => DailyTrackEntryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DailyTrackEntryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DailyTrackEntryScalarWhereInputSchema), z.lazy(() => DailyTrackEntryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  habitId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const HabitCreateWithoutEntriesInputSchema: z.ZodType<Prisma.HabitCreateWithoutEntriesInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitCreatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutHabitsInputSchema),
});

export const HabitUncheckedCreateWithoutEntriesInputSchema: z.ZodType<Prisma.HabitUncheckedCreateWithoutEntriesInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitCreatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.string().optional().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
});

export const HabitCreateOrConnectWithoutEntriesInputSchema: z.ZodType<Prisma.HabitCreateOrConnectWithoutEntriesInput> = z.strictObject({
  where: z.lazy(() => HabitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HabitCreateWithoutEntriesInputSchema), z.lazy(() => HabitUncheckedCreateWithoutEntriesInputSchema) ]),
});

export const HabitUpsertWithoutEntriesInputSchema: z.ZodType<Prisma.HabitUpsertWithoutEntriesInput> = z.strictObject({
  update: z.union([ z.lazy(() => HabitUpdateWithoutEntriesInputSchema), z.lazy(() => HabitUncheckedUpdateWithoutEntriesInputSchema) ]),
  create: z.union([ z.lazy(() => HabitCreateWithoutEntriesInputSchema), z.lazy(() => HabitUncheckedCreateWithoutEntriesInputSchema) ]),
  where: z.lazy(() => HabitWhereInputSchema).optional(),
});

export const HabitUpdateToOneWithWhereWithoutEntriesInputSchema: z.ZodType<Prisma.HabitUpdateToOneWithWhereWithoutEntriesInput> = z.strictObject({
  where: z.lazy(() => HabitWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => HabitUpdateWithoutEntriesInputSchema), z.lazy(() => HabitUncheckedUpdateWithoutEntriesInputSchema) ]),
});

export const HabitUpdateWithoutEntriesInputSchema: z.ZodType<Prisma.HabitUpdateWithoutEntriesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitUpdatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutHabitsNestedInputSchema).optional(),
});

export const HabitUncheckedUpdateWithoutEntriesInputSchema: z.ZodType<Prisma.HabitUncheckedUpdateWithoutEntriesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitUpdatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserCreateWithoutJournalEntriesInputSchema: z.ZodType<Prisma.UserCreateWithoutJournalEntriesInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  habits: z.lazy(() => HabitCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutJournalEntriesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutJournalEntriesInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  habits: z.lazy(() => HabitUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutJournalEntriesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutJournalEntriesInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutJournalEntriesInputSchema), z.lazy(() => UserUncheckedCreateWithoutJournalEntriesInputSchema) ]),
});

export const UserUpsertWithoutJournalEntriesInputSchema: z.ZodType<Prisma.UserUpsertWithoutJournalEntriesInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutJournalEntriesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutJournalEntriesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutJournalEntriesInputSchema), z.lazy(() => UserUncheckedCreateWithoutJournalEntriesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutJournalEntriesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutJournalEntriesInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutJournalEntriesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutJournalEntriesInputSchema) ]),
});

export const UserUpdateWithoutJournalEntriesInputSchema: z.ZodType<Prisma.UserUpdateWithoutJournalEntriesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  habits: z.lazy(() => HabitUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutJournalEntriesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutJournalEntriesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  habits: z.lazy(() => HabitUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.strictObject({
  id: z.uuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
});

export const HabitCreateManyUserInputSchema: z.ZodType<Prisma.HabitCreateManyUserInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitCreatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});

export const JournalEntryCreateManyUserInputSchema: z.ZodType<Prisma.JournalEntryCreateManyUserInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  content: z.string(),
  date: z.coerce.date().optional(),
});

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const HabitUpdateWithoutUserInputSchema: z.ZodType<Prisma.HabitUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitUpdatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  entries: z.lazy(() => DailyTrackEntryUpdateManyWithoutHabitNestedInputSchema).optional(),
});

export const HabitUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.HabitUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitUpdatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  entries: z.lazy(() => DailyTrackEntryUncheckedUpdateManyWithoutHabitNestedInputSchema).optional(),
});

export const HabitUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.HabitUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  frequency: z.union([ z.lazy(() => HabitUpdatefrequencyInputSchema), z.string().array() ]).optional(),
  time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JournalEntryUpdateWithoutUserInputSchema: z.ZodType<Prisma.JournalEntryUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JournalEntryUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.JournalEntryUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const JournalEntryUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.JournalEntryUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyTrackEntryCreateManyHabitInputSchema: z.ZodType<Prisma.DailyTrackEntryCreateManyHabitInput> = z.strictObject({
  id: z.uuid().optional(),
  date: z.coerce.date(),
  completed: z.boolean().optional(),
});

export const DailyTrackEntryUpdateWithoutHabitInputSchema: z.ZodType<Prisma.DailyTrackEntryUpdateWithoutHabitInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyTrackEntryUncheckedUpdateWithoutHabitInputSchema: z.ZodType<Prisma.DailyTrackEntryUncheckedUpdateWithoutHabitInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DailyTrackEntryUncheckedUpdateManyWithoutHabitInputSchema: z.ZodType<Prisma.DailyTrackEntryUncheckedUpdateManyWithoutHabitInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(), AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(), 
  having: AccountScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema, 
}).strict();

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema, 
}).strict();

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(), 
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(), 
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(), 
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(), 
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(), 
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(), SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(), 
  having: SessionScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema, 
}).strict();

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema, 
}).strict();

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(), VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(), 
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema, 
}).strict();

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema, 
}).strict();

export const HabitFindFirstArgsSchema: z.ZodType<Prisma.HabitFindFirstArgs> = z.object({
  select: HabitSelectSchema.optional(),
  include: HabitIncludeSchema.optional(),
  where: HabitWhereInputSchema.optional(), 
  orderBy: z.union([ HabitOrderByWithRelationInputSchema.array(), HabitOrderByWithRelationInputSchema ]).optional(),
  cursor: HabitWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HabitScalarFieldEnumSchema, HabitScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const HabitFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HabitFindFirstOrThrowArgs> = z.object({
  select: HabitSelectSchema.optional(),
  include: HabitIncludeSchema.optional(),
  where: HabitWhereInputSchema.optional(), 
  orderBy: z.union([ HabitOrderByWithRelationInputSchema.array(), HabitOrderByWithRelationInputSchema ]).optional(),
  cursor: HabitWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HabitScalarFieldEnumSchema, HabitScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const HabitFindManyArgsSchema: z.ZodType<Prisma.HabitFindManyArgs> = z.object({
  select: HabitSelectSchema.optional(),
  include: HabitIncludeSchema.optional(),
  where: HabitWhereInputSchema.optional(), 
  orderBy: z.union([ HabitOrderByWithRelationInputSchema.array(), HabitOrderByWithRelationInputSchema ]).optional(),
  cursor: HabitWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HabitScalarFieldEnumSchema, HabitScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const HabitAggregateArgsSchema: z.ZodType<Prisma.HabitAggregateArgs> = z.object({
  where: HabitWhereInputSchema.optional(), 
  orderBy: z.union([ HabitOrderByWithRelationInputSchema.array(), HabitOrderByWithRelationInputSchema ]).optional(),
  cursor: HabitWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const HabitGroupByArgsSchema: z.ZodType<Prisma.HabitGroupByArgs> = z.object({
  where: HabitWhereInputSchema.optional(), 
  orderBy: z.union([ HabitOrderByWithAggregationInputSchema.array(), HabitOrderByWithAggregationInputSchema ]).optional(),
  by: HabitScalarFieldEnumSchema.array(), 
  having: HabitScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const HabitFindUniqueArgsSchema: z.ZodType<Prisma.HabitFindUniqueArgs> = z.object({
  select: HabitSelectSchema.optional(),
  include: HabitIncludeSchema.optional(),
  where: HabitWhereUniqueInputSchema, 
}).strict();

export const HabitFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HabitFindUniqueOrThrowArgs> = z.object({
  select: HabitSelectSchema.optional(),
  include: HabitIncludeSchema.optional(),
  where: HabitWhereUniqueInputSchema, 
}).strict();

export const DailyTrackEntryFindFirstArgsSchema: z.ZodType<Prisma.DailyTrackEntryFindFirstArgs> = z.object({
  select: DailyTrackEntrySelectSchema.optional(),
  include: DailyTrackEntryIncludeSchema.optional(),
  where: DailyTrackEntryWhereInputSchema.optional(), 
  orderBy: z.union([ DailyTrackEntryOrderByWithRelationInputSchema.array(), DailyTrackEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: DailyTrackEntryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DailyTrackEntryScalarFieldEnumSchema, DailyTrackEntryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DailyTrackEntryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DailyTrackEntryFindFirstOrThrowArgs> = z.object({
  select: DailyTrackEntrySelectSchema.optional(),
  include: DailyTrackEntryIncludeSchema.optional(),
  where: DailyTrackEntryWhereInputSchema.optional(), 
  orderBy: z.union([ DailyTrackEntryOrderByWithRelationInputSchema.array(), DailyTrackEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: DailyTrackEntryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DailyTrackEntryScalarFieldEnumSchema, DailyTrackEntryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DailyTrackEntryFindManyArgsSchema: z.ZodType<Prisma.DailyTrackEntryFindManyArgs> = z.object({
  select: DailyTrackEntrySelectSchema.optional(),
  include: DailyTrackEntryIncludeSchema.optional(),
  where: DailyTrackEntryWhereInputSchema.optional(), 
  orderBy: z.union([ DailyTrackEntryOrderByWithRelationInputSchema.array(), DailyTrackEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: DailyTrackEntryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DailyTrackEntryScalarFieldEnumSchema, DailyTrackEntryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DailyTrackEntryAggregateArgsSchema: z.ZodType<Prisma.DailyTrackEntryAggregateArgs> = z.object({
  where: DailyTrackEntryWhereInputSchema.optional(), 
  orderBy: z.union([ DailyTrackEntryOrderByWithRelationInputSchema.array(), DailyTrackEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: DailyTrackEntryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const DailyTrackEntryGroupByArgsSchema: z.ZodType<Prisma.DailyTrackEntryGroupByArgs> = z.object({
  where: DailyTrackEntryWhereInputSchema.optional(), 
  orderBy: z.union([ DailyTrackEntryOrderByWithAggregationInputSchema.array(), DailyTrackEntryOrderByWithAggregationInputSchema ]).optional(),
  by: DailyTrackEntryScalarFieldEnumSchema.array(), 
  having: DailyTrackEntryScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const DailyTrackEntryFindUniqueArgsSchema: z.ZodType<Prisma.DailyTrackEntryFindUniqueArgs> = z.object({
  select: DailyTrackEntrySelectSchema.optional(),
  include: DailyTrackEntryIncludeSchema.optional(),
  where: DailyTrackEntryWhereUniqueInputSchema, 
}).strict();

export const DailyTrackEntryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DailyTrackEntryFindUniqueOrThrowArgs> = z.object({
  select: DailyTrackEntrySelectSchema.optional(),
  include: DailyTrackEntryIncludeSchema.optional(),
  where: DailyTrackEntryWhereUniqueInputSchema, 
}).strict();

export const JournalEntryFindFirstArgsSchema: z.ZodType<Prisma.JournalEntryFindFirstArgs> = z.object({
  select: JournalEntrySelectSchema.optional(),
  include: JournalEntryIncludeSchema.optional(),
  where: JournalEntryWhereInputSchema.optional(), 
  orderBy: z.union([ JournalEntryOrderByWithRelationInputSchema.array(), JournalEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: JournalEntryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JournalEntryScalarFieldEnumSchema, JournalEntryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const JournalEntryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JournalEntryFindFirstOrThrowArgs> = z.object({
  select: JournalEntrySelectSchema.optional(),
  include: JournalEntryIncludeSchema.optional(),
  where: JournalEntryWhereInputSchema.optional(), 
  orderBy: z.union([ JournalEntryOrderByWithRelationInputSchema.array(), JournalEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: JournalEntryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JournalEntryScalarFieldEnumSchema, JournalEntryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const JournalEntryFindManyArgsSchema: z.ZodType<Prisma.JournalEntryFindManyArgs> = z.object({
  select: JournalEntrySelectSchema.optional(),
  include: JournalEntryIncludeSchema.optional(),
  where: JournalEntryWhereInputSchema.optional(), 
  orderBy: z.union([ JournalEntryOrderByWithRelationInputSchema.array(), JournalEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: JournalEntryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JournalEntryScalarFieldEnumSchema, JournalEntryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const JournalEntryAggregateArgsSchema: z.ZodType<Prisma.JournalEntryAggregateArgs> = z.object({
  where: JournalEntryWhereInputSchema.optional(), 
  orderBy: z.union([ JournalEntryOrderByWithRelationInputSchema.array(), JournalEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: JournalEntryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const JournalEntryGroupByArgsSchema: z.ZodType<Prisma.JournalEntryGroupByArgs> = z.object({
  where: JournalEntryWhereInputSchema.optional(), 
  orderBy: z.union([ JournalEntryOrderByWithAggregationInputSchema.array(), JournalEntryOrderByWithAggregationInputSchema ]).optional(),
  by: JournalEntryScalarFieldEnumSchema.array(), 
  having: JournalEntryScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const JournalEntryFindUniqueArgsSchema: z.ZodType<Prisma.JournalEntryFindUniqueArgs> = z.object({
  select: JournalEntrySelectSchema.optional(),
  include: JournalEntryIncludeSchema.optional(),
  where: JournalEntryWhereUniqueInputSchema, 
}).strict();

export const JournalEntryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JournalEntryFindUniqueOrThrowArgs> = z.object({
  select: JournalEntrySelectSchema.optional(),
  include: JournalEntryIncludeSchema.optional(),
  where: JournalEntryWhereUniqueInputSchema, 
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema, AccountUncheckedCreateInputSchema ]),
}).strict();

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema, 
  create: z.union([ AccountCreateInputSchema, AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema ]),
}).strict();

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema, AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema, AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema, 
}).strict();

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema, 
}).strict();

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema, AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema, AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema, SessionUncheckedCreateInputSchema ]),
}).strict();

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema, 
  create: z.union([ SessionCreateInputSchema, SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema ]),
}).strict();

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema, SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema, SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema, 
}).strict();

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema, 
}).strict();

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema, SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SessionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema, SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema, VerificationTokenUncheckedCreateInputSchema ]),
}).strict();

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema, 
  create: z.union([ VerificationTokenCreateInputSchema, VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema, VerificationTokenUncheckedUpdateInputSchema ]),
}).strict();

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema, VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VerificationTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema, VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema, 
}).strict();

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema, VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema, 
}).strict();

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema, VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VerificationTokenUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema, VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const HabitCreateArgsSchema: z.ZodType<Prisma.HabitCreateArgs> = z.object({
  select: HabitSelectSchema.optional(),
  include: HabitIncludeSchema.optional(),
  data: z.union([ HabitCreateInputSchema, HabitUncheckedCreateInputSchema ]),
}).strict();

export const HabitUpsertArgsSchema: z.ZodType<Prisma.HabitUpsertArgs> = z.object({
  select: HabitSelectSchema.optional(),
  include: HabitIncludeSchema.optional(),
  where: HabitWhereUniqueInputSchema, 
  create: z.union([ HabitCreateInputSchema, HabitUncheckedCreateInputSchema ]),
  update: z.union([ HabitUpdateInputSchema, HabitUncheckedUpdateInputSchema ]),
}).strict();

export const HabitCreateManyArgsSchema: z.ZodType<Prisma.HabitCreateManyArgs> = z.object({
  data: z.union([ HabitCreateManyInputSchema, HabitCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const HabitCreateManyAndReturnArgsSchema: z.ZodType<Prisma.HabitCreateManyAndReturnArgs> = z.object({
  data: z.union([ HabitCreateManyInputSchema, HabitCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const HabitDeleteArgsSchema: z.ZodType<Prisma.HabitDeleteArgs> = z.object({
  select: HabitSelectSchema.optional(),
  include: HabitIncludeSchema.optional(),
  where: HabitWhereUniqueInputSchema, 
}).strict();

export const HabitUpdateArgsSchema: z.ZodType<Prisma.HabitUpdateArgs> = z.object({
  select: HabitSelectSchema.optional(),
  include: HabitIncludeSchema.optional(),
  data: z.union([ HabitUpdateInputSchema, HabitUncheckedUpdateInputSchema ]),
  where: HabitWhereUniqueInputSchema, 
}).strict();

export const HabitUpdateManyArgsSchema: z.ZodType<Prisma.HabitUpdateManyArgs> = z.object({
  data: z.union([ HabitUpdateManyMutationInputSchema, HabitUncheckedUpdateManyInputSchema ]),
  where: HabitWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const HabitUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.HabitUpdateManyAndReturnArgs> = z.object({
  data: z.union([ HabitUpdateManyMutationInputSchema, HabitUncheckedUpdateManyInputSchema ]),
  where: HabitWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const HabitDeleteManyArgsSchema: z.ZodType<Prisma.HabitDeleteManyArgs> = z.object({
  where: HabitWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const DailyTrackEntryCreateArgsSchema: z.ZodType<Prisma.DailyTrackEntryCreateArgs> = z.object({
  select: DailyTrackEntrySelectSchema.optional(),
  include: DailyTrackEntryIncludeSchema.optional(),
  data: z.union([ DailyTrackEntryCreateInputSchema, DailyTrackEntryUncheckedCreateInputSchema ]),
}).strict();

export const DailyTrackEntryUpsertArgsSchema: z.ZodType<Prisma.DailyTrackEntryUpsertArgs> = z.object({
  select: DailyTrackEntrySelectSchema.optional(),
  include: DailyTrackEntryIncludeSchema.optional(),
  where: DailyTrackEntryWhereUniqueInputSchema, 
  create: z.union([ DailyTrackEntryCreateInputSchema, DailyTrackEntryUncheckedCreateInputSchema ]),
  update: z.union([ DailyTrackEntryUpdateInputSchema, DailyTrackEntryUncheckedUpdateInputSchema ]),
}).strict();

export const DailyTrackEntryCreateManyArgsSchema: z.ZodType<Prisma.DailyTrackEntryCreateManyArgs> = z.object({
  data: z.union([ DailyTrackEntryCreateManyInputSchema, DailyTrackEntryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const DailyTrackEntryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DailyTrackEntryCreateManyAndReturnArgs> = z.object({
  data: z.union([ DailyTrackEntryCreateManyInputSchema, DailyTrackEntryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const DailyTrackEntryDeleteArgsSchema: z.ZodType<Prisma.DailyTrackEntryDeleteArgs> = z.object({
  select: DailyTrackEntrySelectSchema.optional(),
  include: DailyTrackEntryIncludeSchema.optional(),
  where: DailyTrackEntryWhereUniqueInputSchema, 
}).strict();

export const DailyTrackEntryUpdateArgsSchema: z.ZodType<Prisma.DailyTrackEntryUpdateArgs> = z.object({
  select: DailyTrackEntrySelectSchema.optional(),
  include: DailyTrackEntryIncludeSchema.optional(),
  data: z.union([ DailyTrackEntryUpdateInputSchema, DailyTrackEntryUncheckedUpdateInputSchema ]),
  where: DailyTrackEntryWhereUniqueInputSchema, 
}).strict();

export const DailyTrackEntryUpdateManyArgsSchema: z.ZodType<Prisma.DailyTrackEntryUpdateManyArgs> = z.object({
  data: z.union([ DailyTrackEntryUpdateManyMutationInputSchema, DailyTrackEntryUncheckedUpdateManyInputSchema ]),
  where: DailyTrackEntryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const DailyTrackEntryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.DailyTrackEntryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ DailyTrackEntryUpdateManyMutationInputSchema, DailyTrackEntryUncheckedUpdateManyInputSchema ]),
  where: DailyTrackEntryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const DailyTrackEntryDeleteManyArgsSchema: z.ZodType<Prisma.DailyTrackEntryDeleteManyArgs> = z.object({
  where: DailyTrackEntryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const JournalEntryCreateArgsSchema: z.ZodType<Prisma.JournalEntryCreateArgs> = z.object({
  select: JournalEntrySelectSchema.optional(),
  include: JournalEntryIncludeSchema.optional(),
  data: z.union([ JournalEntryCreateInputSchema, JournalEntryUncheckedCreateInputSchema ]),
}).strict();

export const JournalEntryUpsertArgsSchema: z.ZodType<Prisma.JournalEntryUpsertArgs> = z.object({
  select: JournalEntrySelectSchema.optional(),
  include: JournalEntryIncludeSchema.optional(),
  where: JournalEntryWhereUniqueInputSchema, 
  create: z.union([ JournalEntryCreateInputSchema, JournalEntryUncheckedCreateInputSchema ]),
  update: z.union([ JournalEntryUpdateInputSchema, JournalEntryUncheckedUpdateInputSchema ]),
}).strict();

export const JournalEntryCreateManyArgsSchema: z.ZodType<Prisma.JournalEntryCreateManyArgs> = z.object({
  data: z.union([ JournalEntryCreateManyInputSchema, JournalEntryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const JournalEntryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.JournalEntryCreateManyAndReturnArgs> = z.object({
  data: z.union([ JournalEntryCreateManyInputSchema, JournalEntryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const JournalEntryDeleteArgsSchema: z.ZodType<Prisma.JournalEntryDeleteArgs> = z.object({
  select: JournalEntrySelectSchema.optional(),
  include: JournalEntryIncludeSchema.optional(),
  where: JournalEntryWhereUniqueInputSchema, 
}).strict();

export const JournalEntryUpdateArgsSchema: z.ZodType<Prisma.JournalEntryUpdateArgs> = z.object({
  select: JournalEntrySelectSchema.optional(),
  include: JournalEntryIncludeSchema.optional(),
  data: z.union([ JournalEntryUpdateInputSchema, JournalEntryUncheckedUpdateInputSchema ]),
  where: JournalEntryWhereUniqueInputSchema, 
}).strict();

export const JournalEntryUpdateManyArgsSchema: z.ZodType<Prisma.JournalEntryUpdateManyArgs> = z.object({
  data: z.union([ JournalEntryUpdateManyMutationInputSchema, JournalEntryUncheckedUpdateManyInputSchema ]),
  where: JournalEntryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const JournalEntryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.JournalEntryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ JournalEntryUpdateManyMutationInputSchema, JournalEntryUncheckedUpdateManyInputSchema ]),
  where: JournalEntryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const JournalEntryDeleteManyArgsSchema: z.ZodType<Prisma.JournalEntryDeleteManyArgs> = z.object({
  where: JournalEntryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();