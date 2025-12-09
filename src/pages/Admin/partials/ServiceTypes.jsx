import DataManager from "../../../components/Admin/DataManger";
import { categories } from "../../../services/api";

export default function ServiceTypes() {
  return (
    <DataManager
      title="إدارة أنواع الخدمات"
      api={categories}
      fields={[{ name: "name", label: "الاسم" }]}
    />
  );
}
