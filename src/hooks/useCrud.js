import { useState, useEffect } from "react";
import modals from "../services/modals";

export default function useCrud(api ,filter = null) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    console.log(filter)
    const { result, data, text } = await api.list(filter);
    if (result) {
      setItems(data);
      setTitle(text);
    }
    else modals.error(text);
    setLoading(false);
  }

  async function save(row) {
    setSaving(true);
    const isEdit = Boolean(row.id);
    const apiCall = isEdit ? api.update : api.create;
    const params = isEdit ? [row.id, row] : [row];

    const { result, data, text } = await apiCall(...params , filter);

    if (result) {
      modals.success(text);
      // Reload list to ensure hierarchy/tree structure is properly updated
      await load();
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
      // Reload list to update hierarchy/tree structure
      await load();
    } else modals.error(text);

    return result;
  }
  useEffect(() => {
    load();
  }, [filter]);

  return { items, loading, saving, load, save, remove , title};
}
