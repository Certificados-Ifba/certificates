PROJECT=certificates

args = $(foreach a,$($(subst -,_,$1)_args),$(if $(value $a),$a="$($a)"))

### ============================
###     LIMPEZA SEGURA
### ============================

clean.project:
	# Remove containers parados do projeto
	docker container prune -f --filter "label=com.docker.compose.project=$(PROJECT)"
	# Remove imagens órfãs criadas pelo docker-compose deste projeto
	docker image prune -f --filter "label=com.docker.compose.project=$(PROJECT)"
	# Remove volumes não utilizados apenas do projeto
	docker volume prune -f --filter "label=com.docker.compose.project=$(PROJECT)"


### ============================
###   AMBIENTE DE DESENVOLVIMENTO
### ============================

dev.build:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
	$(MAKE) clean.project

dev.up:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --remove-orphans

dev.down:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

dev.logs:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f $(container)


### ============================
###        AMBIENTE DE PRODUÇÃO
### ============================

prod.build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
	$(MAKE) clean.project

prod.up:
	make prod.build && docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --remove-orphans

prod.down:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

prod.logs:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml logs -f $(container)
