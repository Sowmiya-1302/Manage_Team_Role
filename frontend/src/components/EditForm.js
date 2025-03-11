import { useState, useEffect } from "react";
import { fetchData } from "../api";

const EditForm = ({ type, item, onChange, onSave, onClose }) => {
  const nameField = type === "Teams" ? "team_name" : "role_name";
  const showTeamName = type === "Roles"; // Show team_name field only for roles

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (type === "Roles") {
      fetchData("teams").then(setTeams);
    }
  }, [type]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Update {type === "Teams" ? "Team" : "Role"}</h2>
        <div className="form-group">
          {showTeamName && (
            <div>
              <label>Team Name</label>
              <select
                value={item.team_id || ""}
                onChange={(e) => onChange({ ...item, team_id: e.target.value })}
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
            <label>{type === "Teams" ? "Team Name " : "Role Name  "} </label>
            <input
              type="text"
              onChange={(e) =>
                onChange({ ...item, [nameField]: e.target.value })
              }
            />
          </div>
        </div>
        <div className="modal-buttons">
          <button className="button button-green" onClick={onSave}>
            Save
          </button>
          <button className="button button-green" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
