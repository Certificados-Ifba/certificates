pipeline {
    agent any

    environment {
        PROJECT_NAME        = "certificates-ifba"
        DOCKER_COMPOSE_FILE = "docker-compose.dev.yml"
        DOCKER_NETWORK      = "infrastructure"
        NODE_VERSION        = "16"
        GIT_REPO            = "https://github.com/Certificados-Ifba/certificates.git"
        BRANCH              = "develop"
    }

    options { timestamps() }

    stages {
        stage('Checkout') {
            steps {
                echo "📥 Clonando código do repositório..."
                deleteDir()
                git branch: "${BRANCH}", url: "${GIT_REPO}"
                sh 'ls -la'
            }
        }

        stage('Instalar Dependências & (Lint se existir)') {
            steps {
                echo "🏗️ Instalando dependências e executando lint (se existir)..."
                sh '''
                    set -euo pipefail

                    mkdir -p /var/jenkins_home/.yarn-cache

                    # 1) yarn install usando o mesmo volume do container do Jenkins
                    docker run --rm \
                      --volumes-from "$(hostname)" \
                      -w "$WORKSPACE" \
                      node:16 \
                      bash -lc "node -v; yarn -v; ls -la; yarn install --frozen-lockfile"

                    # 2) Executa lint SOMENTE se existir no package.json da raiz
                    docker run --rm \
                      --volumes-from "$(hostname)" \
                      -w "$WORKSPACE" \
                      node:16 \
                      bash -lc "node -e \"const s=require('./package.json').scripts||{}; process.exit(s.lint?0:2)\" && yarn run lint || echo 'ℹ️ Sem script lint na raiz — pulando etapa.'"
                '''
            }
        }

        stage('Build Docker') {
            steps {
                echo "🐳 Construindo imagens Docker..."
                sh "docker compose -f ${DOCKER_COMPOSE_FILE} build"
            }
        }

        stage('Deploy Local') {
            steps {
                echo "🚀 Subindo containers de desenvolvimento..."
                sh """
                    set -euo pipefail
                    docker network inspect ${DOCKER_NETWORK} >/dev/null 2>&1 || docker network create ${DOCKER_NETWORK}
                    docker compose -f ${DOCKER_COMPOSE_FILE} down
                    docker compose -f ${DOCKER_COMPOSE_FILE} up -d --build
                """
            }
        }

        stage('Healthcheck') {
            steps {
                echo "🩺 Verificando se o serviço está online..."
                sh "sleep 10 && curl -fsS http://localhost:3000/api >/dev/null || (echo '❌ Falha no healthcheck!' && exit 1)"
            }
        }
    }

    post {
        success { echo "✅ Deploy do ${PROJECT_NAME} concluído com sucesso!" }
        failure { echo "🚨 Falha no pipeline. Verifique os logs no Jenkins." }
    }
}
