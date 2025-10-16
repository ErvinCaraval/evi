import { useEffect, useRef } from 'react'
import './CommandSuggestions.css'

const CommandSuggestions = ({ input, onSelectCommand, onClose }) => {
  const suggestionsRef = useRef(null)

  const commands = [
    {
      command: '/hug',
      args: '<nickname>',
      description: 'enviar un abrazo',
      example: '/hug anon64',
      color: '#00ffff'
    },
    {
      command: '/msg',
      args: '<nickname> [message]',
      description: 'enviar mensaje privado',
      example: '/msg anon64 Hola, este es un mensaje privado',
      color: '#ff4444'
    },
    {
      command: '/slap',
      args: '<nickname>',
      description: 'dar un sopapo (diversión)',
      example: '/slap anon64',
      color: '#ff6b6b'
    },
    {
      command: '/w',
      args: '',
      description: 'ver quién está en línea',
      example: '/w',
      color: '#00ff88'
    },
    {
      command: '/unfav',
      args: '<nickname>',
      description: 'quitar de favoritos',
      example: '/unfav anon64',
      color: '#ffd700'
    },
    {
      command: '/block',
      args: '[nickname]',
      description: 'bloquear o ver bloqueados',
      example: '/block anon64',
      color: '#ff4444'
    },
    {
      command: '/unblock',
      args: '<nickname>',
      description: 'desbloquear un usuario',
      example: '/unblock anon64',
      color: '#00ff88'
    },
    {
      command: '/clear',
      args: '',
      description: 'limpiar mensajes del chat',
      example: '/clear',
      color: '#ff9500'
    },
    {
      command: '/channels',
      args: '',
      description: 'mostrar canales encontrados',
      example: '/channels',
      color: '#00ccff'
    },
    {
      command: '/join',
      args: '<channel>',
      description: 'unirse o crear un canal',
      example: '/join general',
      color: '#00ff88'
    }
  ]

  const filteredCommands = input && input.startsWith('/')
    ? commands.filter(cmd =>
        cmd.command.toLowerCase().startsWith(input.toLowerCase()) ||
        cmd.description.toLowerCase().includes(input.slice(1).toLowerCase())
      )
    : []

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  if (filteredCommands.length === 0) return null

  return (
    <div className="command-suggestions" ref={suggestionsRef}>
      <div className="suggestions-header" role="status" aria-live="polite">
        <span className="suggestions-title">Comandos disponibles</span>
        <span className="suggestions-count">{filteredCommands.length}</span>
      </div>

      <div className="suggestions-list">
        {filteredCommands.map((cmd, index) => (
          <button
            key={index}
            className="suggestion-item"
            onClick={() => onSelectCommand(cmd.example)}
            aria-label={`Usar comando ${cmd.command}`}
          >
            <div className="suggestion-left">
              <div className="command-indicator" style={{ background: cmd.color }}></div>
              <div className="suggestion-content">
                <div className="suggestion-command">
                  <span className="cmd-name">{cmd.command}</span>
                  {cmd.args && <span className="cmd-args">{cmd.args}</span>}
                </div>
              <div className="suggestion-description">{cmd.description}</div>
              </div>
            </div>
            <div className="suggestion-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        ))}
      </div>

      <div className="suggestions-footer">
        <span className="hint-text">Presiona Tab para autocompletar</span>
      </div>
    </div>
  )
}

export default CommandSuggestions
