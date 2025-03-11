const API_BASE = "http://13.49.60.148:5000";

export const fetchData = async (type) => {
  try {
    const response = await fetch(`${API_BASE}/${type}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
};

export const createData = async (type, data) => {
  try {
    await fetch(`${API_BASE}/${type}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error creating entry:", error);
  }
};

export const updateData = async (type, id, data) => {
    try {
      const response = await fetch(`${API_BASE}/${type}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to update ${type}, status: ${response.status}`);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };
  
  export const deleteData = async (type, id) => {
    try {
      const response = await fetch(`${API_BASE}/${type}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete ${type}, status: ${response.status}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

// export const deleteTeam = async (id) => {
//   await fetch(`${API_BASE}/teams/${id}`, {
//     method: "DELETE",
//   });
// }
