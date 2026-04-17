import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';

jest.mock('next/navigation', () => ({
  usePathname: () => '/habits',
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../app/providers', () => ({
  useColorMode: () => ({ toggle: jest.fn() })
}));

describe('Sidebar Integration', () => {
  it('renders the core navigation boundaries securely', () => {
    render(<Sidebar />);
    
    expect(screen.getByText('AchvMate')).toBeInTheDocument();
    
    expect(screen.getByText('Daily Habits')).toBeInTheDocument();
  });
});
