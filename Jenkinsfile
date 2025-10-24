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

    options {
        timestamps()
    }

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
                script {
                    // usa o plugin Docker Pipeline para rodar dentro do container Node
                    def img = docker.image("node:${NODE_VERSION}")
                    img.pull()
                    img.inside("--user root -v /var/jenkins_home/.yarn-cache:/usr/local/share/.cache/yarn") {
                        // garante que o workspace esteja montado corretamente dentro do container
                        sh 'pwd && ls -la'
                        sh 'yarn install --frozen-lockfile'
                        sh 'yarn lint || true'
                    }
                }
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
        success {
            echo "✅ Deploy do ${PROJECT_NAME} concluído com sucesso!"
        }
        failure {
            echo "🚨 Falha no pipeline. Verifique os logs no Jenkins."
        }
    }
}
