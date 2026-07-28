"use client";

import dynamic from "next/dynamic";

const Navigation = dynamic(
  () => import("@/components/layout/Navigation").then((m) => m.Navigation),
  {
    ssr: false,
    loading: () => (
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          zIndex: 50,
          backgroundColor: "transparent",
        }}
      />
    ),
  }
);

export function NavigationWrapper() {
  return <Navigation />;
}
