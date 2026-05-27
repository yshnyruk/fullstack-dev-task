# Full Stack Dev Task

A Laravel 13 + React 19 task manager with authentication, projects, and project-scoped tasks.

## What it does

- Users can register, log in, and log out through Laravel Sanctum.
- Authenticated users can create, edit, and delete projects.
- Each project can contain multiple tasks.
- Tasks can be marked completed, edited, deleted, and listed with pagination.

## Tech Stack

- Backend: Laravel 13, PHP 8.3, Sanctum
- Frontend: React 19, TypeScript, Vite, React Router
- Database: PostgreSQL with Laravel migrations and seeders

## Project Structure

- `app/`, `routes/`, `database/`, `config/`: Laravel backend
- `frontend/`: standalone React + Vite frontend
- `docs/`: project documentation, including the database scheme

## Setup

### 1. Install backend dependencies

```bash
composer install
```

### 2. Configure environment

Copy `.env.example` to `.env` if needed, then generate an app key and run migrations:

Make sure your `.env` is configured for PostgreSQL (`DB_CONNECTION=pgsql`) and points to your local database.

```bash
php artisan key:generate
php artisan migrate
```

If you want seeded data:

```bash
php artisan db:seed
```

### 3. Install frontend dependencies

The React app lives in the `frontend/` directory:

```bash
cd frontend
npm install
```

### 4. Run the apps

Start the Laravel backend:

```bash
php artisan serve
```

In a second terminal, start the React frontend from `frontend/`:

```bash
cd frontend
npm run dev
```

The frontend Vite server runs on port `3000`.

## Useful Commands

- `composer run dev` starts the Laravel backend, queue listener, logs, and the root Vite process used by the Laravel app shell.
- `composer test` runs the PHP test suite.
- `cd frontend && npm run build` builds the React app.
- `cd frontend && npm run lint` runs frontend linting.

## API Overview

All protected routes use `auth:sanctum`.

- `POST /api/register`
- `POST /api/login`
- `POST /api/logout`
- `GET /api/user`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/{project}`
- `PUT /api/projects/{project}`
- `DELETE /api/projects/{project}`
- `GET /api/projects/{project}/tasks`
- `POST /api/projects/{project}/tasks`
- `GET /api/tasks/{task}`
- `PUT /api/tasks/{task}`
- `DELETE /api/tasks/{task}`

## Database Docs

See [docs/db_scheme.md](docs/db_scheme.md) for the current schema, relationships, and seed data.

## Notes

- Projects belong to users.
- Tasks belong to projects and users.
- Deleting a project cascades to its tasks.
- Task bodies are optional and can be empty.
