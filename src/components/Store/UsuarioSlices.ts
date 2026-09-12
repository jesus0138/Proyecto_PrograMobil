import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UsuarioState {
  nombreUsuario: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UsuarioState = {
  nombreUsuario: null,
  token: null,
  isAuthenticated: false,
};

const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {
    setUsuario: (state, action: PayloadAction<{ nombreUsuario: string; token: string }>) => {
      state.nombreUsuario = action.payload.nombreUsuario;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.nombreUsuario = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUsuario, logout } = usuarioSlice.actions;
export default usuarioSlice.reducer;