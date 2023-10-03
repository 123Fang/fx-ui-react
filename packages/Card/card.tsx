import React, { CSSProperties } from "react";
import classNames from "classnames";
import "./style.scss";

export type CardProps = {
  style?: CSSProperties;
  size?: "default" | "small";
  cardType?: "outer" | "inner";
  className?: string;
  children?: React.ReactNode;
  cardTitle?: string;
  extraContent?: React.ReactNode;
  bordered?: boolean;
  cover?: React.ReactNode;
  shadows?: "hover" | "always" | "none";
  actions?: Array<React.ReactNode>;
};

function Card(props: CardProps): JSX.Element {
  const {
    style,
    size,
    cardType,
    className,
    children,
    cardTitle,
    extraContent,
    bordered,
    cover,
    shadows,
    actions,
  } = props;

  const cardClass = classNames("fx_card", {
    [`fx_card_shadows_${shadows}`]: true,
    [`fx_card_${size}`]: true,
    fx_card_inner:cardType === 'inner',
    fx_card_border: bordered,
    fx_card_noContent:children === null,
    [className || ""]: !!className,
  });
  return (
    <div className={cardClass} style={style || undefined}>
      {cardTitle !== "" ? (
        <header className="fx_card_header">
          {cardTitle}
          <div className="fx_card_link">{extraContent}</div>
        </header>
      ) : null}
      {cover !== null ? <div className="fx_card_cover">{cover}</div> : null}
      <main className="fx_card_main">{children}</main>
      {actions !== null ? (
        <footer className="fx_card_footer">{actions}</footer>
      ) : null}
    </div>
  );
}

Card.defaultProps = {
  style: "",
  size: "default",
  cardType:'outer',
  className: "",
  children: null,
  cardTitle: "",
  extraContent: null,
  bordered: true,
  cover: null,
  shadows: "none",
  actions: null,
};

export default Card;
