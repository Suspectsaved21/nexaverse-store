import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username
          }
        }
      });

      if (signUpError) throw signUpError;

      if (signUpData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ username: formData.username })
          .eq('id', signUpData.user.id);

        if (profileError) throw profileError;

        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const nextStep = () => {
    if (currentStep === 1 && !formData.email) {
      toast.error("Please enter your email");
      return;
    }
    if (currentStep === 2 && !formData.password) {
      toast.error("Please enter your password");
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mb-4"
            />
            <Button 
              type="button" 
              onClick={nextStep}
              className="w-full"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="mb-4"
            />
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                type="button" 
                onClick={nextStep}
                className="flex-1"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              className="mb-4"
            />
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
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
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Step {currentStep} of 3: {currentStep === 1 ? 'Enter your email' : currentStep === 2 ? 'Create a password' : 'Choose a username'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderStep()}
              {currentStep === 3 && (
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-nexa-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-[#232f3e] text-white text-center py-4">
        <p>© {new Date().getFullYear()} Nexa. All rights reserved.</p>
      </footer>
    </div>
  );
}