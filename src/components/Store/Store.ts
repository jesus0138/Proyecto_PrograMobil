import { configureStore } from '@reduxjs/toolkit';
import usuarioSlice from './UsuarioSlices';
import usuariosSlicecreate from './CreateUsuarioSlices';
import HerramientasSlice from './HerramientasSlide';

export const store = configureStore({
  reducer: {
    // aquí van los slices
    usuario: usuarioSlice,
    usuarios: usuariosSlicecreate,
    herramientas: HerramientasSlice, // Agrega el slice de herramientas aquí
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
