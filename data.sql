CREATE DATABASE studentdb;
USE studentdb;


CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT,
  gender ENUM('Nam', 'Nữ', 'Khác') DEFAULT 'Khác',
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(15),
  address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO students (name, age, gender, email, phone, address)
VALUES
('Nguyễn Văn An', 20, 'Nam', 'an@gmail.com', '0901234567', 'Hà Nội'),
('Trần Thị Bình', 21, 'Nữ', 'bin4h@gmail.com', '0987654321', 'Đà Nẵng'),
('Trần Thị Son', 21, 'Nữ', 'binh1@gmail.com', '0987658321', 'Hoa Thanh Quế'),
('Trần Thị Huy', 21, 'Nữ', 'binh2@gmail.com', '0987654321', 'Hoa Thánh'),
('Lê Quốc Cường', 22, 'Nam', 'cuong@gmail.com', '0912345678', 'TP.HCM');

select * from students