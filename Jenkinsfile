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
                    // SỬA: Dùng 'bat' cho Windows
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
                            // SỬA: Dùng 'bat' và 'start' của Windows
                            bat 'start "API Server" npm start'
                            
                            echo 'Waiting 5 seconds for server...'
                            // 'sleep' vẫn hoạt động
                            sh 'sleep 5'
                            
                            echo 'Running Jest tests...'
                            // SỬA: Dùng 'bat'
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
            // SỬA: Dùng 'bat' và 'taskkill' của Windows
            bat 'taskkill /F /IM node.exe || echo process not found'
            
            cleanWs()
        }
    }
}