import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { EmailStep } from "@/components/auth/signup/EmailStep";
import { PasswordStep } from "@/components/auth/signup/PasswordStep";
import { UsernameStep } from "@/components/auth/signup/UsernameStep";
import { StepIndicator } from "@/components/auth/signup/StepIndicator";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const stepDescriptions = [
    'Enter your email',
    'Create a password',
    'Choose a username'
  ];

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
          <EmailStep 
            email={formData.email}
            onChange={handleChange}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <PasswordStep
            password={formData.password}
            onChange={handleChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <UsernameStep
            username={formData.username}
            onChange={handleChange}
            onPrev={prevStep}
            loading={loading}
          />
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
              <StepIndicator 
                currentStep={currentStep}
                totalSteps={3}
                stepDescriptions={stepDescriptions}
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderStep()}
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