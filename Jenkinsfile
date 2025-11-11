pipeline {
    // SỬA 1: 'agent' và 'tools' là 2 khối riêng biệt
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
        
        // Giai đoạn 2a: Cài đặt thư viện
        stage('Install Dependencies') {
            steps {
                // SỬA 2: Đặt 'dir' bên trong 'steps'
                dir('backend') {
                    echo 'Running npm install inside /backend'
                    sh 'npm install'
                }
            }
        }

        // Giai đoạn 2b: Chạy Server VÀ Chạy Test
        stage('Run Server & Tests') {
            steps {
                // SỬA 2: Đặt 'dir' bên trong 'steps'
                dir('backend') {
                    script {
                        try {
                            echo 'Starting API server in background...'
                            sh 'npm start &'
                            
                            echo 'Waiting 5 seconds for server...'
                            sh 'sleep 5'
                            
                            echo 'Running Jest tests...'
                            sh 'npm test'
                            
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
            sh 'pkill node || true' 
            cleanWs()
        }
    }
}