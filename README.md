# Comments App

## Setup

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Copy .env.example**

   ```bash
   cp .env.example .env
   ```

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

7. (Optional) To populate the db with test data run the script in populate_comments.sql while connected to the database via e.g. TablesPlus. Check the .env folder which was created for connection details.

## API Endpoints

- `GET /api/comments` - List all comments
- `POST /api/comments` - Add new comment
- `PUT /api/comments/[id]` - Edit comment
- `DELETE /api/comments/[id]` - Delete comment
