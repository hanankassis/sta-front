import CrudScreen from '../../../components/Admin/CRUD'
import { categories } from '../../../services/api/';

export default function Categories() {
  return (
    <CrudScreen
      title="إدارة الخدمات"
      api={categories}
      fields={[
        { name: "name", label: "اسم الخدمة" },
      ]}
    />
  );
}
