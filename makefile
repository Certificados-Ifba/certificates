PROJECT=certificates

args = $(foreach a,$($(subst -,_,$1)_args),$(if $(value $a),$a="$($a)"))

dev.build:
	COMPOSE_PROJECT_NAME=$(PROJECT) docker-compose \
		-f docker-compose.yml -f docker-compose.dev.yml \
		build --no-cache --force-rm
	COMPOSE_PROJECT_NAME=$(PROJECT) docker-compose \
		-f docker-compose.yml -f docker-compose.dev.yml \
		down --rmi local --volumes --remove-orphans

dev.up:
	COMPOSE_PROJECT_NAME=$(PROJECT) docker-compose \
		-f docker-compose.yml -f docker-compose.dev.yml \
		up -d --remove-orphans

dev.down:
	COMPOSE_PROJECT_NAME=$(PROJECT) docker-compose \
		-f docker-compose.yml -f docker-compose.dev.yml \
		down

dev.logs:
	COMPOSE_PROJECT_NAME=$(PROJECT) docker-compose \
		-f docker-compose.yml -f docker-compose.dev.yml \
		logs -f $(container)

prod.build:
	COMPOSE_PROJECT_NAME=$(PROJECT) docker-compose \
		-f docker-compose.yml -f docker-compose.prod.yml \
		build --no-cache --force-rm
	COMPOSE_PROJECT_NAME=$(PROJECT) docker-compose \
		-f docker-compose.yml -f docker-compose.prod.yml \
		down --rmi local --volumes --remove-orphans

prod.up:
	make prod.build
	COMPOSE_PROJECT_NAME=$(PROJECT) docker-compose \
		-f docker-compose.yml -f docker-compose.prod.yml \
		up -d --remove-orphans

prod.down:
	COMPOSE_PROJECT_NAME=$(PROJECT) docker-compose \
		-f docker-compose.yml -f docker-compose.prod.yml \
		down

prod.logs:
	COMPOSE_PROJECT_NAME=$(PROJECT) docker-compose \
		-f docker-compose.yml -f docker-compose.prod.yml \
		logs -f $(container)
