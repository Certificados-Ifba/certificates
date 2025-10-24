pipeline {
    agent any

    environment {
        PROJECT_NAME = "certificates-ifba"
        DOCKER_COMPOSE_FILE = "docker-compose.prod.yml"
        DOCKER_NETWORK = "infrastructure"
        GIT_REPO = "https://github.com/Certificados-Ifba/certificates.git"
        NODE_VERSION = "20"
        BRANCH = "main"
    }

    options {
        timestamps()
        ansiColor('xterm')
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Clonando código do repositório..."
                git branch: "${BRANCH}", url: "${GIT_REPO}"
            }
        }

        stage('Build & Test') {
            steps {
                echo "🏗️ Instalando dependências e executando testes..."
                sh "docker run --rm -v \$(pwd):/app -w /app node:${NODE_VERSION} bash -c 'npm ci && npm run lint && npm test'"
            }
        }

        stage('Build Docker') {
            steps {
                echo "🐳 Construindo imagem Docker..."
                sh "docker compose -f ${DOCKER_COMPOSE_FILE} build"
            }
        }

        stage('Deploy Local') {
            steps {
                echo "🚀 Subindo containers localmente..."
                sh """
                    docker network inspect ${DOCKER_NETWORK} >/dev/null 2>&1 || docker network create ${DOCKER_NETWORK}
                    docker compose -f ${DOCKER_COMPOSE_FILE} down
                    docker compose -f ${DOCKER_COMPOSE_FILE} up -d --build
                """
            }
        }

        stage('Healthcheck') {
            steps {
                echo "🩺 Verificando se o serviço está online..."
                sh "sleep 15 && curl -f http://localhost:3000/health || (echo '❌ Falha no healthcheck!' && exit 1)"
            }
        }
    }

    post {
        success {
            echo "✅ Deploy local concluído com sucesso!"
        }
        failure {
            echo "🚨 Falha no deploy. Verifique os logs no Jenkins."
        }
    }
}
