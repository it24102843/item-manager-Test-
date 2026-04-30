import { useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm.jsx";
import { createItem } from "../api/itemApi.js";

function AddItemPage() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      // Remove old field name if it exists to prevent conflicts
      const cleanedData = { ...formData };
      if (cleanedData["Manufacturer Name"]) {
        delete cleanedData["Manufacturer Name"];
      }
      await createItem(cleanedData);
      navigate("/");
    } catch (error) {
      console.error("Failed to create item", error);
      alert("Failed to create item");
    }
  };

  return <ItemForm submitText="Add Item" onSubmit={handleCreate} />;
}

export default AddItemPage;