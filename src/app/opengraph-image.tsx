import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "KSD - Khidma Service Digital | Agence Digitale au Sénégal";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1E3A5F 0%, #152A45 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #F97316 0%, transparent 50%), radial-gradient(circle at 75% 75%, #F97316 0%, transparent 50%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px",
          }}
        >
          {/* Logo Image */}
          <img
            src="https://khidmaservices.com/images/logo_khidma_services.png"
            alt="KSD Logo"
            width={200}
            height={200}
            style={{
              marginBottom: "20px",
              objectFit: "contain",
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "20px",
              maxWidth: "900px",
            }}
          >
            Khidma Service Digital
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "28px",
              color: "#F97316",
              marginBottom: "30px",
            }}
          >
            Agence Digitale au Sénégal
          </div>

          {/* Services */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["Développement Web", "Marketing Digital", "Design Graphique", "Communication"].map(
              (service) => (
                <div
                  key={service}
                  style={{
                    padding: "10px 24px",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "30px",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  {service}
                </div>
              )
            )}
          </div>

          {/* Location */}
          <div
            style={{
              marginTop: "40px",
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            📍 Dakar & Louga, Sénégal
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #F97316 0%, #1E3A5F 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
