import { useState, useEffect } from "react";
import { fetchData } from "../api";

const CreateForm = ({ type, onCreate, onClose }) => {
  const [formData, setFormData] = useState({
    team_id: "",
    role_name: "",
  });
  const [teams, setTeams] = useState([]);
  const showTeamId = type === "Roles"; // Show team_id field only for roles

  useEffect(() => {
    if (type === "Roles") {
      fetchData("teams").then(setTeams);
    }
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create {type === "Teams" ? "Team" : "Role"}</h2>
        <form className="form-group"onSubmit={handleSubmit}>
          {showTeamId && (
            <div>
              <label>Team Name</label>
              <select
                value={formData.team_id}
                onChange={(e) =>
                  setFormData({ ...formData, team_id: e.target.value })
                }
                required
              >
                <option value="">Select a Team</option>
                {teams.map((team) => (
                  <option key={team.team_id} value={team.team_id}>
                    {team.team_name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label>{type === "Teams" ? "Team Name" : "Role Name"}</label>
            <input
              type="text"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [type === "Teams" ? "team_name" : "role_name"]:
                    e.target.value,
                })
              }
              required
            />
          </div>
          <div className="modal-buttons">
            <button className="button button-green" type="submit">
              Save
            </button>
            <button className="button button-green" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
