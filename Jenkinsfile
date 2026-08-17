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
            bat '''
                set "PYTHON_EXE=C:\\Users\\harshitha\\AppData\\Local\\Programs\\Python\\Python312\\python.exe"
                "%PYTHON_EXE%" -m venv venv
                venv\\Scripts\\python.exe -m pip install --upgrade pip
                venv\\Scripts\\python.exe -m pip install -r requirements.txt
                venv\\Scripts\\python.exe -m pytest
            '''
        }
    }
}

        stage('Frontend Build') {
            steps {
                dir("${FRONTEND_PATH}") {
                    echo 'Installing frontend dependencies and building production bundle...'
                    bat '''
                        npm ci
                        if %ERRORLEVEL% NEQ 0 npm install
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