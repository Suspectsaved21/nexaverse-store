import { useState } from "react";
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
}

interface ProfileFormProps {
  initialProfile: Profile;
  userId: string;
  onProfileUpdate: () => void;
}

export default function ProfileForm({ initialProfile, userId, onProfileUpdate }: ProfileFormProps) {
  const { toast } = useToast();
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<Profile>(initialProfile);

  const updateProfile = async () => {
    try {
      setUpdating(true);
      const updates = {
        id: userId,
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
      onProfileUpdate();
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

  return (
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
  );
}