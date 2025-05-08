import { render, screen } from '@testing-library/react';
import { CourseProvider } from '@/contexts/CourseContext';
import CourseList from '@/components/Course/CourseList';

describe('CourseList', () => {
  it('shows loading state', () => {
    render(
      <CourseProvider value={{ state: { loading: true } }}>
        <CourseList />
      </CourseProvider>
    );
    
    expect(screen.getByText('Loading courses...')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(
      <CourseProvider value={{ state: { courses: [] } }}>
        <CourseList />
      </CourseProvider>
    );
    
    expect(screen.getByText('No courses available')).toBeInTheDocument();
  });
});