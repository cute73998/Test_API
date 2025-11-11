import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Add() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate();

    // Trong file Add.jsx

   async function handleAdd() {
    // ... (Toàn bộ phần kiểm tra Regex của bạn giữ nguyên) ...

    // --- SỬA LẠI PHẦN FETCH ---
    try {
        const res = await fetch(`http://localhost:9999/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, age, email, phone, address, gender
            })
        });

        if (res.ok) { // Nếu server trả về 200 (OK)
            alert('Thêm thành công!');
            navigate('/');
        } else {
            // Nếu server trả về lỗi (ví dụ 500)
            const errorData = await res.json();
            alert('Thêm thất bại! Lỗi: ' + (errorData.error || 'Lỗi không xác định'));
        }

    } catch (err) {
        // Lỗi này xảy ra nếu không thể kết nối (server sập)
        alert('Không thể kết nối đến server!');
    }
};

    return (
        <div className="container">
            <h1 className="text-center text-primary">Thêm sinh viên</h1>
            <div>
                <label className="form-label">Tên</label>
                <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label className="form-label">Tuổi</label>
                <input className="form-control" type="number" min={6} value={age} onChange={e => setAge(e.target.value)} />
            </div>
            <div>
                <label className="form-label">Email</label>
                <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <label className="form-label">Phone</label>
                <input className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div>
                <label className="form-label">Giới tính</label>
                <input className="form-control" value={gender} onChange={e => setGender(e.target.value)} />
            </div>
            <div>
                <label className="form-label">Địa chỉ</label>
                <input className="form-control" value={address} onChange={e => setAddress(e.target.value)} />
            </div>

            <div className="mt-4">
                <button className="btn btn-success" onClick={() => handleAdd()}>Cập nhật</button>
                <Link to='/' className='ms-4 btn btn-success'>Back</Link>
            </div>
        </div>
    )
}