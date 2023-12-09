import { useId, useState } from 'react'

import Accordion from '@components/accordion/Accordion'

import useFetchFaqs from '@/hooks/useFetchFaqs'

import faqStyles from '@components/faq/Faq.module.css'
import KauflandECommerceLogo from '@assets/kaufland-ecommerce-logo.webp'

const Faq = () => {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null)
  const elementId = useId()
  const {
    visibleQuestions,
    isLoading,
    loadMore,
    hasFetchedAllEntries,
    numberOfLoadedQuestions,
  } = useFetchFaqs()

  const toggleAccordion =
    (id: number) =>
    (event: React.MouseEvent<HTMLDetailsElement, MouseEvent>) => {
      event.preventDefault()
      setOpenFaqId(id !== openFaqId ? id : null)
    }

  return (
    <>
      <section>
        <div
          id={elementId + 'faq-heading-container'}
          className={faqStyles['faq__heading-container']}
        >
          <div className={faqStyles['kaufland-ecommerce-logo-wrapper']}>
            <img
              src={KauflandECommerceLogo}
              alt="Kaufland e-commerce logo"
              className={faqStyles['kaufland-ecommerce-logo']}
            />
          </div>
          <div className={faqStyles['faq__heading-wrapper']}>
            <h1 className={faqStyles['faq__heading']}>
              Frequently asked questions
            </h1>
          </div>
        </div>
        <h2 className={faqStyles['faq__section-header']}>
          Got any questions? <br /> We're here to help
        </h2>

        {isLoading && (
          <div className={faqStyles['loading-icon__wrapper']}>
            <span
              className={faqStyles['loading-icon']}
              data-testid="loading-icon"
            ></span>
          </div>
        )}

        <ul
          className={faqStyles['faq__list']}
          role="list"
          aria-roledescription="accordion"
        >
          {!!visibleQuestions &&
            visibleQuestions.map(({ id, title, body }) => (
              <li key={id}>
                <Accordion
                  summaryText={title}
                  undisclosedText={body}
                  onClick={toggleAccordion(id)}
                  isOpen={openFaqId === id}
                />
              </li>
            ))}
        </ul>

        {!!visibleQuestions && (
          <button
            type="button"
            className={faqStyles['faq__button']}
            onClick={loadMore}
            disabled={hasFetchedAllEntries}
          >
            Load More
          </button>
        )}

        {/* Announce to assistive technologies like screen reader that new content has been added dynamically */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={faqStyles['visually-hidden']}
        >
          <p>
            {numberOfLoadedQuestions > 0 && (
              <p>
                {`New entries have been added to the FAQ list summing up to a total of ${numberOfLoadedQuestions} items.`}
              </p>
            )}
          </p>
        </div>

        <a
          href={`${'#' + elementId + 'faq-heading-container'}`}
          className={faqStyles['faq__back-to-top']}
        >
          <span className={faqStyles['faq__back-to-top-arrow']}></span>
          <span className={faqStyles['visually-hidden']}>back to top</span>
        </a>
      </section>
    </>
  )
}

export default Faq
