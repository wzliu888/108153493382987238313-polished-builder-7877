import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [glitchText, setGlitchText] = useState('CYBER_NEXUS')
  const [matrixCode, setMatrixCode] = useState<string[]>([])
  const [terminalLines, setTerminalLines] = useState<string[]>(['> INITIALIZING CYBER MATRIX...'])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)


    const glitchTimer = setInterval(() => {
      const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      const baseText = 'CYBER_NEXUS'
      const shouldGlitch = Math.random() < 0.1
      
      if (shouldGlitch) {
        const glitched = baseText.split('').map(char => 
          Math.random() < 0.3 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join('')
        setGlitchText(glitched)
        setTimeout(() => setGlitchText(baseText), 100)
      }
    }, 150)

    const matrixTimer = setInterval(() => {
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
      const newCode = Array.from({ length: 20 }, () => 
        Array.from({ length: Math.floor(Math.random() * 15) + 5 }, () => 
          chars[Math.floor(Math.random() * chars.length)]
        ).join('')
      )
      setMatrixCode(newCode)
    }, 100)

    const terminalTimer = setInterval(() => {
      const commands = [
        '> ACCESSING NEURAL NETWORK...',
        '> QUANTUM ENCRYPTION ACTIVE',
        '> FIREWALL STATUS: BREACHED',
        '> DATA STREAM ESTABLISHED',
        '> BIOMETRIC SCAN COMPLETE',
        '> ANOMALY DETECTED IN SECTOR 7',
        '> REROUTING THROUGH PROXY NODE'
      ]
      
      setTerminalLines(prev => {
        const newLine = commands[Math.floor(Math.random() * commands.length)]
        return [...prev.slice(-4), newLine]
      })
    }, 2000)

    return () => {
      clearInterval(timer)
      clearInterval(glitchTimer)
      clearInterval(matrixTimer)
      clearInterval(terminalTimer)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{x: number, y: number, vx: number, vy: number}> = []
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(${180 + Math.sin(Date.now() * 0.001 + i) * 60}, 100%, 60%)`
        ctx.fill()

        particles.forEach((other, j) => {
          if (i !== j) {
            const dx = particle.x - other.x
            const dy = particle.y - other.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(other.x, other.y)
              ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 100})`
              ctx.stroke()
            }
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  const timeString = currentTime.toLocaleTimeString()

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 opacity-20">
        {matrixCode.map((line, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono whitespace-nowrap animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${(i * 50) % (typeof window !== 'undefined' ? window.innerHeight : 800)}px`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {line}
          </div>
        ))}
      </div>

      <header className="relative z-20 min-h-screen flex flex-col items-center justify-center text-white">
        <div className="mb-8 relative">
          <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            {glitchText}
          </h1>
          <div className="absolute inset-0 text-6xl md:text-8xl font-black text-red-500 opacity-20 animate-ping" style={{animationDuration: '2s'}}>
            CYBER_NEXUS
          </div>
        </div>

        <div className="my-8 p-6 bg-black/80 backdrop-blur-sm border border-cyan-400 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.5)] font-mono">
          <div className="text-sm text-cyan-300 mb-2 uppercase tracking-wider">System Clock</div>
          <div className="text-3xl text-cyan-400 font-bold tracking-wider">{timeString}</div>
          <div className="w-full h-1 bg-cyan-400/20 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="mb-8 p-4 bg-black/60 border border-green-400 rounded font-mono text-sm max-w-md">
          {terminalLines.map((line, i) => (
            <div key={i} className="text-green-400 mb-1 animate-pulse" style={{animationDelay: `${i * 0.1}s`}}>
              {line}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <a
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold uppercase tracking-wider rounded-lg transform transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] border-2 border-transparent hover:border-cyan-400"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neural React
          </a>
          <a
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-black font-bold uppercase tracking-wider rounded-lg transform transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,0,255,0.8)] border-2 border-transparent hover:border-purple-400"
            href="https://tanstack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quantum Stack
          </a>
        </div>
      </header>
    </div>
  )
}
