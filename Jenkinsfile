
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

        stage('Backend Install and Tests') {
            steps {
                dir('backend') {
                    sh '''
                        docker run --rm \
                          -v "$PWD:/app" \
                          -w /app \
                          node:22-alpine \
                          sh -c "npm ci && npm test"
                    '''
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh '''
                        docker run --rm \
                          -v "$PWD:/app" \
                          -w /app \
                          node:22-alpine \
                          sh -c "npm ci && npm run build"
                    '''
                }
            }
        }

        stage('Docker Image Builds') {
            steps {
                sh 'docker build -t cliniccare-backend:ci ./backend'
                sh 'docker build -t cliniccare-frontend:ci ./frontend'
            }
        }
    }

    post {
        success {
            echo 'ClinicCare CI pipeline completed successfully.'
        }
        failure {
            echo 'ClinicCare CI pipeline failed. Review the failed stage logs.'
        }
    }
}
