import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";

export function SaveUserEmailToCookie() {
  const user = useQuery(api.users.viewer);

  useEffect(() => {
    if (user?.email) {
      // Set the user's email in a cookie
      document.cookie = `userEmail=${encodeURIComponent(user.email)}; path=/; max-age=31536000;`;
      console.log("User email stored in cookie:", user.email);
    }
  }, [user]);

  return null; // This component doesn't render anything
}
