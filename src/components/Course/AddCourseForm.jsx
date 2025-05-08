'use client'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCourseContext } from '@/contexts/CourseContext';
import Button from '@/components/UI/Button';

const schema = yup.object().shape({
  title: yup.string().required('Title is required').max(100),
  description: yup.string().required('Description is required').max(500),
});

const AddCourseForm = () => {
    const { dispatch } = useCourseContext(); 
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const newCourse = {
        id: Math.random().toString(36).substring(2, 9),
        ...data
      };
      dispatch({ type: 'ADD_COURSE', payload: newCourse });
      reset();
    } catch (error) {
      console.error('Failed to add course:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          {...register('title')}
          placeholder="Course Title"
          className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          {...register('description')}
          placeholder="Course Description"
          rows={3}
          className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Adding...' : 'Add Course'}
      </Button>
    </form>
  );
};

export default AddCourseForm;