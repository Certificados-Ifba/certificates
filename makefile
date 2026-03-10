PROJECT=certificates

args = $(foreach a,$($(subst -,_,$1)_args),$(if $(value $a),$a="$($a)"))

dev.build:
	COMPOSE_PROJECT_NAME=$(PROJECT) docker compose \
		-f docker-compose.yml -f docker-compose.dev.yml \
		build --no-cache --force-rm
	COMPOSE_PROJECT_NAME=$(PROJECT) docker compose \
		-f docker-compose.yml -f docker-compose.dev.yml \
		down --rmi local --volumes --remove-orphans

dev.up:
	COMPOSE_PROJECT_NAME=$(PROJECT) docker compose \
		-f docker-compose.yml -f docker-compose.dev.yml \
		up -d --remove-orphans
	@echo "✅ Containers Docker iniciados"
	@echo "🚀 Iniciando frontend local..."
	@nohup npx yarn workspace @certificates/web dev > /tmp/certificates-web.log 2>&1 & echo $$! > /tmp/certificates-web.pid
	@sleep 3
	@echo "✅ Frontend iniciado em http://localhost:3000"
	@echo "📋 Logs do frontend: tail -f /tmp/certificates-web.log"

dev.down:
	@if [ -f /tmp/certificates-web.pid ]; then \
		kill $$(cat /tmp/certificates-web.pid) 2>/dev/null || true; \
		rm -f /tmp/certificates-web.pid; \
		echo "✅ Frontend parado"; \
	fi
	COMPOSE_PROJECT_NAME=$(PROJECT) docker compose \
		-f docker-compose.yml -f docker-compose.dev.yml \
		down

dev.logs:
	COMPOSE_PROJECT_NAME=$(PROJECT) docker compose \
		-f docker-compose.yml -f docker-compose.dev.yml \
		logs -f $(container)

prod.build:
	COMPOSE_PROJECT_NAME=$(PROJECT) docker compose \
		-f docker-compose.yml -f docker-compose.prod.yml \
		build --no-cache --force-rm
	COMPOSE_PROJECT_NAME=$(PROJECT) docker compose \
		-f docker-compose.yml -f docker-compose.prod.yml \
		down --rmi local --volumes --remove-orphans

prod.up:
	make prod.build
	COMPOSE_PROJECT_NAME=$(PROJECT) docker compose \
		-f docker-compose.yml -f docker-compose.prod.yml \
		up -d --remove-orphans

prod.down:
	COMPOSE_PROJECT_NAME=$(PROJECT) docker compose \
		-f docker-compose.yml -f docker-compose.prod.yml \
		down

prod.logs:
	COMPOSE_PROJECT_NAME=$(PROJECT) docker compose \
		-f docker-compose.yml -f docker-compose.prod.yml \
		logs -f $(container)
