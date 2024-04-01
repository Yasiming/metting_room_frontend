import { styled } from "@@/plugin-styledComponents";

export const HeaderBar = styled.div`
  border-bottom: 1px solid #eeeeee;
  background-color: #3c8dbc;
  margin-bottom: 20px;
  .title {
    font-size: 20px;
  }
  .ant-menu {
    background: #3c8dbc;

    .ant-menu-item {
      color: #eeeeee;
    }
    .ant-menu-item-selected {
      color: red;
    }
  }
`;

export const MentLink = styled.div`
  flex: 1 1 0%;
  min-width: 0px;
  background: rgb(60, 141, 188);
  color: rgb(255, 255, 255);
`;

export const Title = styled.div`
  font-size: 20px;
`;
