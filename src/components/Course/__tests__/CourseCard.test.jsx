import { render, screen } from '@testing-library/react';
import { CourseProvider } from '@/contexts/CourseContext';
import CourseCard from '@/components/Course/CourseCard';

const mockCourse = {
  id: 1,
  title: 'React Fundamentals',
  description: 'Learn React basics'
};

describe('CourseCard', () => {
  it('renders course information', () => {
    render(
      <CourseProvider>
        <CourseCard course={mockCourse} />
      </CourseProvider>
    );
    
    expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Learn React basics')).toBeInTheDocument();
    expect(screen.getByText('Enroll')).toBeInTheDocument();
  });
});