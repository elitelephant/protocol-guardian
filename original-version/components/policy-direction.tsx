"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

interface PolicyOption {
  id: string
  title: string
  subtitle: string
  description: string
  borderColor: string
  benefits: string[]
  risks: string[]
}

interface PolicyDirectionProps {
  onSelectPolicy: (policyId: string) => void
}

export function PolicyDirection({ onSelectPolicy }: PolicyDirectionProps) {
  const policyOptions: PolicyOption[] = [
    {
      id: "sovereign",
      title: "The Bitcoin Maximalist",
      subtitle: "Network Security First",
      description:
        "Prioritize Bitcoin's base layer security and decentralization above all else, resisting changes that could compromise the network's integrity.",
      borderColor: "border-orange-500",
      benefits: ["Maximum network security", "Preserves decentralization", "Maintains Bitcoin's vision"],
      risks: ["Slows Layer 2 innovation", "Limits scalability", "May hinder adoption"],
    },
    {
      id: "pragmatic",
      title: "The Balanced Steward",
      subtitle: "Pragmatic Governance",
      description:
        "Balance Bitcoin's security with practical governance, supporting Layer 2 solutions while maintaining network integrity and community consensus.",
      borderColor: "border-blue-500",
      benefits: ["Balanced approach", "Supports Layer 2 growth", "Community consensus"],
      risks: ["Complex trade-offs", "Potential compromises", "Slower decision-making"],
    },
    {
      id: "progressive",
      title: "The Innovation Catalyst",
      subtitle: "Layer 2 Focused",
      description:
        "Emphasize Stacks and Layer 2 innovation as the path to Bitcoin's global adoption, pushing boundaries while maintaining security foundations.",
      borderColor: "border-purple-500",
      benefits: ["Accelerates Layer 2 development", "Enables DeFi on Bitcoin", "Future-ready solutions"],
      risks: ["Potential security trade-offs", "Increased complexity", "Community division"],
    },
  ]

  return (
    <div className="space-y-3">
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              Critical Decision Point
            </Badge>
          </div>
          <h2 className="text-2xl font-bold text-balance">Choose Your Leadership Philosophy</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            As the newly appointed <strong>Guardian of the Bitcoin Protocol</strong>, your first major decision will define your administration's
            approach to Bitcoin and Layer 2 ecosystem governance, setting the foundation for all future policies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {policyOptions.map((option) => (
            <Card
              key={option.id}
              className={`group relative p-5 border-2 ${option.borderColor} hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer bg-card/50 backdrop-blur-sm flex flex-col`}
              onClick={() => onSelectPolicy(option.id)}
            >
              <div className="space-y-4 flex-1">
                <div className="space-y-3 text-center">
                  <h3 className="text-lg font-bold text-balance">{option.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {option.subtitle}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground text-pretty">{option.description}</p>
              </div>

              <Button
                className="w-full mt-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex items-center justify-center gap-2 bg-transparent"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectPolicy(option.id)
                }}
              >
                Select This Path
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>

      </div>
  )
}
