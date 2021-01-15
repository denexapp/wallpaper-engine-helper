import React from 'react'
import styles from './styles.module.css'

interface DisplayProps {
  hide: boolean
}

const Display: React.FC<DisplayProps> = props => {
  const { hide, children } = props

  const className = hide ? styles.hide : undefined

  return <div className={className}>{children}</div>
}

export default Display
