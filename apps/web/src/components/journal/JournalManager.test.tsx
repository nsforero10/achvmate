import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { JournalManager } from './JournalManager';

jest.mock('react-markdown', () => (props: any) => {
  return <>{props.children}</>;
});

jest.mock('../../store/api', () => ({
  useGetJournalEntriesQuery: jest.fn(),
  useCreateJournalEntryMutation: jest.fn(),
  useUpdateJournalEntryMutation: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
  useSession: jest.fn(() => ({ data: null, status: 'unauthenticated' })),
}));

jest.mock('../habits/DashboardHeader', () => ({
  DashboardHeader: (props: any) => (
    <div data-testid="dashboard-header">
      <button onClick={props.onOpenNew}>Open New</button>
    </div>
  )
}));

jest.mock('./JournalModal', () => ({
  JournalModal: (props: any) => (
    <div data-testid="journal-modal">
      <button onClick={() => props.onSubmit({ title: 'New Journal', content: 'abc' })}>Submit</button>
    </div>
  )
}));

jest.mock('@mui/material/styles', () => ({
  ...jest.requireActual('@mui/material/styles'),
  useTheme: () => ({ palette: { mode: 'light', divider: '#ccc' } }),
}));

jest.mock('../../app/providers', () => ({
  useColorMode: () => ({ toggle: jest.fn() }),
}));

import { 
  useGetJournalEntriesQuery, 
  useCreateJournalEntryMutation, 
  useUpdateJournalEntryMutation 
} from '../../store/api';

describe('JournalManager Structural Specs', () => {
  const mockCreate = jest.fn();
  const mockUpdate = jest.fn();

  beforeEach(() => {
    (useGetJournalEntriesQuery as jest.Mock).mockReturnValue({
      data: [{ id: '1', title: 'Day 1', content: '# Hello World!', date: '2026-04-15' }],
      isLoading: false,
    });
    
    (useCreateJournalEntryMutation as jest.Mock).mockReturnValue([mockCreate]);
    (useUpdateJournalEntryMutation as jest.Mock).mockReturnValue([mockUpdate]);
    
    mockCreate.mockReturnValue({ unwrap: () => Promise.resolve() });
    mockUpdate.mockReturnValue({ unwrap: () => Promise.resolve() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading states securely for logs', () => {
    (useGetJournalEntriesQuery as jest.Mock).mockReturnValue({ data: [], isLoading: true });
    render(<JournalManager dateString="Today" />);
    expect(screen.getByText('Loading entries...')).toBeInTheDocument();
  });

  it('mounts markdown views explicitly resolving structure map', () => {
    render(<JournalManager dateString="Today" />);
    // Testing ReactMarkdown conversion natively
    expect(screen.getByText('Day 1')).toBeInTheDocument();
    
    // Markdown H1 is rendered textually
    expect(screen.getByText('# Hello World!')).toBeInTheDocument();
  });

  it('allows selecting list items switching active markdown payloads safely', () => {
    (useGetJournalEntriesQuery as jest.Mock).mockReturnValue({
      data: [
        { id: '1', title: 'Day 1', content: 'Testing 1', date: '2026-04-15' },
        { id: '2', title: 'Day 2', content: 'Testing 2', date: '2026-04-16' },
      ],
      isLoading: false,
    });

    render(<JournalManager dateString="Today" />);
    expect(screen.getByText('Testing 1')).toBeInTheDocument(); // By default first is selected

    // Click secondary payload
    fireEvent.click(screen.getByText('Day 2'));
    
    expect(screen.getByText('Testing 2')).toBeInTheDocument();
  });

  it('triggers internal journal entry mappings handling modals dynamically for creates', async () => {
    render(<JournalManager dateString="Today" />);
    
    fireEvent.click(screen.getByText('Open New'));
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledWith({ title: 'New Journal', content: 'abc' });
    });
  });

  it('triggers edit mappings when selecting specific entries linking safely to updates', async () => {
    render(<JournalManager dateString="Today" />);
    
    // We can assume EditRoundedIcon is natively rendering in DOM as an svg inside the Fab binding 
    // Mui Fab buttons are typically aria-labeled or clicked directly by tag if unique
    const editBtn = screen.getByTestId('EditRoundedIcon').closest('button')!;
    fireEvent.click(editBtn);
    
    // Trigger submit mapping
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith({
        id: '1', // Selected entry baseline id 
        data: { title: 'New Journal', content: 'abc' } // Default mock payload
      });
    });
  });
});
