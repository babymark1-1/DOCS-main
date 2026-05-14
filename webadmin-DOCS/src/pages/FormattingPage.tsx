import type { FC } from 'react'
import DocLayout from '../components/DocLayout'
import type { TocItem } from '../components/Toc'
import type { PageId } from '../data/navigation'

type Props = { navigate: (page: PageId) => void }

const toc: TocItem[] = [
  { id: 'tooling', label: 'Tooling Overview', level: 2 },
  { id: 'eslint', label: 'ESLint', level: 2 },
  { id: 'typescript', label: 'TypeScript Strict Config', level: 2 },
  { id: 'quotes', label: 'Quotes', level: 2 },
  { id: 'semicolons', label: 'Semicolons', level: 2 },
  { id: 'trailing-commas', label: 'Trailing Commas', level: 2 },
  { id: 'import-order', label: 'Import Order', level: 2 },
  { id: 'function-style', label: 'Function Style', level: 2 },
  { id: 'type-annotation', label: 'Type Annotation Style', level: 2 },
]

const FormattingPage: FC<Props> = ({ navigate }) => (
  <DocLayout
    title="Formatting"
    description="ช่วยให้โค้ดมีรูปแบบเดียวกันทั้งโปรเจกต์ อ่านง่ายขึ้น และลดความขัดแย้งเรื่อง style ใน code review"
    breadcrumb={['🏠', 'พื้นฐานโปรเจกต์', 'Formatting']}
    toc={toc}
    prev="naming"
    next="design-pattern"
    navigate={navigate}
  >
    <h2 id="tooling">Tooling Overview</h2>
    <table>
      <thead>
        <tr>
          <th>Tool</th>
          <th>Version</th>
          <th>Config file</th>
          <th>สถานะ</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>ESLint</strong>
          </td>
          <td>^9.39</td>
          <td>
            <code>eslint.config.js</code>
          </td>
          <td>✅ Active</td>
        </tr>
        <tr>
          <td>
            <strong>TypeScript</strong>
          </td>
          <td>~5.9</td>
          <td>
            <code>tsconfig.app.json</code>
          </td>
          <td>✅ Strict mode</td>
        </tr>
        <tr>
          <td>
            <strong>Vite + SWC</strong>
          </td>
          <td>^7 / ^4</td>
          <td>
            <code>vite.config.ts</code>
          </td>
          <td>✅ Build tool</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>ESLint</strong> คือ Static Analysis Tool ตรวจ code quality — จับ bug, บังคับ style,
      ตรวจ React hooks rules
      <br />
      <strong>TypeScript</strong> ตรวจ type safety — type ถูกต้องไหม ทั้งสองทำงานเสริมกัน
      ต้องผ่านทั้งคู่ก่อน commit
    </p>

    <h2 id="eslint">ESLint</h2>
    <p>
      ใช้ <strong>Flat Config</strong> (<code>eslint.config.js</code>) ซึ่งเป็น format ใหม่ของ
      ESLint v9+
    </p>
    <pre>
      <code>{`// eslint.config.js
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
])`}</code>
    </pre>
    <table>
      <thead>
        <tr>
          <th>Plugin</th>
          <th>ทำหน้าที่</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>@eslint/js</code> recommended
          </td>
          <td>JavaScript best practices พื้นฐาน</td>
        </tr>
        <tr>
          <td>
            <code>typescript-eslint</code> recommended
          </td>
          <td>
            TypeScript-specific rules เช่น <code>no-explicit-any</code>,{' '}
            <code>consistent-type-imports</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>eslint-plugin-react-hooks</code>
          </td>
          <td>
            ตรวจ rules of hooks และ <code>exhaustive-deps</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>eslint-plugin-react-refresh</code>
          </td>
          <td>ป้องกัน pattern ที่ทำให้ HMR พัง</td>
        </tr>
      </tbody>
    </table>

    <h2 id="typescript">TypeScript Strict Config</h2>
    <p>
      <code>tsconfig.app.json</code> เปิด strict mode และ option เพิ่มเติมที่ส่งผลต่อ code style:
    </p>
    <table>
      <thead>
        <tr>
          <th>Option</th>
          <th>หมายความว่า</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>strict: true</code>
          </td>
          <td>
            ห้ามใช้ <code>any</code> โดยไม่ตั้งใจ, ต้อง narrow type, null check เสมอ
          </td>
        </tr>
        <tr>
          <td>
            <code>noUnusedLocals</code>
          </td>
          <td>ลบ variable ที่ไม่ใช้ออก ไม่งั้น compile error</td>
        </tr>
        <tr>
          <td>
            <code>noUnusedParameters</code>
          </td>
          <td>
            ถ้า parameter ไม่ใช้ ให้ prefix ด้วย <code>_</code> หรือลบออก
          </td>
        </tr>
        <tr>
          <td>
            <code>verbatimModuleSyntax</code>
          </td>
          <td>
            <strong>บังคับ</strong> ใช้ <code>import type {'{ Foo }'}</code> สำหรับ type
          </td>
        </tr>
        <tr>
          <td>
            <code>erasableSyntaxOnly</code>
          </td>
          <td>
            ห้ามใช้ <code>enum</code> บางรูปแบบ — ใช้ <code>as const</code> object แทน
          </td>
        </tr>
      </tbody>
    </table>

    <h2 id="quotes">Quotes</h2>
    <p>
      <strong>Standard:</strong> Double quotes <code>"</code> สำหรับ string ทั่วไป — Template
      literals ใช้ได้เสมอเมื่อต้องการ interpolation
    </p>
    <pre>
      <code>{`// ✅ Double quotes — recommended
import apiService from "./apiService";
const method = "get";

// ❌ Single quotes — legacy
import type { JobTypeOptions } from '../../interfaces/orderHistory';`}</code>
    </pre>

    <h2 id="semicolons">Semicolons</h2>
    <p>
      <strong>Standard:</strong> ใช้ semicolon <code>;</code> ต่อท้ายทุก statement
    </p>
    <pre>
      <code>{`// ✅ มี semicolon — recommended
const [jobTypeFilter, setJobTypeFilter] = useState<string | null>("");

// ❌ ไม่มี semicolon — legacy
const dispatch = useAppDispatch()`}</code>
    </pre>

    <h2 id="trailing-commas">Trailing Commas</h2>
    <p>ใส่ trailing comma ใน multiline object, array และ function parameter</p>
    <pre>
      <code>{`export const apiGetOrderHistoryList = async (
  params: GetOrderHistoryParams,   // ← trailing comma
): Promise<SuccessResponse<GetOrderHistoryResponse>> => {
  return apiService.fetchData({
    url,
    method: "get",
    params: {
      start_date: params.start_date,
      end_date: params.end_date,    // ← trailing comma
    },
  });
};`}</code>
    </pre>

    <h2 id="import-order">Import Order</h2>
    <p>เรียง import เป็น 4 กลุ่ม แยกด้วย blank line:</p>
    <pre>
      <code>{`// 1. React และ React ecosystem
import { useState, useCallback, useEffect, useRef } from 'react';

// 2. Third-party libraries
import { Box, Typography, Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

// Interface — type-only imports
import type { JobTypeOptions } from '../../interfaces/orderHistory';
import type { ErrorResponseProps } from '../../interfaces/responseHandler';

// Components
import OrderHistoryTable from '../../features/jobManagement/OrderHistoryTable';
import PageLayout from '../../components/layout/PageLayout';

// Redux
import { useAppDispatch, useAppSelector } from '../../stores/hooks';

// Service
import { apiGetOrderHistoryList } from '../../services/orderHistoryService';`}</code>
    </pre>
    <blockquote>
      <strong>กฎสำคัญ:</strong> ใช้ <code>import type {'{ Foo }'}</code> สำหรับ type-only import
      เสมอ — TypeScript <code>verbatimModuleSyntax</code> บังคับ
    </blockquote>

    <h2 id="function-style">Function Style</h2>
    <pre>
      <code>{`// ✅ Function declaration — page & feature components
export default function OrderHistoryListPage() { ... }

// ✅ Arrow function — shared/utility components
export const Selecter = (props: SelecterProps) => { ... }

// ✅ async/await + try/catch เสมอ (ห้ามใช้ .then().catch())
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
}, [deps]);`}</code>
    </pre>

    <h2 id="type-annotation">Type Annotation Style</h2>
    <pre>
      <code>{`// interface — object shape ที่อาจ extend ได้
interface RiderProfilesTableProps {
  data: RiderListItem[];
  onNameSort: () => void;
}

// type — union, alias, primitive, mapped type
type RiderJobTypeFilter = string | null;
type SortDirection = "asc" | "desc";

// ✅ unknown + narrow (ห้ามใช้ any)
} catch (err) {
  const error = err as ErrorResponseProps;
  setErrorMessage(error.message);
}`}</code>
    </pre>
  </DocLayout>
)

export default FormattingPage
