import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../models/IBoard';
import { createBoard, deleteBoard, getBoards } from '../thunks';

interface boardsSlice {
  isModalOpen: boolean;
  boards: IBoard[];
  searchValue: string;
  isPending: boolean;
  error: string;
}

const initialState: boardsSlice = {
  isModalOpen: false,
  boards: [],
  searchValue: '',
  isPending: false,
  error: '',
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards(state, action: PayloadAction<IBoard[]>) {
      state.boards = action.payload;
    },
    setIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: {
    [getBoards.pending.type]: (state) => {
      state.isPending = true;
    },
    [getBoards.fulfilled.type]: (state, action: PayloadAction<IBoard[]>) => {
      state.isPending = false;
      state.error = '';
      state.boards = action.payload;
    },
    [getBoards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    },
    [createBoard.pending.type]: (state) => {
      state.isPending = true;
    },
    [createBoard.fulfilled.type]: (state, action: PayloadAction<IBoard[]>) => {
      state.isPending = false;
      state.error = '';
      state.boards = action.payload;
    },
    [createBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    },
    [deleteBoard.pending.type]: (state) => {
      state.isPending = true;
    },
    [deleteBoard.fulfilled.type]: (state, action: PayloadAction<IBoard[]>) => {
      state.isPending = false;
      state.error = '';
      state.boards = action.payload;
    },
    [deleteBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    },
  },
});

export default boardsSlice.reducer;