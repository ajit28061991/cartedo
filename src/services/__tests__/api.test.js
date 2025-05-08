import { getCourses, addCourse } from '@/services/api';
import axios from 'axios';

jest.mock('axios');

describe('API Service', () => {
  it('fetches courses', async () => {
    const mockData = [{ id: 1, title: 'React' }];
    axios.get.mockResolvedValue({ data: mockData });
    
    const result = await getCourses();
    expect(result.data).toEqual(mockData);
  });

  it('handles fetch errors', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));
    await expect(getCourses()).rejects.toThrow('Network Error');
  });
});