export default function FileField({ label, onChange }) {
  return (
    <div className="file-field">
      <label>{label}</label>
      <input type="file" onChange={(e) => onChange(e.target.files[0])} />
    </div>
  );
}
