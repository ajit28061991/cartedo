import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/Header/Header';

describe('Header', () => {
  it('renders logo and profile', () => {
    render(<Header firstName="John" />);
    expect(screen.getByText('Cartedo')).toBeInTheDocument();
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('toggles mobile search visibility', () => {
    render(<Header />);
    const searchButton = screen.getByLabelText('Search');
    fireEvent.click(searchButton);
    expect(screen.getByPlaceholderText('Search courses...')).toBeInTheDocument();
  });
});