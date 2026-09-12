import { configureStore } from '@reduxjs/toolkit';
import usuarioSlice from './UsuarioSlices';
import usuariosSlicecreate from './CreateUsuarioSlices';

export const store = configureStore({
  reducer: {
    // aquí van los slices
    usuario: usuarioSlice,
    usuarios: usuariosSlicecreate,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
