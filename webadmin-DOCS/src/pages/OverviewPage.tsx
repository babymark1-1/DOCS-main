import type { FC } from 'react'
import DocLayout from '../components/DocLayout'
import type { TocItem } from '../components/Toc'
import type { PageId } from '../data/navigation'

type Props = { navigate: (page: PageId) => void }

const toc: TocItem[] = [
  { id: 'tech-stack', label: 'Tech Stack', level: 2 },
  { id: 'theme', label: 'Theme', level: 2 },
  { id: 'color-palette', label: 'Color Palette', level: 2 },
  { id: 'typography', label: 'Typography', level: 2 },
  { id: 'layout', label: 'Layout', level: 2 },
  { id: 'docs-index', label: 'ไฟล์ Docs ในชุดนี้', level: 2 },
]

const OverviewPage: FC<Props> = ({ navigate }) => (
  <DocLayout
    title="Overview"
    description="เอกสารชุดนี้อธิบายแนวทางการออกแบบและพัฒนา webadmin-DOCS ซึ่งเป็น documentation site สำหรับ web admin สร้างด้วย React + Vite + TypeScript"
    breadcrumb={['🏠', 'พื้นฐานโปรเจกต์', 'Overview']}
    toc={toc}
    next="naming"
    navigate={navigate}
  >
    <h2 id="tech-stack">Tech Stack</h2>
    <table>
      <thead>
        <tr>
          <th>Layer</th>
          <th>Technology</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Framework</td>
          <td>
            <code>React 19</code>
          </td>
        </tr>
        <tr>
          <td>Bundler</td>
          <td>
            <code>Vite 8</code>
          </td>
        </tr>
        <tr>
          <td>Language</td>
          <td>
            <code>TypeScript 6</code>
          </td>
        </tr>
        <tr>
          <td>Styling</td>
          <td>Plain CSS (CSS Variables)</td>
        </tr>
      </tbody>
    </table>

    <h2 id="theme">Theme</h2>
    <p>
      เว็บรองรับทั้ง <strong>Light Mode</strong> และ <strong>Dark Mode</strong> โดยอัตโนมัติผ่าน{' '}
      <code>prefers-color-scheme</code> พร้อม theme toggle button ที่ topnav
    </p>

    <h3 id="color-palette">Color Palette</h3>
    <table>
      <thead>
        <tr>
          <th>Token</th>
          <th>Light</th>
          <th>Dark</th>
          <th>ใช้งาน</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>--bg</code>
          </td>
          <td>
            <code>#ffffff</code>
          </td>
          <td>
            <code>#0d1117</code>
          </td>
          <td>พื้นหลังหน้าเว็บ</td>
        </tr>
        <tr>
          <td>
            <code>--sidebar-bg</code>
          </td>
          <td>
            <code>#f7f8fa</code>
          </td>
          <td>
            <code>#131620</code>
          </td>
          <td>พื้นหลัง sidebar</td>
        </tr>
        <tr>
          <td>
            <code>--text</code>
          </td>
          <td>
            <code>#64748b</code>
          </td>
          <td>
            <code>#8b98b1</code>
          </td>
          <td>ข้อความทั่วไป</td>
        </tr>
        <tr>
          <td>
            <code>--text-h</code>
          </td>
          <td>
            <code>#0f172a</code>
          </td>
          <td>
            <code>#e2e8f0</code>
          </td>
          <td>หัวข้อ (h1, h2, h3)</td>
        </tr>
        <tr>
          <td>
            <code>--border</code>
          </td>
          <td>
            <code>#e5e7eb</code>
          </td>
          <td>
            <code>#21273a</code>
          </td>
          <td>เส้นขอบ, divider</td>
        </tr>
        <tr>
          <td>
            <code>--accent</code>
          </td>
          <td>
            <code>#ea580c</code>
          </td>
          <td>
            <code>#f97316</code>
          </td>
          <td>สีหลัก (orange)</td>
        </tr>
        <tr>
          <td>
            <code>--code-bg</code>
          </td>
          <td>
            <code>#f0f2f5</code>
          </td>
          <td>
            <code>#1a1f2e</code>
          </td>
          <td>พื้นหลัง code block</td>
        </tr>
      </tbody>
    </table>

    <h2 id="typography">Typography</h2>
    <table>
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
          <th>ใช้งาน</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>--sans</code>
          </td>
          <td>
            <code>system-ui, 'Segoe UI', Roboto, sans-serif</code>
          </td>
          <td>ข้อความทั่วไป</td>
        </tr>
        <tr>
          <td>
            <code>--mono</code>
          </td>
          <td>
            <code>ui-monospace, Cascadia Code, Consolas, monospace</code>
          </td>
          <td>code, inline code</td>
        </tr>
      </tbody>
    </table>
    <ul>
      <li>
        Base font size: <strong>15px</strong> (desktop), <strong>14px</strong> (≤ 768px)
      </li>
      <li>
        Line height: <strong>160%</strong>
      </li>
      <li>
        <code>h1</code>: 2.5rem / font-weight 700
      </li>
      <li>
        <code>h2</code>: 1.4rem / font-weight 600 + border-top separator
      </li>
      <li>
        <code>h3</code>: 1.1rem / font-weight 600
      </li>
    </ul>

    <h2 id="layout">Layout</h2>
    <ul>
      <li>
        <strong>Topnav</strong> — fixed, full width, height 60px
      </li>
      <li>
        <strong>Sidebar</strong> — fixed, width 280px, toggle ได้ด้วยปุ่ม hamburger
      </li>
      <li>
        <strong>Main content</strong> — max-width 780px, padding ซ้าย-ขวา
      </li>
      <li>
        <strong>TOC</strong> — sticky right sidebar, width 220px (ซ่อนใน screen &lt; 1200px)
      </li>
      <li>
        Responsive: sidebar overlay บน mobile, TOC ซ่อนบน tablet
      </li>
    </ul>

    <h2 id="docs-index">ไฟล์ Docs ในชุดนี้</h2>
    <table>
      <thead>
        <tr>
          <th>ไฟล์</th>
          <th>เนื้อหา</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>00-docs.md</code>
          </td>
          <td>Overview — theme, layout, tech stack (หน้านี้)</td>
        </tr>
        <tr>
          <td>
            <code>01-naming-convention.md</code>
          </td>
          <td>รูปแบบการตั้งชื่อ file, component, hook, service, constant</td>
        </tr>
        <tr>
          <td>
            <code>02-formatting.md</code>
          </td>
          <td>Code formatting — ESLint, TypeScript strict, indentation, import order</td>
        </tr>
        <tr>
          <td>
            <code>03-shared-design-pattern.md</code>
          </td>
          <td>Design pattern ที่ใช้ร่วมกันทั้งโปรเจกต์</td>
        </tr>
      </tbody>
    </table>
  </DocLayout>
)

export default OverviewPage
