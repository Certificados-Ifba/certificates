dev.build:
	COMPOSE_DOCKER_CLI_BUILD=0 docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache --compress --force-rm

dev.up:
	make build.dev && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --remove-orphans

dev.down:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

prod.build:
	COMPOSE_DOCKER_CLI_BUILD=0 docker-compose -f docker-compose.yml -f docker-compose.prod.yml build --no-cache --compress --force-rm

prod.up:
	make build.dev && docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans

prod.down:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
