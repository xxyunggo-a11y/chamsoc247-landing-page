import React, { useEffect, useRef, useState } from "react";

import {
  UserRoundCheck,
  HouseHeart,
  BookOpen,
  GraduationCap,
  CalendarDays,
  Laptop,
  UsersRound,
  MapPin,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
const iconComponents = {
  person: UserRoundCheck,
  home: HouseHeart,
  book: BookOpen,
  cap: GraduationCap,
  calendar: CalendarDays,
  laptop: Laptop,
  group: UsersRound,
  pin: MapPin,
  arrow: ChevronRight,
  menu: Menu,
  close: X,
};
function Icon({ name, className = "" }) {
  const Component = iconComponents[name];
  return (
    <Component
      className={className}
      size={28}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    />
  );
}
// Logo và ảnh do ChămSóc247 cung cấp; xem public/images/danh-muc.json.
function Brand() {
  return (
    <a
      href="#dau-trang"
      className="brand"
      aria-label="ChămSóc247 — về đầu trang"
    >
      <img
        className="brand-logo"
        src="/images/logo-chamsoc247.webp"
        alt="ChămSóc247 — Đồng hành từng khoảnh khắc"
        width="800"
        height="600"
      />
    </a>
  );
}
function PhotoShapes() {
  return (
    <svg className="shape-definitions" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="hero-photo-shape" clipPathUnits="objectBoundingBox">
          <path d="M.37 0H1V.94C.91 1 .82 .94 .7 .95S.38 .94 .19 .82C.04 .73 .02 .65 .08 .52S.18 .36 .07 .28C-.04 .18 .28 .14 .37 0Z" />
        </clipPath>
        <clipPath id="card-photo-shape" clipPathUnits="objectBoundingBox">
          <path d="M.07 0H.93Q1 0 1 .12V.87C1 1 .65 .99 .47 .94S0 .99 0 .87V.12Q0 0 .07 0Z" />
        </clipPath>
        <clipPath id="program-photo-shape" clipPathUnits="objectBoundingBox">
          <path d="M.06 .38C.13 .08 .48 -.04 .73 .06S1 .3 1 .57S.93 1 .68 .97S.5 .83 .29 .72S0 .63 .06 .38Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
const facts = [
  ["calendar", "3 tháng", "Thời gian đào tạo"],
  ["laptop", "Học kết hợp\ntrực tiếp và trực tuyến", "Linh hoạt, dễ tiếp cận"],
  [
    "group",
    "Học tập trung\nhoặc học bán thời gian",
    "Phù hợp với nhiều đối tượng",
  ],
  ["pin", "Hà Nội & TP.HCM", "Tại các cơ sở liên kết uy tín"],
];
function InfoDialog({ children, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.showModal();
  }, []);
  return (
    <dialog
      ref={ref}
      className="info-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
export default function BlockOne({ concept = null }) {
  const [menu, setMenu] = useState(false);
  const [dialog, setDialog] = useState(null);
  return (
    <>
      <a className="skip-link" href="#noi-dung">
        Đến nội dung chính
      </a>
      <PhotoShapes />
      <div className="landing" id="dau-trang">
        <header className="header">
          <Brand />
          <span className="partner-divider" aria-hidden="true">
            ×
          </span>
          <div className="partner" aria-label="Đại học Y Hà Nội">
            <img
              className="university-logo"
              src="/images/logo-dai-hoc-y.webp"
              alt="Biểu trưng Trường Đại học Y Hà Nội"
              width="100"
              height="123"
            />
            <span>
              <strong>ĐẠI HỌC Y HÀ NỘI</strong>
              <small>HANOI MEDICAL UNIVERSITY</small>
            </span>
          </div>
          <button
            className="menu-button"
            aria-label={menu ? "Đóng menu" : "Mở menu"}
            aria-expanded={menu}
            aria-controls="navigation"
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? "close" : "menu"} />
          </button>
          {menu && (
            <nav id="navigation" aria-label="Điều hướng" className="navigation">
              <a href="#nhu-cau" onClick={() => setMenu(false)}>
                Cơ hội nghề nghiệp
              </a>
              <a href="#chuong-trinh" onClick={() => setMenu(false)}>
                Thông tin chương trình
              </a>
              <button
                onClick={() => {
                  setDialog("register");
                  setMenu(false);
                }}
              >
                Đăng ký tham gia
              </button>
            </nav>
          )}
        </header>
        <main id="noi-dung">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow">CƠ HỘI NGHỀ NGHIỆP & GIÁ TRỊ CỘNG ĐỒNG</p>
              <h1 id="hero-title">
                Khi cơ hội việc làm
                <br />
                <span className="gradient-text">
                  gặp nhu cầu được
                  <br className="desktop-break" /> chăm sóc
                </span>
              </h1>
              <p className="intro">
                Nhiều phụ nữ đang tìm kiếm thu nhập ổn định, trong khi nhiều gia
                đình cần người chăm sóc có chuyên môn cho người cao tuổi, người
                bệnh sau xuất viện, mẹ sau sinh và trẻ nhỏ.
              </p>
            </div>
            <div className="hero-visual">
              {concept && (
                <img
                  className="concept-frame hero-frame"
                  src={`/shapes/concepts/hero-${concept}-frame.svg`}
                  alt=""
                  aria-hidden="true"
                />
              )}
              <div className="hero-photo-frame">
                <img
                  src="/images/cham-soc-tan-tam.webp"
                  srcSet="/images/cham-soc-tan-tam-720.webp 720w, /images/cham-soc-tan-tam.webp 1254w"
                  sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1440px) 48vw, 690px"
                  alt="Hộ lý ChămSóc247 hỗ trợ người cao tuổi uống nước tại nhà"
                  width="1254"
                  height="1254"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              {concept === "b" && (
                <img
                  className="concept-layer-photo"
                  src="/images/ho-ly-dong-hanh-720.webp"
                  width="720"
                  height="540"
                  alt="Hộ lý đồng hành cùng người cao tuổi tại gia đình"
                  loading="lazy"
                />
              )}
              <div className="handwritten">
                Chăm sóc <span>♡</span>
                <br />
                <small>
                  là tạo nên
                  <br />
                  những điều tốt đẹp hơn
                </small>
                <svg viewBox="0 0 180 22" aria-hidden="true">
                  <path d="M3 19Q100-10 175 7" />
                </svg>
              </div>
            </div>
          </section>
          <section
            id="nhu-cau"
            className="needs"
            aria-label="Hai nhu cầu, một sự kết nối"
          >
            <article className="need-card women">
              <div className="card-photo">
                <img
                  src="/images/ho-ly-dong-hanh.webp"
                  srcSet="/images/ho-ly-dong-hanh-720.webp 720w, /images/ho-ly-dong-hanh.webp 1440w"
                  sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1440px) 48vw, 690px"
                  alt="Hộ lý ChămSóc247 đồng hành cùng người cao tuổi tại gia đình"
                  width="1440"
                  height="1080"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="card-content">
                <span className="round-icon">
                  <Icon name="person" />
                </span>
                <h2>Phụ nữ cần cơ hội việc làm</h2>
                <p>
                  Nhiều phụ nữ tại các tỉnh, thành phố vẫn đang tìm kiếm một
                  công việc có thu nhập ổn định, kỹ năng rõ ràng và cơ hội phát
                  triển lâu dài.
                </p>
              </div>
            </article>
            <article className="need-card families">
              <div className="card-photo">
                <img
                  src="/images/do-huyet-ap.webp"
                  srcSet="/images/do-huyet-ap-720.webp 720w, /images/do-huyet-ap.webp 1440w"
                  sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1440px) 48vw, 690px"
                  alt="Hộ lý đo huyết áp và theo dõi sức khỏe cho người cao tuổi tại nhà"
                  width="1440"
                  height="1080"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="card-content">
                <span className="round-icon">
                  <Icon name="home" />
                </span>
                <h2>Nhiều gia đình cần người chăm sóc</h2>
                <p>
                  Người cao tuổi, người bệnh sau xuất viện và những thành viên
                  cần hỗ trợ trong gia đình ngày càng cần được chăm sóc đúng
                  cách, an toàn và tận tâm.
                </p>
              </div>
            </article>
          </section>
          <div className="connection" aria-hidden="true">
            {concept && (
              <img
                className="concept-ribbon"
                src={`/shapes/concepts/ribbon-${concept}.svg`}
                alt=""
              />
            )}
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="line">
                  <stop stopColor="#ff9434" />
                  <stop offset="1" stopColor="#ff4771" />
                </linearGradient>
              </defs>
              <path className="wave-soft" d="M-30 14Q260 145 550 65T1230 64" />
              <path className="wave-thin" d="M-30 34Q260 165 550 85T1230 84" />
              <path
                className="connecting-arrow"
                d="M330 10C330 115 510 75 610 55S755 49 780 100m-21-10 21 10 2-23"
              />
              <circle cx="330" cy="10" r="6" fill="#ff9434" />
            </svg>
          </div>
          <section
            id="chuong-trinh"
            className="program"
            aria-labelledby="program-title"
          >
            <div className="program-copy">
              <h2 id="program-title">
                Ngành hộ lý là cánh cửa
                <br />
                <span className="gradient-text">kết nối hai nhu cầu ấy</span>
              </h2>
              <p>
                ChămSóc247 mong muốn mở ra cơ hội học nghề cho người lao động,
                đồng thời góp phần đáp ứng nhu cầu chăm sóc ngày càng lớn của xã
                hội.
                <br />
                Từ đào tạo đến cơ hội việc làm, chúng tôi hướng tới tạo sinh kế
                bền vững và giá trị cộng đồng.
              </p>
              <div className="scholarship">
                <Icon name="cap" />
                <div>
                  <h3>
                    Hỗ trợ 100% học phí <span>qua ChămSóc247</span>
                  </h3>
                  <p>
                    Chương trình <strong>3 tháng</strong> – trị giá{" "}
                    <strong>25 triệu đồng.</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="program-visual">
              {concept && (
                <img
                  className="concept-frame solution-frame"
                  src={`/shapes/concepts/solution-${concept}-frame.svg`}
                  alt=""
                  aria-hidden="true"
                />
              )}
              <div className="photo-orbit">
                <img
                  src="/images/cham-soc-vai.webp"
                  srcSet="/images/cham-soc-vai-720.webp 684w, /images/cham-soc-vai.webp 1222w"
                  sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1440px) 48vw, 690px"
                  alt="Hộ lý chăm sóc vai cho người cao tuổi trong không gian gia đình"
                  width="1222"
                  height="1287"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="quote handwritten">
                Nghề hộ lý
                <br />
                kết nối yêu thương
                <br />
                và tạo giá trị
                <br />
                cho cộng đồng <span>♡</span>
              </p>
            </div>
          </section>
          <div className="actions">
            <button
              className="cta primary"
              onClick={() => setDialog("register")}
            >
              <Icon name="person" />
              Đăng ký tham gia
              <Icon name="arrow" />
            </button>
            <button
              className="cta secondary"
              onClick={() => setDialog("learn")}
            >
              <Icon name="book" />
              Tìm hiểu chương trình
              <Icon name="arrow" />
            </button>
          </div>
          <section
            className="facts"
            aria-label="Thông tin nhanh về chương trình"
          >
            {facts.map(([icon, title, desc]) => (
              <article className={`fact ${icon}`} key={icon}>
                <Icon name={icon} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </section>
          <p className="draft-note">
            Bản xem trước Block 1 · Sử dụng ảnh do ChămSóc247 cung cấp. Logo
            chính thức sẽ được cập nhật sau.
          </p>
        </main>
        <svg
          className="bottom-wave"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 0Q280 160 700 70T1440 0V100H0" fill="#ffe4cf" />
          <path d="M0 45Q400 150 800 83T1440 35V100H0" fill="#fff0df" />
        </svg>
      </div>
      {dialog && (
        <InfoDialog onClose={() => setDialog(null)}>
          <div className="dialog-box">
            <button
              autoFocus
              className="dialog-close"
              aria-label="Đóng thông tin"
              onClick={() => setDialog(null)}
            >
              <Icon name="close" />
            </button>
            <p className="eyebrow">CHĂMSÓC247</p>
            <h2 id="dialog-title">
              {dialog === "register"
                ? "Đăng ký tham gia"
                : "Chương trình đào tạo hộ lý"}
            </h2>
            <p>
              {dialog === "register"
                ? "Kênh tiếp nhận đăng ký chính thức sẽ được bổ sung khi có thông tin liên hệ từ ChămSóc247. Bản xem trước này chưa thu thập thông tin cá nhân."
                : "Chương trình 3 tháng, kết hợp trực tiếp và trực tuyến; có hình thức học tập trung hoặc bán thời gian tại Hà Nội và TP.HCM theo nội dung thiết kế tham chiếu."}
            </p>
            <button className="cta primary" onClick={() => setDialog(null)}>
              Đã hiểu
              <Icon name="arrow" />
            </button>
          </div>
        </InfoDialog>
      )}
    </>
  );
}
