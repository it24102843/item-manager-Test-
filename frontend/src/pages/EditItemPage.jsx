import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../components/ItemForm.jsx";
import { getItemById, updateItem } from "../api/itemApi.js";

function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await getItemById(id);
        setItem(data);
      } catch (error) {
        console.error("Failed to fetch item", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      // Remove old field name if it exists to prevent conflicts
      const cleanedData = { ...formData };
      if (cleanedData["Manufacturer Name"]) {
        delete cleanedData["Manufacturer Name"];
      }
      await updateItem(id, cleanedData);
      navigate("/");
    } catch (error) {
      console.error("Failed to update item", error);
      alert("Failed to update item");
    }
  };

  if (!item) return <p>Loading item details...</p>;

  // Handle backward compatibility: map old field name to new field name
  const itemData = {
    ...item,
    manufacturerName: item.manufacturerName || item["Manufacturer Name"] || "",
  };

  return (
    <ItemForm
      initialValues={itemData}
      submitText="Update Item"
      onSubmit={handleUpdate}
    />
  );
}

export default EditItemPage;