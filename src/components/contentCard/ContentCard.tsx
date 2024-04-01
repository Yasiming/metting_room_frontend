import React, { ReactNode } from "react";
import { CardDiv, Title } from "./style";
type PropsType = {
  children: ReactNode;
  title: string;
};

const ContentCard: React.FC<PropsType> = ({ children, title }) => {
  return (
    <CardDiv>
      <Title>{title}</Title>
      <div style={{ padding: "0 20px" }}>{children}</div>
    </CardDiv>
  );
};

export default ContentCard;
