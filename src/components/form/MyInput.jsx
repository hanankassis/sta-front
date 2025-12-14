// Input.js

const MyInput = ({ type, placeholder, name, value, onChange, error }) => {
  return (
    <div className="mb-3">
      <input
        type={type ?? "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
        }}
      />
      {error && <small className="text-warning">{error}</small>}
    </div>
  );
};

export default MyInput;
