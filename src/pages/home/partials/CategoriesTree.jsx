import React, { useEffect, useState } from "react";
import { categories as apiCategories } from "../../../services/api";
import modals from "../../../services/modals";
import CategoryNode from "../../../components/Home/Tree/CategoryNode";
import SidebarTree from "../../../components/Home/Tree/SideTree";

export default function CategoryTreePage() {
  const [tree, setTree] = useState([]);
  const [selectedPaths, setSelectedPaths] = useState([]); // array of paths

   // شكل البيانات القادمة من Laravel API
  // Category: { id, name, parent_id, children: [], providers: [] }

  useEffect(() => {
    const load = async () => {
      const { data, result, text } = await apiCategories.tree();
      console.log(data, result, text);
      if (result) {
        console.log(data);
        setTree(data);
      } else {
        console.log(text);
        modals.error("text");
      }
    };
    load();
  }, []);


  const handleAdd = (node) => {
    // استخراج المسار من العقدة (باستخدام parent)
    const buildPath = (n, acc = []) => {
      if (n.parent) buildPath(n.parent, acc);
      acc.push({ id: n.id, name: n.name });
      return acc;
    };

    const path = buildPath(node);

    const exists = selectedPaths.some(p =>
      p.map(x => x.id).join('-') === path.map(x => x.id).join('-')
    );

    if (!exists) {
      setSelectedPaths([...selectedPaths, path]);
    }
  };

  const handleRemove = (path) => {
    setSelectedPaths(selectedPaths.filter(p => p !== path));
  };

  return (
    <>
    <div className="bg-success bg-nav">

    </div>
    <div className="container-fluid p-5 main-container bg-white ">
      <div className="row">
        {/* القائمة الجانبية */}
        <div className="col-3 border-end">
          <h5>الاختيارات</h5>
          {selectedPaths.length ? (
            <SidebarTree paths={selectedPaths} onRemove={handleRemove} />
          ) : (
            <p className="text-muted">لا يوجد اختيارات</p>
          )}
        </div>

        {/* الشجرة الرئيسية */}
        <div className="col-9">
          <h4 className="mb-3">شجرة الأصناف</h4>
          <ul className="list-group">
            {tree.map(cat => (
              <CategoryNode
                key={cat.id}
                node={cat}
                onAdd={handleAdd}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
