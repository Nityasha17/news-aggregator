import Select from "react-select";

const categoryOptions = [
    { value: "business", label: "Business" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health" },
    { value: "science", label: "Science" },
    { value: "sports", label: "Sports" },
    { value: "technology", label: "Technology" }
];

const CategoryDropdown = ({ setCategory }) => {
    return (
        <Select
            options={categoryOptions}
            onChange={(selectedOption) => setCategory(selectedOption.value)}
            placeholder="Select Category"
        />
    );
};
 
export default CategoryDropdown;