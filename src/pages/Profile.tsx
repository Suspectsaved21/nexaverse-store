import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { UserCircle, Loader2 } from "lucide-react";

interface Profile {
  username: string | null;
  full_name: string | null;
  website: string | null;
  avatar_url: string | null;
}

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    username: null,
    full_name: null,
    website: null,
    avatar_url: null,
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

      // Using maybeSingle() instead of single() to handle cases where profile doesn't exist
      const { data, error } = await supabase
        .from("profiles")
        .select("username, full_name, website, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;

      // If no profile exists, we'll create one
      if (!data) {
        const { error: insertError } = await supabase
          .from("profiles")
          .insert([{ id: user.id }]);

        if (insertError) throw insertError;

        setProfile({
          username: null,
          full_name: null,
          website: null,
          avatar_url: null,
        });
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

  const updateProfile = async () => {
    try {
      setUpdating(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        ...profile,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(updates);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error updating profile",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="h-6 w-6" />
            Profile Settings
          </CardTitle>
          <CardDescription>
            Update your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">Username</label>
            <Input
              id="username"
              type="text"
              value={profile.username || ""}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
            <Input
              id="fullName"
              type="text"
              value={profile.full_name || ""}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="website" className="text-sm font-medium">Website</label>
            <Input
              id="website"
              type="url"
              value={profile.website || ""}
              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={updateProfile} 
            disabled={updating}
            className="w-full"
          >
            {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {updating ? "Updating..." : "Update Profile"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}