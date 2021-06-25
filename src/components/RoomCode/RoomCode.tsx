import Image from 'next/image'

import styles from './RoomCode.module.scss'

interface RoomCodeProps{
  code: string;
}

export function RoomCode(props: RoomCodeProps) {


  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className={styles.roomCode} onClick={copyRoomCodeToClipboard}>
      <div>
        <Image
          src="/images/copy.svg"
          alt="Copy room code"
          width={20}
          height={20}
        />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}