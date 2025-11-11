const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Lấy toàn bộ sinh viên
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        console.log('Query executed: SELECT * FROM students');
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Lấy 1 sinh viên theo id
app.get('/students/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM students WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

// Thêm sinh viên
app.post('/students', (req, res) => {
    const { name, age, gender, email, phone, address } = req.body;
    db.query('INSERT INTO students (name, age, gender , email, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
        [name, age, gender, email, phone, address],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, name, age, gender, email, phone, address });
        });
});

// Cập nhật sinh viên (ĐÃ SỬA)
app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, gender, email, phone, address } = req.body;
    db.query('UPDATE students SET name=?, age=?, gender=?, email=?, phone=?, address=? WHERE id=?',
        [name, age, gender, email, phone, address, id], // <-- SỬA LẠI: Thêm 'id' vào cuối
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Cập nhật thành công' });
        });
});

// Xóa sinh viên
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM students WHERE id=?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Xóa thành công' });
    });
});

app.listen(9999, () => console.log('Server chạy tại http://localhost:9999'));
