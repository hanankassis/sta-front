
export default function NotFound404() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 forbidden-bg">
      <div className="text-center px-3">
        <p className="welcome-text mb-4"> 404</p>

        <h1 className="forbidden-title mb-4">NOT FOUND RESOURCE</h1>

        <p className="description-text mx-auto">
         الصفحة غير موجودة 😑
        </p>
      </div>

      {/* Inline CSS for simplicity */}
      <style>{`
        .forbidden-bg {
          background: linear-gradient(to bottom, #85b4a0ff, #0b2318ff);
        }

        .welcome-text {
          color: #cbe1d4ff;
          letter-spacing: 0.35em;
          font-size: 3rem;
          font-weight: bold
        }

        .forbidden-title {
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #facc15; /* yellow */
          font-size: clamp(1rem, 2vw, 2rem);
          text-shadow: 0 6px 0 black; /* red shadow */
        }

        .description-text {
          color: #e5e7eb;
          max-width: 600px;
          font-size: 2rem;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}
