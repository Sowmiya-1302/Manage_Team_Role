import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Teams & Roles Management</h1>
      <p1>You can manage Teams and Roles in your organization using this application. Please click on Teams
       or Roles to start the application.</p1>
      <div className="spacer"></div>
      <div className="button-group">
        <button onClick={() => navigate('/teams')} className="button button-green">Teams</button>
        <button onClick={() => navigate('/roles')} className="button button-green">Roles</button>
      </div>
    </div>
  );
};

export default Home;