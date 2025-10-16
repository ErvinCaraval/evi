import { useEffect, useRef } from 'react'
import './CommandSuggestions.css'

const CommandSuggestions = ({ input, onSelectCommand, onClose }) => {
  const suggestionsRef = useRef(null)

  const commands = [
    {
      command: '/hug',
      args: '<nickname>',
      description: 'send someone a warm hug',
      example: '/hug anon64',
      color: '#00ffff'
    },
    {
      command: '/msg',
      args: '<nickname> [message]',
      description: 'send private message',
      example: '/msg anon64 Hola, este es un mensaje privado',
      color: '#ff4444'
    },
    {
      command: '/slap',
      args: '<nickname>',
      description: 'slap someone with a trout',
      example: '/slap anon64',
      color: '#ff6b6b'
    },
    {
      command: '/w',
      args: '',
      description: "see who's online",
      example: '/w',
      color: '#00ff88'
    },
    {
      command: '/unfav',
      args: '<nickname>',
      description: 'remove from favorites',
      example: '/unfav anon64',
      color: '#ffd700'
    },
    {
      command: '/block',
      args: '[nickname]',
      description: 'block or list blocked peers',
      example: '/block anon64',
      color: '#ff4444'
    },
    {
      command: '/unblock',
      args: '<nickname>',
      description: 'unblock a peer',
      example: '/unblock anon64',
      color: '#00ff88'
    },
    {
      command: '/clear',
      args: '',
      description: 'clear chat messages',
      example: '/clear',
      color: '#ff9500'
    },
    {
      command: '/channels',
      args: '',
      description: 'show all discovered channels',
      example: '/channels',
      color: '#00ccff'
    },
    {
      command: '/join',
      args: '<channel>',
      description: 'join or create a channel',
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
      <div className="suggestions-header">
        <span className="suggestions-title">Comandos disponibles</span>
        <span className="suggestions-count">{filteredCommands.length}</span>
      </div>

      <div className="suggestions-list">
        {filteredCommands.map((cmd, index) => (
          <button
            key={index}
            className="suggestion-item"
            onClick={() => onSelectCommand(cmd.example)}
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
