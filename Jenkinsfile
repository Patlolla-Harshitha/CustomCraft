pipeline {
    agent any

    environment {
        PYTHON_PATH = 'backend'
        FRONTEND_PATH = 'frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Backend Test') {
            steps {
                dir("${PYTHON_PATH}") {
                    echo 'Setting up Python environment and running Pytest backend tests...'
                    sh '''
                        python -m venv venv || python3 -m venv venv
                        . venv/bin/activate
                        pip install --upgrade pip
                        pip install -r requirements.txt
                        pytest
                    '''
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir("${FRONTEND_PATH}") {
                    echo 'Installing frontend dependencies and building production bundle...'
                    sh '''
                        npm ci || npm install
                        npm run build
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'CI Pipeline Execution Completed.'
        }
        success {
            echo 'Build and Tests Succeeded!'
        }
        failure {
            echo 'Build or Tests Failed!'
        }
    }
}
