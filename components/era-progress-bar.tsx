"use client"

interface EraProgressBarProps {
  currentPhase: "intro" | "era1" | "era2" | "era3" | "era4" | "era5" | "ending"
  currentDecision?: number // Current decision within the era (0-based)
  totalDecisions?: number // Total decisions in current era
}

const ERA_CONFIG = [
  { 
    id: "intro", 
    name: "Intro", 
    shortName: "Start", 
    description: "Policy Direction Selection",
    avgDecisions: 1
  },
  { 
    id: "era1", 
    name: "Era 1", 
    shortName: "Foundations", 
    description: "Bitcoin's Beginnings",
    avgDecisions: 3
  },
  { 
    id: "era2", 
    name: "Era 2", 
    shortName: "Evolution", 
    description: "Protocol Changes",
    avgDecisions: 4
  },
  { 
    id: "era3", 
    name: "Era 3", 
    shortName: "Adoption", 
    description: "Institutional Growth",
    avgDecisions: 3
  },
  { 
    id: "era4", 
    name: "Era 4", 
    shortName: "Future", 
    description: "Advanced Challenges",
    avgDecisions: 4
  },
  { 
    id: "era5", 
    name: "Era 5", 
    shortName: "Legacy", 
    description: "Consolidation",
    avgDecisions: 3
  },
  { 
    id: "ending", 
    name: "Results", 
    shortName: "End", 
    description: "Final Assessment",
    avgDecisions: 1
  }
]

export function EraProgressBar({ 
  currentPhase, 
  currentDecision = 0, 
  totalDecisions 
}: EraProgressBarProps) {
  const currentEraIndex = ERA_CONFIG.findIndex(era => era.id === currentPhase)
  
  const getEraStatus = (index: number) => {
    if (index < currentEraIndex) return "completed"
    if (index === currentEraIndex) return "current"
    return "upcoming"
  }

  const getProgressWithinEra = () => {
    if (currentEraIndex === -1) return 0
    const currentEra = ERA_CONFIG[currentEraIndex]
    const decisionsInEra = totalDecisions || currentEra.avgDecisions
    return Math.min(currentDecision / Math.max(decisionsInEra, 1), 1)
  }

  return (
    <div className="w-full flex flex-col items-center justify-center py-1">
      {/* Progress Bar Container - Centered with max width */}
      <div className="w-full max-w-4xl px-4">
        {/* Background connecting line - from first to last circle center */}
        <div className="relative flex items-center justify-between mb-3">
          {/* Full background line - starts and ends at circle centers */}
          <div 
            className="absolute top-4 h-0.5 bg-muted-foreground/20 z-0"
            style={{
              left: `${100 / (ERA_CONFIG.length * 2)}%`, // Start at first circle center
              right: `${100 / (ERA_CONFIG.length * 2)}%`, // End at last circle center
            }}
          ></div>
          
          {/* Progress line overlay */}
          <div 
            className="absolute top-4 h-0.5 bg-primary transition-all duration-500 z-1"
            style={{
              left: `${100 / (ERA_CONFIG.length * 2)}%`, // Start at first circle center
              width: `${((currentEraIndex + getProgressWithinEra()) / (ERA_CONFIG.length - 1)) * (100 - (200 / ERA_CONFIG.length))}%`
            }}
          ></div>

          {/* Era nodes */}
          {ERA_CONFIG.map((era, index) => {
            const status = getEraStatus(index)
            
            return (
              <div key={era.id} className="flex flex-col items-center relative z-10">
                {/* Era Circle */}
                <div
                  className={`
                    w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-semibold
                    transition-all duration-300 bg-background
                    ${status === "completed" 
                      ? "border-primary text-primary bg-primary text-primary-foreground" 
                      : status === "current"
                      ? "border-primary text-primary animate-pulse"
                      : "border-muted-foreground/30 text-muted-foreground"
                    }
                  `}
                >
                  {status === "completed" ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                {/* Era Label - Below circle */}
                <div className="mt-1 text-center">
                  <div className={`text-xs font-medium whitespace-nowrap ${
                    status === "current" ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {era.shortName}
                  </div>
                  <div className={`text-[10px] leading-tight whitespace-nowrap ${
                    status === "current" ? "text-foreground" : "text-muted-foreground/70"
                  }`}>
                    {era.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Current Era Info - Only show decision count if relevant */}
      {currentEraIndex !== -1 && totalDecisions && totalDecisions > 1 && (
        <div className="mt-1 text-center">
          <div className="text-xs text-muted-foreground">
            Decision {currentDecision + 1} of {totalDecisions}
          </div>
        </div>
      )}
    </div>
  )
}