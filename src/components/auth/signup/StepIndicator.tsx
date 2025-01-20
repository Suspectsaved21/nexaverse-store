import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepDescriptions: string[];
}

export function StepIndicator({ currentStep, totalSteps, stepDescriptions }: StepIndicatorProps) {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-600">
        Step {currentStep} of {totalSteps}: {stepDescriptions[currentStep - 1]}
      </p>
    </div>
  );
}