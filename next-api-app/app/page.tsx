// app/page.tsx
import Link from "next/link";

// 天気情報を表示する対象の都市リスト
// 今回は MVP として 3 都市だけ固定で扱う
const cities = [
  {
    id: "tokyo",
    nameJa: "東京",
    nameEn: "Tokyo",
  },
  {
    id: "osaka",
    nameJa: "大阪",
    nameEn: "Osaka",
  },
  {
    id: "sapporo",
    nameJa: "札幌",
    nameEn: "Sapporo",
  },
];

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "center",
        backgroundColor: "#0f172a",
        color: "#f9fafb",
      }}
    >
      {/* ページタイトル */}
      <header style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Next.js 天気アプリ（MVP）
        </h1>
        <p style={{ fontSize: "0.95rem", color: "#cbd5f5", maxWidth: "480px" }}>
          対象の都市を選ぶと、その都市の現在の天気情報を外部API（Open-Meteo）から取得して表示します。
        </p>
      </header>

      {/* 都市一覧カード */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          width: "100%",
          maxWidth: "720px",
        }}
      >
        {cities.map((city) => (
          <Link
            key={city.id}
            href={`/weather/${city.id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <article
              style={{
                borderRadius: "0.75rem",
                padding: "1.2rem 1.4rem",
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(56,189,248,0.12))",
                border: "1px solid rgba(148,163,184,0.4)",
                transition: "transform 0.1s ease-out, box-shadow 0.1s ease-out",
                boxShadow: "0 8px 20px rgba(15,23,42,0.7)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: "0.25rem",
                }}
              >
                {city.nameJa} <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>({city.nameEn})</span>
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#e5e7eb", marginBottom: "0.35rem" }}>
                現在の天気・気温を確認できます。
              </p>
              <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                詳細ページへ ▶
              </p>
            </article>
          </Link>
        ))}
      </section>

      <footer style={{ marginTop: "auto", fontSize: "0.75rem", color: "#9ca3af" }}>
        Powered by Next.js &amp; Open-Meteo API
      </footer>
    </main>
  );
}