import { styled } from "@@/plugin-styledComponents";

export const EditPasswordPage = styled.div`
  box-sizing: border-box;
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);

  .captcha {
    display: flex;
    justify-content: flex-end;
  }

  .link {
    display: flex;
    justify-content: flex-end;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;
`;
