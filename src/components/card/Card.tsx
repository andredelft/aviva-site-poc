import { ReactNode } from "react";

type CardProps = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
};

export function Card({ title, description, ctaLabel, href }: CardProps) {
  return (
    <a className="card" href={href}>
      <span className="card__title">{title}</span>
      <span className="card__description">{description}</span>
      <span className="card__cta">{ctaLabel}</span>
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
