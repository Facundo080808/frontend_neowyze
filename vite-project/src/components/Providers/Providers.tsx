import type{ ReactNode } from 'react'
import { FilmsProvider } from '../../context/FilmsContext'
import { CharacterProvider } from '../../context/Character_context'


type ProvidersProps = {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <CharacterProvider>
      <FilmsProvider>
          {children}
      </FilmsProvider>
    </CharacterProvider>
  )
}