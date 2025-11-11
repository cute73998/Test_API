import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Edit() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const search = useParams();
    const id = search.id;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:9999/students');
            const data = await res.json();
            setStudents(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const student = students.find(s => s.id == id);
        if (student) {
            setName(student.name);
            setAge(student.age);
            setEmail(student.email);
            setPhone(student.phone);
            setAddress(student.address);
            setGender(student.gender);
        }
    }, [students, id]);

    // Trong file Edit.jsx

    async function handleUpdate() {

        // --- BẮT ĐẦU PHẦN KIỂM TRA ---

        // 1. Định nghĩa Regex (Biểu thức chính quy)
        // Regex cho email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // Regex cho SĐT Việt Nam (10 số, bắt đầu bằng 0)
        const phoneRegex = /^0\d{9}$/;

        // 2. Kiểm tra các trường (Thêm kiểm tra rỗng)
        if (!name || !age || !email || !phone || !address || !gender) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return; // Dừng hàm
        }

        // 3. Kiểm tra Email
        if (!emailRegex.test(email)) {
            alert('Email không đúng định dạng. Vui lòng kiểm tra lại.');
            return; // Dừng hàm
        }

        // 4. Kiểm tra Phone
        if (!phoneRegex.test(phone)) {
            alert('Số điện thoại không đúng định dạng. (Phải là 10 số, bắt đầu bằng 0).');
            return; // Dừng hàm
        }

        // --- KẾT THÚC PHẦN KIỂM TRA ---

        // Nếu tất cả kiểm tra đều qua, hàm fetch sẽ được gọi
        await fetch(`http://localhost:9999/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, age, email, phone, address
                , gender
            })
        }).then(() => {
            alert('Cập nhật thành công!');
            navigate('/');
        })
    };

    return (
        <div className="container">
            <h1 className="text-center text-primary">Cập nhật sinh viên</h1>
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
                <button className="btn btn-success" onClick={() => handleUpdate()}>Cập nhật</button>
                <Link to='/' className='ms-4 btn btn-success'>Back</Link>
            </div>
        </div>
    )
}