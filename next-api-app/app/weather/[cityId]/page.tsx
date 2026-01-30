// app/weather/[cityId]/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// 対象とする都市IDの型定義
type CityId = "tokyo" | "osaka" | "sapporo";

// 都市ごとの設定情報の型
type CityConfig = {
  id: CityId;
  nameJa: string;
  nameEn: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

// Open-Meteo API のレスポンスの型（今回使う最低限だけ）
type CurrentWeather = {
  temperature: number; // 気温（℃）
  windspeed: number; // 風速（km/h）
  winddirection: number; // 風向き（度）
  is_day: 0 | 1; // 昼なら1, 夜なら0
  time: string; // 観測時刻
  weathercode?: number; // 天気コード（ある場合だけ使う）
};

type WeatherApiResponse = {
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
};

// 対象都市の一覧（トップページのものとIDを揃える）
const CITY_CONFIGS: CityConfig[] = [
  {
    id: "tokyo",
    nameJa: "東京",
    nameEn: "Tokyo",
    latitude: 35.6895,
    longitude: 139.6917,
    timezone: "Asia/Tokyo",
  },
  {
    id: "osaka",
    nameJa: "大阪",
    nameEn: "Osaka",
    latitude: 34.6937,
    longitude: 135.5023,
    timezone: "Asia/Tokyo",
  },
  {
    id: "sapporo",
    nameJa: "札幌",
    nameEn: "Sapporo",
    latitude: 43.0621,
    longitude: 141.3544,
    timezone: "Asia/Tokyo",
  },
];

// cityId から対応する都市設定を取得するヘルパー関数
// cityId が undefined や不正値のときは 404 に飛ばす
function getCityConfig(cityId?: string): CityConfig {
  const city = CITY_CONFIGS.find((c) => c.id === cityId);
  if (!city) {
    notFound(); // Next.js の 404 ページへ
  }
  return city;
}

// パラメータの型（Next.js 16 では Promise で渡ってくる前提）
type WeatherPageParams = {
  cityId?: string;
};

// SSG 用：ビルド時に生成する cityId の一覧を Next.js に教える
export function generateStaticParams(): WeatherPageParams[] {
  return CITY_CONFIGS.map((city) => ({
    cityId: city.id,
  }));
}

// SSG 用：各都市ページの <title> などのメタ情報を設定
// ★ params が Promise なので await してから cityId を使う
export async function generateMetadata(
  { params }: { params: Promise<WeatherPageParams> }
): Promise<Metadata> {
  const { cityId } = await params;
  const city = getCityConfig(cityId);
  return {
    title: `天気情報 | ${city.nameJa} (${city.nameEn})`,
    description: `${city.nameJa}の現在の天気情報を表示するページです。`,
  };
}

// 天気コードを簡単な日本語に変換するヘルパー（最低限の例）
function describeWeatherCode(code: number): string {
  if (code === 0) return "快晴";
  if (code === 1 || code === 2) return "晴れ";
  if (code === 3) return "くもり";
  if (code >= 51 && code <= 67) return "霧雨・小雨";
  if (code >= 71 && code <= 77) return "雪";
  if (code >= 80 && code <= 82) return "にわか雨";
  if (code >= 95) return "雷雨";
  return "不明";
}

// メインのページコンポーネント（サーバーコンポーネント）
// ★ params は Promise なので await する
export default async function WeatherPage(
  { params }: { params: Promise<WeatherPageParams> }
) {
  const { cityId } = await params;
  const city = getCityConfig(cityId);

  // Open-Meteo API で現在の天気を取得するためのURLを組み立て
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", city.latitude.toString());
  url.searchParams.set("longitude", city.longitude.toString());
  url.searchParams.set("current_weather", "true");
  url.searchParams.set("timezone", city.timezone);

  let data: WeatherApiResponse;

  // ★ fetch が失敗する可能性を try/catch で吸収する
  try {
    // fetch はデフォルトで SSG 向けにキャッシュされる（静的生成）
    const res = await fetch(url.toString(), {
      // 開発中でも毎回取りに行きたいなら ↓ を有効にしてもOK
        cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch weather data: ${res.status}`);
    }

    data = (await res.json()) as WeatherApiResponse;
  } catch (error) {
    console.error("Weather API fetch failed", error);

    // APIが落ちている / タイムアウトなどの場合はエラーページとして表示
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          backgroundColor: "#020617",
          color: "#f9fafb",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "640px",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "0.85rem",
              color: "#93c5fd",
              textDecoration: "none",
            }}
          >
            ← 都市一覧に戻る
          </Link>
        </div>

        <header style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              marginBottom: "0.3rem",
            }}
          >
            {city.nameJa} の天気
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
            現在、天気APIから情報を取得できませんでした。
          </p>
        </header>

        <section
          style={{
            width: "100%",
            maxWidth: "640px",
            borderRadius: "1rem",
            padding: "1.5rem 1.75rem",
            background:
              "linear-gradient(135deg, rgba(148,163,184,0.25), rgba(30,64,175,0.35))",
            border: "1px solid rgba(148,163,184,0.6)",
            boxShadow: "0 20px 40px rgba(15,23,42,0.9)",
          }}
        >
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.7,
            }}
          >
            ネットワークの問題または外部APIの障害により、
            現在の天気情報を取得できませんでした。
            少し時間をおいてからページを再読み込みしてみてください。
          </p>
        </section>

        <footer
          style={{
            marginTop: "auto",
            fontSize: "0.75rem",
            color: "#9ca3af",
          }}
        >
          Powered by Next.js &amp; Open-Meteo API
        </footer>
      </main>
    );
  }

  // ここまで到達したときは data が正常に取れている
  const current = data.current_weather;
  const isDay = current.is_day === 1;
  const condition = describeWeatherCode(current.weathercode ?? 0);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        backgroundColor: "#020617",
        color: "#f9fafb",
      }}
    >
      {/* 戻るリンク */}
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "0.85rem",
            color: "#93c5fd",
            textDecoration: "none",
          }}
        >
          ← 都市一覧に戻る
        </Link>
      </div>

      {/* ヘッダー */}
      <header style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: 700,
            marginBottom: "0.3rem",
          }}
        >
          {city.nameJa} の天気
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
          {city.nameEn} / {data.timezone} ({data.timezone_abbreviation})
        </p>
      </header>

      {/* 天気カード */}
      <section
        style={{
          width: "100%",
          maxWidth: "640px",
          borderRadius: "1rem",
          padding: "1.5rem 1.75rem",
          background:
            "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(37,99,235,0.22))",
          border: "1px solid rgba(148,163,184,0.4)",
          boxShadow: "0 20px 40px rgba(15,23,42,0.9)",
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "1.2rem",
        }}
      >
        {/* 左側：数値情報 */}
        <div>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#e5e7eb",
              marginBottom: "0.4rem",
            }}
          >
            現在の天気
          </p>
          <p
            style={{
              fontSize: "2.8rem",
              fontWeight: 700,
              marginBottom: "0.4rem",
            }}
          >
            {current.temperature.toFixed(1)}℃
          </p>
          <p
            style={{
              fontSize: "1rem",
              marginBottom: "0.4rem",
            }}
          >
            状況: {condition}
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#e5e7eb",
            }}
          >
            風速: {current.windspeed.toFixed(1)} km/h
          </p>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#cbd5e1",
              marginTop: "0.6rem",
            }}
          >
            観測時刻: {current.time}
          </p>
        </div>

        {/* 右側：状態ラベル */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              padding: "0.35rem 0.8rem",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              backgroundColor: isDay
                ? "rgba(250, 204, 21, 0.2)"
                : "rgba(37, 99, 235, 0.35)",
              border: isDay
                ? "1px solid rgba(250, 204, 21, 0.6)"
                : "1px solid rgba(129, 140, 248, 0.8)",
            }}
          >
            {isDay ? "現在：昼" : "現在：夜"}
          </span>
          <span
            style={{
              fontSize: "0.8rem",
              color: "#e5e7eb",
            }}
          >
            海抜高度: {data.elevation} m
          </span>
        </div>
      </section>

      <footer
        style={{
          marginTop: "auto",
          fontSize: "0.75rem",
          color: "#9ca3af",
        }}
      >
        Powered by Next.js &amp; Open-Meteo API
      </footer>
    </main>
  );
}