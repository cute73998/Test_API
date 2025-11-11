import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function List() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:9999/students');
            const data = await res.json();
            setStudents(data);
        }
        fetchData();
    }, []);

    function handleDelete(id) {
        fetch(`http://localhost:9999/students/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setStudents(students.filter(s => s.id !== id));
        });
    }

    return (
        <div className="container">
            <h1 className="my-3">Danh sách sinh viên</h1>
            <div className="my-3">
                <Link to='/add' className="btn btn-success">Thêm sinh viên</Link>
            </div>
            <table className="table table-bordered table-striped table-hover my-3">
                <thead className="table-primary">
                    <tr>
                        <td><strong>Name</strong></td>
                        <td><strong>Age</strong></td>
                        <td><strong>Gender</strong></td>
                        <td><strong>Email</strong></td>
                        <td><strong>Phone</strong></td>
                        <td><strong>Address</strong></td>
                        <td><strong>Created at</strong></td>
                        <td><strong>Function</strong></td>
                    </tr>
                </thead>
                <tbody>
                    {students.map(s =>
                        <tr>
                            <td>{s.name}</td>
                            <td>{s.age}</td>
                            <td>{s.gender}</td>
                            <td>{s.email}</td>
                            <td>{s.phone}</td>
                            <td>{s.address}</td>
                            <td>{s.created_at}</td>
                            <td>
                                <ul className="d-flex list-unstyled justify-content-center gap-2 m-0 p-0">
                                    <li><Link to={`/edit/${s.id}`} className="btn btn-warning">Edit</Link></li>
                                    <li><button className="btn btn-danger" onClick={() => handleDelete(s.id)}>Delete</button></li>
                                </ul>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}