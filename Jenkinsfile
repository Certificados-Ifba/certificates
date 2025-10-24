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
        stage('Pre-clean (força limpeza de permissões)') {
            steps {
                echo "🧹 Limpando workspace com Alpine (root) para evitar EPERM..."
                // Remove tudo, inclusive dotfiles, sem depender das permissões atuais
                sh '''
                  set -e
                  docker run --rm --user 0 \
                    -v "$WORKSPACE:/w" alpine:3.19 \
                    sh -lc "rm -rf /w/* /w/.[!.]* /w/..?* 2>/dev/null || true"
                '''
            }
        }

        stage('Checkout') {
            steps {
                echo "📥 Clonando código do repositório..."
                // NÃO use deleteDir() aqui; já limpamos forçadamente acima
                git branch: "${BRANCH}", url: "${GIT_REPO}"
                sh 'ls -la'
            }
        }

        stage('Instalar Dependências & (Lint se existir)') {
            steps {
                echo "🏗️ Instalando dependências e executando lint (se existir)..."
                script {
                    // captura UID/GID do usuário que está rodando o Jenkins
                    def UID = sh(script: 'id -u', returnStdout: true).trim()
                    def GID = sh(script: 'id -g', returnStdout: true).trim()

                    // 1) yarn install com o mesmo UID/GID -> arquivos com dono correto
                    sh """
                      set -euo pipefail
                      docker run --rm \
                        --user ${UID}:${GID} \
                        -v "$WORKSPACE:/app" \
                        -w /app \
                        node:${NODE_VERSION} \
                        bash -lc "node -v; yarn -v || npm -g i yarn && yarn -v; yarn install --frozen-lockfile"
                    """

                    // 2) Executa lint SOMENTE se existir
                    sh """
                      set -euo pipefail
                      docker run --rm \
                        --user ${UID}:${GID} \
                        -v "$WORKSPACE:/app" \
                        -w /app \
                        node:${NODE_VERSION} \
                        bash -lc "node -e \\"const s=require('./package.json').scripts||{}; process.exit(s.lint?0:2)\\" && yarn run lint || echo 'ℹ️ Sem script lint na raiz — pulando etapa.'"
                    """
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
        success { echo "✅ Deploy do ${PROJECT_NAME} concluído com sucesso!" }
        failure { echo "🚨 Falha no pipeline. Verifique os logs no Jenkins." }
    }
}
