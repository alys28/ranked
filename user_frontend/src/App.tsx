import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Layout } from "@/Layout";
import { SignInForm } from "@/SignInForm";
import { UserMenu } from "@/components/UserMenu";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import SearchBar from "./components/SearchBar";
import Dashboard from "./Dashboard/Dashboard";

function RedirectButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/dashboard')}
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Go to Dashboard
    </button>
  );
}

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Authenticated>
              <SearchBar />
            </Authenticated>
            <main style={{ flex: 1, padding: '20px' }}>
              <Routes>
                <Route path="/" element={<Unauthenticated><SignInForm /></Unauthenticated>} />
              </Routes>
            </main>
          </div>
        </div>
      </Layout>
    </Router>
  );
}
