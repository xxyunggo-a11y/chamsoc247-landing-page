import { useEffect } from "react";
import BlockOne from "./BlockOne.jsx";
import "./creative-concepts.css";
export const concepts = [
  {
    id: "a",
    code: "A",
    name: "Organic Editorial",
    description:
      "Gần mockup nhất: hình ảnh lớn, khung ảnh hữu cơ và nhịp đọc liền mạch.",
  },
  {
    id: "b",
    code: "B",
    name: "Layered Storytelling",
    description:
      "Ảnh mở câu chuyện, các nhóm nhu cầu xen kẽ và ribbon dẫn hướng.",
  },
  {
    id: "c",
    code: "C",
    name: "Expressive Premium",
    description:
      "Tiêu đề lớn tràn nhịp, bố cục lệch và nhiều lớp ảnh có chiều sâu.",
  },
];
export default function CreativeConcept({ variant }) {
  const item = concepts.find((c) => c.id === variant) || concepts[0];
  const embed = new URLSearchParams(location.search).get("embed") === "1";
  useEffect(() => {
    document.title = `Phương án ${item.code} — ${item.name} | ChămSóc247`;
  }, [item]);
  return (
    <div className={`concept concept-${item.id}`}>
      {!embed && (
        <aside className="concept-review" aria-label="Chuyển phương án">
          <a href={`/design-lab?concept=${item.id}#creative-comparison`}>
            ← So sánh thiết kế
          </a>
          <strong>
            {item.code} / {item.name}
          </strong>
          <nav aria-label="Ba phương án">
            {concepts.map((c) => (
              <a
                key={c.id}
                href={`/design-lab/concept-${c.id}`}
                aria-current={c.id === item.id ? "page" : undefined}
              >
                {c.code}
              </a>
            ))}
          </nav>
          <a
            className="concept-pick"
            href={`/design-lab?concept=${item.id}&chosen=${item.id}#creative-comparison`}
          >
            Chọn phương án {item.code} ↗
          </a>
        </aside>
      )}
      <BlockOne concept={item.id} />
    </div>
  );
}
