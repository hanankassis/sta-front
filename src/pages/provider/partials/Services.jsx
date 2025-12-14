import CrudMain from "../../../components/provider/CRUD/CrudMain";
// import { services } from "../../../services/api/services";

export default function Services() {
  return (
    <CrudMain
      // api={services}
      fields={[
        { name: "name", label: "خدمة" },
        { name: "detailed", label: "تفاصيل الخدمة" },
        { name: "identifier", label: "معرف الخدمة" },
      ]}
    />

  );
}
