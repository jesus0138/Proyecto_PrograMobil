import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Herramientas {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  tipo: string;
  color: string;
  stock: number;
  fechaAdquisicion: string;
  valor: number;
  disponible: number;
  danado: number;
  prestadoActivo: number;
}

interface HerramientasState {
  lista: Herramientas[];
}

const initialState: HerramientasState = {
  lista: [],
};

const herramientaSlice = createSlice({
  name: 'herramientas',
  initialState,
  reducers: {
    setHerramientas: (state, action: PayloadAction<Herramientas[]>) => {
      state.lista = action.payload;
    },
  },
});

export const { setHerramientas } = herramientaSlice.actions;
export default herramientaSlice.reducer;