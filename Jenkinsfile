pipeline {
    // 1. CẤU HÌNH AGENT
    agent {
        // Yêu cầu một agent có cài đặt 'NodeJS-18'
        tools {
            nodejs 'NodeJS-18'
        }
    }

    // 2. CÁC GIAI ĐOẠN (STAGES)
    stages {
        
        // Giai đoạn 1: Lấy code từ Git
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm 
            }
        }

        // GIAI ĐOẠN "START DATABASE" ĐÃ BỊ XÓA
        // Chúng ta giả định database đã chạy sẵn
        
        // Giai đoạn 2: Chạy các lệnh bên trong thư mục 'backend'
        dir('backend') {

            // Giai đoạn 2a: Cài đặt thư viện
            stage('Install Dependencies') {
                steps {
                    echo 'Running npm install inside /backend'
                    sh 'npm install'
                }
            }

            // Giai đoạn 2b: Chạy Server VÀ Chạy Test
            stage('Run Server & Tests') {
                steps {
                    script {
                        try {
                            // CHẠY SERVER Ở CHẾ ĐỘ NỀN (dấu &)
                            echo 'Starting API server in background...'
                            // Server sẽ kết nối đến DB 'localhost' CÓ SẴN
                            sh 'npm start &'
                            
                            echo 'Waiting 5 seconds for server...'
                            sh 'sleep 5'
                            
                            // CHẠY TEST
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
    }

    // 3. DỌN DẸP SAU KHI BUILD
    post {
        always {
            echo 'Cleaning up...'
            
            // 1. Dừng server API (tìm và giết tiến trình Node)
            sh 'pkill node || true' 
            
            // 2. KHÔNG CẦN DỌN DẸP DATABASE (vì nó chạy vĩnh viễn)
            
            // 3. Dọn dẹp workspace
            cleanWs()
        }
    }
}