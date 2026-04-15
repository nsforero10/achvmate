import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';

// Mock Next.js router since Sidebar relies on usesPathname 
jest.mock('next/navigation', () => ({
  usePathname: () => '/habits',
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock ColorMode context to prevent undefined destructuring
jest.mock('../../app/providers', () => ({
  useColorMode: () => ({ toggle: jest.fn() })
}));

describe('Sidebar Integration', () => {
  it('renders the core navigation boundaries securely', () => {
    render(<Sidebar />);
    
    // Validate structural mapping
    expect(screen.getByText('AchvMate')).toBeInTheDocument();
    
    // Validate specific links load natively out of the context
    expect(screen.getByText('Daily Habits')).toBeInTheDocument();
  });
});
