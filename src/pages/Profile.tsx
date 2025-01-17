import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileLoading from "@/components/profile/ProfileLoading";

interface Profile {
  username: string | null;
  full_name: string | null;
  website: string | null;
}

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile>({
    username: null,
    full_name: null,
    website: null,
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("profiles")
        .select("username, full_name, website")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        const { error: insertError } = await supabase
          .from("profiles")
          .insert([{ id: user.id }]);

        if (insertError) throw insertError;
      } else {
        setProfile(data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error loading profile",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ProfileLoading />;
  }

  return (
    <div className="container max-w-2xl py-8">
      {userId && (
        <ProfileForm
          initialProfile={profile}
          userId={userId}
          onProfileUpdate={getProfile}
        />
      )}
    </div>
  );
}