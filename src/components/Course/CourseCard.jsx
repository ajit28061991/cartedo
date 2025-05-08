'use client'
import { useContext } from 'react';
import { CourseContext } from '@/contexts/CourseContext';
import Button from '@/components/UI/Button';
import Badge from '@/components/UI/Badge';

const CourseCard = ({ course }) => {
  const { state, dispatch } = useContext(CourseContext);
  const isEnrolled = state.enrolled.includes(course.id);

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
        {isEnrolled && <Badge variant="success">Enrolled</Badge>}
      </div>
      <p className="text-gray-600 mt-2 text-sm">{course.description}</p>
      <Button
        onClick={() => dispatch({ type: 'TOGGLE_ENROLLMENT', payload: course.id })}
        variant={isEnrolled ? 'danger' : 'primary'}
        className="mt-4 w-full"
      >
        {isEnrolled ? 'Unenroll' : 'Enroll'}
      </Button>
    </div>
  );
};

export default CourseCard;