import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

export const todosSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = {
        id: action.payload.id,
        name: action.payload.name,
        username: action.payload.login,
        followers: action.payload.followers,
        public_repos: action.payload.public_repos,
        avatar_url: action.payload.avatar_url,
      };
      state.users.push(user);
    },
  },
});

export const { addUser } = todosSlice.actions;
export default todosSlice.reducer;
