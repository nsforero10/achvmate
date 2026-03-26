import { prisma, UserSchema } from "@achvmate/database";

// Force dynamic rendering — this page fetches from the DB at runtime
export const dynamic = "force-dynamic";

export default async function Home() {
  // Verifying Prisma Connection
  const users = await prisma.user.findMany({ take: 5 });

  // Verifying Zod Typings
  const sampleUser = { id: '123e4567-e89b-12d3-a456-426614174000', email: 'test@example.com', createdAt: new Date(), name: null, emailVerified: null, image: null, password: null };
  const isValid = UserSchema.safeParse(sampleUser).success;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Achvmate</h1>
      
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border border-zinc-200 dark:border-zinc-700">
        <h2 className="text-2xl font-semibold mb-4">Database Connection Status</h2>
        
        <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">✅ Prisma Connected</h3>
          <p className="text-sm text-green-700 dark:text-green-400">Successfully fetched {users.length} users from PostgreSQL.</p>
        </div>

        <div className="mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">✅ Zod Types Available</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">Zod schema validation test {isValid ? "passed" : "failed"}.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Recent Users</h3>
          {users.length === 0 ? (
            <p className="text-sm text-zinc-500 italic">No users found. Try running some seeds!</p>
          ) : (
            <ul className="space-y-2">
              {users.map(u => (
                <li key={u.id} className="text-sm bg-zinc-100 dark:bg-zinc-700 p-2 rounded">{u.email}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
