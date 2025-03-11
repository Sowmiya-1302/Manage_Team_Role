# Use Python base image
# FROM python:3.9

# Use Amazon Linux 2023 as the base image
FROM amazonlinux:2023

# Install required dependencies
RUN dnf install -y \
    python3 python3-pip \
    postgresql16  # Install PostgreSQL 16 client tools (pg_isready, psql)
    
# Install nmap-ncat for PostgreSQL readiness check
RUN dnf install -y nmap-ncat

# Set the working directory
WORKDIR /app

# Copy all backend files into the container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . . 

WORKDIR /app/app 

# Set Alembic configuration file path as an environment variable
ENV ALEMBIC_CONFIG=/app/alembic.ini

# Ensure entrypoint script runs
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

# Expose Flask portd
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]