import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/slices/authSlice'
import interviewReducer from '../redux/slices/interviewSlice'
import resourceReducer from '../redux/slices/resourceSlice'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Accordion from '../components/Accordion'
import Pagination from '../components/Pagination'
import InterviewCard from '../components/InterviewCard'

// Helper: create a fresh store
const makeStore = (preloadedState = {}) =>
  configureStore({
    reducer: { auth: authReducer, interviews: interviewReducer, resources: resourceReducer },
    preloadedState,
  })

// Helper: wrap with Provider + Router
const renderWith = (ui, store = makeStore()) =>
  render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  )

// ── Login ────────────────────────────────────────────────────────────────────
describe('Login Page', () => {
  it('renders email and password fields', () => {
    renderWith(<Login />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', async () => {
    renderWith(<Login />)
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    })
  })

  it('shows error for invalid email', async () => {
    renderWith(<Login />)
    await userEvent.type(screen.getByLabelText(/email/i), 'notanemail')
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    })
  })

  it('shows password error for short password', async () => {
    renderWith(<Login />)
    await userEvent.type(screen.getByLabelText(/email/i), 'user@test.com')
    await userEvent.type(screen.getByLabelText(/password/i), '123')
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getByText(/at least 6/i)).toBeInTheDocument()
    })
  })

  it('has a link to signup page', () => {
    renderWith(<Login />)
    expect(screen.getByText(/sign up free/i)).toBeInTheDocument()
  })
})

// ── Signup ───────────────────────────────────────────────────────────────────
describe('Signup Page', () => {
  it('renders all form fields', () => {
    renderWith(<Signup />)
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('shows error when name is empty', async () => {
    renderWith(<Signup />)
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })
  })

  it('shows error for invalid phone number', async () => {
    renderWith(<Signup />)
    await userEvent.type(screen.getByLabelText(/full name/i), 'Test User')
    await userEvent.type(screen.getByLabelText(/email/i), 'test@email.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    await userEvent.type(screen.getByLabelText(/phone/i), '12345')
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))
    await waitFor(() => {
      expect(screen.getByText(/10-digit/i)).toBeInTheDocument()
    })
  })

  it('links back to login', () => {
    renderWith(<Signup />)
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument()
  })
})

// ── Accordion ────────────────────────────────────────────────────────────────
describe('Accordion Component', () => {
  const items = [
    { question: 'What is JavaScript?', answer: 'A scripting language for the web.' },
    { question: 'What is React?', answer: 'A UI library by Facebook.' },
  ]

  it('renders all questions', () => {
    render(<Accordion items={items} />)
    expect(screen.getByText(/what is javascript/i)).toBeInTheDocument()
    expect(screen.getByText(/what is react/i)).toBeInTheDocument()
  })

  it('answers are hidden by default', () => {
    render(<Accordion items={items} />)
    expect(screen.queryByText(/scripting language/i)).not.toBeVisible()
  })

  it('shows answer on click', async () => {
    render(<Accordion items={items} />)
    fireEvent.click(screen.getByText(/what is javascript/i))
    await waitFor(() => {
      expect(screen.getByText(/scripting language/i)).toBeVisible()
    })
  })
})

// ── Pagination ───────────────────────────────────────────────────────────────
describe('Pagination Component', () => {
  it('does not render when totalPages is 1', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders page buttons', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={vi.fn()} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('calls onPageChange with correct page number', async () => {
    const handleChange = vi.fn()
    render(<Pagination currentPage={1} totalPages={3} onPageChange={handleChange} />)
    fireEvent.click(screen.getByText('2'))
    expect(handleChange).toHaveBeenCalledWith(2)
  })

  it('prev button calls onPageChange(currentPage - 1)', () => {
    const handleChange = vi.fn()
    render(<Pagination currentPage={2} totalPages={3} onPageChange={handleChange} />)
    fireEvent.click(screen.getByTitle ? screen.getAllByRole('button')[0] : screen.getAllByRole('button')[0])
    expect(handleChange).toHaveBeenCalledWith(1)
  })
})

// ── InterviewCard ────────────────────────────────────────────────────────────
describe('InterviewCard Component', () => {
  const upcomingInterview = {
    _id: '1',
    type: 'Frontend',
    date: '2026-05-01',
    time: '10:00',
    interviewer: 'Priya Sharma',
    status: 'upcoming',
    resources: [{ title: 'React Docs', url: 'https://react.dev' }],
  }

  const completedInterview = {
    _id: '2',
    type: 'DSA',
    date: '2026-04-10',
    time: '14:00',
    interviewer: 'Vikram Singh',
    status: 'completed',
    feedback: 'Good problem solving approach.',
    score: 8,
    result: 'Pass',
    resources: [],
  }

  it('renders upcoming interview details', () => {
    render(<InterviewCard interview={upcomingInterview} type="upcoming" />)
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument()
    expect(screen.getByText(/upcoming/i)).toBeInTheDocument()
  })

  it('renders prep resources for upcoming interviews', () => {
    render(<InterviewCard interview={upcomingInterview} type="upcoming" />)
    expect(screen.getByText('React Docs')).toBeInTheDocument()
  })

  it('renders completed interview with feedback and score', () => {
    render(<InterviewCard interview={completedInterview} type="completed" />)
    expect(screen.getByText(/problem solving/i)).toBeInTheDocument()
    expect(screen.getByText(/8\/10/i)).toBeInTheDocument()
    expect(screen.getByText(/pass/i)).toBeInTheDocument()
  })

  it('shows interviewer initial avatar', () => {
    render(<InterviewCard interview={upcomingInterview} type="upcoming" />)
    expect(screen.getByText('P')).toBeInTheDocument()
  })
})
