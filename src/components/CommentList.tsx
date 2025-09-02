"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Heart } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
  likes: number;
  image: string | null;
}

export function CommentsList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/comments");
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = (await response.json()) as Comment[];
        setComments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    void fetchComments();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAuthorInitials = (author: string) => {
    return author
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-muted-foreground">Loading comments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-muted-foreground">No comments yet.</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id} className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.image ?? undefined} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getAuthorInitials(comment.author)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">{comment.author}</h4>
                  <time className="text-muted-foreground text-xs">
                    {formatDate(comment.date)}
                  </time>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="mb-3 text-sm leading-relaxed">{comment.text}</p>
            <div className="text-muted-foreground flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{comment.likes}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
