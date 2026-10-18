import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import BlockOne from "./BlockOne.jsx";
import "./style.css";
import "./creative-concepts.css";
import "./concept-a-refinement.css";
const DesignLab = lazy(() => import("./DesignLab.jsx"));
const CreativeConcept = lazy(() => import("./CreativeConcept.jsx"));
const path = location.pathname.replace(/\/$/, "");
const match = path.match(/^\/design-lab\/concept-([abc])$/);
const content = match ? (
  <CreativeConcept variant={match[1]} />
) : path === "/design-lab" ? (
  <DesignLab />
) : (
  <div className="concept concept-a">
    <BlockOne concept="a" />
  </div>
);
createRoot(document.getElementById("root")).render(
  <Suspense fallback={<p role="status">Đang tải giao diện…</p>}>
    {content}
  </Suspense>,
);
