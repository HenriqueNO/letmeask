import { useRoom } from '../../hooks/useRoom'
import styles from './QuestionFilter.module.scss'

export function QuestionFilter({ descendingFilter, crescentFilter }) {

  return (
    <div className={styles.container}>
      <label>Filtros:</label>
      <button onClick={descendingFilter}>Decrescente</button>
      <button onClick={crescentFilter}>Crescente</button>
      <button>Novos</button>
      <button>Antigos</button>
    </div>
  )
}