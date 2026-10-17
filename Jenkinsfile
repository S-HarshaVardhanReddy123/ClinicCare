
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
                sh '''
                    docker run --rm \
                      -v jenkins_home:/jenkins_home \
                      -w "/jenkins_home${WORKSPACE#/var/jenkins_home}/backend" \
                      node:22-alpine \
                      sh -c "npm ci && npm test"
                '''
            }
        }

        stage('Frontend Build') {
            steps {
                sh '''
                    docker run --rm \
                      -v jenkins_home:/jenkins_home \
                      -w "/jenkins_home${WORKSPACE#/var/jenkins_home}/frontend" \
                      node:22-alpine \
                      sh -c "npm ci && npm run build"
                '''
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
