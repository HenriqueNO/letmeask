import Image from 'next/image'
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { Button } from "../../components/Button/Button";
import { Question } from '../../components/Question/Question';
import { RoomCode } from "../../components/RoomCode/RoomCode";
import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';

import styles from '../../styles/room.module.scss'

export default function AdminRoom() {
  const { user } = useAuth()
  const [roomId, setRoomId] = useState('')
  const [newQuestion, setNewQuestion] = useState('')
  const { title, questions } = useRoom(roomId)
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href).values().next().value
    setRoomId(urlParams)
  }, [])


  async function handleCreateNewQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)


    setNewQuestion('')
  }

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

        <form onSubmit={handleCreateNewQuestion}>
          <textarea
            placeholder="O que deseja pegurtar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className={styles.formFooter}>
            {user
              ? (
                <div className={styles.userInfo}>
                  <Image src={user.avatar} alt={user.name} height={32} width={32} />
                  <span>{user.name}</span>
                </div>
              )
              : (
                <span>
                  Para enviar uma pergunta, <button>faça seu login</button>
                </span>
              )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

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
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <Image 
                        src="/images/check.svg"
                        alt="marcar pergunta como respondida"
                        width={24}
                        height={24}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <Image
                        src="/images/answer.svg"
                        alt="marcar pergunta como destaque"
                        width={24}
                        height={24}
                      />
                  </button>
                </>
               )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <Image
                    src="/images/delete.svg"
                    alt="button to delete ask"
                    width={24}
                    height={24}
                  />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}