import { CommentsList } from "~/components/CommentList";

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Comments</h1>
            <p className="text-muted-foreground">
              Community discussions and feedback
            </p>
          </div>
          <CommentsList />
        </div>
      </div>
    </main>
  );
}
