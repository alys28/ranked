import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from "@/Layout";
import { SignInForm } from "@/SignInForm";
import { UserMenu } from "@/components/UserMenu";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import SearchBar from "./components/SearchBar";
import { DownloadUserEmail } from './components/DownloadUserEmail';

export default function App() {
  const user = useQuery(api.users.viewer);

  return (
    <Router>
      <Layout
        menu={
          <Authenticated>
            <UserMenu>{user?.name ?? user?.email}</UserMenu>
          </Authenticated>
        }
      >
          <DownloadUserEmail />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Authenticated>
              <SearchBar />
            </Authenticated>
            <main style={{ flex: 1, padding: '20px' }}>
              <Routes>
                <Route path="/" element={<Unauthenticated><SignInForm /></Unauthenticated>} />
                {/* Add more routes as needed */}
              </Routes>
            </main>
          </div>
        </div>
      </Layout>
    </Router>
  );
}
