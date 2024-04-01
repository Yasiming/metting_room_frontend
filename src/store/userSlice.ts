import { LoginUserVo } from "@/service/user-service";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {} as LoginUserVo;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setToken: (state, action) => {
      console.log(action.payload.access_token);

      if (action.payload.access_token) {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
      }
    },
    initUserInfo() {
      return initialState;
    },
  },
});

export const { updateUserInfo, initUserInfo, setToken } = userSlice.actions;
export default userSlice.reducer;
