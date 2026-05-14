# Coding Standard & Convention — web-backoffice-rider

> **Audience:** All frontend developers working on this project.  
> **Purpose:** Ensure consistent code style, improve readability, reduce review time, and make the project easier to maintain.

---

## Naming Case Styles

ก่อนอ่าน convention ควรรู้จัก case style พื้นฐานที่ใช้ในโปรเจกต์:

| Style | รูปแบบ | ตัวอย่าง |
|---|---|---|
| **PascalCase** | ทุกคำขึ้นต้นด้วยตัวพิมพ์ใหญ่ ไม่มีตัวคั่น | `OrderHistoryListPage`, `RiderProfilesTable` |
| **camelCase** | คำแรกพิมพ์เล็ก คำถัดไปขึ้นต้นด้วยพิมพ์ใหญ่ | `orderHistory`, `handleSearchChange` |
| **SCREAMING_SNAKE_CASE** | ทุกตัวพิมพ์ใหญ่ คั่นด้วย underscore | `COLORS`, `ORDER_STATUS`, `SEARCH_DEBOUNCE_MS` |
| **kebab-case** | ทุกตัวพิมพ์เล็ก คั่นด้วย hyphen | `/app/order-history`, `order-history/data` |

---

## Table of Contents

1. [File Naming](#1-file-naming)
2. [Folder Naming](#2-folder-naming)
3. [Component Naming](#3-component-naming)
4. [Hook Naming](#4-hook-naming)
5. [Service & API Function Naming](#5-service--api-function-naming)
6. [Interface & Type Naming](#6-interface--type-naming)
7. [Constant Naming](#7-constant-naming)
8. [Redux Slice & Action Naming](#8-redux-slice--action-naming)
9. [Event Handler & Callback Prop Naming](#9-event-handler--callback-prop-naming)
10. [Variable Naming](#10-variable-naming)
11. [CSS / sx Prop Patterns](#11-css--sx-prop-patterns)
12. [Import Conventions](#12-import-conventions)
13. [Quick Reference Table](#13-quick-reference-table)

---

## 1. File Naming

### Page Components — `PascalCase` + suffix `Page` + `.tsx`

**PascalCase** คือการตั้งชื่อที่ทุกคำขึ้นต้นด้วยตัวพิมพ์ใหญ่และไม่มีตัวคั่น  
ไฟล์ที่เป็น Page component ให้เติม `Page` ต่อท้ายชื่อเสมอ เพื่อบ่งบอกว่าเป็น top-level route component

```
{Domain}{Description}Page.tsx
```

> เช่น `OrderHistoryListPage.tsx`, `OrderHistoryDetailPage.tsx`, `RiderProfilesPage.tsx`, `LoginPage.tsx`, `UnauthorizedPage.tsx`

---

### Feature Components — `PascalCase` + `.tsx`

Feature component คือ component ที่มี business logic เฉพาะของ domain นั้น ๆ  
ใช้ **PascalCase** และตั้งชื่อให้สื่อว่าเป็นส่วนใดของ feature

```
{Domain}{Description}.tsx
```

> เช่น `RiderProfilesTable.tsx`, `RiderProfilesHeader.tsx`, `OrderHistoryTable.tsx`, `AssignRiderDialog.tsx`

---

### Shared UI Components — `PascalCase` + `.tsx`

Shared component คือ component กลางที่ใช้ได้หลาย domain ไม่มี business logic  
ใช้ **PascalCase** เหมือนกัน แต่ตั้งชื่อตาม UI role ของมัน

```
{UIRole}.tsx
```

> เช่น `CommonTable.tsx`, `SearchAndFilter.tsx`, `PageLayout.tsx`, `ErrorPopup.tsx`, `ConfirmPopup.tsx`, `Dialog.tsx`, `Drawer.tsx`, `Pagination.tsx`

---

### Custom Hooks — `use` prefix + `camelCase` + `.ts`

Hook ทุกตัวต้องขึ้นต้นด้วย `use` ตามด้วยชื่อในรูปแบบ **camelCase**  
**camelCase** คือคำแรกพิมพ์เล็กทั้งหมด คำถัดไปขึ้นต้นด้วยพิมพ์ใหญ่

```
use{Description}.ts
```

> เช่น `useAutoRefresh.ts`, `useAuth.ts`, `useDebounce.ts`, `usePageActivity.ts`

---

### Services — `camelCase` + suffix `Service` + `.ts`

Service file คือไฟล์ที่รวม API call function ของแต่ละ domain  
ใช้ **camelCase** และเติม `Service` ต่อท้ายเสมอ

```
{domain}Service.ts
```

> เช่น `apiService.ts`, `authService.ts`, `orderHistoryService.ts`, `riderProfilesService.ts`, `httpClientService.ts`, `responseHandlerService.ts`

---

### Utilities — `camelCase` + `.ts`

Utility คือ pure function ทั่วไปที่ไม่ผูกกับ domain  
ตั้งชื่อตาม action ที่ทำ เช่น format, parse, check

```
{action}{Target}.ts
```

> เช่น `formatDate.ts`, `formatNumber.ts`, `formatPhoneNumber.ts`, `formatString.ts`, `dataChecking.ts`, `exportFile.ts`, `jwtDecode.ts`

---

### Interface / Type Files — `camelCase` + `.ts`

ไฟล์รวม TypeScript interface และ type ของแต่ละ domain  
ตั้งชื่อตาม domain ด้วย **camelCase**

```
{domain}.ts
```

> เช่น `orderHistory.ts`, `riderProfiles.ts`, `orderTracking.ts`, `user.ts`, `responseHandler.ts`, `pageLayout.ts`, `drawer.ts`

---

### Constant Files — `camelCase` + `.constant.ts`

ไฟล์รวม constant value ต่าง ๆ เติม `.constant` เพื่อบ่งชี้ประเภทไฟล์

```
{domain}.constant.ts
```

> เช่น `color.constant.ts`, `portal.constant.ts`, `routes.constant.ts`, `status.constant.ts`, `jobType.constant.ts`

---

### Redux Slice Files — ชื่อตาย `stateSlice.ts` + `index.ts`

แต่ละ domain store จะต้องมีไฟล์คู่ `stateSlice.ts` และ `index.ts` เสมอ  
ชื่อไฟล์นี้เป็น **fixed name** ไม่ตั้งชื่อเองตาม domain

```
stores/{domain}/stateSlice.ts   ← สร้าง slice + actions + reducer
stores/{domain}/index.ts        ← re-export ออกมาให้ใช้งาน
```

> เช่น `src/stores/orderHistory/stateSlice.ts`, `src/stores/riderProfiles/stateSlice.ts`

---

## 2. Folder Naming

### Top-level `src/` folders — lowercase, functional group

ชื่อ folder ระดับบนสุดใช้ตัวพิมพ์เล็กทั้งหมด และตั้งชื่อตามหน้าที่หลักของมัน

```
src/
  assets/       ← รูป, icon, font
  components/   ← shared UI components
  configs/      ← app config, theme
  constants/    ← constant values
  features/     ← feature-specific components
  hooks/        ← custom hooks
  interfaces/   ← TypeScript types/interfaces
  pages/        ← route-level page components
  routes/       ← router config, loaders, guards
  services/     ← API services
  stores/       ← Redux store slices
  utils/        ← utility functions
```

---

### Domain/feature sub-folders — `camelCase`

Sub-folder ที่เป็น domain หรือ feature ใช้ **camelCase**  
คำแรกพิมพ์เล็ก คำถัดไปขึ้นต้นด้วยพิมพ์ใหญ่ ไม่มี hyphen หรือ underscore

```
pages/
  orderHistory/       ← ✅ camelCase
  orderTracking/
  riderProfiles/
  login/

features/
  jobManagement/
  riderProfiles/
  riderProfilesDetail/

stores/
  orderHistory/
  orderTracking/
  riderProfiles/
  auth/
  properties/

constants/
  orderHistoryConstant/
  orderTrackingConstant/
  riderProfilesConstants/
```

---

### Shared component sub-folders — lowercase

Sub-folder ภายใน `components/` ใช้ตัวพิมพ์เล็กทั้งหมด  
ตั้งชื่อตาม UI category ของ component ที่อยู่ภายใน

```
components/
  layout/     ← PageLayout, Drawer, AuthRoute
  popup/      ← ErrorPopup, ConfirmPopup, SuccessPopup
  inputs/     ← Selecter, DateInput
  table/      ← CommonTable, SearchAndFilter
  cards/      ← DateRangeDashboardCard
```

---

## 3. Component Naming

### ชื่อ function และ export

Component function ทุกตัวใช้ **PascalCase** และต้องตรงกับชื่อไฟล์เสมอ

- Page และ Feature component → `export default function`
- Shared component → `export default function` หรือ `export const` (arrow function) ก็ได้

```typescript
// Page component
export default function OrderHistoryListPage() { ... }

// Feature component
export default function RiderProfilesTable(props: RiderProfilesTableProps) { ... }

// Shared UI component
export default function PageLayout(props: PageLayoutProps) { ... }
export const Selecter = (props: SelecterProps) => { ... }
```

---

### Props type / interface

- ตั้งชื่อตาม pattern `{ComponentName}Props`
- ประกาศเป็น **named `type` หรือ `interface`** ไว้เหนือ component function เสมอ
- ห้าม inline prop type ในลายเซ็น function โดยตรง
- ห้ามใช้ `PropTypes`

```typescript
// ✅ ถูก — named interface เหนือ component
interface RiderProfilesTableProps {
  data: RiderListItem[];
  onNameSort: () => void;
}

export default function RiderProfilesTable({ data, onNameSort }: RiderProfilesTableProps) { ... }

// ❌ ผิด — inline anonymous type
export default function RiderProfilesTable({ data, onNameSort }: { data: RiderListItem[]; onNameSort: () => void }) { ... }
```

---

## 4. Hook Naming

Custom hook ทุกตัวใช้ `use` นำหน้าเสมอ (React enforces this) ตามด้วยชื่อที่สื่อความหมาย  
ชื่อไฟล์ต้องตรงกับชื่อ function export

- **File:** `use{Description}.ts`
- **Function:** `use{Description}` — เหมือนชื่อไฟล์
- **Props type:** `Use{Description}Props` — PascalCase นำด้วย `Use`

```typescript
// useAutoRefresh.ts
type UseAutoRefreshProps = {
  fetchFn: () => void;
  interval: number;
  shouldRefresh: boolean;
  idle: boolean;
};

export const useAutoRefresh = ({ fetchFn, interval, shouldRefresh, idle }: UseAutoRefreshProps) => { ... }

// useDebounce.ts — generic hook ไม่มี props type เพราะรับ generic
export function useDebounce<T extends (...args: unknown[]) => void>(mainFunction: T, delay: number) { ... }
```

---

## 5. Service & API Function Naming

### Service file

หนึ่ง domain → หนึ่ง service file ตั้งชื่อด้วย **camelCase** + `Service.ts`  
`apiService.ts` และ `httpClientService.ts` เป็น infrastructure layer — ห้าม import ออกนอก `src/services/`

```
orderHistoryService.ts
riderProfilesService.ts
orderTrackingService.ts
orderDetailService.ts
authService.ts
apiService.ts          ← HTTP wrapper — ห้ามใช้นอก services/
httpClientService.ts   ← axios instance — ห้าม import นอก services/
```

---

### API function naming — prefix บ่งบอก role

Function ใน service file ตั้งชื่อโดยใช้ **prefix** ที่บ่งบอกว่าทำอะไรกับข้อมูล:

| Prefix | บ่งบอกว่า | ตัวอย่าง |
|---|---|---|
| `api` | เรียก API โดยตรง คืนค่าเป็น `SuccessResponse<T>` ดิบ ๆ | `apiGetOrderHistoryList`, `apiGetOrderHistoryStatusFilter`, `apiUserLogin` |
| `get` | ดึงข้อมูลและ return ข้อมูลที่ unwrap/transform แล้ว | `getRiderList`, `getJobTypeOptions`, `getRiderDetail`, `getSummaryStats` |
| `export` | ดาวน์โหลดไฟล์ / blob operation | `exportOrderHistoryList`, `exportRiderOrderList` |

สูตรตั้งชื่อเต็ม: **`{prefix}{Domain}{Specificity}`**

```typescript
// orderHistoryService.ts
export const apiGetOrderHistoryList = async (params: GetOrderHistoryParams) => { ... }
export const apiGetOrderHistoryJobtypeFilter = async () => { ... }
export const apiGetOrderHistoryStatusFilter = async (params) => { ... }
export const exportOrderHistoryList = async (params: ExportOrderHistoryParams) => { ... }

// riderProfilesService.ts
export const getRiderList = async (params) => { ... }
export const getJobTypeOptions = async () => { ... }
export const getJobAssignStatusFilterOptions = async () => { ... }
export const getRiderDetail = async (params) => { ... }
export const exportRiderOrderList = async (params) => { ... }
```

---

## 6. Interface & Type Naming

### File location

Interface และ type ทั้งหมดอยู่ใน `src/interfaces/{domain}.ts`  
ห้ามนิยาม interface ขนาดใหญ่ไว้ภายใน component file

### เลือกระหว่าง `interface` กับ `type`

- ใช้ **`interface`** สำหรับ object shape ที่อาจ extend ได้
- ใช้ **`type`** สำหรับ union, alias, mapped type หรือ primitive type

### Naming patterns — ตั้งชื่อตาม role ของมัน

| Pattern | บ่งบอกว่า | ตัวอย่าง |
|---|---|---|
| `Get{Domain}{Action}Params` | Object ที่ส่งเป็น request parameter | `GetOrderHistoryParams`, `GetRiderListParams` |
| `Get{Domain}{Action}Response` | Object ที่ได้รับจาก API response | `GetOrderHistoryResponse`, `GetStatusesFilterResponse` |
| `{Domain}ApiResponse` | Raw model ตรงจาก API ก่อน mapping | `RiderListItemApiResponse`, `RiderDetailInfoApiResponse` |
| `{Domain}Item` | Model ของแต่ละแถวใน list / table | `RiderListItem`, `OrderHistoryDataRow` |
| `{Domain}State` | Shape ของ Redux slice state | `RiderProfilesState`, `RiderListState` |
| `{Component}Props` | Props ของ React component | `RiderProfilesTableProps`, `PageLayoutProps` |
| `{Domain}Filter` | Type alias สำหรับ filter value | `RiderJobTypeFilter`, `RiderJobAssignFilter` |
| `Export{Domain}Params` | Params สำหรับ export request | `ExportOrderHistoryParams`, `ExportRiderOrderListParams` |

```typescript
// src/interfaces/orderHistory.ts
interface GetOrderHistoryParams { ... }
interface GetOrderHistoryResponse { ... }
export type OrderHistoryDataRow = { ... }

// src/interfaces/riderProfiles.ts
interface RiderListItem { ... }
interface RiderListItemApiResponse { ... }   // raw API — ก่อน map
interface RiderDetailInfo { ... }
type RiderJobTypeFilter = string | null;     // union → type
type RiderJobAssignFilter = string | null;
```

Type-only import ให้ใช้ `import type` เสมอ:

```typescript
import type { RiderListItem } from "@/interfaces/riderProfiles";
```

---

## 7. Constant Naming

### Constant objects และ values — `SCREAMING_SNAKE_CASE`

`SCREAMING_SNAKE_CASE` คือทุกตัวอักษรพิมพ์ใหญ่ คั่นแต่ละคำด้วย underscore (`_`)  
ใช้กับ constant ทุกชนิด ทั้ง object และ primitive

```typescript
// color.constant.ts — object constant
export const COLORS = {
  text: { primary: "#4A7AD6", secondary: "#62646A" },
  bg:   { primary: "#FFFFFF", primaryBlue: "#5D94FF" },
  badge: { delivered: "#23A965" },
};

// routes.constant.ts
export const ROUTES: Record<string, string> = {
  'job_manage:order_tracking': '/app/monitoring-board',
  'job_manage:order_history':  '/app/order-history',
} as const;
```

### Status / label maps

Object ที่ map ค่า status หรือ label ก็ใช้ `SCREAMING_SNAKE_CASE` เช่นกัน

```typescript
// status.constant.ts
export const ORDER_STATUS = {
  DELIVERED: "4",
  CANCEL:    "5",
  PROCESSING: "6",
} as const;

// label map — ชื่อลงท้ายด้วย _LABEL
export const ORDER_STATUS_LABEL: Record<string, string> = {
  [ORDER_STATUS.DELIVERED]:  "Delivered",
  [ORDER_STATUS.CANCEL]:     "Cancel",
  [ORDER_STATUS.PROCESSING]: "Processing",
};

// jobType.constant.ts
export const JOB_TYPE_LABELS = {
  ALL:    "Riders & Runners",
  RUNNER: "Runners",
  RIDER:  "Riders",
} as const;
```

### In-component constants

Constant ที่ประกาศภายใน component หรือ hook ก็ใช้ `SCREAMING_SNAKE_CASE` เหมือนกัน  
Duration ลงท้ายด้วย `_MS` เพื่อระบุหน่วย

```typescript
const SEARCH_DEBOUNCE_MS = 1000;
```

---

## 8. Redux Slice & Action Naming

### Slice file structure

ทุก domain store ต้องมีคู่ `stateSlice.ts` + `index.ts` และ register reducer ใน `src/stores/rootReducer.ts`

```
stores/
  orderHistory/
    stateSlice.ts   ← createSlice → actions → reducer export
    index.ts        ← re-export ออกให้ใช้จากภายนอก
  riderProfiles/
    stateSlice.ts
    index.ts
  auth/
    sessionSlice.ts ← ข้อยกเว้น: auth ใช้ sessionSlice.ts
    index.ts
```

### Slice `name` field — `"domain"` หรือ `"domain/feature"`

ค่า `name` ใน `createSlice` ใช้เป็น namespace ใน Redux DevTools  
ใช้ **kebab-case** (lowercase + hyphen) หรือ camelCase ก็ได้ ขึ้นกับว่า domain นั้นมีหลาย slice หรือไม่

```typescript
createSlice({ name: "order-history/data", ... })   // หลาย slice ใน domain เดียว
createSlice({ name: "riderProfiles", ... })         // domain เดียว slice เดียว
createSlice({ name: "auth/session", ... })
createSlice({ name: "properties/state", ... })
```

### Action naming — verb + noun

Action ทุกตัวใช้ **camelCase** และขึ้นต้นด้วย verb ที่บ่งบอก intent:

| Verb | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|
| `set{Property}` | อัปเดตค่าใดค่าหนึ่งใน state | `setPageIndex`, `setPageSize`, `setSearchKeyword`, `setJobTypeFilter`, `setDateFilter`, `setSortOrder` |
| `toggle{Property}` | flip boolean | `toggleModal`, `toggleLoading`, `toggleDrawer` |
| `clear{Domain}` | reset / empty slice กลับสู่ initial state | `clearOrderHistoryList`, `clearRiderList` |
| `on{Event}` | state เปลี่ยนตาม side effect / event | `onSignInSuccess`, `onSignOutSuccess` |

```typescript
const dataSlice = createSlice({
  name: "riderProfiles",
  initialState,
  reducers: {
    setRiderListData: (state, action: PayloadAction<{ data: RiderListItem[]; total: number; total_page: number }>) => { ... },
    setPageIndex:     (state, action: PayloadAction<number>) => { ... },
    setSearchKeyword: (state, action: PayloadAction<string>) => { ... },
    setJobTypeFilter: (state, action: PayloadAction<RiderJobTypeFilter>) => { ... },
    clearRiderList:   (state) => { ... },
  },
});

export const { setRiderListData, setPageIndex, setSearchKeyword, clearRiderList } = dataSlice.actions;
export default dataSlice.reducer;
```

---

## 9. Event Handler & Callback Prop Naming

### Internal event handlers — `handle` prefix

Function ที่ handle event ภายใน component ตั้งชื่อด้วย **`handle{Action}`** ใน camelCase  
`Action` คือคำที่สื่อว่า event นี้ทำอะไร

```typescript
const handleExport = async () => { ... }
const handleSearchChange = useCallback((value: string) => { ... }, [...deps])
const handleJobTypeFilterChange = useCallback((val) => { ... }, [...deps])
const handlePageChange = useCallback((newIndex: number) => { ... }, [...deps])
const handlePageSizeChange = useCallback((size: number) => { ... }, [...deps])
const handleDateFilterChange = useCallback((val) => { ... }, [...deps])
const handleNameSort = useCallback(() => { ... }, [...deps])
const handleDrawerToggle = () => { ... }
const handleUserLogin: SubmitHandler<UserLogin> = async (data) => { ... }
```

### Callback props — `on` prefix

Prop ที่เป็น callback (ส่งลงไปให้ child component) ตั้งชื่อด้วย **`on{Action}`** ใน camelCase  
สื่อว่า "เมื่อเกิด event นี้ขึ้น ให้ทำ..."

```typescript
interface RiderProfilesHeaderProps {
  onSearchChange: (val: string) => void;
  onFilterChange: (val: string) => void;
  onJobAssignFilterChange: (val: string) => void;
  onDateFilterChange: (val: DateRange) => void;
  onNameSort: () => void;
  handleExport: () => Promise<void>;   // ← ข้อยกเว้น: export prop ยังคง handle prefix
}
```

```typescript
// Call site
<RiderProfilesHeader
  onSearchChange={(val) => dispatch(setSearchKeyword(val))}
  onPageChange={(newIndex) => dispatch(setPageIndex(newIndex))}
  onFilterChange={handleJobTypeFilterChange}
  handleExport={handleExport}
/>
```

> **กฎ:** Handler ภายใน component → `handle` prefix | Callback prop ที่ส่งให้ child → `on` prefix

---

## 10. Variable Naming

### State variables (useState) — camelCase, descriptive noun

`useState` ตั้งชื่อตาม **noun** ที่สื่อว่าเก็บอะไร  
Setter ใช้ชื่อเดิมนำด้วย `set`

```typescript
const [tempSearchValue, setTempSearchValue] = useState("");
const [jobTypeOptions, setJobTypeOptions]   = useState<SelecterOption[]>([]);
const [errorPopupOpen, setErrorPopupOpen]   = useState(false);
const [errorMessage, setErrorMessage]       = useState("");
const [startDate, setStartDate]             = useState<Date | null>(new Date());
const [isExporting, setIsExporting]         = useState(false);
```

### Redux selector variables

Destructure ออกมาจาก `useAppSelector` ตั้งชื่อตาม field จริงใน state

```typescript
const { orderHistory, search, pageIndex, pageSize, total } =
  useAppSelector((state) => state.orderHistory.state.orderHistoryList);
const isLoading = useAppSelector((state: RootState) => state.properties.state.openLoading);
```

### Refs — ลงท้ายด้วย `Ref`

```typescript
const abortControllerRef = useRef<AbortController | null>(null);
const debouncedSearchRef = useRef(createdDebouncedSearch);
const requestIdRef       = useRef(0);
```

### Mapping / transformation functions — `map` prefix

Function ที่แปลง data จาก shape หนึ่งไปอีก shape หนึ่งใช้ prefix **`map`**

```typescript
const mapJobTypeOptions = (options: JobTypeItemResponse[]): SelecterOption[] => { ... }
const mapJobAssignOptions = (options: JobAssignStatusItemResponse[]): SelecterOption[] => { ... }
const mapRidersData = (riders: RiderListItemApiResponse[]) => { ... }
```

### General rules

- **Singular vs Plural:** ชื่อเดียว → singular (`option`, `rider`), หลายอัน → plural (`options`, `riders`)
- **Boolean:** นำด้วย `is`, `has`, หรือ `should` → `isLoading`, `isExporting`, `hasPermission`
- **ห้ามใช้ `any`** → ใช้ `unknown` แล้ว narrow type แทน
- **Duration constant:** ลงท้ายด้วย `_MS` → `SEARCH_DEBOUNCE_MS`

---

## 11. CSS / sx Prop Patterns

### Color — ใช้ `COLORS` constant หรือ MUI Joy theme token เสมอ

ห้าม hardcode hex string ใน `sx` หรือ `style`

```typescript
// ✅ ถูก
sx={{ color: COLORS.text.secondary }}
sx={{ bgcolor: COLORS.bg.primary }}

// ❌ ผิด — hardcoded hex
sx={{ color: "#62646A" }}
```

### MUI Joy Typography `level` prop

MUI Joy ใช้ `level` prop แทน `variant` หรือ `fontSize` ดังนี้:

| Level | ใช้สำหรับ |
|---|---|
| `h1` – `h3` | Page heading |
| `title1` – `title3` | Section title |
| `body1` – `body2` | Body text |
| `label1` – `label2` | Small label / caption |

### Common layout patterns

```typescript
// Flex row
sx={{ display: "flex", alignItems: "center", gap: 1.5 }}

// Flex center (ทั้งแนวนอนและแนวตั้ง)
sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}

// Responsive display
sx={{ display: { xs: "block", xl: "none" } }}

// Spacing — MUI shorthand (หน่วยเป็น theme spacing = 8px)
px={3}   // paddingLeft + paddingRight = 24px
py={3}   // paddingTop + paddingBottom = 24px
p={4}    // padding all sides = 32px
mt={1}   // marginTop = 8px
gap={1}  // gap = 8px
```

### Table sx

```typescript
sx={{
  minWidth: "max-content",
  tableLayout: "auto",
  "& th, & td": { whiteSpace: "nowrap" },
}}
```

---

## 12. Import Conventions

### ลำดับ import — 4 กลุ่ม เรียงจาก external → internal → local

```typescript
// 1. React และ React ecosystem
import { useState, useCallback, useRef } from "react";

// 2. Third-party libraries
import { Box, Typography, Button } from "@mui/joy";

// 3. Internal — stores, services, interfaces, constants, utils
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setPageIndex, clearRiderList } from "@/stores/riderProfiles";
import type { RiderListItem } from "@/interfaces/riderProfiles";
import { COLORS } from "@/constants/color.constant";

// 4. Local — relative import ภายใน feature/page เดียวกัน
import RiderProfilesTable from "./RiderProfilesTable";
```

### กฎที่ต้องทำตาม

- ใช้ **`import type { Foo }`** สำหรับ type-only import เสมอ
- ห้าม import render component จาก `@mui/material` (ยกเว้น `useMediaQuery` hook เท่านั้น)
- ห้าม import `httpClientService` นอก `src/services/`

---

## 13. Quick Reference Table

| สิ่งที่ตั้งชื่อ | Pattern | ตัวอย่าง |
|---|---|---|
| Page file | `PascalCasePage.tsx` | `OrderHistoryListPage.tsx` |
| Feature component file | `PascalCase.tsx` | `RiderProfilesTable.tsx` |
| Shared component file | `PascalCase.tsx` | `ErrorPopup.tsx` |
| Hook file | `useCamelCase.ts` | `useAutoRefresh.ts` |
| Service file | `camelCaseService.ts` | `orderHistoryService.ts` |
| Util file | `camelCase.ts` | `formatDate.ts` |
| Interface/type file | `camelCase.ts` | `orderHistory.ts` |
| Constant file | `camelCase.constant.ts` | `color.constant.ts` |
| Redux slice file | `stateSlice.ts` *(fixed)* | `stores/orderHistory/stateSlice.ts` |
| Domain folder | `camelCase/` | `orderHistory/`, `riderProfiles/` |
| Component function | `PascalCase` | `OrderHistoryListPage` |
| Props type/interface | `{Component}Props` | `RiderProfilesTableProps` |
| Hook function | `useCamelCase` | `useAutoRefresh` |
| API function (direct call) | `api{Verb}{Domain}` | `apiGetOrderHistoryList` |
| API function (data fetch) | `get{Domain}{Specificity}` | `getRiderOrderList` |
| API function (export) | `export{Domain}` | `exportOrderHistoryList` |
| Interface — request params | `Get{Domain}{Action}Params` | `GetOrderHistoryParams` |
| Interface — response | `Get{Domain}{Action}Response` | `GetOrderHistoryResponse` |
| Interface — raw API model | `{Domain}ApiResponse` | `RiderListItemApiResponse` |
| Constant object | `SCREAMING_SNAKE_CASE` | `COLORS`, `ORDER_STATUS`, `JOB_TYPE_LABELS` |
| Redux action — set | `set{Property}` | `setPageIndex`, `setSearchKeyword` |
| Redux action — toggle | `toggle{Property}` | `toggleLoading`, `toggleDrawer` |
| Redux action — clear | `clear{Domain}` | `clearOrderHistoryList` |
| Redux action — event | `on{Event}` | `onSignInSuccess` |
| Event handler (internal) | `handle{Action}` | `handleExport`, `handleSearchChange` |
| Callback prop | `on{Action}` | `onPageChange`, `onSearchChange` |
| Boolean state | `is` / `has` / `should` prefix | `isLoading`, `isExporting` |
| Ref variable | `camelCaseRef` | `abortControllerRef`, `requestIdRef` |
| Duration constant | `NAME_MS` | `SEARCH_DEBOUNCE_MS` |

