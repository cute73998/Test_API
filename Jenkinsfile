// File Jenkinsfile hoàn chỉnh cho Windows

pipeline {
    agent any 
    
    tools {
        // Yêu cầu Jenkins tự động cài đặt công cụ NodeJS-18
        // (Bạn phải cấu hình 'NodeJS-18' trong Manage Jenkins > Tools)
        nodejs 'NodeJS-18'
    }

    stages {
        // Giai đoạn 1: Lấy code từ Git
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                // Lệnh này tự động lấy code từ SCM (Git)
                // mà bạn đã cấu hình trong Job
                checkout scm 
            }
        }
        
        // Giai đoạn 2: Cài đặt thư viện
        stage('Install Dependencies') {
            steps {
                // Di chuyển vào thư mục 'backend'
                dir('backend') {
                    echo 'Running npm install inside /backend'
                    // Chạy 'npm install' bằng batch của Windows
                    bat 'npm install'
                }
            }
        }

        // Giai đoạn 3: Chạy Server và Test
        stage('Run Server & Tests') {
            steps {
                // Di chuyển vào thư mục 'backend'
                dir('backend') {
                    // Dùng 'script' để có thể dùng try...catch
                    script {
                        try {
                            echo 'Starting API server in background...'
                            // Dùng 'start' của Windows để chạy server ở nền
                            bat 'start "API Server" npm start'
                            
                            echo 'Waiting 5 seconds for server to start...'
                            // Dùng lệnh 'sleep' gốc của Jenkins (hoạt động đa nền tảng)
                            sleep 5
                            
                            echo 'Running Jest tests...'
                            // Chạy test bằng batch của Windows
                            bat 'npm test'
                            
                        } catch (e) {
                            // Nếu 'bat "npm test"' thất bại, báo lỗi
                            echo 'Tests failed!'
                            currentBuild.result = 'FAILURE'
                            throw e // Dừng pipeline
                        }
                    }
                }
            }
        }
    } // kết thúc stages

    // Giai đoạn sau khi build: Luôn luôn chạy để dọn dẹp
    post {
        always {
            echo 'Cleaning up...'
            
            // 1. Dừng server API (dùng taskkill của Windows)
            // '|| echo ...' để build không fail nếu không tìm thấy tiến trình
            bat 'taskkill /F /IM node.exe || echo process not found'
            
            // 2. [SỬA LỖI WINDOWS] Chờ 3 giây
            // Windows cần thời gian để nhả file lock sau khi kill tiến trình
            echo 'Waiting 3 seconds for file locks to release...'
            sleep 3
            
            // 3. Dọn dẹp thư mục workspace
            cleanWs()
        }
    }
}