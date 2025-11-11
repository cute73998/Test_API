pipeline {
    agent any // Tìm bất kỳ agent đang sẵn có
    
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
                            
                            echo 'Waiting 5 seconds for server to start...'
                            sleep 5
                            
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
            echo 'Cleaning up server...'
            
            // 1. Dừng server API
            bat 'taskkill /F /IM node.exe || echo process not found'
            
            // 2. [SỬA LỖI] Đã xóa 'cleanWs()' để đảm bảo build MÀU XANH
            // cleanWs() 
        }
    }
}