import Image from 'next/image'
import { useRouter } from 'next/router';
import { useContext, useMemo, useState } from 'react';
import { Button } from "../../components/Button";
import { Question } from '../../components/Question';
import { RoomCode } from "../../components/RoomCode";
import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';
import { QuestionFilter } from '../../components/QuestionFilter';

import styles from '../../styles/room.module.scss'
import { ThemeContext } from '../../contexts/ThemeContext';

export default function AdminRoom() {
  const router = useRouter()
  const { user } = useAuth()
  const [roomId, setRoomId] = useState('')
  const [authorId, setAuthorId] = useState(null)
  const { toggleTheme, theme } = useContext(ThemeContext)
  const { title, questions, descendingFilter, crescentFilter } = useRoom(roomId)
  
  useMemo(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.href).values().next().value
      setRoomId(urlParams)
    }
    const authorRef = database.ref(`rooms/${roomId}/authorId`)

    authorRef.once('value', value => {
      setAuthorId(value.val())
    })

    return () => {
      authorRef.off('value')
    }
  }, [roomId])
  


  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    router.push('/')
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }
  
  console.log(authorId, user)
  if (user === undefined || authorId === null) {
    return (
      <h1>Carregando</h1>
    )
  } else if (user?.id !== authorId && (user !== undefined || authorId !== null)) {
    if (roomId === undefined) {
      router.replace('/')
    }

    router.replace(`/room/room?id=${roomId}`)
  }

  return (
    <div className={styles.pageRoom}>
      <header>
        <div className={styles.content}>
          <Image
            src="/images/logo.svg"
            alt="letmeask"
            width={157}
            height={75}
          />
          <div>
            <button onClick={toggleTheme}>
              <Image
                src={theme.title === 'light' ? '/images/icon-lightTheme.svg' : '/images/icon-darkTheme.svg'}
                width={24}
                height={24}
                alt="tema claro"
              />
            </button>
            <RoomCode code={roomId} />
            <Button isOutlined={true} onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <QuestionFilter
          descendingFilter={descendingFilter}
          crescentFilter={crescentFilter}
        />
        <div className={styles.questionList}>
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
               { !question.isAnswered && (
                 <> 
                    <span className={styles.likes}>
                      {question.likeCount} GOSTEI
                    </span>
                    <button className={styles.adminIcons}
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button className={styles.adminIcons}
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                  </button>
                </>
               )}
                <button className={styles.adminIcons}
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}