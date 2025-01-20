import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface UsernameStepProps {
  username: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPrev: () => void;
  loading: boolean;
}

export function UsernameStep({ username, onChange, onPrev, loading }: UsernameStepProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        name="username"
        type="text"
        required
        placeholder="Choose a username"
        value={username}
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
          type="submit" 
          className="flex-1"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-nexa-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}