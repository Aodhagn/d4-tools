import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncStatus } from "../app/interface";
import { DamageSource, NecromancerDamageSources } from "./interface";

export interface AppDataState {
  readonly loadStatus: AsyncStatus;
  readonly data: AppData;
}

export interface AppData {
  commonDamageSources: DamageSource[],
  necromancerDamageSources: DamageSource[],
}

const initialState: AppDataState = {
  loadStatus: AsyncStatus.NONE,
  data: {
    commonDamageSources: [],
    necromancerDamageSources: [],
  },
};

const getAppData = async (): Promise<AppData> => {
  return {
    commonDamageSources: [],
    necromancerDamageSources: NecromancerDamageSources,
  }
}

export const refreshAppData = createAsyncThunk(
  'appData/refresh',
  async (): Promise<AppData> => {
    return getAppData();
  }
)

export const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {

  },
  extraReducers: builder =>
    builder
      .addCase(refreshAppData.pending, state => {
        state.loadStatus = AsyncStatus.LOADING
      })
      .addCase(refreshAppData.fulfilled, (state, action: PayloadAction<AppData>) => {
        console.log(action);
        state.data = action.payload;
        state.loadStatus = AsyncStatus.IDLE;
      })
});

export default appDataSlice.reducer;