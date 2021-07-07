import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { database } from "../../services/firebase"
import Image from 'next/image'

import styles from './MyRooms.module.scss'
import { useRouter } from "next/router"

type RoomsType = {
  roomId: string;
  authorId: string;
  questions: Array<any>;
  title: string;
}

export function MyRooms({ setShowMyRooms }) {
  const { user } = useAuth()
  const router = useRouter()
  const [rooms, setRooms] = useState<RoomsType[]>([])

  useEffect(() => {
    const roomRef = database.ref(`rooms/`)
    roomRef.once('value', room => {

      const roomInfo: any = Object.entries(room.val())
      console.log(roomInfo)

      for (var i in roomInfo) {
        if (roomInfo[i][1].authorId === user?.id) {
          setRooms(oldRooms => [...oldRooms, {
            roomId: roomInfo[i][0],
            authorId: roomInfo[i][1].authorId,
            questions: roomInfo[i][1].questions,
            title: roomInfo[i][1].title
          }])
        }
      }
    })
  }, [user?.id])

  console.log(rooms)


  return (
    <div className={styles.roomsContainer}>
      <div>
        <button onClick={() => setShowMyRooms(false)}>
          <Image
            src="/images/back-return.svg"
            alt="voltar"
            width={24}
            height={24}
          />
        </button>
        <h1>Suas salas</h1>
      </div>
      <div>
        {rooms.map((data, key) => {
          return (
            <div key={key} className={styles.roomIndex} onClick={() => router.push(`/admin/room?id=${data.roomId}`)}>
              <h2>Título: {data.title}</h2>
              <p>Nº Perguntas: {Object.keys(data.questions ?? {}).length}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}