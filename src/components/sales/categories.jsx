import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
export default function Categories({
  category,
  setCategory,
  getProductsByCategory,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const API_URL = import.meta.env.VITE_APP_API_URL;
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/product/view-category`, {
          withCredentials: true,
        });
        setCategory(response.data.categories);
        console.log(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    console.log(category);
  }, []);
  const handleChange = (selected) => {
    setSelectedCategory(selected?.value);
    getProductsByCategory(selected?.value);
  };

  //render category dropdown
  const categoryOptions = category?.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  return (
    <>
      <Select
        options={categoryOptions}
        placeholder="Select Category"
        isSearchable={true}
        onChange={handleChange}
        classNames={{
          container: () => "w-full rounded-lg",
          control: () => " shadow-sm",
          menu: () => "z-50 rounded-2xl",
        }}
      />
    </>
  );
}
