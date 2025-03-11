#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."
until nc -z postgres 5432; do
  sleep 2
  echo "Still waiting for PostgreSQL..."
done

export PYTHONPATH=/app
export FLASK_APP=/app/app/app.py
export ALEMBIC_CONFIG=/app/alembic.ini

# Debugging: Print ALEMBIC_CONFIG to confirm it's set
echo "ALEMBIC_CONFIG is set to: $ALEMBIC_CONFIG"

# Ensure Alembic uses the correct migration directory
if [ ! -d "/app/migrations" ]; then
  echo "Initializing Alembic in the correct directory..."
  flask db init --directory /app/migrations
fi

mkdir -p /app/migrations/versions  # Ensure the versions folder exists

# Check if there are pending migrations
if [ -z "$(ls -A /app/migrations/versions)" ]; then
  echo "No migrations found. Running initial migration..."
  flask db migrate --directory /app/migrations -m "Initial migration"
fi

# Apply the latest migrations
echo "Ensuring database schema is up to date..."
flask db upgrade --directory /app/migrations || (flask db migrate --directory /app/migrations -m "Auto migration" && flask db upgrade --directory /app/migrations)

# Check if Alembic is already initialized
if [ ! -d "/app/migrations" ]; then
  echo "Initializing Alembic..."
  flask db init
fi

if [ "$CURRENT_VERSION" = "None" ]; then
  echo "Applying all pending migrations..."
  flask db upgrade --directory /app/migrations
else
  echo "Database is up to date."
fi

# Run the seed script (applies seed data only if the DB is empty)
echo "Seeding database if needed..."
python3 /app/app/database/seed.py

# Start the Flask application
echo "Starting Flask server..."
exec flask run --host=0.0.0.0 --port=5000