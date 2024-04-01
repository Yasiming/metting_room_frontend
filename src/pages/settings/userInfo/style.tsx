import { styled } from "@@/plugin-styledComponents";

export const ContentFlex = styled.div`
  display: flex;

  .user-form {
    width: 60%;

    .captcha {
      display: flex;
    }
  }
  .upload-avatar {
    flex: 1;
    display: flex;
    justify-content: center;

    .ant-upload-wrapper {
      width: auto !important;
    }
    .ant-upload-select {
      border-radius: 50%;
      overflow: hidden;
    }
  }
`;
