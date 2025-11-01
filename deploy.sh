#!/usr/bin/env bash
DOMAIN=${DOMAIN-localhost}

echo "building certificates"
docker-compose -f certificates.yml build
echo "publishing certificates"
docker-compose -f certificates.yml push
echo "deploying traefik stack in http mode"
docker stack deploy -c certificates.yml certificates
echo "Certificates is available at:"
echo "- http://${DOMAIN}/certificados"
