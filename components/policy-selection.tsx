"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Scale, Rocket, Users } from "lucide-react"

interface PolicySelectionProps {
  onSelectPolicy: (policyId: string) => void
}

const policies = [
  {
    id: "sovereign",
    title: "Sovereign Path",
    description: "Prioritize Bitcoin's core principles of decentralization and censorship resistance above all else.",
    icon: Shield,
    focus: "Network Health & Sovereignty",
    color: "text-orange-600",
  },
  {
    id: "progressive",
    title: "Progressive Path",
    description: "Embrace technological advancement and innovation while maintaining Bitcoin's fundamental values.",
    icon: Rocket,
    focus: "Tech Advancement & Innovation",
    color: "text-blue-600",
  },
  {
    id: "pragmatic",
    title: "Pragmatic Path",
    description: "Balance competing interests to ensure Bitcoin's adoption and real-world utility.",
    icon: Scale,
    focus: "Public Confidence & Adoption",
    color: "text-green-600",
  },
]

export function PolicySelection({ onSelectPolicy }: PolicySelectionProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Choose Your Policy Direction</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          As Bitcoin Protocol Guardian, your initial policy direction will shape the foundation of your governance approach.
          This choice influences how you balance the three core metrics throughout the simulation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {policies.map((policy) => {
          const Icon = policy.icon
          return (
            <Card key={policy.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 bg-primary/10 rounded-full ${policy.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-xl">{policy.title}</CardTitle>
                <Badge variant="secondary" className="w-fit mx-auto">
                  {policy.focus}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-center">
                  {policy.description}
                </CardDescription>
                <Button
                  onClick={() => onSelectPolicy(policy.id)}
                  className="w-full"
                  variant="outline"
                >
                  Choose {policy.title}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>Your choice will influence initial game conditions and available decision paths.</p>
      </div>
    </div>
  )
}