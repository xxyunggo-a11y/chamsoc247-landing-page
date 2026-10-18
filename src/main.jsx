import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import BlockOne from "./BlockOne.jsx";
import "./style.css";
const DesignLab = lazy(() => import("./DesignLab.jsx"));
const CreativeConcept = lazy(() => import("./CreativeConcept.jsx"));
const path = location.pathname.replace(/\/$/, "");
const match = path.match(/^\/design-lab\/concept-([abc])$/);
const content = match ? (
  <CreativeConcept variant={match[1]} />
) : path === "/design-lab" ? (
  <DesignLab />
) : (
  <BlockOne />
);
createRoot(document.getElementById("root")).render(
  <Suspense fallback={<p role="status">Đang tải giao diện…</p>}>
    {content}
  </Suspense>,
);
