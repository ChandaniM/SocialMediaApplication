#!/bin/bash
# Load the configuration variables
source ./config/db_config.env

# Wait for PostgreSQL to be ready
until psql -h "some-postgres" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q'; do
    echo "Waiting for PostgreSQL to be ready..."
    sleep 2
done

# Your SQL commands to create tables
psql -h "some-postgres" -U "$POSTGRES_USER" -d "$POSTGRES_DB" <<EOF
CREATE TABLE your_table_name (
    id SERIAL PRIMARY KEY,
    column1 TYPE,
    column2 TYPE
    -- Add your columns here
);
EOF
