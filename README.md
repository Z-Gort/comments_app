# Comments App

## Setup

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Set up environment**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your database URL.

3. **Start database**

   ```bash
   ./start-database.sh
   ```

4. **Push database schema**

   ```bash
   pnpm db:push
   ```

5. **Start development server**

   ```bash
   pnpm dev
   ```

6. **Open app**
   Visit `http://localhost:3000`

## API Endpoints

- `GET /api/comments` - List all comments
- `POST /api/comments` - Add new comment
- `PUT /api/comments/[id]` - Edit comment
- `DELETE /api/comments/[id]` - Delete comment
