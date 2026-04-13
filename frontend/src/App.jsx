import { useState } from 'react'
import CreateJob from "../components/CreateJob";
import JobList from "../components/JobList";
import { AuthContext } from "./AuthContext";
import './App.css'

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const { connect, role, setRole } = useContext(AuthContext);

  return (
    <div className="container">
      <h1>Web3 Freelance</h1>

      <CreateJob reload={() => setRefresh(!refresh)} />
      <JobList refresh={refresh} />
    </div>
  );
}