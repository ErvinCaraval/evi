import { useState, useEffect } from 'react'
import './ChatScreen.css'
import ClearMessages from './ClearMessages'
import ContactActions from './ContactActions'
import FavoriteContact from './FavoriteContact'
import OnlineUsers from './OnlineUsers'
import BlockedContact from './BlockedContact'
import FloatingMenu from './FloatingMenu'
import HugAnimation from './HugAnimation'
import PrivateMessage from './PrivateMessage'
import QRIdentity from './QRIdentity'
import CommandSuggestions from './CommandSuggestions'
import SquareMenu from './SquareMenu'
import DotsMenu from './DotsMenu'
import { mockUsers, mockMessages, generateRandomReply } from '../utils/mockData'

const ChatScreen = ({ onOpenCommands, onOpenChannels, onOpenNetwork, showToast }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(mockMessages)
  const [contacts, setContacts] = useState(mockUsers)
  const [showClearMessages, setShowClearMessages] = useState(false)
  const [showContactActions, setShowContactActions] = useState(false)
  const [showFavoriteContact, setShowFavoriteContact] = useState(false)
  const [showOnlineUsers, setShowOnlineUsers] = useState(false)
  const [showBlockedContact, setShowBlockedContact] = useState(false)
  const [selectedContact, setSelectedContact] = useState('anon64')
  const [replyingTo, setReplyingTo] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [showFloatingMenu, setShowFloatingMenu] = useState(false)
  const [showHugAnimation, setShowHugAnimation] = useState(false)
  const [showPrivateMessage, setShowPrivateMessage] = useState(false)
  const [showQRIdentity, setShowQRIdentity] = useState(false)
  const [showCommandSuggestions, setShowCommandSuggestions] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [showSquareMenu, setShowSquareMenu] = useState(false)
  const [showDotsMenu, setShowDotsMenu] = useState(false)

  const handleSendMessage = () => {
    if (message.trim()) {
      const text = message.trim();
      if (text.toLowerCase() === '/status') {
        const statusMessage = {
          id: messages.length + 1,
          text: `[System] Conectado a 5 peers. Canales activos: #mesh, #general.`,
          time: new Date().toLocaleTimeString(),
          isSystem: true,
        };
        setMessages(prev => [...prev, statusMessage]);
        setMessage('');
        return;
      }

      const newMessage = {
        id: messages.length + 1,
        text: message.trim(),
        time: new Date().toLocaleTimeString(),
        sender: 'me',
        status: 'sending',
        replyTo: replyingTo
      }
      setMessages(prev => [...prev, newMessage])
      setMessage('')
      setReplyingTo(null)
      
      // Simulate message states
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
          )
        )
      }, 500)

      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
          )
        )
      }, 1000)

      // Simulate reply after a delay
      setTimeout(() => {
        const reply = {
          id: messages.length + 2,
          text: generateRandomReply(),
          time: new Date().toLocaleTimeString(),
          sender: selectedContact,
          status: 'sent'
        }
        setMessages(prev => [...prev, reply])

        // Mark previous message as read
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
          )
        )
      }, 2000)
    }
  }

  const handleAddAttachment = () => {
    setShowContactActions(true)
  }

  const handleClearMessages = () => {
    setShowClearMessages(false)
    setMessages([]);
    showToast('Mensajes eliminados correctamente', 'success');
  }

  const handleBlockContact = () => {
    setShowContactActions(false)
    setShowFavoriteContact(false)
    setShowOnlineUsers(false)
    setShowBlockedContact(true)
    showToast(`Se ha bloqueado a ${selectedContact}`, 'success');
  }

  const handleUnblockContact = () => {
    setShowBlockedContact(false)
    showToast(`Se ha desbloqueado a ${selectedContact}`, 'success');
  }

  const handleFavoriteContact = () => {
    showToast(`${selectedContact} añadido a favoritos`, 'success');
  }

  const handleCommandInput = (value) => {
    setMessage(value)
    if (value.startsWith('/')) {
      setShowCommandSuggestions(true)

      if (value.toLowerCase().startsWith('/hug')) {
        const parts = value.split(' ')
        if (parts.length > 1) {
          setTimeout(() => {
            setShowHugAnimation(true)
            setMessage('')
            setShowCommandSuggestions(false)
          }, 100)
        }
      } else if (value.toLowerCase().startsWith('/msg')) {
        const parts = value.split(' ')
        if (parts.length > 1) {
          setTimeout(() => {
            setShowPrivateMessage(true)
            setMessage('')
            setShowCommandSuggestions(false)
          }, 100)
        }
      }
    } else {
      setShowCommandSuggestions(false)
    }
  }

  const handleSelectCommand = (command) => {
    setMessage(command)
    setShowCommandSuggestions(false)
  }

  const handleSendPrivateMessage = (msg) => {
    const newMessage = {
      id: messages.length + 1,
      text: `[Privado] ${msg}`,
      time: new Date().toLocaleTimeString(),
      sender: 'me',
      status: 'sent',
      isPrivate: true
    }
    setMessages(prev => [...prev, newMessage])
    showToast('Mensaje privado enviado', 'success')
  }

return (
    <>
    <div className="chat-screen">
      <div className="chat-header">
        <div className="header-left">
          <h1 className="chat-title">bitchat</h1>
          <span className="user-name">/@anon9680</span>
        </div>

        <div className="header-right">
          <button className="header-btn" onClick={onOpenChannels}>
            <span className="mesh-label">#mesh</span>
          </button>
          <button className="header-btn" onClick={onOpenNetwork}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
                    fill="var(--text-secondary)"/>
            </svg>
            <span className="peer-count">0</span>
          </button>
          <button className="header-btn" onClick={() => setShowQRIdentity(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="var(--text-secondary)" strokeWidth="2" fill="none"/>
              <rect x="14" y="3" width="7" height="7" stroke="var(--text-secondary)" strokeWidth="2" fill="none"/>
              <rect x="3" y="14" width="7" height="7" stroke="var(--text-secondary)" strokeWidth="2" fill="none"/>
              <rect x="14" y="14" width="3" height="3" fill="var(--text-secondary)"/>
              <rect x="18" y="14" width="3" height="3" fill="var(--text-secondary)"/>
              <rect x="14" y="18" width="3" height="3" fill="var(--text-secondary)"/>
            </svg>
          </button>
          <button className="header-btn menu-dots-btn" onClick={() => setShowFloatingMenu(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="6" r="2" fill="var(--text-secondary)"/>
              <circle cx="12" cy="12" r="2" fill="var(--text-secondary)"/>
              <circle cx="12" cy="18" r="2" fill="var(--text-secondary)"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.isSystem ? 'system-message' : ''}`}>
            <span className="message-text">{msg.text}</span>
            <span className="message-time">[{msg.time}]</span>
          </div>
        ))}
      </div>


      <div className="chat-input-container">
        {showCommandSuggestions && (
          <CommandSuggestions
            input={message}
            onSelectCommand={handleSelectCommand}
            onClose={() => setShowCommandSuggestions(false)}
          />
        )}
        <div className={`input-wrapper ${isInputFocused || message ? 'focused' : ''}`}>
          <button className="attach-btn" onClick={handleAddAttachment}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>

          <input
            type="text"
            className="message-input"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => handleCommandInput(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                if (!showCommandSuggestions) {
                  handleSendMessage()
                }
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Tab' && showCommandSuggestions) {
                e.preventDefault()
              }
            }}
          />

          <button className="send-btn" onClick={handleSendMessage}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="var(--accent-primary)"/>
            </svg>
          </button>
        </div>

        <div className="input-hint">
          type a message...
        </div>
      </div>
    </div>

    {showClearMessages && (
      <ClearMessages
        onConfirm={handleClearMessages}
        onCancel={() => setShowClearMessages(false)}
        showToast={showToast}
      />
    )}

    {showContactActions && (
      <ContactActions
        contactName={selectedContact}
        onBlock={handleBlockContact}
        onClose={() => setShowContactActions(false)}
        showToast={showToast}
        onViewOnline={() => {
          setShowContactActions(false)
          setShowOnlineUsers(true)
        }}
        onFavorite={() => {
          setShowContactActions(false)
          setShowFavoriteContact(true)
        }}
        onClearMessages={() => {
          setShowContactActions(false)
          setShowClearMessages(true)
        }}
      />
    )}

    {showFavoriteContact && (
      <FavoriteContact
        contactName={selectedContact}
        onAdd={() => console.log('Added')}
        onFavorite={handleFavoriteContact}
        onBlock={handleBlockContact}
        onClose={() => setShowFavoriteContact(false)}
        showToast={showToast}
      />
    )}

    {showOnlineUsers && (
      <OnlineUsers
        onUserSelect={(user) => setSelectedContact(user)}
        onFavorite={handleFavoriteContact}
        onBlock={handleBlockContact}
        onClose={() => setShowOnlineUsers(false)}
        showToast={showToast}
      />
    )}

    {showBlockedContact && (
      <BlockedContact
        contactName={selectedContact}
        onUnblock={handleUnblockContact}
        onClose={() => setShowBlockedContact(false)}
        showToast={showToast}
      />
    )}

    {showFloatingMenu && (
      <FloatingMenu
        contactName={selectedContact}
        onClose={() => setShowFloatingMenu(false)}
        onRemove={() => {
          showToast('Usuario quitado', 'success')
          setShowFloatingMenu(false)
        }}
        onViewOnline={() => {
          setShowFloatingMenu(false)
          setShowOnlineUsers(true)
        }}
        onFavorite={() => {
          handleFavoriteContact()
          setShowFloatingMenu(false)
        }}
        onBlock={() => {
          handleBlockContact()
          setShowFloatingMenu(false)
        }}
        onSquareMenu={() => {
          setShowFloatingMenu(false)
          setShowSquareMenu(true)
        }}
        onDotsMenu={() => {
          setShowFloatingMenu(false)
          setShowDotsMenu(true)
        }}
      />
    )}

    {showHugAnimation && (
      <HugAnimation
        contactName={selectedContact}
        onClose={() => setShowHugAnimation(false)}
      />
    )}

    {showPrivateMessage && (
      <PrivateMessage
        contactName={selectedContact}
        onClose={() => setShowPrivateMessage(false)}
        onSend={handleSendPrivateMessage}
      />
    )}

    {showQRIdentity && (
      <QRIdentity onClose={() => setShowQRIdentity(false)} />
    )}

    {showSquareMenu && (
      <SquareMenu onClose={() => setShowSquareMenu(false)} showToast={showToast} />
    )}

    {showDotsMenu && (
      <DotsMenu onClose={() => setShowDotsMenu(false)} showToast={showToast} />
    )}
    </>
  )
}

export default ChatScreen
