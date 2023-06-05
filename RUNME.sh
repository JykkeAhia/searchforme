#!/bin/bash
set -e

# Check Docker version
docker_version=$(docker --version | awk '{print $3}' | cut -d ',' -f1)
echo "Docker version: $docker_version"

# Build backend Docker image
echo "Building backend Docker image..."
cd backend
docker build -t backend-image -f Dockerfile .
cd ..

# Build frontend Docker image
echo "Building frontend Docker image..."
cd frontend
docker build -t frontend-image -f Dockerfile .
cd ..

# Check Docker Compose version
docker_compose_version=$(docker compose --version | awk '{print $3}')
echo "Docker Compose version: $docker_compose_version"

# Run Docker Compose up for the backend
cd backend
echo "Running Docker Compose up for the backend..."
docker compose up

