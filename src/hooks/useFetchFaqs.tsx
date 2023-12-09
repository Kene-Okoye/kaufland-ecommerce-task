import { useEffect, useState, useCallback } from 'react'

export interface QuestionProps {
  userId: number
  id: number
  title: string
  body: string
}

/**
 * ---------------------------------------------------------
 * A custom hook to fetch and progressively manage questions
 * the add entries to the DOM list on click of a button.
 * ----------------------------------------------------------
 * @returns {{
 *   visibleQuestions: Question[];
 *   loadMore: () => void;
 * }}
 */

const useFetchFaqs = () => {
  const [questions, setQuestions] = useState<QuestionProps[]>([])
  const [visibleQuestions, setVisibleQuestions] = useState<QuestionProps[]>([])
  const [numberOfLoadedQuestions, setumberOfLoadedQuestions] =
    useState<number>(10)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasFetchedAllEntries, setHasFetchedAllEntries] =
    useState<boolean>(false)
  const maxEnties = 10

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
        )
        const data = await response.json()
        setQuestions(data)
      } catch (error) {
        console.log('ERROR:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  useEffect(() => {
    // Update visibleQuestions when questions or numberOfLoadedQuestions changes
    setVisibleQuestions(questions.slice(0, numberOfLoadedQuestions))
  }, [questions, numberOfLoadedQuestions])

  const loadMore = useCallback(() => {
    const numberOfLoadedQuestionsNew = numberOfLoadedQuestions + maxEnties
    setumberOfLoadedQuestions(numberOfLoadedQuestionsNew)
  }, [numberOfLoadedQuestions])

  useEffect(() => {
    // Update hasFetchedAllEntries (i.e. set to true) when all the entries has been fetched
    setHasFetchedAllEntries(visibleQuestions.length === questions.length)
  }, [questions.length, visibleQuestions.length])

  return {
    visibleQuestions,
    isLoading,
    loadMore,
    hasFetchedAllEntries,
    numberOfLoadedQuestions,
  }
}

export default useFetchFaqs
