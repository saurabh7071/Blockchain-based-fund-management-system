import React from "react"
import { cn } from "@/lib/utils"

interface StepsProps {
  currentStep: number
  children: React.ReactNode
  className?: string
}

interface StepProps {
  title: string
  description?: string
}

export function Steps({ currentStep, children, className }: StepsProps) {
  const steps = React.Children.toArray(children) as React.ReactElement<StepProps>[]

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep === index + 1
          const isCompleted = currentStep > index + 1

          return (
            <React.Fragment key={index}>
              {index > 0 && <div className={cn("flex-1 h-1 mx-2", isCompleted ? "bg-orange-600" : "bg-muted")} />}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium",
                    isActive
                      ? "border-orange-600 bg-orange-600 text-white"
                      : isCompleted
                        ? "border-orange-600 bg-orange-600 text-white"
                        : "border-muted bg-background text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      "text-sm font-medium",
                      isActive || isCompleted ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.props.title}
                  </div>
                  {step.props.description && (
                    <div
                      className={cn(
                        "text-xs",
                        isActive || isCompleted ? "text-muted-foreground" : "text-muted-foreground/60",
                      )}
                    >
                      {step.props.description}
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export function Step({ title, description }: StepProps) {
  return null // This component is just for type-checking and props
}
