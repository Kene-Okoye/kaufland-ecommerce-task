import accordionStyles from '@components/accordion/Accordion.module.css'

type AccordionProps = {
  summaryText: string
  undisclosedText: string
  isOpen?: boolean
  onClick?: React.MouseEventHandler<HTMLDetailsElement>
}

const Accordion = ({
  summaryText,
  undisclosedText,
  isOpen,
  onClick,
}: AccordionProps) => {
  return (
    <details
      className={accordionStyles['accordion']}
      open={isOpen}
      onClick={onClick}
    >
      <summary>{summaryText}?</summary>
      <div className={accordionStyles['accordion__text-wrapper']}>
        <p className={accordionStyles['accordion__text']}>{undisclosedText}</p>
      </div>
    </details>
  )
}

export default Accordion
