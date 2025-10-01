"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Shield, Scale, Zap, ChevronRight, Info } from "lucide-react"

interface PolicyOption {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
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
      id: "stability",
      title: "The Fortress Protocol",
      subtitle: "Security-First Approach",
      description:
        "Prioritize market stability and comprehensive oversight to prevent another BlackShadow incident through robust regulatory frameworks.",
      icon: <Shield className="h-6 w-6" />,
      borderColor: "border-destructive",
      benefits: ["Maximum security", "Investor protection", "Market stability"],
      risks: ["Slower innovation", "Higher compliance costs", "Reduced flexibility"],
    },
    {
      id: "balance",
      title: "The Harmony Doctrine",
      subtitle: "Balanced Regulation",
      description:
        "Balance regulation with innovation, seeking a middle path that protects users while fostering technological advancement and market growth.",
      icon: <Scale className="h-6 w-6" />,
      borderColor: "border-chart-3",
      benefits: ["Balanced approach", "Sustainable growth", "Stakeholder consensus"],
      risks: ["Complex implementation", "Compromise solutions", "Slower decision-making"],
    },
    {
      id: "innovation",
      title: "The Innovation Manifesto",
      subtitle: "Technology-Forward Vision",
      description:
        "Emphasize technological advancement and decentralization as the best protection against future attacks while promoting crypto innovation.",
      icon: <Zap className="h-6 w-6" />,
      borderColor: "border-primary",
      benefits: ["Rapid innovation", "Competitive advantage", "Future-ready solutions"],
      risks: ["Higher volatility", "Regulatory gaps", "Potential security issues"],
    },
  ]

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              Critical Decision Point
            </Badge>
          </div>
          <h2 className="text-2xl font-bold text-balance">Choose Your Leadership Philosophy</h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
            As the newly appointed FiDeFi President, your first major decision will define your administration's
            approach to crypto regulation and set the foundation for all future policies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {policyOptions.map((option) => (
            <Card
              key={option.id}
              className={`group relative p-6 border-2 ${option.borderColor} hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer bg-card/50 backdrop-blur-sm`}
              onClick={() => onSelectPolicy(option.id)}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors`}
                  >
                    {option.icon}
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs">
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium text-green-400">Benefits:</p>
                          <ul className="text-xs space-y-1">
                            {option.benefits.map((benefit, i) => (
                              <li key={i}>• {benefit}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-orange-400">Risks:</p>
                          <ul className="text-xs space-y-1">
                            {option.risks.map((risk, i) => (
                              <li key={i}>• {risk}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-balance">{option.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {option.subtitle}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{option.description}</p>

                <Button
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex items-center justify-center gap-2 bg-transparent"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectPolicy(option.id)
                  }}
                >
                  Select This Path
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Hover over the info icons to see detailed pros and cons for each approach
          </p>
        </div>
      </div>
    </TooltipProvider>
  )
}
