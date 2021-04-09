dev.build:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache --force-rm

dev.up:
	make dev.build && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --remove-orphans

dev.down:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

prod.build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build --no-cache --force-rm

prod.up:
	make prod.build && docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans

prod.down:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
