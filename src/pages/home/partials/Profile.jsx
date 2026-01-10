import React, { useEffect, useState } from "react";
import { categories as apiCategories } from "../../../services/api";
import { profile as apiProfile } from "../../../services/api";
import modals from "../../../services/modals";
import CategoryNode from "../../../components/Home/Tree/CategoryNode";
import SidebarTree from "../../../components/Home/Tree/SideTree";
import MySpinner from "../../../components/Shared/MySpinner";

export default function CategoryTreePage() {
  const [loading, setLoading] = useState(false);
  const [tree, setTree] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // array of paths

  // شكل البيانات القادمة من Laravel API
  // Category: { id, name, parent_id, children: [], providers: [] }

  useEffect(() => {
    const loadTree = async () => {
      setLoading(true);
      const { data, result, text } = await apiCategories.tree();
      // console.log(data, result, text);
      if (result) {
        console.log(data);
        setTree(data);
      } else {
        console.log(text);
        modals.error("text");
      }
      setLoading(false);
    };

    const loadProfile = async () => {
      setLoading(true);
      const { data, result, text } = await apiProfile.get();
      console.log(data);
      if (result) {
        console.log(data);
        setSelectedCategories(data);
      } else {
        console.log(text);
        modals.error("text");
      }
      setLoading(false);
    };
    loadTree();
    loadProfile();
  }, []);

  const handleAdd = (node) => {
    setSelectedCategories((prev) =>
      prev.some((item) => item.id === node.id)
        ? prev
        : [...prev, { id: node.id, name: node.name }]
    );
  };

  const handleSave = async() => {
    const ids = selectedCategories.map(item => item.id);
    console.log("ids" ,ids);
    const {result  , text} = await apiProfile.update({ categories:ids});
    if (result)
      modals.success("تم حفظ ")
    else
      modals.success(text)

  };

  const handleRemove = (n) => {
    setSelectedCategories(
      selectedCategories.filter((category) => category.id !== n.id)
    );
  };

  return (
    <>
      {loading && <MySpinner />}
      <div className="bg-success bg-nav"></div>
      <div className="container-fluid p-5  bg-white h-80vh">
        <div className="row">
          {/* القائمة الجانبية */}
          <div className="col-3 border-end">
            <h5 className="text-success">الاختيارات</h5>
            {selectedCategories.length ? (
              <SidebarTree
                selectedCategories={selectedCategories}
                onRemove={handleRemove}
                onSave={handleSave}
              />
            ) : (
              <p className="text-muted">لا يوجد اختيارات</p>
            )}
          </div>

          {/* الشجرة الرئيسية */}
          <div className="col-9">
            <ul className="list-group">
              {tree.map((cat) => (
                <CategoryNode key={cat.id} node={cat} onAdd={handleAdd} />
              ))}
            </ul>
          </div>
          <div>          
          </div>
        </div>
      </div>
    </>
  );
}
