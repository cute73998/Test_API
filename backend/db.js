const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',      // sửa nếu bạn có password
  database: 'studentdb' //kết nối đến database studentdb
});

db.connect(err => {
  if (err) {
    console.error('❌ Lỗi kết nối MySQL:', err);
  } else {
    console.log('✅ Kết nối MySQL thành công!');
  }
});

module.exports = db;
