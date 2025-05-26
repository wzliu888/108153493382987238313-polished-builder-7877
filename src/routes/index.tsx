import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [glitchText, setGlitchText] = useState('CYBER_NEXUS')
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [cpuLoad, setCpuLoad] = useState(0)
  const [memoryUsage, setMemoryUsage] = useState(0)
  const [networkActivity, setNetworkActivity] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      
      // Simulate system metrics
      setCpuLoad(Math.random() * 100)
      setMemoryUsage(65 + Math.random() * 30)
      setNetworkActivity(Math.random() * 1000)
    }, 1000)

    // Glitch effect for main title
    const glitchTimer = setInterval(() => {
      const glitchChars = '!@#$%^&*()_+-=[]{}|;:",.<>?'
      const originalText = 'CYBER_NEXUS'
      let glitched = originalText
      
      if (Math.random() < 0.3) {
        const pos = Math.floor(Math.random() * originalText.length)
        const char = glitchChars[Math.floor(Math.random() * glitchChars.length)]
        glitched = originalText.slice(0, pos) + char + originalText.slice(pos + 1)
        
        setTimeout(() => setGlitchText(originalText), 150)
      }
      
      setGlitchText(glitched)
    }, 2000)

    // Terminal simulation
    const commands = [
      'SYSTEM_BOOT: Neural network initialized',
      'FIREWALL: Quantum encryption active',
      'AI_CORE: Deep learning protocols online',
      'NETWORK: Establishing secure connections...',
      'DATABASE: Syncing with mainframe...',
      'SECURITY: Biometric scan complete',
      'WARNING: Unauthorized access detected',
      'COUNTER_MEASURES: Deploying ICE protocols',
      'SUCCESS: Intrusion neutralized'
    ]

    const terminalTimer = setInterval(() => {
      setTerminalLines(prev => {
        const newLine = commands[Math.floor(Math.random() * commands.length)]
        const updated = [...prev, `[${new Date().toLocaleTimeString()}] ${newLine}`]
        return updated.slice(-6) // Keep last 6 lines
      })
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(glitchTimer)
      clearInterval(terminalTimer)
    }
  }, [])

  const timeString = currentTime.toLocaleTimeString()
  const dateString = currentTime.toLocaleDateString()

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header HUD */}
        <header className="border-b border-cyan-500/30 bg-black/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <div className="text-cyan-400 text-xl font-bold tracking-wider">
              {glitchText}
            </div>
            <div className="text-green-400 text-sm">
              <span className="mr-4">{dateString}</span>
              <span className="text-cyan-400">{timeString}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* System Status Panel */}
            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl mb-4 text-cyan-400 font-bold tracking-wide">
                [SYSTEM_STATUS]
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU_LOAD</span>
                    <span className="text-yellow-400">{cpuLoad.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-yellow-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${cpuLoad}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>MEMORY_USAGE</span>
                    <span className="text-orange-400">{memoryUsage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${memoryUsage}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>NETWORK_ACTIVITY</span>
                    <span className="text-pink-400">{networkActivity.toFixed(0)} Mb/s</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-pink-400 to-red-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(networkActivity / 1000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Panel */}
            <div className="bg-black/80 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl mb-4 text-green-400 font-bold tracking-wide">
                [NEURAL_TERMINAL]
              </h2>
              
              <div className="bg-black/80 rounded p-4 h-48 overflow-y-auto border border-green-500/20">
                {terminalLines.map((line, index) => (
                  <div 
                    key={index} 
                    className="text-sm py-1 text-green-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-cyan-400">$</span> {line}
                  </div>
                ))}
                <div className="text-green-400 animate-pulse inline-block mt-2">█</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-6 py-3 rounded-lg font-bold tracking-wide transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              [REACT_PROTOCOL]
            </a>
            <a
              href="https://tanstack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-black px-6 py-3 rounded-lg font-bold tracking-wide transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
            >
              [TANSTACK_CORE]
            </a>
          </div>
        </main>
      </div>
      
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
