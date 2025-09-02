import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { comments } from "~/server/db/schema";
import { desc } from "drizzle-orm";

// GET /api/comments - List all comments
export async function GET() {
  try {
    const allComments = await db
      .select()
      .from(comments)
      .orderBy(desc(comments.date));

    return NextResponse.json(allComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

// POST /api/comments - Add a new comment from "Admin"
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { text: string };
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required and must be a string" },
        { status: 400 },
      );
    }

    const [newComment] = await db
      .insert(comments)
      .values({
        author: "Admin",
        text: text.trim(),
        likes: 0,
        image: null,
      })
      .returning();

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 },
    );
  }
}
