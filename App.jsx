import { useState, useEffect, useRef } from 'react'
import { searchByMood, searchSongs, getTrending, checkHealth, formatDuration } from './services/saavn'
import { useMusicPlayer } from './hooks/useMusicPlayer'

/* ───────── Launch Screen ───────── */
function LaunchScreen({ onEnter }) {
  const [show, setShow] = useState(false)
  const [showTag, setShowTag] = useState(false)
  const [showBtn, setShowBtn] = useState(false)

  useEffect(() => {
    setTimeout(() => setShow(true), 300)
    setTimeout(() => setShowTag(true), 2500)
    setTimeout(() => setShowBtn(true), 4000)
  }, [])

  return (
    <div style={{
      background: '#000', width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', overflow: 'hidden', position: 'relative',
      color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #ff0080, transparent)', filter: 'blur(100px)', opacity: 0.2, top: '-10%', left: '-10%' }} />
      <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, #40e0d0, transparent)', filter: 'blur(100px)', opacity: 0.2, bottom: '-10%', right: '-10%' }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, #7c3aed, transparent)', filter: 'blur(80px)', opacity: 0.15, top: '35%', left: '55%' }} />

      <div style={{
        position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column',
        alignItems: 'center', opacity: show ? 1 : 0,
        transform: show ? 'scale(1) translateY(0)' : 'scale(0.6) translateY(40px)',
        transition: 'all 1s ease',
      }}>
        <div style={{
          position: 'absolute', width: 240, height: 240, borderRadius: '50%',
          border: '2px solid transparent', borderTopColor: '#feda75',
          borderRightColor: '#fa7e1e', borderBottomColor: '#d62976',
          borderLeftColor: '#962fbf', top: '20%', left: '50%',
          transform: 'translate(-50%, -50%)', animation: 'spin 3s linear infinite',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: '3.5rem', color: '#fff', filter: 'drop-shadow(0 0 20px rgba(255,0,128,0.6))' }}>♫</span>
          <h1 style={{
            fontSize: '4.5rem', fontWeight: 900, letterSpacing: '-2px', margin: 0,
            background: 'linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0, #7c3aed)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>MUSIX7</h1>
        </div>

        <p style={{
          marginTop: 24, fontSize: '1.2rem', fontWeight: 300, color: '#d4d4d8',
          textTransform: 'uppercase', letterSpacing: '0.4em',
          opacity: showTag ? 1 : 0, transform: showTag ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 0.8s ease',
        }}>Where Sound Meets Soul</p>

        <p style={{
          marginTop: 6, fontSize: '0.85rem', color: '#c1c1d1ff',
          letterSpacing: '0.1em', opacity: showTag ? 1 : 0, transition: 'opacity 1s ease',
        }}>Your mood. Your music. Your world.</p>

        <button
          onClick={onEnter}
          style={{
            marginTop: 40, padding: '14px 40px', borderRadius: 999, border: 'none',
            cursor: 'pointer', background: 'linear-gradient(135deg, #ff0080, #7c3aed)',
            color: '#fff', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.06em',
            opacity: showBtn ? 1 : 0,
            transform: showBtn ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
            transition: 'all 0.6s ease', fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(255,0,128,0.5)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
        >Launch Player ▶</button>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

/* ───────── Song Card ───────── */
function SongCard({ song, index, isActive, isPlaying, onPlay }) {
  return (
    <div
      onClick={onPlay}
      style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px',
        borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s ease',
        background: isActive ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
        border: isActive ? '1px solid rgba(124, 58, 237, 0.3)' : '1px solid transparent',
      }}
      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#18181b'; }}
      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
    >
      <div style={{ position: 'relative', width: 48, height: 48, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
        {song.image ? (
          <img src={song.image} alt={song.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#27272a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🎵</div>
        )}
        {isActive && isPlaying && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 18 }}>🔊</span>
          </div>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0, fontSize: 14, fontWeight: 600, color: isActive ? '#c084fc' : '#fff',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{song.name}</p>
        <p style={{
          margin: '2px 0 0 0', fontSize: 12, color: '#a1a1aa',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{song.artists}</p>
      </div>

      <span style={{ fontSize: 12, color: '#71717a', flexShrink: 0 }}>
        {formatDuration(song.duration)}
      </span>
    </div>
  )
}

/* ───────── Player Bar ───────── */
function PlayerBar({ player }) {
  const {
    currentSong, isPlaying, isLoading, loadError, progress, currentTime, duration,
    volume, shuffle, repeat,
    togglePlay, playNext, playPrev, seekTo, setVolume, setShuffle, setRepeat,
  } = player

  const progressRef = useRef(null)

  const handleProgressClick = (e) => {
    if (!progressRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const pct = ((e.clientX - rect.left) / rect.width) * 100
    seekTo(Math.max(0, Math.min(100, pct)))
  }

  if (!currentSong) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, width: '100%',
      background: '#0a0a0a', borderTop: '1px solid #1e1e1e',
      zIndex: 100,
    }}>
      {loadError && (
        <div style={{
          background: 'rgba(239,68,68,0.15)', color: '#fca5a5', padding: '6px 20px',
          fontSize: 12, textAlign: 'center', borderBottom: '1px solid rgba(239,68,68,0.2)',
        }}>
          {loadError}
        </div>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px', boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
          <div style={{ width: 52, height: 52, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
            {currentSong.image ? (
              <img src={currentSong.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#27272a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎵</div>
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentSong.name}</h3>
            <p style={{ margin: 0, fontSize: 12, color: '#a1a1aa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentSong.artists}</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 20 }}>
            <span onClick={() => setShuffle(!shuffle)} style={{ cursor: 'pointer', color: shuffle ? '#c084fc' : '#71717a', fontSize: 16, transition: 'color 0.2s' }}>🔀</span>
            <span onClick={playPrev} style={{ cursor: 'pointer' }}>⏮</span>
            <button
              onClick={togglePlay}
              style={{
                width: 44, height: 44, borderRadius: '50%', background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, cursor: 'pointer', color: '#000',
                border: 'none', outline: 'none', padding: 0,
              }}
            >{isLoading ? (
              <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
            ) : isPlaying ? '⏸' : '▶'}</button>
            <span onClick={playNext} style={{ cursor: 'pointer' }}>⏭</span>
            <span onClick={() => setRepeat(!repeat)} style={{ cursor: 'pointer', color: repeat ? '#c084fc' : '#71717a', fontSize: 16, transition: 'color 0.2s' }}>🔁</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', maxWidth: 400 }}>
            <span style={{ fontSize: 10, color: '#71717a', width: 32, textAlign: 'right' }}>{formatDuration(Math.floor(currentTime))}</span>
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              style={{ flex: 1, height: 4, background: '#27272a', borderRadius: 2, cursor: 'pointer', position: 'relative' }}
            >
              <div style={{
                width: `${Math.min(progress, 100)}%`, height: '100%', borderRadius: 2,
                background: 'linear-gradient(90deg, #ff0080, #7c3aed)', transition: 'width 0.1s linear',
              }} />
            </div>
            <span style={{ fontSize: 10, color: '#71717a', width: 32 }}>{formatDuration(Math.floor(duration))}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 14, color: '#71717a' }}>🔊</span>
          <input
            type="range" min="0" max="1" step="0.01" value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{ width: 80, accentColor: '#c084fc' }}
          />
        </div>
      </div>
    </div>
  )
}

/* ───────── Connection Banner ───────── */
function ConnectionBanner({ connected, onRetry }) {
  if (connected) return null
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: 'linear-gradient(90deg, #ef4444, #f97316)',
      color: '#fff', padding: '10px 20px', display: 'flex',
      alignItems: 'center', justifyContent: 'center', gap: 12,
      fontSize: 14, fontWeight: 600,
    }}>
      <span>⚠️ Backend not connected — songs won't load</span>
      <button onClick={onRetry} style={{
        background: '#fff', color: '#ef4444', border: 'none', borderRadius: 6,
        padding: '4px 14px', cursor: 'pointer', fontWeight: 700, fontSize: 13,
      }}>Retry</button>
    </div>
  )
}

/* ───────── Dashboard ───────── */
function Dashboard() {
  const hour = new Date().getHours()
  let greeting = 'Good Evening'
  if (hour < 12) greeting = 'Good Morning'
  else if (hour < 18) greeting = 'Good Afternoon'

  // View: 'home' | 'mood' | 'library' | 'search'
  const [view, setView] = useState('home')
  const [selectedMood, setSelectedMood] = useState('')
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [connected, setConnected] = useState(true)
  const [trending, setTrending] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [librarySongs, setLibrarySongs] = useState([])

  const player = useMusicPlayer()

  const moods = [
    { emoji: '💔', title: 'Heartbreak', desc: 'Emotional late-night tracks', color: '#ef4444' },
    { emoji: '🌿', title: 'Calm', desc: 'Relax and breathe', color: '#22c55e' },
    { emoji: '✨', title: 'Vibe', desc: 'Feel the rhythm of your mood', color: '#eab308' },
    { emoji: '⚡', title: 'Energetic', desc: 'Boost your energy', color: '#f97316' },
  ]

  const checkConnection = async () => {
    const ok = await checkHealth()
    setConnected(ok)
    return ok
  }

  useEffect(() => {
    checkConnection()
    getTrending().then(setTrending).catch(() => {})
    const interval = setInterval(checkConnection, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood.title)
    setView('mood')
    setLoading(true)
    setError('')
    setSongs([])
    try {
      const ok = await checkConnection()
      if (!ok) {
        setError('Backend server not running. Start the server and click Retry.')
        setLoading(false)
        return
      }
      const results = await searchByMood(mood.title)
      if (results.length === 0) setError('No songs found for this mood. Try another.')
      setSongs(results)
    } catch (err) {
      setError('Failed to fetch songs. Make sure the backend server is running on port 3001.')
    }
    setLoading(false)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    setSearching(true)
    setError('')
    setSearchResults([])
    try {
      const ok = await checkConnection()
      if (!ok) {
        setError('Backend server not running.')
        setSearching(false)
        return
      }
      const results = await searchSongs(searchQuery.trim())
      setSearchResults(results)
      if (results.length === 0) setError('No songs found. Try a different search.')
    } catch (err) {
      setError('Search failed. Check your connection.')
    }
    setSearching(false)
  }

  const handlePlaySong = (songList, index) => {
    player.playSongs(songList, index)
    // Add to library on play
    const song = songList[index]
    setLibrarySongs(prev => {
      if (prev.find(s => s.id === song.id)) return prev
      return [song, ...prev].slice(0, 50) // keep last 50
    })
  }

  const handleClearLibrary = () => setLibrarySongs([])

  return (
    <div style={{
      background: '#000', color: '#fff', width: '100vw', height: '100vh',
      display: 'flex', overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative',
    }}>
      <ConnectionBanner connected={connected} onRetry={checkConnection} />

      {/* ═══ TOP NAVBAR ═══ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 60,
        background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #1e1e1e', zIndex: 50,
        display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20,
      }}>
        {/* Logo */}
        <div style={{
          fontSize: 22, fontWeight: 900, letterSpacing: '-1px',
          background: 'linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0, #7c3aed)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          flexShrink: 0, cursor: 'pointer',
        }} onClick={() => { setView('home'); setSelectedMood(''); }}>
          ♫ MUSIX7
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          {[
            { key: 'home', label: '🏠  Home' },
            { key: 'mood', label: '🎭  Mood' },
            { key: 'library', label: '📚  Library' },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => { setView(item.key); if (item.key !== 'mood') setSelectedMood(''); }}
              style={{
                background: view === item.key ? 'rgba(124,58,237,0.2)' : 'transparent',
                border: 'none', color: view === item.key ? '#c084fc' : '#a1a1aa',
                padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
                fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => { if (view !== item.key) e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { if (view !== item.key) e.currentTarget.style.color = '#a1a1aa'; }}
            >{item.label}</button>
          ))}
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} style={{
          flex: 1, maxWidth: 420, display: 'flex', alignItems: 'center',
          background: '#18181b', borderRadius: 999, padding: '0 16px',
          border: '1px solid #27272a', transition: 'border-color 0.2s',
        }}>
          <span style={{ color: '#71717a', fontSize: 16, marginRight: 8 }}>🔍</span>
          <input
            type="text"
            placeholder="Search Tamil songs, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(e) => e.currentTarget.parentElement.style.borderColor = '#7c3aed'}
            onBlur={(e) => e.currentTarget.parentElement.style.borderColor = '#27272a'}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#fff', fontSize: 14, padding: '10px 0', fontFamily: 'inherit',
            }}
          />
          {searchQuery && (
            <button type="button" onClick={() => { setSearchQuery(''); setSearchResults([]); }}
              style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', fontSize: 16, padding: '0 4px' }}>✕</button>
          )}
          <button type="submit" style={{
            background: 'linear-gradient(135deg, #ff0080, #7c3aed)',
            border: 'none', borderRadius: 999, padding: '6px 16px',
            color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', flexShrink: 0,
          }}>Search</button>
        </form>

        {/* Mood Selector Dropdown */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={() => {
              const next = view === 'mood' && !selectedMood ? 'home' : 'mood'
              setView(next)
              if (next === 'mood') setSelectedMood('')
            }}
            style={{
              background: view === 'mood' ? 'rgba(124,58,237,0.2)' : 'transparent',
              border: '1px solid #27272a', color: view === 'mood' ? '#c084fc' : '#a1a1aa',
              padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
              fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            🎭 Mood <span style={{ fontSize: 10 }}>▼</span>
          </button>
        </div>
      </nav>

      {/* ═══ MAIN CONTENT ═══ */}
      <main style={{
        flex: 1, padding: '80px 32px 100px 32px', overflowY: 'auto',
        boxSizing: 'border-box',
      }}>

        {/* ── HOME VIEW ── */}
        {view === 'home' && (
          <>
            <h1 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 4px 0' }}>{greeting} 🌙</h1>
            <p style={{ fontSize: 16, color: '#a1a1aa', margin: '0 0 28px 0' }}>What's your vibe today?</p>

            {/* Mood Cards */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 36,
            }}>
              {moods.map((mood) => (
                <div
                  key={mood.title}
                  onClick={() => handleMoodSelect(mood)}
                  style={{
                    background: '#18181b', borderRadius: 14, padding: '24px 20px',
                    cursor: 'pointer', transition: 'all 0.3s ease',
                    border: '1px solid #27272a',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = mood.color
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = `0 8px 30px ${mood.color}33`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#27272a'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <h3 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 6px 0' }}>{mood.emoji} {mood.title}</h3>
                  <p style={{ fontSize: 13, color: '#a1a1aa', margin: 0 }}>{mood.desc}</p>
                </div>
              ))}
            </div>

            {/* Trending */}
            {trending.length > 0 && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 14px 0' }}>🔥 Trending Tamil</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {trending.slice(0, 10).map((song, i) => (
                    <SongCard key={song.id || i} song={song} index={i}
                      isActive={player.currentSong?.id === song.id} isPlaying={player.isPlaying}
                      onPlay={() => handlePlaySong(trending, i)} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── MOOD VIEW ── */}
        {view === 'mood' && (
          <>
            {!selectedMood ? (
              <>
                <h1 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 8px 0' }}>🎭 Select Your Mood</h1>
                <p style={{ fontSize: 16, color: '#a1a1aa', margin: '0 0 28px 0' }}>Pick a vibe and we'll curate Tamil songs for you</p>
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16,
                }}>
                  {moods.map((mood) => (
                    <div
                      key={mood.title}
                      onClick={() => handleMoodSelect(mood)}
                      style={{
                        background: `linear-gradient(135deg, ${mood.color}15, ${mood.color}08)`,
                        borderRadius: 16, padding: '32px 24px', cursor: 'pointer',
                        transition: 'all 0.3s ease', border: `1px solid ${mood.color}33`,
                        textAlign: 'center',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'
                        e.currentTarget.style.boxShadow = `0 12px 40px ${mood.color}44`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <div style={{ fontSize: 48, marginBottom: 12 }}>{mood.emoji}</div>
                      <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 6px 0' }}>{mood.title}</h3>
                      <p style={{ fontSize: 13, color: '#a1a1aa', margin: 0 }}>{mood.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <button onClick={() => { setSelectedMood(''); setSongs([]); }}
                    style={{
                      background: '#18181b', border: '1px solid #27272a', color: '#a1a1aa',
                      borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 14,
                      fontFamily: 'inherit',
                    }}>← Back</button>
                  <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
                    {moods.find(m => m.title === selectedMood)?.emoji} {selectedMood} Playlist
                  </h2>
                </div>

                {loading && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 0' }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%', border: '3px solid #27272a',
                      borderTopColor: '#c084fc', animation: 'spin 0.8s linear infinite',
                    }} />
                    <span style={{ color: '#a1a1aa' }}>Loading Tamil songs...</span>
                  </div>
                )}

                {error && (
                  <div style={{
                    color: '#ef4444', padding: '16px 20px', background: 'rgba(239,68,68,0.1)',
                    borderRadius: 10, border: '1px solid rgba(239,68,68,0.2)', marginBottom: 16,
                  }}>
                    <p style={{ margin: '0 0 8px 0', fontWeight: 600 }}>{error}</p>
                    <p style={{ margin: 0, fontSize: 13, color: '#fca5a5' }}>
                      Make sure the backend server is running on port 3001.
                    </p>
                  </div>
                )}

                {!loading && !error && songs.length === 0 && (
                  <p style={{ color: '#a1a1aa' }}>No songs found. Try another mood.</p>
                )}

                {!loading && songs.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {songs.map((song, i) => (
                      <SongCard key={song.id || i} song={song} index={i}
                        isActive={player.currentSong?.id === song.id} isPlaying={player.isPlaying}
                        onPlay={() => handlePlaySong(songs, i)} />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* ── LIBRARY VIEW ── */}
        {view === 'library' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h1 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 4px 0' }}>📚 Your Library</h1>
                <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0 }}>
                  {librarySongs.length} song{librarySongs.length !== 1 ? 's' : ''} played recently
                </p>
              </div>
              {librarySongs.length > 0 && (
                <button onClick={handleClearLibrary} style={{
                  background: 'transparent', border: '1px solid #27272a', color: '#71717a',
                  borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13,
                  fontFamily: 'inherit',
                }}>Clear All</button>
              )}
            </div>

            {librarySongs.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '60px 20px', color: '#71717a',
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎵</div>
                <p style={{ fontSize: 18, fontWeight: 600, color: '#a1a1aa', margin: '0 0 8px 0' }}>Your library is empty</p>
                <p style={{ fontSize: 14, margin: 0 }}>Songs you play will appear here</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {librarySongs.map((song, i) => (
                  <SongCard key={song.id || i} song={song} index={i}
                    isActive={player.currentSong?.id === song.id} isPlaying={player.isPlaying}
                    onPlay={() => handlePlaySong(librarySongs, i)} />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── SEARCH RESULTS ── */}
        {(view === 'search' || searchResults.length > 0) && searchResults.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
                🔍 Results for "{searchQuery}"
              </h2>
              <span style={{ color: '#71717a', fontSize: 14 }}>({searchResults.length} songs)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {searchResults.map((song, i) => (
                <SongCard key={song.id || i} song={song} index={i}
                  isActive={player.currentSong?.id === song.id} isPlaying={player.isPlaying}
                  onPlay={() => handlePlaySong(searchResults, i)} />
              ))}
            </div>
          </>
        )}

        {/* Search loading */}
        {searching && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 0' }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', border: '3px solid #27272a',
              borderTopColor: '#c084fc', animation: 'spin 0.8s linear infinite',
            }} />
            <span style={{ color: '#a1a1aa' }}>Searching...</span>
          </div>
        )}

        {/* Search error */}
        {error && !loading && !searching && (
          <div style={{
            color: '#ef4444', padding: '16px 20px', background: 'rgba(239,68,68,0.1)',
            borderRadius: 10, border: '1px solid rgba(239,68,68,0.2)', marginBottom: 16,
          }}>
            {error}
          </div>
        )}

      </main>

      <PlayerBar player={player} />

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        input::placeholder { color: #52525b; }
      `}</style>
    </div>
  )
}

/* ───────── App ───────── */
function App() {
  const [screen, setScreen] = useState('launch')
  if (screen === 'launch') return <LaunchScreen onEnter={() => setScreen('dashboard')} />
  return <Dashboard />
}

export default App
