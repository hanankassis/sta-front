import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./cover.css";

const images = [
  "https://picsum.photos/id/1015/900/500",
  "https://picsum.photos/id/1016/900/500",
  "https://picsum.photos/id/1018/900/500",
  "https://picsum.photos/id/1020/900/500",
];

export default function Cover() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // انتقال بطيء

    return () => clearInterval(timer);
  }, []);

  const prev = (index - 1 + images.length) % images.length;
  const next = (index + 1) % images.length;

  return (
    <header>
      <div className="container-fluid pt-5">
        <h1 className="main-title mt-6 mb-5">
          مرحباً بك في منصة مساعد سياحي ذكي
        </h1>
        <div className="d-flex justify-content-center align-items-center position-relative overflow-hidden">
          {/* الصورة اليسرى */}
          <img
            src={images[prev]}
            style={{
              width: "20%",
              height: "260px",
              objectFit: "cover",
              opacity: 0.6,
            }}
          />

          {/* الصورة الكبيرة مع تداخل */}
          <div
            className="position-relative"
            style={{ width: "60%", height: "360px" }}
          >            
            <button className="start  pulse-btn btn  mt-2 position-absolute z-3">
              ابدأ رحلتك السياحية
            </button>
            <AnimatePresence mode="sync">
              <motion.img
                key={images[index]}
                src={images[index]}
                className="position-absolute top-0 start-0 w-100 h-100 rounded-5"
                style={{ objectFit: "cover" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
              />
            </AnimatePresence>
          </div>

          {/* الصورة اليمنى */}
          <img
            src={images[next]}
            style={{
              width: "20%",
              height: "260px",
              objectFit: "cover",
              opacity: 0.6,
            }}
          />
        </div>
      </div>
    </header>
  );
}
