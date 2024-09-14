import { Layout } from "@/Layout";
import { SignInForm } from "@/SignInForm";
import { UserMenu } from "@/components/UserMenu";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import SearchBar from "./components/SearchBar";

export default function App() {
  const user = useQuery(api.users.viewer);

  return (
    <Layout
      menu={
        <Authenticated>
          <UserMenu>{user?.name ?? user?.email}</UserMenu>
        </Authenticated>
      }
    >
      <div style={{ display: 'flex' }}>
        <Authenticated>
          <SearchBar />
        </Authenticated>
  
        <main style={{ flex: 1, padding: '20px' }}>
          <Unauthenticated>
            <SignInForm />
          </Unauthenticated>
        </main>
      </div>
    </Layout>
  );
}
