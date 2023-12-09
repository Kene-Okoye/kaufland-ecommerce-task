import { vi, describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Faq from './Faq'
import { mockData } from '@/mocks/mockData'

vi.mock('@/hooks/useFetchFaqs', () => ({
  default: vi.fn(() => ({
    visibleQuestions: mockData,
    isLoading: true,
    loadMore: vi.fn(),
    hasFetchedAllEntries: false,
  })),
}))

vi.mock('react', () => ({
  ...vi.importActual('react'),
  useId: vi.fn(() => 'uniqueId'),
  useState: vi.fn((initialValue) => [initialValue, vi.fn()]),
}))

describe('Faq Component', () => {
  beforeEach(() => {
    render(<Faq />)
  })

  it('renders FAQ headings', () => {
    const headingH1 = screen.getByRole('heading', { level: 1 })
    const headingH2 = screen.getByRole('heading', { level: 2 })

    expect(headingH1).toBeInTheDocument()
    expect(headingH2).toBeInTheDocument()
  })

  it('renders the list of questions', () => {
    const questions = screen.getAllByRole('listitem')
    expect(questions).toHaveLength(10)
  })

  it('renders the loading icon when isLoading is true', () => {
    const loadingIcon = screen.getByTestId('loading-icon')
    expect(loadingIcon).toBeInTheDocument()
  })

  it('renders the "Load More" button', () => {
    const loadMoreButton = screen.getByRole('button', { name: 'Load More' })

    expect(loadMoreButton).toBeInTheDocument()
    expect(loadMoreButton).toBeEnabled()
  })

  it('renders back to top link', () => {
    const backToTopLink = screen.getByRole('link', { name: 'back to top' })

    expect(backToTopLink).toBeInTheDocument()
    expect(backToTopLink.getAttribute('href')).toEqual(
      '#uniqueIdfaq-heading-container',
    )
  })
})
