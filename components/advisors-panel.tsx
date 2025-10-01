"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Advisor {
  id: string
  name: string
  role: string
  specialty: string
  color: string
}

interface AdvisorsPanelProps {
  gameState: any
}

export function AdvisorsPanel({ gameState }: AdvisorsPanelProps) {
  const advisors: Advisor[] = [
    {
      id: "michael",
      name: "Michael",
      role: "Chief Technology Officer",
      specialty: "Blockchain Infrastructure",
      color: "bg-chart-2",
    },
    {
      id: "ari",
      name: "Ari",
      role: "Chief Compliance Officer",
      specialty: "Regulatory Framework",
      color: "bg-destructive",
    },
    {
      id: "amara",
      name: "Amara",
      role: "Chief Economic Advisor",
      specialty: "Market Analysis",
      color: "bg-primary",
    },
  ]

  return (
    <Card className="p-6 h-full">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Advisors Support</h2>
      <div className="space-y-4">
        {advisors.map((advisor) => (
          <div key={advisor.id} className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className={`${advisor.color} text-white font-semibold`}>
                {advisor.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{advisor.name}</h3>
              <p className="text-sm text-muted-foreground">{advisor.role}</p>
              <p className="text-xs text-muted-foreground">{advisor.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
