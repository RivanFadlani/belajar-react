# Redux Ecosystem — Project

## Alur Data Redux (Diagram)

```
┌─────────────────────────────────────────────────────────┐
│                       Component                         │
│            (Counter.tsx)                                │
│                                                         │
│  const counter = useSelector(selectCounter)             │
│  dispatch(increment(1))                                 │
└──────────┬──────────────────────────────────┬───────────┘
           │  baca state                      │  kirim action
           ▼                                  ▼
┌──────────────────────┐        ┌──────────────────────────┐
│     useSelector      │        │        dispatch          │
│  (ngambil data dari  │        │  (ngirim action object   │
│   Redux store)       │        │   ke store)              │
└──────────┬───────────┘        └────────────┬─────────────┘
           │                                 │ { type: "counter/increment", payload: 1 }
           ▼                                 ▼
┌──────────────────────────────────────────────────────────┐
│                       Store                              │
│                (store.ts — configureStore)                │
│                                                          │
│  state = {                                               │
│    counter: 0          ◄──── state.counter               │
│  }                                                       │
│                                                          │
│  RootReducer = combineReducers({                         │
│    counter: counterSlice.reducer                         │
│  })                                                      │
└──────────┬───────────────────────────────────────────────┘
           │  terusin action ke root reducer
           ▼
┌──────────────────────────────────────────────────────────┐
│                   Root Reducer                           │
│  (combineReducers — buatan configureStore)               │
│                                                          │
│  function rootReducer(state, action) {                   │
│    return {                                              │
│      counter: counterSlice.reducer(state.counter, action)│
│    }                                                     │
│  }                                                       │
└──────────┬───────────────────────────────────────────────┘
           │  panggil reducer masing-masing slice
           ▼
┌──────────────────────────────────────────────────────────┐
│                  Reducer Slice                           │
│           (counterSlice.ts — createSlice)                │
│                                                          │
│  name: "counter"           ◄── prefix action type        │
│  initialState: 0           ◄── nilai awal state          │
│                                                          │
│  reducers: {                                             │
│    increment: (state, action) => {                       │
│      return state + (action.payload ?? 1)                │
│    },                                                    │
│    decrement: (state, action) => {                       │
│      return state - (action.payload ?? 1)                │
│    }                                                     │
│  }                                                       │
└──────────┬───────────────────────────────────────────────┘
           │  simpan state baru
           ▼
┌──────────────────────┐
│    State Baru        │
│  { counter: 1 }      │
└──────────────────────┘
           │  notify subscriber (React component)
           ▼
┌─────────────────────────────────────────────────────────┐
│                  Component Re-render                     │
│  useSelector otomatis bandingin nilai lama vs baru      │
│  kalau beda → komponen render ulang                     │
└─────────────────────────────────────────────────────────┘
```

---

## Penjelasan Per Komponen

### 1. `counterSlice.ts` — createSlice

```ts
createSlice({
  name: "counter",      // prefix action type → "counter/increment"
  initialState: 0,       // nilai awal state
  reducers: {
    increment: (state, action) => state + (action.payload ?? 1),
    decrement: (state, action) => state - (action.payload ?? 1),
  },
})
```

**Apa yang terjadi:**
- `createSlice` otomatis membuat **action creator** untuk setiap fungsi di `reducers`
- Action type dibentuk dari `name` + `/` + nama fungsi (`"counter/increment"`)
- `state` di parameter reducer merujuk ke bagian state yang dikelola slice ini (dari `initialState`)
- `action` di parameter reducer berisi object `{ type, payload }` yang dikirim lewat `dispatch`

**Yang di-export:**
- `counterSlice.reducer` → didaftarkan ke configureStore
- `{ increment, decrement }` → action creator, dipakai di komponen

### 2. `store.ts` — configureStore

```ts
configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
})
```

**Apa yang terjadi:**
- `configureStore` panggil `combineReducers({ counter: counterSlice.reducer })` di belakang layar
- Key `"counter"` **menentukan nama property di state global** → `state.counter`
- `combineReducers` membuat **root reducer** yang tiap ada action akan manggil `counterSlice.reducer(state.counter, action)`
- `store.getState()` mengembalikan seluruh state → `{ counter: 0 }`

**Yang di-export:**
- `store` → dikasih ke `Provider`
- `RootState` → tipe dari `store.getState()`, dipakai di `useSelector`
- `AppDispatch` → tipe dari `store.dispatch`, dipakai untuk dispatch

### 3. `Counter.tsx` — Component

```ts
const counter = useSelector((state: RootState) => state.counter)
const dispatch = useDispatch()

dispatch(increment(1))
```

**Alur kerja:**
1. **useSelector** → membaca `state.counter` dari Redux store. Parameter `state` adalah seluruh root state (`{ counter: number }`)
2. **useDispatch** → mengembalikan fungsi `dispatch` untuk mengirim action ke store
3. Ketika tombol ditekan → `dispatch(increment(1))` → action creator menghasilkan `{ type: "counter/increment", payload: 1 }` → store terima → root reducer panggil `counterSlice.reducer(state.counter, action)` → state berubah → komponen re-render

### 4. `main.tsx` — Entry Point

```ts
<Provider store={store}>
```

- **Provider** menyediakan Redux store ke seluruh komponen di dalamnya
- Semua `useSelector` dan `useDispatch` ngakses store yang dikasih lewat Provider ini

---

## Istilah Penting

### Store
Tempat nyimpen state global. Dibikin oleh `configureStore`, isinya object `{ counter: 0 }`. Komponen gak akses langsung — lewat `useSelector` untuk baca dan `dispatch` untuk nulis.

### State
Data yang dikelola Redux. Berasal dari `initialState` slice (`0`), bisa berubah setelah reducer dijalankan. Bentuknya ditentukan oleh `combineReducers` — key di object `reducer` `configureStore` jadi property state (`state.counter`).

### Reducer
Fungsi yang mengubah state berdasarkan action. Didefinisikan di `reducers` dalam `createSlice`. Menerima `(state, action)` dan mengembalikan **state baru**. Karena `createSlice` pake Immer di belakang layar, kamu bisa nulis `state += 1` seolah-olah mutasi langsung — tapi tetap menghasilkan state baru.

Reducer cuma punya satu job: **ngambil state lama + action → ngembaliin state baru**. Gak boleh ada efek samping (fetch API, dll).

### Action
Object `{ type, payload }` yang ngasih tau reducer apa yang harus dilakukan. Dikirim dari komponen lewat `dispatch`.

- **type** — string unik, dibentuk otomatis dari `name` + `/` + nama fungsi reducer. Contoh: `"counter/increment"`. Fungsinya biar reducer tahu bagian mana yang harus dijalankan.
- **payload** — data tambahan yang dikirim bareng action. Opsional, bisa tipe apa aja (number, string, object, dll). Cuma bisa **satu nilai** — kalau butuh banyak, bungkus pake object.

### Action Creator
Fungsi yang mengembalikan action object. Dihasilkan otomatis oleh `createSlice` dari `counterSlice.actions`.

Contoh: `increment(1)` → `{ type: "counter/increment", payload: 1 }`.

Action creator cuma nerima **satu argumen** — argumen itu langsung jadi `action.payload`. Kalau butuh multi-value, bungkus jadi object: `increment({ value: 5, label: "tambah" })`.

### dispatch
Fungsi untuk ngirim action ke store. Dipanggil dari komponen: `dispatch(increment(1))`.

Alurnya: dispatch → store nerima action → root reducer dipanggil → root reducer manggil slice reducer masing-masing dengan bagian state-nya → state baru disimpan → subscriber (komponen) di-notify.

### useSelector
Hook React-Redux untuk baca state dari store. Parameter: callback `(state) => value`. Callback ini adalah **selector**.

- `state` — seluruh root state (`{ counter: number }`), ditangkap dari `store.getState()`
- `value` — apa yang kamu pilih/olah dari state, ini yang dipake komponen

`useSelector` otomatis **subscribe** ke store — kalau state berubah, komponen re-render. Tapi re-render cuma terjadi kalau value yang di-return **berbeda** dari sebelumnya (pake reference equality).

### useDispatch
Hook React-Redux untuk dapetin fungsi `dispatch` dari store. Biar gak perlu akses store langsung.

Bisa dikasih tipe `AppDispatch`: `const dispatch: AppDispatch = useDispatch()`. Gunanya biar TypeScript tahu tipe action yang bisa di-dispatch (terutama kalau pake async thunk).

### Selector
Fungsi dengan pola `(state) => value`. Bedanya dengan reducer: **reducer nulis state, selector baca state**.

Selector bisa ditulis **inline** di `useSelector` atau **diekstrak** jadi function biar reusable antar komponen:

```ts
// selector reusable
export const selectCounter = (state: RootState) => state.counter

// pake di mana aja
const counter = useSelector(selectCounter)
```

Selector juga bisa **mentransform** data sebelum dipake komponen — misal filter, hitung total, gabung data. Kalau transform-nya berat, pake `createSelector` dari Redux Toolkit yang otomatis memoize hasilnya.

### name (createSlice)
Property di `createSlice` yang jadi **prefix action type**. Contoh: `name: "counter"` → action type jadi `"counter/increment"`.

Fungsinya:
- Bikin action type unik antar slice (misal dua slice punya reducer `increment`, tapi type-nya beda: `"counter/increment"` vs `"user/increment"`)
- Gampang dilacak asalnya pas debugging di Redux DevTools

**Penting:** `name` **tidak** nentuin nama property di state. `state.counter` itu ditentukan oleh **key di object `reducer`** `configureStore`, bukan `name`.

### initialState (createSlice)
Nilai awal state yang dikelola slice. Contoh: `initialState: 0` → state mulai dari angka 0.

Juga dipake TypeScript buat **infer tipe** `state` di reducer. Kalau `initialState: 0`, maka `state` di `increment: (state) => ...` otomatis bertipe `number`. Begitu juga `initialState: { value: 0 }` → state jadi `{ value: number }`.

### combineReducers
Fungsi Redux yang menggabungkan multiple reducer jadi satu root reducer. Dipanggil **otomatis** oleh `configureStore` — kamu gak perlu panggil manual.

Cara kerjanya:

```ts
// configureStore({ reducer: { counter: counterSlice.reducer } })
// ↓ di belakang layar:
combineReducers({ counter: counterSlice.reducer })

// Kurang lebih jadi:
function rootReducer(state = {}, action) {
  return {
    counter: counterSlice.reducer(state.counter, action),
  }
}
```

- Key di object reducer (`"counter"`) → nama property di state global (`state.counter`)
- Tiap ada action, root reducer panggil **semua** slice reducer dengan bagian state-nya masing-masing
- Slice reducer cuma peduli sama bagian state-nya sendiri, gak perlu tahu bentuk root state

### Middleware
Fungsi yang nyelip di antara dispatch dan reducer — bisa ngubah, nunda, atau mencegat action sebelum nyampe ke reducer.

Default dari `configureStore`:
- **redux-thunk** — buat async logic (fetch API, timeout, dll)
- **Redux DevTools** — biar bisa inspect state dan action di browser

Kegunaan middleware lain: logging, error tracking, analytics. Untuk basic usage, default sudah cukup.

### PayloadAction\<T\>
Generic type dari `@reduxjs/toolkit` buat ngetik `action.payload` di TypeScript.

```ts
import type { PayloadAction } from "@reduxjs/toolkit"

increment: (state, action: PayloadAction<number>) => {
  // action.payload bertipe number, bukan any
  return state + action.payload
}
```

Bisa juga object: `PayloadAction<{ value: number; label: string }>` → `action.payload.value`, `action.payload.label`.

### RootState
Tipe dari seluruh state Redux. Didefinisikan di `store.ts`:

```ts
export type RootState = ReturnType<typeof store.getState>
```

Dipakai di `useSelector` biar TypeScript tahu bentuk state dan bisa ngasih autocomplete + type checking. Kalau nambah slice baru di `configureStore`, `RootState` otomatis update sesuai tambahan property.

Tanpa `RootState`, parameter `state` di `useSelector` bertipe `unknown` → error.

### AppDispatch
Tipe dari fungsi `dispatch`. Didefinisikan di `store.ts`:

```ts
export type AppDispatch = typeof store.dispatch
```

Dipakai untuk ngetik `useDispatch` biar TypeScript tahu tipe action yang bisa di-dispatch. Berguna kalau pake `createAsyncThunk` yang nambah tipe custom ke dispatch.

---

## Redux + TypeScript di Project Ini

### Pattern Standar

Ada 3 titik di mana TypeScript berperan:

**1. Store — export tipe `RootState` dan `AppDispatch`**

```ts
// store.ts
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

- `RootState` otomatis mengikuti bentuk state yang dihasilkan `combineReducers`
- Kalau kamu nambah slice baru, tipe `RootState` langsung update otomatis

**2. useSelector — kasih tipe `RootState` di parameter**

```ts
// Counter.tsx
const counter = useSelector((state: RootState) => state.counter)
```

Tanpa `RootState`, TypeScript gak tahu bentuk `state` → error `Object is of type 'unknown'`.

**3. useDispatch — kasih tipe `AppDispatch`**

```ts
const dispatch: AppDispatch = useDispatch()
```

Ini penting kalau kamu pakai `createAsyncThunk` atau middleware yang nambah tipe dispatch. Tapi untuk basic case, `useDispatch()` tanpa tipe juga jalan.

### Opsi Lebih Praktis: Custom Typed Hooks

Biar gak perlu ngetik `RootState` terus-terusan, bikin file `hooks.ts`:

```ts
// src/hooks.ts
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch } from "./store"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

Lalu di komponen:

```ts
import { useAppSelector, useAppDispatch } from "./hooks"

const counter = useAppSelector((state) => state.counter)
//                                  ^ state langsung bertipe RootState
const dispatch = useAppDispatch()
```

### Type di createSlice — Otomatis

```ts
createSlice({
  name: "counter",
  initialState: 0,        // → state otomatis bertipe number
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      // state: number (dari initialState)
      // action.payload: number (dari PayloadAction<number>)
      return state + action.payload
    },
  },
})
```

- `state` di-infer dari `initialState`
- `action` bisa dikasih tipe `PayloadAction<T>` dari `@reduxjs/toolkit` biar `action.payload` punya tipe yang benar

### Kenapa `RootState` Perlu Diexport?

Karena `configureStore` udah otomatis mindahin state dari slice ke object root:

```ts
// counterSlice → state: number
// configureStore → state: { counter: number }
//
// RootState = { counter: number }
// useSelector((state: RootState) => state.counter)
//                         ^ RootState = { counter: number }
//                                     state.counter → number
```

Dengan `RootState`, TypeScript tahu bahwa `state.counter` bertipe `number`, jadi return dari `useSelector` juga bertipe `number`.

## Catatan Penting (dari diskusi)

1. **`name` di createSlice ≠ key di configureStore** — `name` cuma prefix action type, key di `configureStore` yang nentuin `state.counter`
2. **`createAction` & `createReducer`** — sudah termasuk dalam `createSlice`, tidak perlu dipanggil manual untuk 90% kasus
3. **Middleware** — `configureStore` otomatis kasih `redux-thunk` + DevTools, nol konfigurasi untuk basic usage
4. **Selectors di createSlice** — fitur opsional, berguna biar tipe state otomatis terikat tanpa perlu `RootState`
5. **Payload** — `action.payload` bisa bernilai falsy seperti `0`, hati-hati pakai `if (action.payload)` — lebih aman `action.payload ?? 1`
