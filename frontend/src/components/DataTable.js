const DataTable = ({ type, data, onEdit, onDelete }) => {
    return (
      <table className="data-table">
        <thead>
          <tr>
            <th>{type === "Teams" ? "Team ID" : "Role ID"}</th>
            <th>{type === "Teams" ? "Team Name" : "Role Name"}</th>
            {type === "Roles" && <th>Team Name</th>} {/* New column for Roles */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const idField = type === "Teams" ? item.team_id : item.role_id;
            const nameField = type === "Teams" ? item.team_name : item.role_name;
            return (
              <tr key={idField}>
                <td>{idField}</td>
                <td>{nameField}</td>
                {type === "Roles" && <td>{item.team_name}</td>} {/* Display team_name */}
                <td>
                  <button
                    className="button button-green"
                    onClick={() => onEdit(item)}
                    style={{ marginRight: "10px" }}
                  >
                    Update
                  </button>
                  <button
                    className="button button-green"
                    onClick={() => onDelete(idField)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  
  export default DataTable;
  