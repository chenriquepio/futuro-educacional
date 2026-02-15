"use client";

import dynamic from "next/dynamic";
import config from "../../../sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a1a",
          color: "#fff",
        }}
      >
        Carregando Studio…
      </div>
    ),
  }
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}

