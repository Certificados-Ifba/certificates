args = $(foreach a,$($(subst -,_,$1)_args),$(if $(value $a),$a="$($a)"))

dev.build:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache --force-rm && docker system prune -a

dev.up:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --remove-orphans

dev.down:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

dev.logs:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f $(container)

prod.build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build --no-cache --force-rm && docker system prune -a

prod.up:
	make prod.build && docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans

prod.down:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

prod.logs:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml logs -f $(container)
