export type PageId =
  | 'foundation'
  | 'overview'
  | 'naming'
  | 'formatting'
  | 'design-pattern'

export type NavPageItem = {
  id: PageId
  label: string
  badge?: string
  description?: string
}

export type NavSection = {
  id: PageId
  label: string
  items: NavPageItem[]
}

export const sections: NavSection[] = [
  {
    id: 'foundation',
    label: 'พื้นฐานโปรเจกต์',
    items: [
    //   {
    //     id: 'overview',
    //     label: 'Overview',
    //     description: 'ภาพรวม theme, layout และ tech stack ของ webadmin-DOCS',
    //   },
      {
        id: 'naming',
        label: 'Naming Convention',
        badge: 'สำคัญ',
        description: 'มาตรฐานการตั้งชื่อ file, component, hook, service ทั้งโปรเจกต์',
      },
      {
        id: 'formatting',
        label: 'Formatting',
        description: 'ESLint, TypeScript strict mode, indentation, quotes, import order',
      },
      {
        id: 'design-pattern',
        label: 'Shared Design Pattern',
        description: 'Design pattern หลักที่ใช้ซ้ำทั่วทั้งโปรเจกต์',
      },
    ],
  },
]

export const orderedPages: Pick<NavPageItem, 'id' | 'label'>[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'naming', label: 'Naming Convention' },
  { id: 'formatting', label: 'Formatting' },
  { id: 'design-pattern', label: 'Shared Design Pattern' },
]

export type SearchItemKind = 'page' | 'heading' | 'text'

export type SearchItem = {
  kind: SearchItemKind
  pageId: PageId
  anchor?: string
  label: string
  context: string
}

export const searchIndex: SearchItem[] = [
  // ── Pages ─────────────────────────────────────────────────────────
  { kind: 'page', pageId: 'foundation', label: 'พื้นฐานโปรเจกต์', context: 'หน้าหลัก' },
  { kind: 'page', pageId: 'naming', label: 'Naming Convention', context: 'พื้นฐานโปรเจกต์' },
  { kind: 'page', pageId: 'formatting', label: 'Formatting', context: 'พื้นฐานโปรเจกต์' },
  { kind: 'page', pageId: 'design-pattern', label: 'Shared Design Pattern', context: 'พื้นฐานโปรเจกต์' },

  // ── Naming Convention ─────────────────────────────────────────────
  { kind: 'heading', pageId: 'naming', anchor: 'case-styles', label: 'Naming Case Styles', context: 'Naming Convention' },
  { kind: 'heading', pageId: 'naming', anchor: 'file-naming', label: 'File Naming', context: 'Naming Convention' },
  { kind: 'heading', pageId: 'naming', anchor: 'page-components', label: 'Page Components', context: 'Naming Convention' },
  { kind: 'heading', pageId: 'naming', anchor: 'feature-components', label: 'Feature Components', context: 'Naming Convention' },
  { kind: 'heading', pageId: 'naming', anchor: 'shared-ui', label: 'Shared UI Components', context: 'Naming Convention' },
  { kind: 'heading', pageId: 'naming', anchor: 'hooks', label: 'Custom Hooks', context: 'Naming Convention' },
  { kind: 'heading', pageId: 'naming', anchor: 'services', label: 'Services', context: 'Naming Convention' },
  { kind: 'heading', pageId: 'naming', anchor: 'utilities', label: 'Utilities & Types', context: 'Naming Convention' },
  { kind: 'heading', pageId: 'naming', anchor: 'folder-naming', label: 'Folder Naming', context: 'Naming Convention' },
  { kind: 'heading', pageId: 'naming', anchor: 'component-naming', label: 'Component Naming', context: 'Naming Convention' },
  { kind: 'heading', pageId: 'naming', anchor: 'hook-naming', label: 'Hook Naming', context: 'Naming Convention' },
  { kind: 'heading', pageId: 'naming', anchor: 'service-naming', label: 'Service & API Naming', context: 'Naming Convention' },

  // ── Formatting ────────────────────────────────────────────────────
  { kind: 'heading', pageId: 'formatting', anchor: 'tooling', label: 'Tooling Overview', context: 'Formatting' },
  { kind: 'heading', pageId: 'formatting', anchor: 'eslint', label: 'ESLint', context: 'Formatting' },
  { kind: 'heading', pageId: 'formatting', anchor: 'typescript', label: 'TypeScript Strict Config', context: 'Formatting' },
  { kind: 'heading', pageId: 'formatting', anchor: 'quotes', label: 'Quotes', context: 'Formatting' },
  { kind: 'heading', pageId: 'formatting', anchor: 'semicolons', label: 'Semicolons', context: 'Formatting' },
  { kind: 'heading', pageId: 'formatting', anchor: 'trailing-commas', label: 'Trailing Commas', context: 'Formatting' },
  { kind: 'heading', pageId: 'formatting', anchor: 'import-order', label: 'Import Order', context: 'Formatting' },
  { kind: 'heading', pageId: 'formatting', anchor: 'function-style', label: 'Function Style', context: 'Formatting' },
  { kind: 'heading', pageId: 'formatting', anchor: 'type-annotation', label: 'Type Annotation Style', context: 'Formatting' },

  // ── Shared Design Pattern ─────────────────────────────────────────
  { kind: 'heading', pageId: 'design-pattern', anchor: 'component-pattern', label: 'Component Pattern', context: 'Shared Design Pattern' },
  { kind: 'heading', pageId: 'design-pattern', anchor: 'page-layout', label: 'PageLayout', context: 'Shared Design Pattern' },
  { kind: 'heading', pageId: 'design-pattern', anchor: 'common-table', label: 'CommonTable', context: 'Shared Design Pattern' },
  { kind: 'heading', pageId: 'design-pattern', anchor: 'search-filter', label: 'SearchAndFilter', context: 'Shared Design Pattern' },
  { kind: 'heading', pageId: 'design-pattern', anchor: 'popup', label: 'Popup Components', context: 'Shared Design Pattern' },
  { kind: 'heading', pageId: 'design-pattern', anchor: 'service-pattern', label: 'Service Pattern', context: 'Shared Design Pattern' },
  { kind: 'heading', pageId: 'design-pattern', anchor: 'http-stack', label: 'HTTP Stack', context: 'Shared Design Pattern' },
  { kind: 'heading', pageId: 'design-pattern', anchor: 'domain-service', label: 'Domain Service', context: 'Shared Design Pattern' },
  { kind: 'heading', pageId: 'design-pattern', anchor: 'hook-pattern', label: 'Hook Pattern', context: 'Shared Design Pattern' },
  { kind: 'heading', pageId: 'design-pattern', anchor: 'redux-hooks', label: 'useAppDispatch / useAppSelector', context: 'Shared Design Pattern' },
  { kind: 'heading', pageId: 'design-pattern', anchor: 'use-debounce', label: 'useDebounce', context: 'Shared Design Pattern' },
  { kind: 'heading', pageId: 'design-pattern', anchor: 'use-auto-refresh', label: 'useAutoRefresh', context: 'Shared Design Pattern' },

  // ── Text snippets ─────────────────────────────────────────────────
  { kind: 'text', pageId: 'naming', anchor: 'case-styles', label: 'PascalCase, camelCase, kebab-case, UPPER_SNAKE_CASE', context: 'Naming Convention' },
  { kind: 'text', pageId: 'naming', anchor: 'hook-naming', label: 'ทุก custom hook ต้องขึ้นต้นด้วย use เช่น useDebounce, useAutoRefresh', context: 'Naming Convention' },
  { kind: 'text', pageId: 'naming', anchor: 'service-naming', label: 'Function ใน service file ตั้งชื่อโดยใช้ prefix ที่บ่งบอก role: api, get, export', context: 'Naming Convention' },
  { kind: 'text', pageId: 'formatting', anchor: 'eslint', label: 'ใช้ Flat Config (eslint.config.js) ซึ่งเป็น format ใหม่ของ ESLint v9+', context: 'Formatting' },
  { kind: 'text', pageId: 'formatting', anchor: 'typescript', label: 'strict: true, noUnusedLocals, noUnusedParameters, verbatimModuleSyntax', context: 'Formatting' },
  { kind: 'text', pageId: 'formatting', anchor: 'quotes', label: 'ใช้ Double quotes สำหรับ string ทั่วไป', context: 'Formatting' },
  { kind: 'text', pageId: 'formatting', anchor: 'import-order', label: 'เรียง import เป็น 4 กลุ่ม: React, Third-party, Interface, Components', context: 'Formatting' },
  { kind: 'text', pageId: 'design-pattern', anchor: 'page-layout', label: 'ทุก page ต้อง wrap ด้วย PageLayout เสมอ ห้ามสร้าง header หรือ breadcrumb เอง', context: 'Shared Design Pattern' },
  { kind: 'text', pageId: 'design-pattern', anchor: 'hook-pattern', label: 'ใช้ async/await + try/catch เสมอ ห้ามใช้ .then().catch()', context: 'Shared Design Pattern' },
  { kind: 'text', pageId: 'design-pattern', anchor: 'http-stack', label: 'apiService.fetchData — wrapper กลางสำหรับทุก HTTP request', context: 'Shared Design Pattern' },
]

export const allSearchItems: NavPageItem[] = [
  {
    id: 'foundation',
    label: 'พื้นฐานโปรเจกต์',
    description: 'หมวดหลักของ webadmin-DOCS — 4 หน้าในหมวดนี้',
  },
  ...sections.flatMap((s) => s.items),
]
