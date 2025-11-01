args = $(foreach a,$($(subst -,_,$1)_args),$(if $(value $a),$a="$($a)"))
composecli := $(shell if command -v docker-compose >/dev/null 2>&1; then echo "docker-compose"; else echo "docker compose"; fi)

dev.build:
	$(composecli) -f docker-compose.yml -f docker-compose.dev.yml build --no-cache --force-rm && docker system prune -a

dev.up:
	$(composecli) -f docker-compose.yml -f docker-compose.dev.yml up -d --remove-orphans

dev.down:
	$(composecli) -f docker-compose.yml -f docker-compose.dev.yml down

dev.logs:
	$(composecli) -f docker-compose.yml -f docker-compose.dev.yml logs -f $(container)

prod.build:
	$(composecli) -f docker-compose.yml -f docker-compose.prod.yml build --no-cache --force-rm && docker system prune -a

prod.up:
	make prod.build && $(COMPOSE) -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans

prod.down:
	$(composecli) -f docker-compose.yml -f docker-compose.prod.yml down

prod.logs:
	$(composecli) -f docker-compose.yml -f docker-compose.prod.yml logs -f $(container)
