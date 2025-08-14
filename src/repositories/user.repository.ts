import { eq } from "drizzle-orm";
import { db } from "../database";
import { NewUser, User, users } from "../database/schema";

export class UserRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user;
  }

  async findByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.googleId, googleId))
      .limit(1);

    return user;
  }

  async create(user: NewUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async update(userId: string, updates: Partial<NewUser>): Promise<User> {
    const [update] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, userId))
      .returning();
    return update;
  }
}
