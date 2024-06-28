# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: abaiao-r <abaiao-r@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/06/28 18:44:43 by abaiao-r          #+#    #+#              #
#    Updated: 2024/06/28 19:14:42 by abaiao-r         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# Makefile for Docker commands

# Variables
DOCKER_COMPOSE = docker-compose

# Targets
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  build        : Build Docker images"
	@echo "  up           : Start Docker containers"
	@echo "  down         : Stop and remove Docker containers"
	@echo "  restart      : Restart Docker containers"
	@echo "  migrate      : Apply Django migrations"
	@echo "  logs         : Show logs of Docker containers"
	@echo "  clean        : Remove Docker volumes and network"
	@echo "  prune        : Remove unused Docker resources"
	@echo "  clean-all    : Stop and remove all Docker containers, images, volumes, and networks"

# Build Docker images as specified in docker-compose.yml
build:
	$(DOCKER_COMPOSE) build

# Start Docker containers in the background and rebuild if necessary
up:
	$(DOCKER_COMPOSE) up -d --build

# Stop and remove Docker containers
down:
	$(DOCKER_COMPOSE) down

# Restart Docker containers
restart:
	$(DOCKER_COMPOSE) restart

# Apply Django database migrations
migrate:
	$(DOCKER_COMPOSE) exec web python manage.py migrate

# Show logs of Docker containers, follow with -f flag
logs:
	$(DOCKER_COMPOSE) logs -f

# Stop Docker containers, remove volumes, and orphaned containers
clean:
	$(DOCKER_COMPOSE) down -v --remove-orphans

# Remove unused Docker resources (containers, networks, images, and volumes)
prune:
	docker system prune -f

# Clean all Docker resources: stop and remove containers, prune volumes, networks, images, and containers
clean-all: clean prune
	docker volume prune -f
	docker network prune -f
	docker image prune -af
	docker container prune -f
