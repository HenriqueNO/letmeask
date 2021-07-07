import { useState, useEffect } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function useRoom(roomId: string) {
  const { user } = useAuth()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('')
  const [isDescendingFilter, setIsDescendingFilter] = useState(false)
  const [isCrescentFilter, setIsCrescentFilter] = useState(false)

  function descendingFilter() {
    setIsDescendingFilter(isDescendingFilter === true ? false : true)
    setQuestions(questions.sort((a, b) => b.likeCount - a.likeCount))
    setIsCrescentFilter(false)
  }

  function crescentFilter() {
    setIsCrescentFilter(isCrescentFilter === true ? false : true)
    setQuestions(questions.sort((a, b) => a.likeCount - b.likeCount))
    setIsDescendingFilter(false)
  }
  
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      })

      setTitle(databaseRoom.title)
      console.log(!isCrescentFilter, !isDescendingFilter)

      if(!isCrescentFilter && !isDescendingFilter) {
        setQuestions(parsedQuestions)
      }
    })

    return () => {
      roomRef.off('value')
    }

  }, [roomId, user?.id, isDescendingFilter, isCrescentFilter])

  return { questions, title, descendingFilter, crescentFilter}
}