import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import { Button } from '../components/Button/Button'
import { AuthContext } from '../contexts/AuthContext'
import { database } from '../services/firebase'

import styles from '../styles/auth.module.scss'

export default function NewRoom() {
  const { user } = useContext(AuthContext)
  const [newRoom, setNewRoom] = useState('')
  const router = useRouter()

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user.id,

    })

    router.push(`/room/?id=${firebaseRoom.key}`)
  }

  return (
    <div className={styles.pageAuth}>
      <aside>
        <Image
          src="/images/illustration.svg"
          alt="Ilustração simbolizando perguntas e respostas"
          width={313}
          height={404}
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className={styles.mainContent}>
          <Image
            src="/images/logo.svg"
            alt="letmeask"
            width={157}
            height={75}
          />
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link href="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}
