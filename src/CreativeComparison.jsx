import { useEffect, useRef, useState } from "react";
import { concepts } from "./CreativeConcept.jsx";
import "./creative-comparison.css";
function LiveFrame({ variant, device = "desktop", mini = false }) {
  const ref = useRef(null),
    [scale, setScale] = useState(1);
  const width = device === "mobile" ? 390 : 1440;
  const height = mini ? 1200 : 960;
  useEffect(() => {
    const update = () => {
      if (ref.current) setScale(Math.min(1, ref.current.clientWidth / width));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [width]);
  return (
    <div
      className={`comparison-frame ${mini ? "is-mini" : ""}`}
      ref={ref}
      style={{ height: height * scale }}
    >
      <iframe
        title={`Phương án ${variant.toUpperCase()} — ${device === "mobile" ? "điện thoại" : "máy tính"}${mini ? " — xem nhanh" : ""}`}
        src={`/design-lab/concept-${variant}?embed=1`}
        loading={mini ? "lazy" : "eager"}
        style={{ width, height, transform: `translateX(-50%) scale(${scale})` }}
      />
    </div>
  );
}
export default function CreativeComparison() {
  const params = new URLSearchParams(location.search);
  const valid = (id) => concepts.some((c) => c.id === id);
  const [active, setActive] = useState(
      valid(params.get("concept")) ? params.get("concept") : "a",
    ),
    [device, setDevice] = useState(
      params.get("device") === "mobile" ? "mobile" : "desktop",
    ),
    [chosen, setChosen] = useState(
      valid(params.get("chosen")) ? params.get("chosen") : "",
    ),
    [notice, setNotice] = useState("");
  const ref = useRef(null);
  function change({ concept = active, mode = device, choice = chosen }) {
    setActive(concept);
    setDevice(mode);
    setChosen(choice);
    const q = new URLSearchParams(location.search);
    q.set("concept", concept);
    q.set("device", mode);
    if (choice) q.set("chosen", choice);
    else q.delete("chosen");
    history.replaceState(
      null,
      "",
      location.pathname + "?" + q + "#creative-comparison",
    );
  }
  async function fullScreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await ref.current.requestFullscreen();
    } catch {
      setNotice(
        "Trình duyệt không hỗ trợ toàn màn hình. Dùng “Mở trang riêng” để xem đầy đủ.",
      );
    }
  }
  async function share() {
    try {
      await navigator.clipboard.writeText(location.href);
      setNotice("Đã sao chép đường dẫn phương án đã chọn.");
    } catch {
      setNotice("Bạn có thể sao chép địa chỉ trên thanh trình duyệt.");
    }
  }
  const current = concepts.find((c) => c.id === active);
  return (
    <section
      className="comparison"
      id="creative-comparison"
      aria-labelledby="comparison-title"
    >
      <div className="comparison-heading">
        <div>
          <p className="comparison-eyebrow">
            BLOCK 1 — CREATIVE CONCEPT COMPARISON
          </p>
          <h2 id="comparison-title">Ba cách kể một câu chuyện.</h2>
          <p>
            Cùng nội dung, cùng ảnh thật. Khác biệt về bố cục, nhịp điệu và ngôn
            ngữ hình khối.
          </p>
        </div>
        <a href="#shape-library" className="comparison-library-link">
          Xem thư viện SVG ↓
        </a>
      </div>
      <div className="comparison-cards">
        {concepts.map((item) => (
          <article
            key={item.id}
            className={`comparison-card ${active === item.id ? "is-active" : ""}`}
          >
            <div className="comparison-card-label">
              <span>{item.code}</span>
              <h3>{item.name}</h3>
              <button
                onClick={() => change({ concept: item.id })}
                aria-pressed={active === item.id}
                aria-label={`Xem phương án ${item.code}`}
              >
                {active === item.id ? "Đang xem" : "Xem mẫu ↗"}
              </button>
            </div>
            <LiveFrame variant={item.id} mini />
            <p>{item.description}</p>
            <a
              href={`/design-lab/concept-${item.id}`}
              target="_blank"
              rel="noreferrer"
            >
              Mở phương án {item.code} ↗
            </a>
          </article>
        ))}
      </div>
      <div className="comparison-active" ref={ref}>
        <div className="comparison-controls">
          <div role="group" aria-label="Chuyển phương án">
            {concepts.map((c) => (
              <button
                key={c.id}
                className={active === c.id ? "is-active" : ""}
                aria-pressed={active === c.id}
                onClick={() => change({ concept: c.id })}
              >
                {c.code}
              </button>
            ))}
          </div>
          <strong>
            {current.code} / {current.name}
          </strong>
          <div role="group" aria-label="Kích thước xem">
            <button
              className={device === "desktop" ? "is-active" : ""}
              aria-pressed={device === "desktop"}
              onClick={() => change({ mode: "desktop" })}
            >
              Desktop · 1440
            </button>
            <button
              className={device === "mobile" ? "is-active" : ""}
              aria-pressed={device === "mobile"}
              onClick={() => change({ mode: "mobile" })}
            >
              Mobile · 390
            </button>
          </div>
          <button onClick={fullScreen}>Toàn màn hình ⤢</button>
          <a
            href={`/design-lab/concept-${active}`}
            target="_blank"
            rel="noreferrer"
          >
            Mở trang riêng ↗
          </a>
        </div>
        <div className={`comparison-canvas ${device}`}>
          <LiveFrame
            key={`${active}-${device}`}
            variant={active}
            device={device}
          />
        </div>
        <p className="comparison-help">
          Đây là giao diện React thực. Cuộn bên trong khung để xem trọn Block 1
          và thử các nút đăng ký.
        </p>
      </div>
      <div className="comparison-selection">
        <div>
          <strong>
            {chosen
              ? `Đã chọn phương án ${chosen.toUpperCase()} để chỉnh sửa tiếp`
              : "Chưa chọn phương án cuối cùng"}
          </strong>
          <p>
            Lựa chọn so sánh được lưu trong đường dẫn. Trang chính đang dùng
            phương án A.
          </p>
        </div>
        <button onClick={() => change({ choice: active })}>
          Chọn phương án {active.toUpperCase()} ✓
        </button>
        <button onClick={share}>Sao chép lựa chọn ↗</button>
      </div>
      <p role="status" className="comparison-notice">
        {notice}
      </p>
    </section>
  );
}
