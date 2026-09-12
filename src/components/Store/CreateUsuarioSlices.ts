import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Usuario {
  id: number;
  nombreUsuario: string;
  rolId: number;
  procesoId: number | null;
}

interface UsuariosState {
  lista: Usuario[];
}

const initialState: UsuariosState = {
  lista: [],
};

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    setUsuarios: (state, action: PayloadAction<Usuario[]>) => {
      state.lista = action.payload;
    },
    agregarUsuario: (state, action: PayloadAction<Usuario>) => {
      state.lista.push(action.payload);
    },
  },
});

export const { setUsuarios, agregarUsuario } = usuariosSlice.actions;
export default usuariosSlice.reducer;