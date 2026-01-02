export default  function SidebarTree({ paths, onRemove }) {
  const buildTree = () => {
    const root = {};

    paths.forEach(path => {
      let current = root;
      path.forEach((node, index) => {
        if (!current[node.id]) {
          current[node.id] = {
            ...node,
            children: {},
            path: path.slice(0, index + 1)
          };
        }
        current = current[node.id].children;
      });
    });

    return root;
  };

  const renderNode = (node) => (
    <ul className="list-group ms-3 mt-1">
      {Object.values(node).map(n => (
        <li key={n.id} className="list-group-item d-flex justify-content-between">
          <span>{n.name}</span>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onRemove(n.path)}
          >
            ×
          </button>
          {Object.keys(n.children).length > 0 && renderNode(n.children)}
        </li>
      ))}
    </ul>
  );

  return renderNode(buildTree());
}