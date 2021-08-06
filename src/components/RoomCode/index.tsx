import Image from 'next/image'

import styles from './RoomCode.module.scss'

interface RoomCodeProps{
  code: string;
  admin?: boolean;
}

export function RoomCode({code, admin = false}: RoomCodeProps) {


  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code)
  }

  return (
    <>
      {admin
        ? (
          <button title="Clique para copiar o código da sala" className={`${styles.roomCode} ${admin && styles.roomCodeAdmin}`} onClick={copyRoomCodeToClipboard}>
            
          <div>
            <Image
              src="/images/copy.svg"
              alt="Copy room code"
              width={20}
              height={20}
                objectFit="scale-down"
            />
          </div>
          <p>Código da sala:
            <span>
            #{code}
            </span>
          </p>
        </button>
        )
        : (
          <button title="Clique para copiar o código da sala" className={styles.roomCode} onClick={copyRoomCodeToClipboard}>
            <Image
              src="/images/share.svg"
              alt="Copy room code"
              width={15}
              height={15}
              objectFit="scale-down"
            />
          </button>
        )}
      </>
  )
}