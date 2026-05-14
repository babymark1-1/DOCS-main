# Formatting & Code Style — web-backoffice-rider

> เอกสารนี้อธิบาย tool, config, และ pattern ที่ใช้ควบคุม code style ในโปรเจกต์

---

## Table of Contents

1. [Tooling Overview](#1-tooling-overview)
2. [ESLint](#2-eslint)
3. [TypeScript Strict Config](#3-typescript-strict-config)
4. [Indentation & Whitespace](#4-indentation--whitespace)
5. [Quotes](#5-quotes)
6. [Semicolons](#6-semicolons)
7. [Trailing Commas](#7-trailing-commas)
8. [Import Order](#8-import-order)
9. [Function Style](#9-function-style)
10. [Type Annotation Style](#10-type-annotation-style)
11. [Quick Checklist](#11-quick-checklist)

---

## 1. Tooling Overview

| Tool | Version | Config file | สถานะ |
|---|---|---|---|
| **ESLint** | ^9.39 | `eslint.config.js` | ✅ Active |
| **TypeScript** | ~5.9 | `tsconfig.app.json` | ✅ Strict mode |
| **Vite + SWC** | ^7 / ^4 | `vite.config.ts` | ✅ Build tool |

### ESLint คืออะไร?

**ESLint** คือ **Static Analysis Tool** สำหรับ JavaScript/TypeScript  
ทำหน้าที่อ่าน source code แล้วตรวจหา "ปัญหา" โดยไม่ต้องรันโปรแกรมจริง

**ใช้ทำอะไร:**
- จับ bug ที่อาจเกิดขึ้น เช่น ตัวแปรที่ประกาศแต่ไม่ใช้, การใช้ `any` โดยไม่ตั้งใจ
- บังคับ code style เช่น ห้าม `console.log`, ต้องใช้ `import type`
- ตรวจ React-specific rules เช่น dependency array ใน `useEffect` ครบหรือเปล่า

**ต่างจาก TypeScript อย่างไร:**  
TypeScript ตรวจ **type safety** (type ถูกต้องไหม) — ESLint ตรวจ **code quality** (เขียนดีไหม, ตามกฎที่ตั้งไว้ไหม)  
ทั้งสองทำงานเสริมกัน ต้องผ่านทั้งคู่ก่อน commit

---

### TypeScript คืออะไร?

**TypeScript** คือ JavaScript ที่เพิ่ม **static type system** เข้ามา  
TypeScript compiler (`tsc`) จะตรวจว่า type ทุกตัวถูกต้องก่อน compile เป็น JavaScript

**ใช้ทำอะไร:**
- จับ error ตั้งแต่ตอนเขียนโค้ด เช่น ส่งค่าผิด type ให้ function
- เป็น documentation ในตัว — อ่าน type signature แล้วรู้ว่า function รับอะไร คืนอะไร
- ช่วย IDE (VS Code) แนะนำ autocompletion ได้แม่นยำ

**ใน project นี้:** เปิด `strict: true` ซึ่งเปิด flag เข้มงวดทุกตัว รวมถึงห้าม `any`, บังคับ null check, และอื่น ๆ (ดูรายละเอียดใน [section 3](#3-typescript-strict-config))

---

### Vite + SWC คืออะไร?

**Vite** คือ **Build Tool และ Dev Server** สมัยใหม่ที่เร็วกว่า Webpack มาก  
ทำหน้าที่ bundle โค้ดทั้งหมดให้พร้อม deploy และ serve dev server ระหว่างพัฒนา

**SWC (Speedy Web Compiler)** คือ compiler ที่เขียนด้วย Rust แทน Babel  
ทำให้ compile TypeScript/JSX เร็วขึ้นหลายเท่าตัว

**ใช้ทำอะไร:**
- `npm run dev` → เปิด dev server พร้อม Hot Module Replacement (HMR) — แก้โค้ดแล้วเห็นผลทันทีโดยไม่ต้อง reload
- `npm run build:*` → bundle โค้ดสำหรับ deploy ขึ้น server
- อ่าน `.env.*` file แล้ว inject `VITE_*` variables เข้าไปใน build

---

## 2. ESLint

### Config format

ใช้ **Flat Config** (`eslint.config.js`) ซึ่งเป็น format ใหม่ของ ESLint v9+ ไม่ใช่ `.eslintrc`

```javascript
// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
```

### Plugin ที่ใช้

| Plugin | ทำหน้าที่ |
|---|---|
| `@eslint/js` recommended | JavaScript best practices พื้นฐาน |
| `typescript-eslint` recommended | TypeScript-specific rules เช่น no-explicit-any, consistent-type-imports |
| `eslint-plugin-react-hooks` | ตรวจ rules of hooks และ exhaustive-deps |
| `eslint-plugin-react-refresh` | ป้องกัน pattern ที่ทำให้ HMR พัง |

### ไฟล์ที่ ignore

- `dist/` — build output ถูก ignore ทั้งหมด

---

## 3. TypeScript Strict Config

`tsconfig.app.json` เปิด strict mode และ option เพิ่มเติมหลายตัวที่ส่งผลต่อ code style ที่ต้องเขียน:

### ผลที่ตามมาที่ต้องรู้

| Option | หมายความว่า |
|---|---|
| `strict: true` | ห้ามใช้ `any` โดยไม่ตั้งใจ, ต้อง narrow type, null check เสมอ |
| `noUnusedLocals` | ลบ variable ที่ไม่ใช้ออก ไม่งั้น compile error |
| `noUnusedParameters` | ถ้า parameter ไม่ใช้ ให้ prefix ด้วย `_` หรือลบออก |
| `verbatimModuleSyntax` | **บังคับ** ใช้ `import type { Foo }` สำหรับ type — ถ้าไม่ทำ error ทันที |
| `erasableSyntaxOnly` | ห้ามใช้ `enum` แบบ const enum บางอย่าง — ใช้ `as const` object แทน |

---

## 4. Indentation & Whitespace

**Standard ที่ควรใช้:** 2 spaces (ไม่ใช้ tab)

พบทั้ง 2 spaces และ 4 spaces ในโปรเจกต์ปัจจุบัน:
- `src/services/*.ts` → **2 spaces** ✅ (แนะนำ)
- `src/pages/**/*.tsx` → **4 spaces** (legacy)

```typescript
// ✅ 2 spaces — recommended
const dataSlice = createSlice({
  name: "order-history/data",
  initialState: {
    loading: false,
  },
  reducers: {
    setPageIndex: (state, action) => {
      state.orderHistoryList.pageIndex = action.payload;
    },
  },
});

// ❌ 4 spaces — legacy, ควรหลีกเลี่ยงในไฟล์ใหม่
export default function OrderHistoryList() {
    const [jobTypeFilter, setJobTypeFilter] = useState<string | null>("")
}
```

---

## 5. Quotes

**Standard ที่ควรใช้:** Double quotes `"` สำหรับ string ทั่วไป

พบทั้ง double quotes และ single quotes ในโปรเจกต์:
- `src/services/*.ts` → double quotes `"` ✅
- `src/stores/**/*.ts` → double quotes `"` ✅
- `src/pages/**/*.tsx` → single quotes `'` (legacy)

```typescript
// ✅ Double quotes — recommended
import apiService from "./apiService";
const url = `/api/v1/backoffice/riders/order-history`;
method: "get"

// ❌ Single quotes — legacy
import type { JobTypeOptions } from '../../interfaces/orderHistory';
import PageLayout from '../../components/layout/PageLayout';
```

> Template literals (backtick) ใช้ได้เสมอเมื่อต้องการ string interpolation

---

## 6. Semicolons

**Standard ที่ควรใช้:** ใช้ semicolon `;` ต่อท้ายทุก statement

พบทั้ง 2 แบบในโปรเจกต์:

```typescript
// ✅ มี semicolon — recommended
const url = `/api/v1/backoffice/riders/order-history`;
const [jobTypeFilter, setJobTypeFilter] = useState<string | null>("");

// ❌ ไม่มี semicolon — legacy (พบในบาง page files)
const dispatch = useAppDispatch()
const { orderHistory, search } = useAppSelector((state) => state.orderHistory.state.orderHistoryList)
```

---

## 7. Trailing Commas

**Standard ที่ควรใช้:** ใส่ trailing comma ใน multiline object, array, และ function parameter

```typescript
// ✅ Trailing comma ใน multiline — recommended
export const apiGetOrderHistoryList = async (
  params: GetOrderHistoryParams,   // ← trailing comma หลัง parameter สุดท้าย
): Promise<SuccessResponse<GetOrderHistoryResponse>> => {
  return apiService.fetchData<GetOrderHistoryResponse>({
    url,
    method: "get",
    params: {
      start_date: params.start_date,
      end_date: params.end_date,    // ← trailing comma หลัง property สุดท้าย
    },
  });
};

// ✅ Trailing comma ใน destructured export
export const {
  setOrderHistoryListData,
  setPageIndex,
  setSearchKeyword,
  setPageSize,
  clearOrderHistoryList,   // ← trailing comma
} = dataSlice.actions;
```

---

## 8. Import Order

ไม่มี plugin อย่าง `eslint-plugin-import` configure ไว้ แต่มี convention ที่ใช้จริงในโปรเจกต์  
ให้เรียง import เป็น 4 กลุ่ม แยกด้วย blank line และ comment

### กลุ่ม import (เรียงตามลำดับ)

```typescript
// 1. React และ React ecosystem — ไม่มี comment
import { useState, useCallback, useEffect, useRef } from 'react';

// 2. Third-party libraries — ไม่มี comment
import { Box, Typography, Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

// Interface — type-only imports
import type { JobTypeOptions, StatusOptions } from '../../interfaces/orderHistory';
import type { ErrorResponseProps } from '../../interfaces/responseHandler';

// Components
import OrderHistoryTable from '../../features/jobManagement/orderHistory/OrderHistoryTable';
import PageLayout from '../../components/layout/PageLayout';
import ErrorPopup from '../../components/popup/ErrorPopup';

// Utils
import { formatDate } from '../../utils/formatDate';
import { exportExcel } from '../../utils/exportFile';

// Redux
import { toggleLoading } from '../../stores/properties/stateSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import type { RootState } from '../../stores';

// Service
import { apiGetOrderHistoryList, exportOrderHistoryList } from '../../services/orderHistoryService';
```

### กฎสำคัญของ import

- **`import type { Foo }`** สำหรับ type-only import เสมอ — TypeScript `verbatimModuleSyntax` บังคับ
- ห้าม import render component จาก `@mui/material` (ยกเว้น `useMediaQuery` hook เท่านั้น)
- ห้าม import `httpClientService` นอก `src/services/`
- Path: ใช้ relative path (`../../`) เพราะยังไม่ได้ configure path alias `@/`

---

## 9. Function Style

### Component function — `export default function`

Page และ Feature component ใช้ function declaration ด้วย `export default function`

```typescript
// ✅ Function declaration — page & feature components
export default function OrderHistoryListPage() {
  ...
}

export default function RiderProfilesTable(props: RiderProfilesTableProps) {
  ...
}
```

### Arrow function — `export const`

Shared component หรือ component เล็ก ๆ ที่ไม่ต้องการ hoisting ใช้ arrow function

```typescript
// ✅ Arrow function — shared/utility components
export const Selecter = (props: SelecterProps) => {
  ...
}
```

### Async function — `async/await` เสมอ

ห้ามใช้ `.then().catch()` chain ใช้ `async/await` พร้อม `try/catch` เสมอ

```typescript
// ✅ async/await + try/catch
const fetchTableData = useCallback(async () => {
  dispatch(toggleLoading(true));
  try {
    const res = await apiGetOrderHistoryList({ ... });
    dispatch(setOrderHistoryListData({ ... }));
  } catch (err) {
    const error = err as ErrorResponseProps;
    setErrorMessage(error.message);
    setErrorPopupOpen(true);
  } finally {
    dispatch(toggleLoading(false));
  }
}, [...deps]);

// ❌ .then().catch() — ห้ามใช้
apiGetOrderHistoryList({ ... })
  .then((res) => { ... })
  .catch((err) => { ... });
```

### Event handler — `useCallback` สำหรับ handler ที่ส่งเป็น prop

```typescript
// ✅ useCallback สำหรับ handler ที่ส่งลงไปใน child หรือ depend ใน useEffect
const handleSearchChange = useCallback((value: string) => {
  dispatch(setSearchKeyword(value));
}, [dispatch]);

// ✅ ไม่จำเป็นต้อง useCallback สำหรับ handler ธรรมดา
const handleDrawerToggle = () => {
  setOpen((prev) => !prev);
};
```

---

## 10. Type Annotation Style

### ใช้ `interface` กับ `type` ต่างกัน

```typescript
// interface — object shape ที่อาจ extend ได้
interface RiderProfilesTableProps {
  data: RiderListItem[];
  onNameSort: () => void;
}

// type — union, alias, primitive, mapped type
type RiderJobTypeFilter = string | null;
type SortDirection = "asc" | "desc";
```

### ห้ามใช้ `any` — ใช้ `unknown` แล้ว narrow

```typescript
// ✅ unknown + narrow
} catch (err) {
  const error = err as ErrorResponseProps;
  setErrorMessage(error.message);
}

// ❌ any
} catch (err: any) {
  setErrorMessage(err.message);
}
```

### Generic type — ระบุ type argument เสมอที่ API call

```typescript
// ✅ ระบุ type
const res = await apiService.fetchData<GetOrderHistoryResponse>({ ... });
const [options, setOptions] = useState<SelecterOption[]>([]);
const abortControllerRef = useRef<AbortController | null>(null);

// ❌ ไม่ระบุ — TypeScript จะ infer เป็น unknown หรือ any
const res = await apiService.fetchData({ ... });
```

### `as const` แทน `enum`

`tsconfig.app.json` เปิด `erasableSyntaxOnly` ซึ่งจำกัดการใช้ enum บางแบบ  
ให้ใช้ `as const` object แทนเสมอ

```typescript
// ✅ as const object
export const ORDER_STATUS = {
  DELIVERED: "4",
  CANCEL: "5",
} as const;

// ❌ enum — ควรหลีกเลี่ยง
enum OrderStatus {
  DELIVERED = "4",
  CANCEL = "5",
}
```

---

## 11. Quick Checklist

ใช้ checklist นี้ก่อน commit:

### ESLint & TypeScript

- [ ] **ไม่มี `any` ที่ไม่ตั้งใจ** — ถ้า TypeScript ไม่รู้ type ให้ใช้ `unknown` แล้ว narrow ด้วย `as` หรือ type guard แทน การใช้ `any` ทำให้ type system ตรวจสอบต่อไม่ได้และ bug ซ่อนตัวได้ง่าย
- [ ] **ไม่มี unused variable หรือ unused parameter** — `noUnusedLocals` และ `noUnusedParameters` ใน tsconfig จะ error ทันที ถ้า parameter ต้องคงไว้แต่ไม่ใช้ให้ตั้งชื่อขึ้นต้นด้วย `_` เช่น `_event`
- [ ] **`import type { Foo }` สำหรับ type-only import** — `verbatimModuleSyntax` ใน tsconfig บังคับสิ่งนี้ หาก import type แบบปกติจะ error เพราะ TypeScript จะไม่ลบ import ออกจาก output โดยอัตโนมัติ

### Code Style
- [ ] Indentation ใช้ **2 spaces**
- [ ] String ใช้ **double quotes** `"`
- [ ] ทุก statement มี **semicolon** `;`
- [ ] Multiline object/array มี **trailing comma**
- [ ] ใช้ `async/await` + `try/catch` ไม่ใช้ `.then().catch()`
- [ ] **ไม่มี `console.log`** — ใช้สำหรับ debug ชั่วคราวเท่านั้น ห้าม commit ขึ้นไป `console.error` ใน catch block ยอมรับได้เพราะช่วย trace error ใน production
- [ ] **ไม่ hardcode hex color** — ใช้ `COLORS.xxx` จาก `color.constant.ts` เสมอ เพื่อให้ปรับ theme ได้จากที่เดียวและไม่มี magic string กระจายในโค้ด

### Import
- [ ] Import เรียงตาม group: React → Third-party → Interface → Components → Utils → Redux → Service
- [ ] **ไม่ import render component จาก `@mui/material`** — โปรเจกต์ใช้ `@mui/joy` เท่านั้น การปนกันทำให้ theme และ style ขัดกัน ยกเว้น `useMediaQuery` hook ที่ยังไม่มีใน Joy
- [ ] **ไม่ import `httpClientService` นอก `src/services/`** — เป็น infrastructure layer ทุก HTTP call ต้องผ่าน `apiService.fetchData<T>()` เท่านั้น
