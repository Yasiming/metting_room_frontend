import { styled } from "@@/plugin-styledComponents";

export const CardDiv = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  .card-content {
    margin-right: 10px;
    flex: 1;
    .bookings {
      position: absolute;
      bottom: 10px;
      right: 10px;
      padding: 4px 10px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .ant-card-body {
    padding: 5px 20px 20px 20px;
  }
`;
export const Title = styled.div`
  font-size: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  background: linear-gradient(to right, #66ccff, #3399ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
