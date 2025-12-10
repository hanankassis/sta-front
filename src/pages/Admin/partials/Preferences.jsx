import CrudScreen from '../../../components/Admin/CRUD/CrudMain'
import {  preferences } from '../../../services/api';

export default function Categories() {
  return (
    <CrudScreen
      title="إدارة الخدمات"
      api={preferences}
      fields={[
        { name: "name", label: "اسم الميول" },
      ]}
    />
  );
}
