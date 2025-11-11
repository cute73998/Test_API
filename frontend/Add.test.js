// File: frontend/src/Add.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import Add from './Add';

// Vì Add.jsx dùng <Link> và useNavigate(), ta phải bọc nó
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Unit Test cho Component <Add />', () => {

  it('Phải render đúng tiêu đề "Thêm sinh viên"', () => {
    renderWithRouter(<Add />);
    
    // Tìm phần tử có text là "Thêm sinh viên"
    const titleElement = screen.getByText(/Thêm sinh viên/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('Phải hiện alert nếu bấm nút mà chưa điền thông tin', () => {
    // Giả lập hàm window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<Add />);

    // Tìm nút bấm (Chữ trên nút trong file Add.jsx là "Cập nhật")
    const submitButton = screen.getByRole('button', { name: /Cập nhật/i });
    fireEvent.click(submitButton);

    // Kiểm tra xem alert có được gọi đúng không
    expect(alertMock).toHaveBeenCalledWith('Vui lòng điền đầy đủ thông tin.');
    alertMock.mockRestore(); // Khôi phục lại hàm alert
  });
});