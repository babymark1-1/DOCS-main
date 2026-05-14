import type { FC } from 'react'
import DocLayout from '../components/DocLayout'
import type { TocItem } from '../components/Toc'
import type { PageId } from '../data/navigation'

type Props = { navigate: (page: PageId) => void }

const toc: TocItem[] = [
  { id: 'component-pattern', label: 'Component Pattern', level: 2 },
  { id: 'page-layout', label: 'PageLayout', level: 3 },
  { id: 'common-table', label: 'CommonTable', level: 3 },
  { id: 'search-filter', label: 'SearchAndFilter', level: 3 },
  { id: 'popup', label: 'Popup Components', level: 3 },
  { id: 'service-pattern', label: 'Service Pattern', level: 2 },
  { id: 'http-stack', label: 'HTTP Stack', level: 3 },
  { id: 'domain-service', label: 'Domain Service', level: 3 },
  { id: 'hook-pattern', label: 'Hook Pattern', level: 2 },
  { id: 'redux-hooks', label: 'useAppDispatch / useAppSelector', level: 3 },
  { id: 'use-debounce', label: 'useDebounce', level: 3 },
  { id: 'use-auto-refresh', label: 'useAutoRefresh', level: 3 },
]

const DesignPatternPage: FC<Props> = ({ navigate }) => (
  <DocLayout
    title="Shared Design Pattern"
    description="รวบรวม pattern หลักที่ใช้ซ้ำทั่วทั้งโปรเจกต์ — สำหรับใช้เป็น reference เมื่อต้องสร้าง feature ใหม่"
    breadcrumb={['🏠', 'พื้นฐานโปรเจกต์', 'Shared Design Pattern']}
    toc={toc}
    prev="formatting"
    navigate={navigate}
  >
    <h2 id="component-pattern">1. Component Pattern</h2>

    <h3 id="page-layout">1.1 PageLayout — Wrapper ของทุกหน้า</h3>
    <p>
      ทุก page ภายใต้ <code>/app</code> ต้อง wrap ด้วย <code>&lt;PageLayout&gt;</code> เสมอ
      ห้ามสร้าง header หรือ breadcrumb เอง
    </p>
    <table>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>ใช้งาน</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>paths</code>
          </td>
          <td>object</td>
          <td>กำหนด breadcrumb navigation</td>
        </tr>
        <tr>
          <td>
            <code>title</code>
          </td>
          <td>string</td>
          <td>
            ชื่อหน้า (แสดงเป็น <code>&lt;h1&gt;</code>)
          </td>
        </tr>
        <tr>
          <td>
            <code>options</code>
          </td>
          <td>ReactNode</td>
          <td>แสดงขวาบนของ title (เช่น ปุ่ม Export)</td>
        </tr>
        <tr>
          <td>
            <code>openarrowback</code>
          </td>
          <td>boolean</td>
          <td>แสดงปุ่ม Back (ใช้ใน detail page)</td>
        </tr>
      </tbody>
    </table>
    <pre>
      <code>{`const path = {
  nav: [{ name: "Rider Management", path: "" }],
  urlHere: "Rider Profiles",
};

<PageLayout
  paths={path}
  title="Rider Profiles"
  options={<Button onClick={handleExport}>Export</Button>}
>
  {/* content */}
</PageLayout>`}</code>
    </pre>

    <h3 id="common-table">1.2 CommonTable — Generic Table Component</h3>
    <p>
      <code>CommonTable&lt;T&gt;</code> เป็น generic component รับ type ของข้อมูลแต่ละแถว
      ไม่รู้จัก business logic ใด ๆ รับแค่ <code>columns</code> definition และ <code>data</code>{' '}
      array
    </p>
    <pre>
      <code>{`// Column definition
export interface ColumnDef<T> {
  id: string;
  label: React.ReactNode;
  width?: string | number;
  align?: "left" | "center" | "right";
  accessor?: keyof T;
  renderCell?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  onSort?: () => void;
}

// Usage
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
/>`}</code>
    </pre>
    <blockquote>
      ถ้า <code>data</code> ว่าง และ <code>isLoading</code> เป็น <code>false</code> → แสดง "No
      items found" ถ้าไม่ส่ง <code>pagination</code> prop → ไม่แสดง pagination
    </blockquote>

    <h3 id="search-filter">1.3 SearchAndFilter — Search + Filter Bar</h3>
    <p>
      Component กลางสำหรับ search input, dropdown filter, และ date range picker — ทุก prop เป็น
      optional
    </p>
    <pre>
      <code>{`<SearchAndFilter
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

  // Action button (มุมขวา)
  actionButton={<Button onClick={handleExport}>Export</Button>}
/>`}</code>
    </pre>

    <h3 id="popup">1.4 Popup Components</h3>
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>ใช้เมื่อ</th>
          <th>Auto-close</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>ErrorPopup</code>
          </td>
          <td>API error, validation error</td>
          <td>✅ 2 วินาที (ปรับได้)</td>
        </tr>
        <tr>
          <td>
            <code>SuccessPopup</code>
          </td>
          <td>บันทึกสำเร็จ, action สำเร็จ</td>
          <td>✅</td>
        </tr>
        <tr>
          <td>
            <code>WarningPopup</code>
          </td>
          <td>แจ้งเตือนก่อนดำเนินการ</td>
          <td>❌</td>
        </tr>
        <tr>
          <td>
            <code>ConfirmPopup</code>
          </td>
          <td>ยืนยันการกระทำที่ย้อนกลับไม่ได้</td>
          <td>❌</td>
        </tr>
      </tbody>
    </table>
    <pre>
      <code>{`// ErrorPopup — pattern ที่ใช้ทุกหน้า
const [errorPopupOpen, setErrorPopupOpen] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

<ErrorPopup
  open={errorPopupOpen}
  onClose={() => setErrorPopupOpen(false)}
  title={errorMessage}
/>

// ConfirmPopup — pattern สำหรับ destructive action
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
</ConfirmPopup>`}</code>
    </pre>

    <h2 id="service-pattern">2. Service Pattern</h2>

    <h3 id="http-stack">2.1 HTTP Stack</h3>
    <pre>
      <code>{`Component / Page
    ↓ calls
Domain Service  (e.g. riderProfilesService.ts)
    ↓ calls
apiService.fetchData<T>()
    ↓ calls
httpClientService  (axios instance)
    ↓
API Server`}</code>
    </pre>
    <blockquote>
      ห้าม เรียก <code>httpClientService</code> หรือ <code>axios</code> โดยตรงจาก component
      <br />
      ห้าม import <code>httpClientService</code> นอก <code>src/services/</code>
    </blockquote>

    <h3 id="domain-service">2.2 Domain Service — รูปแบบการเขียน</h3>
    <pre>
      <code>{`// riderProfilesService.ts

// api prefix → คืน SuccessResponse<T> ดิบ
export const apiGetRiderList = async (
  params: GetRiderListParams,
): Promise<SuccessResponse<GetRiderListResponse>> => {
  return apiService.fetchData<GetRiderListResponse>({
    url: "/api/v1/backoffice/riders",
    method: "get",
    params: { ...params },
    signal: params.signal,
  });
};

// get prefix → unwrap แล้วคืน data ตรง ๆ
export const getRiderList = async (params) => {
  const res = await apiService.fetchData<GetRiderListResponse>({ ... });
  return res.data;
};

// export prefix → file download
export const exportRiderOrderList = async (params) => {
  return apiService.fetchData<Blob>({
    url: "/api/v1/backoffice/riders/export",
    method: "get",
    responseType: "blob",
    params: { ... },
  });
};`}</code>
    </pre>
    <p>Response shape ที่ใช้ทั่วโปรเจกต์:</p>
    <pre>
      <code>{`interface SuccessResponse<T> {
  data: T;
  status: number;
  message: string;
  headers?: { "content-disposition"?: string };
}

interface ErrorResponseProps {
  status: number;
  code: string;
  message: string;
  title: string;
}`}</code>
    </pre>

    <h2 id="hook-pattern">3. Hook Pattern</h2>

    <h3 id="redux-hooks">3.1 useAppDispatch / useAppSelector — Typed Redux Hooks</h3>
    <p>
      ห้ามใช้ <code>useDispatch</code> / <code>useSelector</code> ดิบ — ใช้ typed version จาก{' '}
      <code>src/stores/hooks.ts</code> เสมอ
    </p>
    <pre>
      <code>{`// src/stores/hooks.ts
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Usage in component
const dispatch = useAppDispatch();
const { riders, pageIndex } = useAppSelector(
  (state) => state.riderProfiles.riderList,
);`}</code>
    </pre>

    <h3 id="use-debounce">3.2 useDebounce — Debounce Search Input</h3>
    <p>
      ป้องกัน API call ถี่เกินไปเมื่อ user พิมพ์ใน search box ใช้ <code>useRef</code> เพื่อไม่ให้
      debounced function สร้างใหม่ทุก render
    </p>
    <pre>
      <code>{`const SEARCH_DEBOUNCE_MS = 1000;

const createdDebouncedSearch = useDebounce((value: string) => {
  dispatch(setSearchKeyword(value));
  dispatch(setPageIndex(1));
}, SEARCH_DEBOUNCE_MS);
const debouncedSearchRef = useRef(createdDebouncedSearch);
const debouncedSearch = debouncedSearchRef.current;

const handleSearchChange = useCallback((value: string) => {
  setTempSearchValue(value);  // update local state ทันที
  debouncedSearch(value);     // dispatch หลัง debounce
}, [debouncedSearch]);`}</code>
    </pre>

    <h3 id="use-auto-refresh">3.3 useAutoRefresh — Polling / Auto Refresh</h3>
    <p>
      ใช้ใน real-time page เช่น Order Tracking หยุด refresh อัตโนมัติเมื่อ{' '}
      <code>shouldRefresh</code> เป็น <code>false</code> หรือ user idle
    </p>
    <pre>
      <code>{`type UseAutoRefreshProps = {
  fetchFn: () => void;
  interval: number;
  shouldRefresh: boolean;
  idle: boolean;
};

export const useAutoRefresh = ({
  fetchFn,
  interval,
  shouldRefresh,
  idle,
}: UseAutoRefreshProps) => {
  useEffect(() => {
    if (!shouldRefresh || idle) return;
    const id = setInterval(fetchFn, interval);
    return () => clearInterval(id);
  }, [fetchFn, interval, shouldRefresh, idle]);
};`}</code>
    </pre>
  </DocLayout>
)

export default DesignPatternPage
