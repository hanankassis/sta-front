import CrudScreen from '../../../components/Admin/CRUD/CrudMain'
import { categories } from '../../../services/api/';

// Helper: flatten a tree into ordered list with depth for indentation
function flatten(tree = [], depth = 0, acc = []) {
  tree.forEach((node) => {
    acc.push({ ...node, depth });
    if (Array.isArray(node.children) && node.children.length) {
      flatten(node.children, depth + 1, acc);
    }
  });
  return acc;
}

// Wrap API to use tree for listing (so we can show hierarchy clearly),
// but forward create/update/remove/get to admin endpoints.
const apiWrapper = {
  list: async () => {
    const res = await categories.tree();
    if (res.result && Array.isArray(res.data)) {
      const flat = flatten(res.data);
      return { ...res, data: flat, text: res.text };
    }
    return res;
  },
  get: categories.get,
  create: categories.create,
  update: categories.update,
  remove: categories.remove,
};

export default function Categories() {
  return (
    <CrudScreen
      api={apiWrapper}
      fields={[
        {
          name: "name",
          label: "اسم الخدمة",
          // render name with indentation in table via depth property
        },
        {
          name: "category_id",
          label: "تابع لـ",
          type: "select",
          hideInTable: true,
          options: async () => {
            // use tree to generate indented labels for parent selector
            const res = await categories.tree();
            if (res.result && Array.isArray(res.data)) {
              const flat = [];
              function walk(nodes, depth = 0) {
                nodes.forEach((n) => {
                  flat.push({ value: n.id, label: `${"— ".repeat(depth)}${n.name}` });
                  if (Array.isArray(n.children) && n.children.length) walk(n.children, depth + 1);
                });
              }
              walk(res.data, 0);
              return [{ value: "", label: "-" }, ...flat];
            }
            return [];
          },
        },
      ]}
    />
  );
}
