import { useParams } from "react-router-dom";
import CrudMain from "../../../components/Admin/CRUD/CrudMain";
import { preferences } from "../../../services/api";

export default function Preferences() {
  const { type } = useParams();
  return (
    <CrudMain
      api={preferences}
      filter={type}
      fields={[{ name: "name", label: "اسم الميول" }]}
    />
  );
}
