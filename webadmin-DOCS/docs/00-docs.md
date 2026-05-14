# WebAdmin Docs — Overview

เอกสารชุดนี้อธิบายแนวทางการออกแบบและพัฒนา **webadmin-DOCS** ซึ่งเป็น documentation site สำหรับ web admin สร้างด้วย React + Vite + TypeScript

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Bundler | Vite 8 |
| Language | TypeScript 6 |
| Styling | Plain CSS (CSS Variables) |

---

## Theme

เว็บรองรับทั้ง **Light Mode** และ **Dark Mode** โดยอัตโนมัติผ่าน `prefers-color-scheme` ไม่มี theme toggle — ระบบปรับตามการตั้งค่า OS ของผู้ใช้

### Color Palette

| Token | Light | Dark | ใช้งาน |
|---|---|---|---|
| `--bg` | `#ffffff` | `#16171d` | พื้นหลังหน้าเว็บ |
| `--text` | `#6b6375` | `#9ca3af` | ข้อความทั่วไป |
| `--text-h` | `#08060d` | `#f3f4f6` | หัวข้อ (h1, h2) |
| `--border` | `#e5e4e7` | `#2e303a` | เส้นขอบ, divider |
| `--code-bg` | `#f4f3ec` | `#1f2028` | พื้นหลัง code block |
| `--accent` | `#aa3bff` | `#c084fc` | สีหลัก (ปุ่ม, link) |
| `--accent-bg` | `rgba(170,59,255,0.10)` | `rgba(192,132,252,0.15)` | พื้นหลัง accent element |
| `--accent-border` | `rgba(170,59,255,0.50)` | `rgba(192,132,252,0.50)` | ขอบ accent element |

สีหลักของเว็บคือโทน **purple/violet** (`#aa3bff` / `#c084fc`) สะท้อนแบรนด์ webadmin

---

## Typography

| Token | Value | ใช้งาน |
|---|---|---|
| `--sans` | `system-ui, 'Segoe UI', Roboto, sans-serif` | ข้อความทั่วไป |
| `--heading` | `system-ui, 'Segoe UI', Roboto, sans-serif` | หัวข้อ |
| `--mono` | `ui-monospace, Consolas, monospace` | code, inline code |

- Base font size: **18px** (desktop), **16px** (≤ 1024px)
- Line height: **145%**
- Letter spacing: **0.18px**
- `h1`: 56px / letter-spacing −1.68px (desktop), 36px (mobile)
- `h2`: 24px / letter-spacing −0.24px (desktop), 20px (mobile)

---

## Layout

- Content width สูงสุด **1126px**, จัดกึ่งกลาง (`margin: 0 auto`)
- มีเส้นขอบซ้าย-ขวา (`border-inline`) เพื่อแบ่งพื้นที่เนื้อหาออกจากพื้นหลัง
- รูปแบบโดยรวมเป็น **single-column centered** เหมาะกับ documentation

---

## ไฟล์ Docs ในชุดนี้

| ไฟล์ | เนื้อหา |
|---|---|
| `00-docs.md` | Overview (ไฟล์นี้) — theme, layout, tech stack |
| `01-naming-convention.md` | รูปแบบการตั้งชื่อ file, component, variable |
| `02-formatting.md` | Code formatting rules |
| `03-shared-design-pattern.md` | Design pattern ที่ใช้ร่วมกันทั้งโปรเจกต์ |
