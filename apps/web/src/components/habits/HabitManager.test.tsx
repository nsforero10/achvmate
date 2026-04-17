import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HabitManager } from './HabitManager';


jest.mock('../../store/api', () => ({
  useGetHabitsQuery: jest.fn(),
  useCreateHabitMutation: jest.fn(),
  useUpdateHabitMutation: jest.fn(),
  useDeleteHabitMutation: jest.fn(),
  useToggleHabitCompleteMutation: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
  useSession: jest.fn(() => ({ data: null, status: 'unauthenticated' })),
}));


jest.mock('../HabitCard', () => ({
  HabitCard: (props: any) => (
    <div data-testid="habit-card">
      <span>{props.habit.title}</span>
      <button onClick={() => props.onDelete(props.habit.id)}>Delete</button>
      <button onClick={() => props.onEdit(props.habit)}>Edit</button>
      <button onClick={() => props.onToggleComplete(props.habit.id)}>Toggle</button>
    </div>
  )
}));

jest.mock('../HabitFormModal', () => ({
  HabitFormModal: (props: any) => (
    <div data-testid="habit-modal">
      <button onClick={() => props.onSubmit({ title: 'New' })}>Submit</button>
      <button onClick={props.onClose}>Close Modal</button>
    </div>
  )
}));

jest.mock('./DashboardHeader', () => ({
  DashboardHeader: (props: any) => (
    <div data-testid="dashboard-header">
      <button onClick={props.onOpenNew}>Open New</button>
    </div>
  )
}));

jest.mock('./CalendarStrip', () => ({
  CalendarStrip: (props: any) => (
    <div data-testid="calendar-strip">
      <button onClick={() => props.onSelectDate('2026-04-10')}>Select Date</button>
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
  useGetHabitsQuery, 
  useCreateHabitMutation, 
  useUpdateHabitMutation, 
  useDeleteHabitMutation, 
  useToggleHabitCompleteMutation 
} from '../../store/api';

describe('HabitManager Client Render Mappings', () => {
  const mockCreate = jest.fn();
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();
  const mockToggle = jest.fn();

  beforeEach(() => {
    (useGetHabitsQuery as jest.Mock).mockReturnValue({
      data: [{ id: '1', title: 'Read Book', frequency: ['MON'], categoryId: 'learning', entries: [] }],
      isLoading: false,
    });
    
    (useCreateHabitMutation as jest.Mock).mockReturnValue([mockCreate]);
    (useUpdateHabitMutation as jest.Mock).mockReturnValue([mockUpdate]);
    (useDeleteHabitMutation as jest.Mock).mockReturnValue([mockDelete]);
    (useToggleHabitCompleteMutation as jest.Mock).mockReturnValue([mockToggle]);
    
    mockCreate.mockReturnValue({ unwrap: () => Promise.resolve() });
    mockUpdate.mockReturnValue({ unwrap: () => Promise.resolve() });
    mockDelete.mockReturnValue({ unwrap: () => Promise.resolve() });
    mockToggle.mockReturnValue({ unwrap: () => Promise.resolve() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading states securely', () => {
    (useGetHabitsQuery as jest.Mock).mockReturnValue({ data: [], isLoading: true });
    render(<HabitManager dateString="Today" />);
    expect(screen.getByText('Loading habits...')).toBeInTheDocument();
  });

  it('renders provided habit cards mapping RTK values directly payload', () => {
    render(<HabitManager dateString="Today" />);
    expect(screen.getByText('Read Book')).toBeInTheDocument();
  });

  it('triggers delete modals securely', async () => {
    render(<HabitManager dateString="Today" />);
    
    fireEvent.click(screen.getByText('Delete'));

    expect(screen.getByText(/Are you sure you want to delete this habit/i)).toBeInTheDocument();

    const confirmBtn = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith('1');
    });
  });

  it('triggers form creation mounts and edits payload correctly', async () => {
    render(<HabitManager dateString="Today" />);
    

    fireEvent.click(screen.getByText('Open New'));
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledWith({ title: 'New' });
    });

    fireEvent.click(screen.getByText('Open New'));
    fireEvent.click(screen.getByText('Close Modal'));
    
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith({ id: '1', data: { title: 'New' } });
    });
  });

  it('executes boolean completion toggles successfully handling target dates', async () => {
    render(<HabitManager dateString="Today" />);
    
    fireEvent.click(screen.getByText('Select Date'));
    fireEvent.click(screen.getByText('Toggle'));
    
    await waitFor(() => {
      expect(mockToggle).toHaveBeenCalledWith({ habitId: '1', date: '2026-04-10' });
    });
  });
});
