import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface PasswordStepProps {
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function PasswordStep({ password, onChange, onNext, onPrev }: PasswordStepProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        required
        placeholder="Create a password"
        value={password}
        onChange={onChange}
        className="mb-4"
      />
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrev}
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          type="button" 
          onClick={onNext}
          className="flex-1"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}