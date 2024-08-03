import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncStatus } from "../../app/interface";
import { API_ROOT, OAuthPayload, UserData } from "./interface";

export interface LoginState {
  readonly userData?: UserData;
  readonly showWelcome: boolean
  readonly loginStatus: AsyncStatus;
}

const initialState: LoginState = {
  showWelcome: false,
  loginStatus: AsyncStatus.NONE,
};

export const discordLogin = createAsyncThunk(
  'login/discordLogin',
  async (props: OAuthPayload): Promise<UserData> => {
    const apiResponse = await axios.post(`${API_ROOT}/user`, props);
    console.log(apiResponse);

    //await delay(1000);
    return apiResponse.data;
  }
);

export const redirectAfterMs = createAsyncThunk(
  'login/redirect',
  async (ms: number) => {
    await delay(ms);
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetShowWelcome: state => {
      state.showWelcome = false;
    },
    clearUserState: state => {
      state.userData = undefined;
    },
  },
  extraReducers: builder => 
    builder
      .addCase(discordLogin.pending, state => {
        state.loginStatus = AsyncStatus.LOADING
      })
      .addCase(discordLogin.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.userData = action.payload;
        state.loginStatus = AsyncStatus.IDLE;
        state.showWelcome = true;
      })
      .addCase(discordLogin.rejected, state => {
        state.loginStatus = AsyncStatus.FAILED;
      })
      .addCase(redirectAfterMs.fulfilled, state => {
        state.showWelcome = false
      })
});

export default loginSlice.reducer;
export const { resetShowWelcome, clearUserState } = loginSlice.actions;

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));