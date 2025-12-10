import { useState, useEffect } from "react";
import modals from "../services/modals";

export default function useCrud(api) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const { result, data, text } = await api.list();
    if (result) setItems(data);
    else modals.error(text);
    setLoading(false);
  }

  async function save(row) {
    setSaving(true);
    const isEdit = Boolean(row.id);
    const apiCall = isEdit ? api.update : api.create;
    const params = isEdit ? [row.id, row] : [row];

    const { result, data, text } = await apiCall(...params);

    if (result) {
      modals.success(text);
      setItems((prev) => {
        if (isEdit) return prev.map((x) => (x.id === data.id ? data : x));
        return [data, ...prev];
      });
    } else modals.error(text);
    setSaving(false);
    return result;
  }

  async function remove(id) {
    const c = await modals.deleteConfirm();
    if (!c.isConfirmed) return false;

    const { result, text } = await api.remove(id);
    if (result) {
      modals.success(text);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } else modals.error(text);

    return result;
  }
  useEffect(() => {
    load();
  }, []);

  return { items, loading, saving, load, save, remove };
}
