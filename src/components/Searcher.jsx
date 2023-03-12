import { Input } from "antd";
import { useDispatch } from "react-redux";
import { setFilterByName } from "../slices/dataSlice";

const Searcher = () => {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch(setFilterByName(e.target.value));
  };

  return (
    <Input.Search
      placeholder="Buscar..."
      style={{ marginBottom: 10 }}
      onChange={handleFilter}
    />
  );
};

export default Searcher;
