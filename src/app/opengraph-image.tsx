import { ImageResponse } from "next/og";

export const alt = "SHNU Sports — Professional Cricket Gear at Affordable Prices";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #1b160c 0%, #0a0a0a 55%, #050505 100%)",
          color: "#f5f4f1",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 8, color: "#b89350", fontWeight: 600 }}>
          SHNU SPORTS
        </div>
        <div style={{ fontSize: 74, fontWeight: 700, marginTop: 24 }}>
          Professional cricket gear
        </div>
        <div style={{ fontSize: 74, fontWeight: 700, color: "#c0a062" }}>
          at affordable prices.
        </div>
        <div style={{ fontSize: 30, color: "#a6a29b", marginTop: 28 }}>
          Bats · Balls · Protective gear · Gloves · Kit bags
        </div>
      </div>
    ),
    { ...size },
  );
}
