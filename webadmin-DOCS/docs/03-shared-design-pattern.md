# Shared Design Patterns — web-backoffice-rider

> เอกสารนี้รวบรวม pattern หลักที่ใช้ซ้ำทั่วทั้งโปรเจกต์ สำหรับใช้เป็น reference เมื่อต้องสร้าง feature ใหม่

---

## Table of Contents

1. [Component Pattern](#1-component-pattern)
2. [Service Pattern](#2-service-pattern)
3. [Hook Pattern](#3-hook-pattern)
4. [State Management Pattern](#4-state-management-pattern)
5. [Error Handling Pattern](#5-error-handling-pattern)
6. [Page Pattern (รวมทุกอย่างเข้าด้วยกัน)](#6-page-pattern-รวมทุกอย่างเข้าด้วยกัน)

---

## 1. Component Pattern

### 1.1 PageLayout — Wrapper ของทุกหน้า

ทุก page ภายใต้ `/app` ต้อง wrap ด้วย `<PageLayout>` เสมอ ห้ามสร้าง header หรือ breadcrumb เอง

**Props ที่สำคัญ:**
- `paths` — object ที่กำหนด breadcrumb navigation
- `title` — ชื่อหน้า (แสดงเป็น `<h1>`)
- `options` — React node ที่จะแสดงขวาบนของ title (เช่น ปุ่ม Export)
- `openarrowback` — แสดงปุ่ม Back (ใช้ใน detail page)
- `children` — content ของหน้า

```typescript
const path = {
  nav: [{ name: "Rider Management", path: "" }],
  urlHere: "Rider Profiles",
};

<PageLayout
  paths={path}
  title="Rider Profiles"
  options={<Button onClick={handleExport}>Export</Button>}
>
  {/* content */}
</PageLayout>
```

---

### 1.2 CommonTable — Generic Table Component

`CommonTable<T>` เป็น generic component รับ type ของข้อมูลแต่ละแถว  
ไม่รู้จัก business logic ใด ๆ รับแค่ `columns` definition และ `data` array

**Column definition:**

```typescript
// ColumnDef<T> — นิยามว่าแต่ละ column แสดงอะไร
export interface ColumnDef<T> {
  id: string;
  label: React.ReactNode;         // header ของ column
  width?: string | number;
  align?: "left" | "center" | "right";
  accessor?: keyof T;             // ดึง value จาก field ตรง ๆ
  renderCell?: (item: T, index: number) => React.ReactNode; // custom render
  sortable?: boolean;
  onSort?: () => void;
}
```

**การใช้งาน:**

```typescript
const columns: ColumnDef<RiderListItem>[] = [
  { id: "name", label: "Name", accessor: "name" },
  {
    id: "status",
    label: "Status",
    renderCell: (item) => <Chip>{item.status}</Chip>,
  },
];

<CommonTable
  columns={columns}
  data={riders}
  isLoading={isLoading}
  pagination={{
    page: pageIndex,
    pageSize: pageSize,
    total: total,
    onPageChange: (page) => dispatch(setPageIndex(page)),
    onPageSizeChange: (size) => dispatch(setPageSize(size)),
  }}
/>
```

- ถ้า `data` ว่าง และ `isLoading` เป็น `false` → แสดง "No items found"
- ถ้าไม่ส่ง `pagination` prop → ไม่แสดง pagination

---

### 1.3 SearchAndFilter — Search + Filter Bar

Component กลางสำหรับ search input, dropdown filter, และ date range picker  
ทุก prop เป็น optional — ใช้เฉพาะสิ่งที่ต้องการ

```typescript
<SearchAndFilter
  // Search
  searchValue={search}
  onSearchChange={(val) => dispatch(setSearchKeyword(val))}
  searchPlaceholder="Search by Order ID"

  // Dropdown filter
  filterTitle="Job Type"
  filterOptions={jobTypeOptions}
  filterValue={jobTypeFilter}
  onFilterChange={(val) => dispatch(setJobTypeFilter(val))}

  // Date range
  showDateRange
  startDate={startDate}
  endDate={endDate}
  onStartDateChange={setStartDate}
  onEndDateChange={setEndDate}

  // Action button (แสดงมุมขวา)
  actionButton={<Button onClick={handleExport}>Export</Button>}
/>
```

---

### 1.4 Selecter — Dropdown Input

Wrapper ของ MUI Joy `<Select>` ที่รับ `options: SelecterOption[]` แทนการสร้าง `<Option>` เอง  
ปรับ width อัตโนมัติตามความยาว label ที่ยาวที่สุด

```typescript
export type SelecterOption = {
  label: string;
  value: string | number;
};

<Selecter
  placeholder="Select status"
  options={statusOptions}
  value={statusFilter}
  onChange={(_event, newValue) => dispatch(setStatusFilter(newValue))}
/>
```

---

### 1.5 Popup Components

มี 4 popup สำเร็จรูปใน `src/components/popup/`:

| Component | ใช้เมื่อ | Auto-close |
|---|---|---|
| `ErrorPopup` | API error, validation error | ✅ 2 วินาที (ปรับได้) |
| `SuccessPopup` | บันทึกสำเร็จ, action สำเร็จ | ✅ |
| `WarningPopup` | แจ้งเตือนก่อนดำเนินการ | ❌ |
| `ConfirmPopup` | ยืนยันการกระทำที่ย้อนกลับไม่ได้ | ❌ |

**ErrorPopup — pattern ที่ใช้ทุกหน้า:**

```typescript
// State
const [errorPopupOpen, setErrorPopupOpen] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

// เปิด popup
setErrorMessage(error.message);
setErrorPopupOpen(true);

// JSX
<ErrorPopup
  open={errorPopupOpen}
  onClose={() => setErrorPopupOpen(false)}
  title={errorMessage}
/>
```

**ConfirmPopup — pattern สำหรับ destructive action:**

```typescript
<ConfirmPopup
  open={confirmOpen}
  title="ยืนยันการลบ?"
  onConfirm={handleDelete}
  onClose={() => setConfirmOpen(false)}
  loading={isDeleting}
  confirmText="Delete"
  cancelText="Cancel"
>
  การกระทำนี้ไม่สามารถย้อนกลับได้
</ConfirmPopup>
```

---

## 2. Service Pattern

### 2.1 HTTP Stack

```
Component / Page
    ↓ calls
Domain Service (e.g. riderProfilesService.ts)
    ↓ calls
apiService.fetchData<T>()
    ↓ calls
httpClientService (axios instance)
    ↓
API Server
```

- **ห้าม** เรียก `httpClientService` หรือ `axios` โดยตรงจาก component
- **ห้าม** import `httpClientService` นอก `src/services/`

---

### 2.2 apiService — Core HTTP Wrapper

`apiService.fetchData<T>()` รับ `AxiosRequestConfig` และคืน `Promise<SuccessResponse<T>>`  
ทุก HTTP call ต้องผ่านที่นี่เสมอ

```typescript
// apiService.ts
const apiService = {
  async fetchData<Response>(
    param: AxiosRequestConfig,
  ): Promise<SuccessResponse<Response>> {
    const response = await httpClient.request<Response>(param);
    return formatResponse<Response>(response);
  },
};
```

---

### 2.3 Domain Service — รูปแบบการเขียน

แต่ละ domain มี service file ของตัวเอง แต่ละ function เป็น `async` และระบุ return type ชัดเจน

```typescript
// riderProfilesService.ts

// api prefix → คืน SuccessResponse<T> ดิบ
export const apiGetRiderList = async (
  params: GetRiderListParams,
): Promise<SuccessResponse<GetRiderListResponse>> => {
  return apiService.fetchData<GetRiderListResponse>({
    url: `/api/v1/backoffice/riders`,
    method: "get",
    params: { ... },
    signal: params.signal,
  });
};

// get prefix → unwrap/transform แล้วคืน data ตรง ๆ
export const getRiderList = async (params) => {
  const res = await apiService.fetchData<GetRiderListResponse>({ ... });
  return res.data;
};

// export prefix → file download
export const exportRiderOrderList = async (params) => {
  return apiService.fetchData<Blob>({
    url: `/api/v1/backoffice/riders/export`,
    method: "get",
    responseType: "blob",
    params: { ... },
  });
};
```

---

### 2.4 Response Shape

```typescript
// SuccessResponse<T>
interface SuccessResponse<T> {
  data: T;
  status: number;
  message: string;
  headers?: { "content-disposition"?: string };
}

// ErrorResponseProps
interface ErrorResponseProps {
  status: number;
  code: string;
  message: string;
  title: string;
}
```

---

## 3. Hook Pattern

### 3.1 useAppDispatch / useAppSelector — Typed Redux Hooks

**ห้ามใช้** `useDispatch` / `useSelector` ดิบ ให้ใช้ typed version จาก `src/stores/hooks.ts` เสมอ

```typescript
// src/stores/hooks.ts
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// การใช้งาน
const dispatch = useAppDispatch();
const { riders, pageIndex } = useAppSelector(
  (state) => state.riderProfiles.riderList,
);
```

---

### 3.2 useDebounce — Debounce Search Input

ใช้ป้องกัน API call ถี่เกินไปเมื่อ user พิมพ์ใน search box

```typescript
const SEARCH_DEBOUNCE_MS = 1000;

// สร้าง debounced function ครั้งเดียว เก็บใน ref เพื่อไม่ให้สร้างใหม่ทุก render
const createdDebouncedSearch = useDebounce((value: string) => {
  dispatch(setSearchKeyword(value));
  dispatch(setPageIndex(1));
}, SEARCH_DEBOUNCE_MS);
const debouncedSearchRef = useRef(createdDebouncedSearch);
const debouncedSearch = debouncedSearchRef.current;

// เมื่อ input เปลี่ยน — อัปเดต UI ทันที แต่ dispatch หลัง debounce
const handleSearchChange = useCallback((value: string) => {
  setTempSearchValue(value);  // update local state ทันที (ให้ input ไม่กระตุก)
  debouncedSearch(value);     // dispatch หลัง debounce
}, [debouncedSearch]);
```

---

### 3.3 useAutoRefresh — Polling / Auto Refresh

ใช้ใน real-time page เช่น Order Tracking  
หยุด refresh อัตโนมัติเมื่อ `shouldRefresh` เป็น `false` หรือ user idle

```typescript
useAutoRefresh({
  fetchFn: fetchTableData,   // function ที่จะเรียกซ้ำ ๆ
  interval: 30,              // ทุก 30 วินาที
  shouldRefresh: true,       // เปิด/ปิด auto refresh
  idle: isUserIdle,          // หยุดเมื่อ user ไม่ได้ใช้งาน
});
```

---

### 3.4 useAuth — Navigation หลัง Login/Logout

```typescript
const { redirectToLoginPage, onLoginSuccess } = useAuth();

// หลัง login สำเร็จ — redirect หลัง 2 วินาที
onLoginSuccess("/app/order-history");

// เมื่อ session หมดอายุ — กลับ login page
redirectToLoginPage();
```

---

## 4. State Management Pattern

### 4.1 โครงสร้าง Redux Store

```
stores/
  rootReducer.ts       ← combineReducers ทุก domain
  index.ts             ← configureStore + export RootState, AppDispatch
  hooks.ts             ← useAppDispatch, useAppSelector
  {domain}/
    stateSlice.ts      ← createSlice + actions + reducer
    index.ts           ← re-export ออกให้ใช้งาน
```

---

### 4.2 Slice Pattern — สิ่งที่ต้องมีในทุก slice

```typescript
// stateSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// 1. State interface
interface DomainState {
  loading: boolean;
  list: {
    data: DataItem[];
    total: number;
    pageIndex: number;
    pageSize: number;
    search: string;
  };
}

// 2. Initial state — export เพื่อใช้ใน clearXxx action
export const initialListData = {
  data: [],
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  search: "",
};

const initialState: DomainState = {
  loading: false,
  list: initialListData,
};

// 3. Slice
const dataSlice = createSlice({
  name: "domain",
  initialState,
  reducers: {
    setListData: (state, action: PayloadAction<{ data: DataItem[]; total: number; total_page: number }>) => {
      const { data, total, total_page } = action.payload;
      state.list = { ...state.list, data, total, pageTotal: total_page };
    },
    setPageIndex: (state, action: PayloadAction<number>) => {
      state.list.pageIndex = action.payload;
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      // reset pageIndex เมื่อ search เปลี่ยน
      if (state.list.search !== action.payload) {
        state.list.search = action.payload;
        state.list.pageIndex = 1;
      }
    },
    clearList: (state) => {
      state.list = initialListData;
    },
  },
});

// 4. Export actions และ reducer
export const { setListData, setPageIndex, setSearchKeyword, clearList } = dataSlice.actions;
export default dataSlice.reducer;
```

**กฎสำคัญของ slice:**
- filter ทุกตัวที่เปลี่ยนแล้วต้อง reset `pageIndex = 1` เสมอ (search, filter, sort)
- ตรวจ `!== action.payload` ก่อน set เพื่อป้องกัน unnecessary re-render

---

### 4.3 Global State vs Local State

| เก็บใน Redux (Global) | เก็บใน useState (Local) |
|---|---|
| ข้อมูลตาราง (list, total, pagination) | Options ของ dropdown (jobTypeOptions, statusOptions) |
| Filter / search / sort state | UI state ชั่วคราว (errorPopupOpen, isExporting) |
| Loading state (`properties/openLoading`) | `tempSearchValue` (input ก่อน debounce) |
| Auth session, user data | Form state (ใช้ react-hook-form) |

**ห้ามเก็บ** form field value ใน Redux — ใช้ `react-hook-form` เท่านั้น

---

### 4.4 Route Protection — PermissionLoader

ทุก route ภายใต้ `/app` ต้องมี `loader: PermissionLoader("feature_key", "action")`

```typescript
// routes/index.tsx
{
  path: "rider-profiles",
  element: <RiderProfilesPage />,
  loader: PermissionLoader("rider_manage:rider_profiles", "view"),
}
```

`PermissionLoader` ทำ 2 อย่าง:
1. ตรวจว่ามี session token → ถ้าไม่มี redirect ไป `/login`
2. ตรวจ permission → ถ้าไม่มีสิทธิ์ redirect ไป `/unauthorized`

ห้ามเพิ่ม auth check ซ้ำภายใน component อีก

---

## 5. Error Handling Pattern

### 5.1 Pattern มาตรฐาน — async/await + try/catch

ทุก API call ต้องอยู่ใน `try/catch` เสมอ ห้ามปล่อยให้ unhandled promise rejection

```typescript
const fetchData = useCallback(async () => {
  // 1. เปิด loading ก่อนเรียก API
  dispatch(toggleLoading(true));
  try {
    // 2. เรียก API
    const res = await apiGetOrderHistoryList({ ... });

    // 3. Dispatch result เข้า Redux
    dispatch(setOrderHistoryListData({
      data: res.data.data,
      total: res.data.total,
      total_page: res.data.total_page,
    }));
  } catch (err) {
    // 4. Cast error เป็น ErrorResponseProps
    const error = err as ErrorResponseProps;
    setErrorMessage(error?.message || "Internal server error");
    setErrorPopupOpen(true);
  } finally {
    // 5. ปิด loading เสมอ ไม่ว่าจะสำเร็จหรือไม่
    dispatch(toggleLoading(false));
  }
}, [...deps]);
```

---

### 5.2 AbortController — ป้องกัน Race Condition

fetch ที่ trigger ได้ซ้ำ (search, filter, pagination) ต้อง abort request เก่าก่อนส่ง request ใหม่

```typescript
const abortControllerRef = useRef<AbortController | null>(null);

const fetchData = useCallback(async () => {
  // 1. Abort request เก่า (ถ้ามี)
  abortControllerRef.current?.abort();

  // 2. สร้าง controller ใหม่
  const controller = new AbortController();
  abortControllerRef.current = controller;

  try {
    const res = await apiGetOrderHistoryList({
      ...params,
      signal: controller.signal,   // 3. ส่ง signal ไปกับ request
    });

    // 4. ตรวจก่อน update state — ถ้า abort แล้วไม่ต้องทำอะไร
    if (controller.signal.aborted) return;

    dispatch(setOrderHistoryListData({ ... }));
  } catch (err) {
    if (controller.signal.aborted) return; // request ถูก abort — ไม่แสดง error
    const error = err as ErrorResponseProps;
    setErrorMessage(error?.message || "Internal server error");
    setErrorPopupOpen(true);
  }
}, [...deps]);
```

---

### 5.3 Request ID Pattern — อีกวิธีป้องกัน Race Condition

ใช้เมื่อ API ไม่รองรับ `AbortSignal` หรือใช้คู่กับ AbortController

```typescript
const requestIdRef = useRef(0);

const fetchData = useCallback(async () => {
  // 1. เพิ่ม request ID ก่อนเรียก
  const requestId = requestIdRef.current + 1;
  requestIdRef.current = requestId;

  try {
    const response = await getRiderList({ ... });

    // 2. ตรวจว่าเป็น request ล่าสุดไหม
    if (requestId !== requestIdRef.current) return;

    dispatch(setRiderListData({ ... }));
  } catch (err) {
    if (requestId !== requestIdRef.current) return;
    const error = err as ErrorResponseProps;
    openErrorPopup(error?.message || "Internal server error");
  }
}, [...deps]);
```

---

### 5.4 Error Display

- **ทุก** API error แสดงผ่าน `<ErrorPopup>` เสมอ
- `console.error` ใน catch block ยอมรับได้สำหรับ debugging
- `console.log` ห้าม commit

```typescript
// State ที่ต้องมีในทุก page/feature ที่มี API call
const [errorPopupOpen, setErrorPopupOpen] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

// Helper function (optional แต่ช่วยลด boilerplate)
const openErrorPopup = useCallback((message: string) => {
  setErrorMessage(message);
  setErrorPopupOpen(true);
}, []);

// ใน JSX
<ErrorPopup
  open={errorPopupOpen}
  onClose={() => setErrorPopupOpen(false)}
  title={errorMessage}
/>
```

---

## 6. Page Pattern (รวมทุกอย่างเข้าด้วยกัน)

โครงสร้างมาตรฐานของ page component ที่มี list + filter + API call:

```typescript
// ── 1. Imports ─────────────────────────────────────────────────────────────
import { useCallback, useEffect, useRef, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import ErrorPopup from "../../components/popup/ErrorPopup";
import FeatureTable from "../../features/domain/FeatureTable";
import { getDomainList } from "../../services/domainService";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { toggleLoading } from "../../stores/properties/stateSlice";
import { setListData, setPageIndex, clearList } from "../../stores/domain";
import type { ErrorResponseProps } from "../../interfaces/responseHandler";

// ── 2. Constants ────────────────────────────────────────────────────────────
const SEARCH_DEBOUNCE_MS = 1000;

const path = {
  nav: [{ name: "Section", path: "" }],
  urlHere: "Page Title",
};

// ── 3. Component ────────────────────────────────────────────────────────────
export default function DomainListPage() {
  const dispatch = useAppDispatch();

  // ── 4. Redux state ─────────────────────────────────────────────────────
  const { data, search, pageIndex, pageSize, total } = useAppSelector(
    (state) => state.domain.list,
  );

  // ── 5. Local state ─────────────────────────────────────────────────────
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ── 6. Refs ────────────────────────────────────────────────────────────
  const abortControllerRef = useRef<AbortController | null>(null);

  // ── 7. Fetch function ──────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    dispatch(toggleLoading(true));
    try {
      const res = await getDomainList({
        page: pageIndex,
        limit: pageSize,
        search: search || undefined,
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;
      dispatch(setListData({ data: res.data, total: res.total, total_page: res.total_page }));
    } catch (err) {
      if (controller.signal.aborted) return;
      const error = err as ErrorResponseProps;
      setErrorMessage(error?.message || "Internal server error");
      setErrorPopupOpen(true);
    } finally {
      dispatch(toggleLoading(false));
    }
  }, [dispatch, pageIndex, pageSize, search]);

  // ── 8. Effects ─────────────────────────────────────────────────────────
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    return () => {
      dispatch(clearList()); // cleanup เมื่อออกจากหน้า
    };
  }, [dispatch]);

  // ── 9. Handlers ────────────────────────────────────────────────────────
  const handleExport = async () => { ... };

  // ── 10. JSX ────────────────────────────────────────────────────────────
  return (
    <PageLayout paths={path} title="Domain List" options={<Button onClick={handleExport}>Export</Button>}>
      <FeatureTable
        data={data}
        page={pageIndex}
        pageSize={pageSize}
        totalItems={total}
        onPageChange={(p) => dispatch(setPageIndex(p))}
        onSearchChange={(val) => dispatch(setSearchKeyword(val))}
      />
      <ErrorPopup
        open={errorPopupOpen}
        onClose={() => setErrorPopupOpen(false)}
        title={errorMessage}
      />
    </PageLayout>
  );
}
```
