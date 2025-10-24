pipeline {
    agent any

    environment {
        PROJECT_NAME = "certificates-ifba"
        DOCKER_COMPOSE_FILE = "docker-compose.prod.yml"
        DOCKER_NETWORK = "infrastructure"
        NODE_VERSION = "14"
        GIT_REPO = "https://github.com/Certificados-Ifba/certificates.git"
        BRANCH = "develop"
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                    echo "📥 Clonando código..."
                    git branch: "${BRANCH}", url: "${GIT_REPO}"
                }
            }
        }

        stage('Instalar Dependências & Testar') {
            steps {
                wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                    echo "🏗️ Instalando dependências e executando testes..."
                    sh "docker run --rm -v \$(pwd):/app -w /app node:${NODE_VERSION} bash -c 'npm ci && npm run lint && npm test'"
                }
            }
        }

        stage('Build Docker') {
            steps {
                wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                    echo "🐳 Construindo imagens Docker..."
                    sh "docker compose -f ${DOCKER_COMPOSE_FILE} build"
                }
            }
        }

        stage('Deploy Local') {
            steps {
                wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                    echo "🚀 Subindo containers..."
                    sh """
                        docker network inspect ${DOCKER_NETWORK} >/dev/null 2>&1 || docker network create ${DOCKER_NETWORK}
                        docker compose -f ${DOCKER_COMPOSE_FILE} down
                        docker compose -f ${DOCKER_COMPOSE_FILE} up -d --build
                    """
                }
            }
        }

        stage('Healthcheck') {
            steps {
                wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                    echo "🩺 Verificando se o serviço está online..."
                    sh "sleep 10 && curl -f http://localhost:3000/health || (echo '❌ Falha no healthcheck!' && exit 1)"
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deploy do ${PROJECT_NAME} concluído com sucesso!"
        }
        failure {
            echo "🚨 Falha no pipeline. Verifique os logs no Jenkins."
        }
    }
}
