import { renderHook, act } from '@testing-library/react-hooks';
import { CourseProvider, useCourseContext } from '@/contexts/CourseContext';

describe('CourseContext', () => {
  it('should initialize with default state', () => {
    const wrapper = ({ children }) => <CourseProvider>{children}</CourseProvider>;
    const { result } = renderHook(() => useCourseContext(), { wrapper });
    
    expect(result.current.state).toEqual({
      courses: [],
      enrolled: [],
      loading: false,
      error: null
    });
  });

  it('should toggle enrollment', () => {
    const wrapper = ({ children }) => <CourseProvider>{children}</CourseProvider>;
    const { result } = renderHook(() => useCourseContext(), { wrapper });
    
    act(() => {
      result.current.dispatch({ type: 'TOGGLE_ENROLLMENT', payload: 1 });
    });
    
    expect(result.current.state.enrolled).toContain(1);
    
    act(() => {
      result.current.dispatch({ type: 'TOGGLE_ENROLLMENT', payload: 1 });
    });
    
    expect(result.current.state.enrolled).not.toContain(1);
  });
});