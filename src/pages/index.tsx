import Image from 'next/image';
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import styles from '../styles/auth.module.scss';

export default function Home() {
  const router = useRouter()
  const { signInWithGoogle, user } = useAuth()
  const [ roomCode, setRoomCode ] = useState('')

  async function login() {
    if (!user) {
      await signInWithGoogle()
    }

    router.push('/newroom')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('Room does not exists')
      return
    }

    if (roomRef.val().endedAt) {
      alert('room already closed')
      return
    }

    router.push(`/room/room?id=${roomCode}`)
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
        <button className={styles.pushToMain}>&dArr;</button>
      </aside>

      <main>
        <div className={styles.mainContent}>
          <Image
            src="/images/logo.svg"
            alt="letmeask"
            width={157}
            height={75}
          />
            <button className={styles.createRoom} onClick={login}>
              <Image 
                src="/images/google-icon.svg"
                alt="google icon"
                width={24}
                height={24}
              />
              Crie sua sala com o Google
            </button>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
