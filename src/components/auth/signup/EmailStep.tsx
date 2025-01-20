import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

interface EmailStepProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
}

export function EmailStep({ email, onChange, onNext }: EmailStepProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={onChange}
        className="mb-4"
      />
      <Button 
        type="button" 
        onClick={onNext}
        className="w-full"
      >
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}