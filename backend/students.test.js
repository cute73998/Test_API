// File: backend/students.test.js
const request = require("supertest");
const app = "http://localhost:9999"; // Test trên server đang chạy

// Biến để lưu ID sinh viên mới, dùng cho test DELETE
let newStudentId;

describe("Integration Test cho API /students", () => {
  // Test 1: POST (Thêm sinh viên)
  it("POST /students -- Phải tạo được sinh viên mới", async () => {
    const response = await request(app)
      .post("/students")
      .send({
        name: "Test Bằng Jest",
        age: 25,
        gender: "Nam",
        email: `jest${Date.now()}@gmail.com`, // Email duy nhất
        phone: "0123456789",
        address: "TP. Jest", //test commit
      });

    expect(response.statusCode).toBe(200); //Sửa thành 201 để gây lỗi
    expect(response.body).toHaveProperty("id");
    newStudentId = response.body.id; // Lưu lại ID
  });

  // Test 2: GET (Lấy tất cả)
  it("GET /students -- Phải trả về một mảng", async () => {
    const response = await request(app).get("/students");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Kết quả phải là 1 mảng
  });

  // Test 3: DELETE (Xóa sinh viên vừa tạo)
  it("DELETE /students/:id -- Phải xóa được sinh viên vừa tạo", async () => {
    const response = await request(app).delete(`/students/${newStudentId}`); // Dùng ID từ test 1

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Xóa thành công");
  });
});
