import Image from 'next/image'
import { ReactNode } from 'react'
import styles from './Question.module.scss'

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHighlighted = false,
  }: QuestionProps) {

  return (
    <div className={`
      ${styles.question}
      ${isAnswered && styles.answered}
      ${(isHighlighted && !isAnswered) && styles.highlighted}
    `}>
      <p>{content}</p>
      <footer>
        <div className={styles.userInfo}>
          <Image
            src={author.avatar}
            alt={author.name}
            width={32}
            height={32}
          />
          <span>
            {author.name}
          </span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}