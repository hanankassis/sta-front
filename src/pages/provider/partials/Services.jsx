import CrudMain from "../../../components/provider/CRUD/CrudMain";
import { services } from "../../../services/api";

export default function Services() {
  return (
    <CrudMain
      api={services}
      fields={[
        { name: "name", label: "خدمة" },
        { name: "details", label: "تفاصيل الخدمة" },
        { name: "identifier", label: "معرف الخدمة" },
      ]}
    />

  );
}
