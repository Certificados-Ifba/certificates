build.dev:
	COMPOSE_DOCKER_CLI_BUILD=0 docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache --compress --force-rm

build.prod:
	COMPOSE_DOCKER_CLI_BUILD=0 docker-compose -f docker-compose.yml -f docker-compose.prod.yml build --no-cache --compress --force-rm

up.dev:
	make build.dev && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --remove-orphans

up.prod:
	make build.dev && docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans

down.dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

down.prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
