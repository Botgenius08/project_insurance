# Demo Users Location

## Important: Custom Users vs Supabase Auth Users

The demo users are stored in our **custom `users` table**, NOT in Supabase's built-in Authentication system.

### Where to Find Demo Users

1. **Go to Supabase Dashboard**
2. **Click on "Table Editor"** (not Authentication)
3. **Select the `users` table**
4. **You should see the demo users there**

### Demo User Credentials

The following demo users were created in the `users` table:

| Username | Password | User Type |
|----------|----------|-----------|
| intermediary1 | password123 | intermediary |
| intermediary2 | password123 | intermediary |
| employee1 | password123 | employee |
| employee2 | password123 | employee |
| admin | password123 | employee |

### How Our Authentication Works

1. **Custom Authentication**: We use our own `users` table for authentication
2. **Password Hashing**: Passwords are hashed using bcrypt
3. **User Types**: Each user has a `user_type` field (intermediary/employee)
4. **No Supabase Auth**: We don't use Supabase's built-in auth system

### To Check if Demo Users Exist

1. Go to Supabase Dashboard
2. Navigate to "Table Editor"
3. Click on the "users" table
4. You should see 5 demo users listed

If the users table doesn't exist, you need to run the migration SQL files first.