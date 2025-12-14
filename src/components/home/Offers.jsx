import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import './offer.css'

const slides = [
  {
    image: "https://picsum.photos/id/1015/600/400",
    title: "العنوان الأول",
    description: "هذا شرح بسيط للصورة الأولى يمكن تغييره حسب الحاجة.",
  },
  {
    image: "https://picsum.photos/id/1016/600/400",
    title: "العنوان الثاني",
    description: "هذا شرح بسيط للصورة الثانية مع محتوى توضيحي.",
  },
  {
    image: "https://picsum.photos/id/1018/600/400",
    title: "العنوان الثالث",
    description: "وصف مختصر للصورة الثالثة داخل السلايدر.",
  },
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  const nextSlide = () => {
    if (index < slides.length - 1) setIndex(index + 1);
  };

  const { image, title, description } = slides[index];

  return (
    <div id="offers" className="container-fluid pb-5">
      <h1 className="main-title ">آخر العروض</h1>
      <div className=" position-relative   overflow-hidden">
        <div className="offer row g-0 align-items-center">
          {/* الصورة مع تداخل (Crossfade) */}
          <div
            className="col-md-6 position-relative order-md-2"
            style={{ minHeight: "300px" }}
          >
            <AnimatePresence mode="sync">
              <motion.img
                key={image}
                src={image}
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{ objectFit: "cover"  }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </AnimatePresence>

            {/* سهم التالي (Desktop) */}
            {index < slides.length - 1 && (
              <button
                onClick={nextSlide}
                className="btn btn-light text-success rounded-circle position-absolute top-50 translate-middle-y d-none d-md-block"
                style={{ left: "-20px", zIndex: 5 }}
              >
                <i className="fa fa-arrow-left"></i>
              </button>
            )}
          </div>

          {/* النص */}
          <div className="col-md-6 p-4 position-relative order-md-1 text-end">
            <h3 className="mb-3 text-success">{title}</h3>
            <p className="text-muted">{description}</p>

            {/* سهم السابق  (Desktop)*/}
            {index > 0 && (
              <button
                onClick={prevSlide}
                className="btn btn-light text-success rounded-circle position-absolute top-50 translate-middle-y d-none d-md-block"
                style={{ right: "-20px" }}
              >
                <i className="fa fa-arrow-right"></i>
              </button>
            )}
          </div>
        </div>

        {/* الأسهم للموبايل */}
        <div
          className="d-flex justify-content-between align-items-center position-absolute top-50 start-50 translate-middle w-100 px-3 d-md-none"
          style={{ zIndex: 5 }}
        >
          {index > 0 ? (
            <button
              onClick={prevSlide}
              className="btn btn-success rounded-circle"
            >
              ◀
            </button>
          ) : (
            <span />
          )}

          {index < slides.length - 1 ? (
            <button
              onClick={nextSlide}
              className="btn btn-success rounded-circle"
            >
              ▶
            </button>
          ) : (
            <span />
          )}
        </div>

        {/* Dots */}
        <div className="dots d-flex justify-content-center gap-2 py-3">
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: i === index ? "#198754" : "#cfd8dc",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
