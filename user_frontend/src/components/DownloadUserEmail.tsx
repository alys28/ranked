import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";

export function DownloadUserEmail() {
  const user = useQuery(api.users.viewer);

  useEffect(() => {
    if (user?.email) {
      const element = document.createElement("a");
      const file = new Blob([user.email], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "user_email.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }, [user]);

  return null; // This component doesn't render anything
}