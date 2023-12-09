import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Accordion from './Accordion'

describe('Accordion component', () => {
  const summaryText = 'How are you doing today'
  const undisclosedText = "I'm doing well, thanks."

  it('renders the accordion summary and undisclosedText props', () => {
    render(
      <Accordion summaryText={summaryText} undisclosedText={undisclosedText} />,
    )

    const summaryElement = screen.getByText(`${summaryText}?`)
    const undisclosedTextElement = screen.getByText(undisclosedText)

    expect(summaryElement).toBeInTheDocument()
    expect(undisclosedTextElement).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClickMock = vi.fn()

    render(
      <Accordion
        summaryText={summaryText}
        undisclosedText={undisclosedText}
        onClick={onClickMock}
      />,
    )

    fireEvent.click(screen.getByText(`${summaryText}?`))

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('opens accordion component when isOpen is true', () => {
    render(
      <Accordion
        summaryText={summaryText}
        undisclosedText={undisclosedText}
        isOpen={true}
      />,
    )

    expect(screen.getByRole('group')).toHaveAttribute('open')
  })

  it('closes accordion component when isOpen is false', () => {
    render(
      <Accordion
        summaryText={summaryText}
        undisclosedText={undisclosedText}
        isOpen={false}
      />,
    )
    expect(screen.getByRole('group')).not.toHaveAttribute('open')
  })
})
