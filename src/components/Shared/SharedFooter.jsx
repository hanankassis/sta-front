// src/components/Shared/SharedFooter.js
const SharedFooter = ({ text = "2025 جميع الحقوق محفوظة للموقع" }) => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p className="mb-0">{text} &copy;</p>
      </div>
    </footer>
  );
};

export default SharedFooter;