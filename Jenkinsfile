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

        stage('Instalar Dependências & Testar') {
            steps {
                echo "🏗️ Instalando dependências e executando lint..."
                sh '''
                    set -euo pipefail

                    # Garante cache do Yarn
                    mkdir -p /var/jenkins_home/.yarn-cache

                    # 1) Instalar dependências (workspace e cache vêm do container do Jenkins)
                    docker run --rm \
                      --volumes-from "$(hostname)" \
                      -w "$WORKSPACE" \
                      node:16 \
                      bash -lc "node -v; yarn -v; ls -la; yarn install --frozen-lockfile"

                    # 2) Executar lint
                    docker run --rm \
                      --volumes-from "$(hostname)" \
                      -w "$WORKSPACE" \
                      node:16 \
                      bash -lc "ls -la; yarn run lint"
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
