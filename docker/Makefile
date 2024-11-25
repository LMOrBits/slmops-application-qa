# Makefile for managing Docker Compose services

# Default docker-compose file
COMPOSE_FILE=compose.yaml

# Build the frontend service
frontend:
	docker-compose -f $(COMPOSE_FILE) up  ui

# Build backend dependencies
backend-dep:
	docker-compose -f $(COMPOSE_FILE) up db pgadmin

# Bring up all services
up:
	docker-compose -f $(COMPOSE_FILE) up -d

# Stop all services
down:
	docker-compose -f $(COMPOSE_FILE) down

# Show logs
logs:
	docker-compose -f $(COMPOSE_FILE) logs -f

# Clean up containers and networks
clean:
	docker system prune -a 

# Run frontend in interactive mode for development
dev-frontend:
	docker-compose -f $(COMPOSE_FILE) up ui
.PHONY: frontend backend-dep up down logs clean dev-frontend