import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: CyberMatrix,
})

function CyberMatrix() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [glitchActive, setGlitchActive] = useState(false)
  const [matrixCode, setMatrixCode] = useState('')
  const [hackingProgress, setHackingProgress] = useState(0)
  const [systemStatus, setSystemStatus] = useState('ONLINE')
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [networkActivity, setNetworkActivity] = useState(0)

  const generateMatrixCode = useCallback(() => {
    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾲﾝ01234567890ABCDEF'
    let result = ''
    for (let i = 0; i < 50; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
      if (i % 10 === 9) result += '\n'
    }
    return result
  }, [])

  const hackingMessages = [
    'ACCESSING MAINFRAME...',
    'BYPASSING FIREWALL...',
    'DECRYPTING DATA STREAM...',
    'NEURAL LINK ESTABLISHED...',
    'QUANTUM ENCRYPTION CRACKED...',
    'SYSTEM BREACH DETECTED...',
    'UPLOADING VIRUS PAYLOAD...',
    'GHOST IN THE SHELL ACTIVATED...'
  ]

  const addTerminalLine = useCallback((message: string) => {
    setTerminalLines(prev => {
      const newLines = [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]
      return newLines.slice(-8)
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setMatrixCode(generateMatrixCode())
      setNetworkActivity(Math.floor(Math.random() * 100))
      
      if (Math.random() < 0.1) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [generateMatrixCode])

  useEffect(() => {
    const hackingTimer = setInterval(() => {
      setHackingProgress(prev => {
        const newProgress = (prev + Math.random() * 15) % 100
        if (newProgress < prev) {
          addTerminalLine(hackingMessages[Math.floor(Math.random() * hackingMessages.length)])
          setSystemStatus(Math.random() > 0.7 ? 'COMPROMISED' : 'SECURE')
        }
        return newProgress
      })
    }, 800)

    return () => clearInterval(hackingTimer)
  }, [addTerminalLine])

  useEffect(() => {
    addTerminalLine('SYSTEM INITIALIZATION COMPLETE')
    addTerminalLine('CYBER MAINFRAME ONLINE')
    addTerminalLine('NEURAL INTERFACE CONNECTED')
  }, [])

  const timeString = currentTime.toLocaleTimeString()
  const dateString = currentTime.toLocaleDateString()

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 text-xs leading-3 whitespace-pre-wrap animate-pulse select-none pointer-events-none">
        {matrixCode}
      </div>
      
      {/* Enhanced Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-pulse"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-full h-px bg-green-400/20 animate-pulse"
            style={{ top: `${i * 5}%`, animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
        {/* Dynamic scanning line */}
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-[scanline_4s_linear_infinite]"></div>
        
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-green-400/50 animate-pulse"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50 animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-red-400/50 animate-pulse"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-orange-400/50 animate-pulse"></div>
      </div>

      <div className={`relative z-10 p-8 ${glitchActive ? 'animate-pulse text-red-400' : ''}`}>
        <div className="border border-green-400/50 bg-black/80 p-4 mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-green-300">★ STATUS:</span>
              <span className={`ml-2 font-bold ${systemStatus === 'ONLINE' ? 'text-green-400' : systemStatus === 'SECURE' ? 'text-blue-400' : 'text-red-400'}`}>
                {systemStatus}
              </span>
            </div>
            <div>
              <span className="text-green-300">◆ NETWORK:</span>
              <span className="ml-2 text-cyan-400">{networkActivity}% ACTIVE</span>
            </div>
            <div>
              <span className="text-green-300">▲ UPTIME:</span>
              <span className="ml-2 text-green-400">{timeString}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img
              src={logo}
              className={`h-32 w-32 mx-auto mb-6 filter hue-rotate-90 brightness-150 contrast-150 cyber-text 
                ${glitchActive ? 'animate-spin animate-[glitchText_0.3s_ease-in-out]' : 'animate-[spin_30s_linear_infinite]'}
                drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]`}
              alt="Cyber Neural Network Logo"
            />
            <div className="absolute -inset-4 border border-green-400/30 animate-pulse"></div>
            <div className="absolute -inset-8 border border-cyan-400/20 animate-[ping_3s_ease-in-out_infinite]"></div>
          </div>
          
          <div className="text-4xl font-bold mb-4 tracking-wider">
            <span className={`text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 animate-pulse cyber-text ${glitchActive ? 'animate-[glitchText_0.5s_ease-in-out]' : ''}`}>
              CYBER.MATRIX.2077
            </span>
          </div>
          
          <div className="text-xl mb-6">
            <span className="text-cyan-400">NEURAL INTERFACE PROTOCOL</span>
          </div>
        </div>

        <div className="border border-cyan-400/50 bg-black/60 p-6 mb-6 text-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <div className="text-sm text-cyan-300 mb-2 cyber-text">SYSTEM CHRONOMETER</div>
          <div className="text-3xl font-bold text-cyan-400 tracking-wider">{timeString}</div>
          <div className="text-sm text-cyan-300 mt-2">{dateString}</div>
        </div>

        <div className="border border-red-400/50 bg-black/60 p-4 mb-6 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
          <div className="text-sm text-red-300 mb-2 cyber-text animate-pulse">⚠ INTRUSION PROGRESS ⚠</div>
          <div className="w-full bg-black border border-red-400/50 h-4 relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600 transition-all duration-500 animate-pulse"
              style={{ width: `${hackingProgress}%` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]"></div>
          </div>
          <div className="text-red-400 text-sm mt-2">{hackingProgress.toFixed(1)}% COMPLETE</div>
        </div>

        <div className="border border-green-400/50 bg-black/80 p-4 mb-6 h-48 overflow-y-auto shadow-[0_0_15px_rgba(34,197,94,0.3)]">
          <div className="text-sm text-green-300 mb-2 cyber-text">◉ SYSTEM LOG [LIVE FEED] ◉</div>
          <div className="space-y-1">
            {terminalLines.map((line, index) => (
              <div key={index} className="text-green-400 text-xs opacity-80 animate-[fadeIn_0.5s_ease-in]">
                <span className="text-green-300">&gt;</span> {line}
              </div>
            ))}
            <div className="text-green-400 animate-pulse">
              <span className="text-green-300">&gt;</span> <span className="animate-[blink_1s_ease-in-out_infinite]">█</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <a
            className="block text-center p-4 border border-green-400/50 bg-black/60 hover:bg-green-400/10 
              transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-105 
              hover:border-green-400 text-green-400 hover:text-green-300 group transform"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-sm text-green-300 group-hover:text-green-200">ACCESS NODE</div>
            <div className="font-bold">REACT.CORE</div>
          </a>
          <a
            className="block text-center p-4 border border-cyan-400/50 bg-black/60 hover:bg-cyan-400/10 
              transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105 
              hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 group transform"
            href="https://tanstack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-sm text-cyan-300 group-hover:text-cyan-200">CONNECT TO</div>
            <div className="font-bold">TANSTACK.NET</div>
          </a>
        </div>

        <div className="mt-8 text-center text-xs text-green-300/60">
          <div className="cyber-text animate-pulse">⬡ CYBERPUNK ENHANCED • NEURAL LINK STABLE • QUANTUM ENCRYPTION ACTIVE ⬡</div>
          <div className="mt-1 text-red-400/80 animate-pulse">⚠ WARNING: UNAUTHORIZED ACCESS WILL BE TERMINATED ⚠</div>
        </div>
      </div>

      {glitchActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-cyan-500/20 animate-pulse pointer-events-none z-20"></div>
      )}
    </div>
  )
}
