import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [glitchText, setGlitchText] = useState('NEURAL_LINK_ESTABLISHED')
  const [matrixChars, setMatrixChars] = useState<string[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const glitchTimer = setInterval(() => {
      const messages = [
        'NEURAL_LINK_ESTABLISHED',
        'ACCESSING_MAINFRAME...',
        'DECRYPTING_DATA_STREAM',
        'BREACH_PROTOCOL_ACTIVE',
        'SYSTEM_COMPROMISED',
        'GHOST_IN_THE_SHELL'
      ]
      setGlitchText(messages[Math.floor(Math.random() * messages.length)])
    }, 3000)

    const matrix = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01'
    const matrixTimer = setInterval(() => {
      setMatrixChars(prev => {
        const newChars = [...prev]
        for (let i = 0; i < 5; i++) {
          newChars.push(matrix[Math.floor(Math.random() * matrix.length)])
        }
        return newChars.slice(-50)
      })
    }, 150)

    return () => {
      clearInterval(timer)
      clearInterval(glitchTimer)
      clearInterval(matrixTimer)
    }
  }, [])

  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour12: false,
    timeZone: 'UTC'
  })
  const dateString = currentTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-cyan-900/20" />
      
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {matrixChars.map((char, index) => (
          <span
            key={index}
            className="absolute text-green-400 font-mono text-sm animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="mb-8 relative">
          <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse tracking-wider">
            CYBERSPACE
          </div>
          <div className="absolute inset-0 text-6xl md:text-8xl font-black text-cyan-400 opacity-20 blur-sm animate-pulse" style={{animationDelay: '0.5s'}}>
            CYBERSPACE
          </div>
        </div>

        <div className="mb-8 p-6 bg-black/60 backdrop-blur-sm border border-cyan-400/50 rounded-lg shadow-lg shadow-cyan-400/20 font-mono">
          <div className="text-xs text-cyan-300 mb-2 tracking-widest">
            TEMPORAL_SYNC_UTC
          </div>
          <div className="text-3xl md:text-4xl text-green-400 font-bold mb-2 tracking-wider">
            {timeString}
          </div>
          <div className="text-sm text-purple-300 tracking-wider">
            {dateString}
          </div>
        </div>

        <div className="mb-8 p-4 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 backdrop-blur-sm border border-pink-400/50 rounded-lg shadow-lg shadow-pink-400/20">
          <div className="text-sm text-pink-300 font-mono tracking-wider animate-pulse">
            STATUS: {glitchText}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div className="group p-6 bg-black/40 backdrop-blur-sm border border-green-400/50 rounded-lg hover:border-green-400 transition-all duration-300 cursor-pointer transform hover:scale-105">
            <div className="text-green-400 font-mono text-xl mb-2 group-hover:animate-pulse">
              &gt; NEURAL_INTERFACE
            </div>
            <div className="text-gray-300 text-sm font-mono">
              REACT QUANTUM CORE
            </div>
          </div>

          <div className="group p-6 bg-black/40 backdrop-blur-sm border border-cyan-400/50 rounded-lg hover:border-cyan-400 transition-all duration-300 cursor-pointer transform hover:scale-105">
            <div className="text-cyan-400 font-mono text-xl mb-2 group-hover:animate-pulse">
              &gt; DATA_ROUTER
            </div>
            <div className="text-gray-300 text-sm font-mono">
              TANSTACK PROTOCOL
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="text-lg text-gray-400 font-mono mb-4">
            WELCOME TO THE GRID, PROGRAM
          </div>
          <div className="text-xs text-gray-600 font-mono tracking-widest">
            INITIATED • SYNCHRONIZED • OPERATIONAL
          </div>
        </div>
      </div>
    </div>
  )
}
