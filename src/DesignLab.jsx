import { useEffect, useId, useState } from "react";
import "./design-lab.css";

const defaults = { orange: "#ff963b", pink: "#fb4f75", cream: "#fff0df" };
function Artwork({ svg }) {
  const prefix = useId().replaceAll(":", "");
  // Files are curated local SVG assets, not arbitrary user-provided markup.
  const scoped = svg
    .replace(/id="([^"]+)"/g, `id="${prefix}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
    .replace(/aria-labelledby="([^"]+)"/g, `aria-labelledby="${prefix}-$1"`);
  return (
    <div
      className="lab-artwork"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: scoped }}
    />
  );
}
export default function DesignLab() {
  const params = new URLSearchParams(location.search);
  const initial = Object.fromEntries(
    Object.entries(defaults).map(([key, value]) => [
      key,
      /^#[a-f\d]{6}$/i.test(params.get(key) || "") ? params.get(key) : value,
    ]),
  );
  const [colors, setColors] = useState(initial),
    [photo, setPhoto] = useState(false),
    [scale, setScale] = useState(100),
    [items, setItems] = useState([]),
    [error, setError] = useState(""),
    [selected, setSelected] = useState(params.get("shape") || ""),
    [notice, setNotice] = useState("");
  useEffect(() => {
    document.title = "Thư viện shape · ChămSóc247";
    let cancelled = false;
    (async () => {
      const r = await fetch("/shapes/manifest.json");
      if (!r.ok) throw Error("Không tải được danh mục shape.");
      const list = await r.json();
      const loaded = await Promise.all(
        list.map(async (item) => {
          const r = await fetch(item.file);
          if (!r.ok) throw Error("Không tải được " + item.id);
          return { ...item, svg: await r.text() };
        }),
      );
      if (!cancelled) setItems(loaded);
    })().catch((e) => {
      if (!cancelled) setError(e.message);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    const query = new URLSearchParams();
    if (selected) query.set("shape", selected);
    for (const [key, value] of Object.entries(colors))
      if (value !== defaults[key]) query.set(key, value);
    history.replaceState(
      null,
      "",
      location.pathname + (query.size ? "?" + query : ""),
    );
  }, [selected, colors]);
  const variables = {
    "--shape-orange": colors.orange,
    "--shape-pink": colors.pink,
    "--shape-cream": colors.cream,
    "--lab-scale": scale / 100,
  };
  function downloadShape(event, item) {
    event.preventDefault();
    const style = Object.entries(colors)
      .map(([key, value]) => `--shape-${key}:${value}`)
      .join(";");
    const customized = item.svg.replace("<svg ", `<svg style="${style}" `);
    const url = URL.createObjectURL(
      new Blob([customized], { type: "image/svg+xml" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.slug}.svg`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function copySelection() {
    try {
      await navigator.clipboard.writeText(location.href);
      setNotice("Đã sao chép đường dẫn lựa chọn.");
    } catch {
      setNotice("Bạn có thể sao chép địa chỉ trên thanh trình duyệt.");
    }
  }
  return (
    <main className="lab-page" style={variables}>
      <header className="lab-header">
        <div>
          <a className="lab-back" href="/">
            ← Trở về Block 1
          </a>
          <p className="lab-kicker">CHĂMSÓC247 / KHÔNG GIAN THỬ NGHIỆM</p>
          <h1>
            Đường nét của sự chăm sóc<span>.</span>
          </h1>
          <p className="lab-intro">
            06 mẫu vector tuyển chọn từ Haikei. So sánh đường nét, thử màu và
            chọn hướng thiết kế trước khi áp dụng.
          </p>
        </div>
        <span className="lab-status">Block 1 được giữ nguyên</span>
      </header>
      <section className="lab-toolbar" aria-label="Tùy chỉnh mẫu">
        <div className="lab-colors">
          {Object.entries(colors).map(([key, value]) => (
            <label key={key}>
              <input
                type="color"
                value={value}
                onChange={(e) =>
                  setColors({ ...colors, [key]: e.target.value })
                }
              />
              <span>{{ orange: "Cam", pink: "Hồng", cream: "Kem" }[key]}</span>
            </label>
          ))}
        </div>
        <div className="lab-modes" role="group" aria-label="Chế độ xem">
          <button
            className={!photo ? "is-active" : ""}
            aria-pressed={!photo}
            onClick={() => setPhoto(false)}
          >
            Vector
          </button>
          <button
            className={photo ? "is-active" : ""}
            aria-pressed={photo}
            onClick={() => setPhoto(true)}
          >
            Thử với ảnh thật
          </button>
        </div>
        <label className="lab-scale">
          Tỷ lệ{" "}
          <input
            type="range"
            min="75"
            max="125"
            step="5"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
          />
          <output>{scale}%</output>
        </label>
        <button
          className="lab-reset"
          onClick={() => {
            setColors(defaults);
            setScale(100);
            setPhoto(false);
          }}
        >
          Đặt lại
        </button>
      </section>
      {error ? (
        <p role="alert" className="lab-error">
          {error} <button onClick={() => location.reload()}>Tải lại</button>
        </p>
      ) : items.length === 0 ? (
        <p role="status">Đang tải thư viện SVG…</p>
      ) : (
        <section className="lab-grid" aria-label="Sáu mẫu shape">
          {items.map((item) => (
            <article
              key={item.id}
              className={`lab-card ${selected === item.id ? "is-selected" : ""}`}
            >
              <div
                className={`lab-stage ${photo ? "with-photo" : ""} ${item.kind === "mask" ? "is-mask" : ""}`}
              >
                {photo && (
                  <img
                    className="lab-photo"
                    src="/images/cham-soc-tan-tam.webp"
                    alt="Ảnh chăm sóc thực tế để thử khung vector"
                    style={
                      item.mask
                        ? {
                            maskImage: `url(${item.mask})`,
                            WebkitMaskImage: `url(${item.mask})`,
                          }
                        : undefined
                    }
                  />
                )}
                <Artwork svg={item.svg} />
                <span className="lab-badge">
                  {item.id}{" "}
                  <span>
                    /
                    {
                      {
                        mask: " KHUNG ẢNH",
                        divider: " CHUYỂN TIẾP",
                        edge: " VIỀN CẠNH",
                      }[item.kind]
                    }
                  </span>
                </span>
              </div>
              <div className="lab-card-info">
                <div className="lab-card-heading">
                  <h2>{item.title}</h2>
                  <button
                    className="lab-select"
                    aria-pressed={selected === item.id}
                    aria-label={`Chọn mẫu ${item.id}`}
                    onClick={() =>
                      setSelected(selected === item.id ? "" : item.id)
                    }
                  >
                    {selected === item.id ? "Đã chọn ✓" : "Chọn mẫu ↗"}
                  </button>
                </div>
                <p>{item.description}</p>
                <div className="lab-links">
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                    Haikei · {item.generator} ↗
                  </a>
                  <a
                    href={item.file}
                    download
                    onClick={(event) => downloadShape(event, item)}
                  >
                    Tải SVG ↓
                  </a>
                  <details>
                    <summary>Mã SVG</summary>
                    <pre tabIndex="0">{item.svg}</pre>
                  </details>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
      <footer className="lab-footer">
        <div>
          <strong>
            {selected
              ? `Lựa chọn hiện tại: ${selected}`
              : "Chọn một mẫu để lưu lựa chọn vào đường dẫn."}
          </strong>
          <p>
            Chưa áp dụng vào website chính. Màu và lựa chọn được lưu trong URL
            để gửi duyệt.
          </p>
        </div>
        <div className="lab-footer-actions">
          <a href="/shapes/README.md" target="_blank" rel="noreferrer">
            Nguồn & quyền sử dụng ↗
          </a>
          <button onClick={copySelection}>Sao chép lựa chọn ↗</button>
        </div>
      </footer>
      <p className="lab-notice" role="status">
        {notice}
      </p>
    </main>
  );
}
