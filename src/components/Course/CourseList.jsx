'use client'
import { useContext } from 'react';
import { CourseContext } from '@/contexts/CourseContext';
import CourseCard from './CourseCard';
import Loader from '@/components/UI/Loader';
import { useSearchParams } from 'next/navigation';

const CourseList = () => {
  const { state } = useContext(CourseContext);
  const { courses, loading, error } = state;
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
    const filteredCourses = state.courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
      if (state.loading) return <div className="text-center py-8">Loading courses...</div>;
      if (state.error) return <div className="text-red-500 p-4">Error: {state.error}</div>;

  if (loading) return (
    <div className="flex justify-center py-12">
      <Loader size="lg" />
    </div>
  );

  if (error) return (
    <div className="text-center p-8 text-red-500">
      Failed to load courses: {error}
    </div>
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredCourses.length > 0 ? (
        filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))
      ) : (
        <div className="col-span-3 text-center py-8 text-gray-500">
          {searchQuery ? 'No courses match your search' : 'No courses available'}
        </div>
      )}
    </div>
  );
};

export default CourseList;