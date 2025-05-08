import { render, screen, fireEvent } from '@testing-library/react';
import AddCourseForm from '@/components/Course/AddCourseForm';

describe('AddCourseForm', () => {
  it('validates required fields', async () => {
    render(<AddCourseForm />);
    
    fireEvent.click(screen.getByText('Add Course'));
    
    expect(await screen.findByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Description is required')).toBeInTheDocument();
  });

  it('submits valid form', async () => {
    const mockSubmit = jest.fn();
    render(<AddCourseForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByPlaceholderText('Course Title'), {
      target: { value: 'New Course' }
    });
    fireEvent.change(screen.getByPlaceholderText('Course Description'), {
      target: { value: 'Course description' }
    });
    fireEvent.click(screen.getByText('Add Course'));
    
    expect(mockSubmit).toHaveBeenCalled();
  });
});