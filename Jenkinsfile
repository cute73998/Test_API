pipeline {
    agent any 
    
    tools {
        nodejs 'NodeJS-18'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm 
            }
        }
        
        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    echo 'Running npm install inside /backend'
                    bat 'npm install'
                }
            }
        }

        stage('Run Server & Tests') {
            steps {
                dir('backend') {
                    script {
                        try {
                            echo 'Starting API server in background...'
                            bat 'start "API Server" npm start'
                            
                            echo 'Waiting 5 seconds for server...'
                            // SỬA LỖI Ở ĐÂY: Dùng 'bat' và 'timeout'
                            bat 'timeout /t 5 /nobreak'
                            
                            echo 'Running Jest tests...'
                            bat 'npm test'
                            
                        } catch (e) {
                            echo 'Tests failed!'
                            currentBuild.result = 'FAILURE'
                            throw e
                        }
                    }
                }
            }
        }
    } // kết thúc stages

    post {
        always {
            echo 'Cleaning up...'
            bat 'taskkill /F /IM node.exe || echo process not found'
            cleanWs()
        }
    }
}