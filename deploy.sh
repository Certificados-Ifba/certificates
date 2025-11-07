#!/usr/bin/env bash
set -euo pipefail

LOG="$HOME/deploy_run.log"
echo "=== Deploy iniciado em $(date) ===" >> "$LOG"

{
  cd "$HOME"

  # Clona o repositório se necessário
  if [ ! -d "certificates" ]; then
    echo "📥 Clonando repositório pela primeira vez..."
    git clone https://github.com/Certificados-Ifba/certificates.git certificates
  fi

  cd certificates

  if [ -d ".git" ]; then
    echo "🔄 Atualizando repositório (main)..."
    git fetch --all --prune
    git reset --hard origin/main || true
    git checkout main || true
    git pull origin main || true
  else
    ts=$(date +%s)
    echo "⚠️ Diretório existe e não é um repo git — movendo para ~/certificates.bak.$ts"
    mv "$HOME/certificates" "$HOME/certificates.bak.$ts" || true
    git clone https://github.com/Certificados-Ifba/certificates.git certificates
    cd certificates
  fi

  # Instala .env se foi enviado para $HOME/.env.cleaned
  if [ -f "$HOME/.env.cleaned" ]; then
    echo "📄 Instalando arquivo .env desde $HOME/.env.cleaned"
    mv -f "$HOME/.env.cleaned" ./.env || cp -f "$HOME/.env.cleaned" ./.env
  fi

  echo "🔻 Parando containers antigos (make prod.down)..."
  make prod.down || true

  echo "⬆️ Subindo containers com make prod.up..."
  make prod.up

  echo "🧹 Limpando imagens antigas (até 24h)..."
  docker image prune -af --filter "until=24h" || true

  echo "=== Deploy finalizado em $(date) ==="

} >> "$LOG" 2>&1

exit 0
#!/usr/bin/env bashnknlknlk
DOMAIN=${DOMAIN-localhost}

echo "building certificates"
docker-compose -f certificates.yml build
echo "publishing certificates"
docker-compose -f certificates.yml push
echo "deploying traefik stack in http mode"
docker stack deploy -c certificates.yml certificates
echo "Certificates is available at:"
echo "- http://${DOMAIN}/certificados"
