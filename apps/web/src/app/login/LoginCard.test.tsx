import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginCard } from './LoginCard';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../providers', () => ({
  useColorMode: () => ({ toggle: jest.fn() }),
}));

describe('LoginCard Client Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    mockPush.mockClear();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (signIn as jest.Mock).mockClear();
  });

  it('renders login components smoothly on load', () => {
    render(<LoginCard />);
    expect(screen.getByText(/Log in to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('switches safely between Signup and Login states natively', () => {
    render(<LoginCard />);
    fireEvent.click(screen.getByText('Create account'));
    
    expect(screen.getByText(/Sign up to/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "Sign up" })).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Log in'));
    expect(screen.getByText(/Log in to/i)).toBeInTheDocument();
  });

  it('submits manual credential executions linking directly into signIn constraints', async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: null });

    render(<LoginCard />);
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: "Log in" }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false,
      });
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('displays API errors safely if credentials reject', async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: 'Auth failed' });

    render(<LoginCard />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: "Log in" }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password.')).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('triggers Google and Github SSO handlers natively securely', () => {
    render(<LoginCard />);
    fireEvent.click(screen.getByRole('button', { name: "Log in with Google" }));
    expect(signIn).toHaveBeenCalledWith('google', expect.any(Object));

    fireEvent.click(screen.getByRole('button', { name: "Log in with GitHub" }));
    expect(signIn).toHaveBeenCalledWith('github', expect.any(Object));
  });

  it('submits signup fetches completely and seamlessly logs in on 200 payload', async () => {
    global.fetch = jest.fn(() => 
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
    ) as jest.Mock;

    (signIn as jest.Mock).mockResolvedValue({ error: null });

    render(<LoginCard />);
    fireEvent.click(screen.getByText('Create account'));
    
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'new@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: "Sign up" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/register', expect.any(Object));
      expect(signIn).toHaveBeenCalledWith('credentials', expect.any(Object));
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('isolates signup fetches capturing 400 rejection payloads safely', async () => {
    global.fetch = jest.fn(() => 
      Promise.resolve({ ok: false, json: () => Promise.resolve({ error: "Email taken" }) })
    ) as jest.Mock;

    render(<LoginCard />);
    fireEvent.click(screen.getByText('Create account')); 
    
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'bad@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'pass' } });

    fireEvent.click(screen.getByRole('button', { name: "Sign up" }));

    await waitFor(() => {
      expect(screen.getByText('Email taken')).toBeInTheDocument();
    });
  });

});
