import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import { Button } from '../components/Button'
import { AuthContext } from '../contexts/AuthContext'
import { database } from '../services/firebase'
import { MyRooms } from '../components/MyRooms'

import styles from '../styles/auth.module.scss'

export default function NewRoom() {
  const { user } = useContext(AuthContext)
  const [newRoom, setNewRoom] = useState('')
  const [showMyRooms, setShowMyRooms] = useState(false)
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
      lengthQuestion: 250,
    })

    router.push(`/admin/room?id=${firebaseRoom.key}`)
  }

  return (
    <>
      <div className={styles.pageAuth}>
        <aside>
          <Image
            src="/images/illustration.svg"
            alt="Ilustração simbolizando perguntas e respostas"
            width={313}
            height={404}
            objectFit="scale-down"
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
          {!showMyRooms
          ? (
            <>
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
              <button
                className={styles.showMyRooms}
                onClick={() => {setShowMyRooms(showMyRooms === true ? false : true)}}
              >
                Ver minhas salas criadas
              </button>
            </>
            )
          : (
            <MyRooms setShowMyRooms={setShowMyRooms}/>
          )
          }
        </div>
      </main>
      </div>
    </>
  )
}
