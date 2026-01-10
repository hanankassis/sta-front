export default  function SidebarTree({ selectedCategories, onRemove , onSave }) {
  
  return (
    <ul className="list-group ms-3 mt-1">
      {selectedCategories.map(n => (
        <li key={n.id} className="list-group-item d-flex justify-content-between">
          <span>{n.name}</span>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onRemove(n)}
          >
            ×
          </button>          
        </li>
      ))}
      <div className="text-center mt-2">
        <button className="btn btn-success" onClick={onSave}>خفظ</button>
      </div>
    </ul>
  );

}