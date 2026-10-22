pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Create Isolated CI Database') {
            steps {
                sh '''
                    set -eu

                    CI_NETWORK="cliniccare-ci-${BUILD_NUMBER}"
                    CI_DB="cliniccare-ci-postgres-${BUILD_NUMBER}"

                    docker network create "$CI_NETWORK"

                    docker run -d \
                      --name "$CI_DB" \
                      --network "$CI_NETWORK" \
                      -e POSTGRES_DB=cliniccare_ci \
                      -e POSTGRES_USER=cliniccare_ci \
                      -e POSTGRES_PASSWORD=ci_only_password \
                      postgres:17-alpine

                    READY=0

                    for attempt in $(seq 1 60); do
                        if docker exec "$CI_DB" \
                          pg_isready -U cliniccare_ci -d cliniccare_ci; then
                            READY=1
                            break
                        fi

                        sleep 2
                    done

                    if [ "$READY" -ne 1 ]; then
                        docker logs "$CI_DB"
                        echo "CI PostgreSQL did not become ready."
                        exit 1
                    fi

                    docker exec -i "$CI_DB" \
                      psql -v ON_ERROR_STOP=1 \
                      -U cliniccare_ci -d cliniccare_ci \
                      < database/schema.sql

                    docker exec -i "$CI_DB" \
                      psql -v ON_ERROR_STOP=1 \
                      -U cliniccare_ci -d cliniccare_ci \
                      < database/seed.sql

                    echo "CI database schema and seed loaded."
                '''
            }
        }

        stage('Backend Install and Tests') {
            steps {
                sh '''
                    set -eu

                    CI_NETWORK="cliniccare-ci-${BUILD_NUMBER}"
                    CI_DB="cliniccare-ci-postgres-${BUILD_NUMBER}"
                    CI_TESTS="cliniccare-ci-tests-${BUILD_NUMBER}"
                    CI_WORKSPACE="/jenkins_home${WORKSPACE#/var/jenkins_home}"

                    docker run --rm \
                      --name "$CI_TESTS" \
                      --network "$CI_NETWORK" \
                      -v jenkins_home:/jenkins_home \
                      -w "$CI_WORKSPACE/backend" \
                      -e DB_HOST="$CI_DB" \
                      -e DB_PORT=5432 \
                      -e DB_NAME=cliniccare_ci \
                      -e DB_USER=cliniccare_ci \
                      -e DB_PASSWORD=ci_only_password \
                      -e PORT=5001 \
                      -e JWT_SECRET=ci_test_only_secret \
                      node:22-alpine \
                      sh -c '
                        set -eu

                        npm ci

                        node tests/ci-setup.js

                        node src/server.js > /tmp/cliniccare-backend.log 2>&1 &
                        SERVER_PID=$!

                        trap "kill $SERVER_PID 2>/dev/null || true" EXIT

                        node tests/ci-health-check.js || {
                            echo "Backend health check failed."
                            cat /tmp/cliniccare-backend.log
                            exit 1
                        }

                        npm test
                      '
                '''
            }
        }

        stage('Frontend Build') {
            steps {
                sh '''
                    set -eu

                    CI_WORKSPACE="/jenkins_home${WORKSPACE#/var/jenkins_home}"

                    docker run --rm \
                      -v jenkins_home:/jenkins_home \
                      -w "$CI_WORKSPACE/frontend" \
                      node:22-alpine \
                      sh -c "npm ci && npm run build"
                '''
            }
        }

        stage('Docker Image Builds') {
            steps {
                sh '''
                    set -eu
                    docker build -t cliniccare-backend:ci ./backend
                    docker build -t cliniccare-frontend:ci ./frontend
                '''
            }
        }
    }

    post {
        always {
            sh '''
                docker rm -f \
                  "cliniccare-ci-tests-${BUILD_NUMBER}" \
                  "cliniccare-ci-postgres-${BUILD_NUMBER}" \
                  >/dev/null 2>&1 || true

                docker network rm \
                  "cliniccare-ci-${BUILD_NUMBER}" \
                  >/dev/null 2>&1 || true
            '''
        }

        success {
            echo 'ClinicCare CI pipeline completed successfully.'
        }

        failure {
            echo 'ClinicCare CI pipeline failed. Review the first failing stage and its logs.'
        }
    }
}
