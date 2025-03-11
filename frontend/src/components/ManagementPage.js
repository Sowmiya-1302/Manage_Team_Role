import { useEffect, useState } from "react";
import { fetchData, createData, updateData, deleteData } from "../api";
import DataTable from "./DataTable";
import EditForm from "./EditForm";
import CreateForm from "./CreateForm";
import "../styles/styles.css";

const ManagementPage = ({ type }) => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await fetchData(type.toLowerCase());
    setItems(data);
  };

  const handleCreate = async (newItem) => {
    await createData(type.toLowerCase(), newItem);
    setShowCreateForm(false);
    loadItems();
  };

  const handleUpdate = async () => {
    const keyField = type === 'Teams' ? 'team_id' : 'role_id';
    await updateData(type.toLowerCase(), editItem[keyField], editItem);
    // await updateData(type.toLowerCase(), editItem.team_id, editItem);
    setEditItem(null);
    loadItems();
  };

  const handleDelete = async (id) => {
    await deleteData(type.toLowerCase(), id);
    loadItems();
  };

  return (
    <div className="container">
      <h1 className="title">Manage {type}</h1>
      <div className="spacer"></div>
      <button className="button button-green create-button" onClick={() => setShowCreateForm(true)}>
        Create
      </button>
      <DataTable type={type} data={items} onEdit={setEditItem} onDelete={handleDelete} />
      {editItem && <EditForm type={type} item={editItem} onChange={setEditItem} onSave={handleUpdate} onClose={() => setEditItem(null)} />}
      {showCreateForm && <CreateForm type={type} onCreate={handleCreate} onClose={() => setShowCreateForm(false)} />}
    </div>
  );
};

export default ManagementPage;