import { Html, useProgress } from "@react-three/drei";

const LoadingProgress = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: "clamp(16px, 4vw, 32px)",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          loading...
        </div>

        {/* 百分比文字 */}
        <div
          style={{
            fontSize: "clamp(14px, 3vw, 24px)",
            fontWeight: "400",
            opacity: 0.9,
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
};

export default LoadingProgress;
