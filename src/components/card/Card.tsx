import { ReactNode, useEffect, useRef } from "react";

type CardProps = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
};

function drawCardBackground(canvas: HTMLCanvasElement, container: HTMLElement) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  const { offsetWidth: width, offsetHeight: height } = container;

  canvas.width = width;
  canvas.height = height;

  ctx.strokeStyle = "#1672f3";
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, [40]);
  ctx.fillStyle = "#1672f3";
  ctx.fill();
  ctx.stroke();
}

export function Card({ title, description, ctaLabel, href }: CardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLAnchorElement>(null);

  function handleDraw() {
    if (!canvasRef.current || !containerRef.current) {
      return;
    }

    drawCardBackground(canvasRef.current, containerRef.current);
  }

  useEffect(() => {
    handleDraw();
    window.addEventListener("resize", handleDraw);

    return () => window.removeEventListener("resize", handleDraw);
  }, []);

  return (
    <a className="card curtains-plane" href={href} ref={containerRef}>
      <canvas ref={canvasRef} data-sampler="simplePlaneTexture" />
      <div className="card__description">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="card__cta">{ctaLabel}</div>
    </a>
  );
}

type RowProps = {
  children: ReactNode;
};

function CardRow({ children }: RowProps) {
  return <div className="card-row">{children}</div>;
}

Card.Row = CardRow;
