// Jenkinsfile

pipeline {
    // 1. Chỉ định "agent" (máy chạy pipeline)
    // Chúng ta yêu cầu một agent có cài đặt công cụ Node.js tên là 'NodeJS-18'
    // Tên 'NodeJS-18' này phải được cấu hình trong Global Tool Configuration của Jenkins.
    agent {
        tools {
            nodejs 'NodeJS-18'
        }
    }

    // 2. Định nghĩa các giai đoạn (stages)
    stages {
        // Giai đoạn 1: Lấy code (Jenkins tự động làm nếu dùng Blue Ocean hoặc Multibranch)
        // stage('Checkout') {
        //     steps {
        //         checkout scm
        //     }
        // }
         stage('Cuong gay') {
            steps {
                // Sử dụng 'npm ci' để cài đặt nhanh và nhất quán
                sh 'cd backend'
            }
        }
        // Giai đoạn 2: Cài đặt Dependencies
        stage('Install Dependencies') {
            steps {
                // Sử dụng 'npm ci' để cài đặt nhanh và nhất quán
                sh 'npm ci'
            }
        }

        // Giai đoạn 3: Chạy Lint (kiểm tra code style)
        stage('Lint') {
            steps {
                // Giả sử bạn có script 'lint' trong package.json
                sh 'npm run lint'
            }
        }

        // Giai đoạn 4: Chạy Tests
        stage('Test') {
            steps {
                // Chạy unit test và integration test
                sh 'npm test'
            }
        }

        // Giai đoạn 5: Build dự án (nếu cần)
        stage('Build') {
            steps {
                // Giả sử bạn có script 'build' trong package.json
                sh 'npm run build'
            }
            post {
                // Nếu build thành công, lưu trữ các file đã build (ví dụ: thư mục 'dist')
                success {
                    archiveArtifacts artifacts: 'dist/**'
                }
            }
        }
    }

    // 3. Các hành động sau khi pipeline hoàn tất (luôn chạy)
    post {
        always {
            // Dọn dẹp workspace
            cleanWs()
        }
        failure {
            // Gửi thông báo nếu pipeline thất bại (ví dụ: qua Slack, Email)
            echo 'Pipeline thất bại!'
        }
    }
}