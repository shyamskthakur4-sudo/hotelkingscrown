# Hotel Kings Crown, Jaipur — Official Website

A bespoke, production-ready luxury hospitality website for **Hotel Kings Crown**, situated in Malviya Nagar behind World Trade Park (WTP), Jaipur, Rajasthan.

---

## 1. Verified Business Information

* **Hotel Name:** Hotel Kings Crown
* **Address:** B-21, Mahalaxmi Road, Behind WTP, Malviya Nagar, Jaipur, Rajasthan 302017, India
* **WhatsApp Contact:** +91 9399112249 (`https://wa.me/919399112249`)
* **Front Desk Calling:** +91 9399112249 (`tel:+919399112249`)
* **Room Categories:**
  * **Deluxe Room:** King bed, crisp white linens, individual split air conditioning, ceiling fan, bedside connectivity, attached modern bathroom with rain shower & geyser.
  * **Super Deluxe Room:** Extended suite living with private balcony, plush velvet couch, coffee table, wall-mounted Smart TV, mini refrigerator, and electric tea/coffee kettle station.
* **Property Highlights:**
  * Reception lobby & guest relaxation lounge with warm wood paneling.
  * Modern golden passenger elevator serving all guest room floors.
  * Bright marble dining hall with quilted dining chairs and banquette seating.
  * Modern en-suite bathrooms with wall-hung dual-flush commodes and overhead rain showers.

---

## 2. Real Photography Catalog (26 Verified Photos)

Every photo displayed across the website is an authentic photograph of Hotel Kings Crown:

| File Name | Subject / Space | Category | Prominent Usage |
|---|---|---|---|
| `DSC00153.jpg` | Grand Lobby, Reception & Entrance | Interiors | Hero Section / Property Overview |
| `DSC00144.jpg` | Front Desk Counter with Rajasthani Wallpaper | Interiors | Introduction Section |
| `DSC00141.jpg` | Reception Counter Close-up | Interiors | Gallery & About |
| `DSC00131.jpg` | Lobby Lounge Tan Armchairs | Interiors | Gallery |
| `DSC00134.jpg` | Lobby Seating Lounge Sofas | Interiors | About Page / Lounge Highlight |
| `DSC00138.jpg` | Lobby Seating Angled View | Interiors | Gallery |
| `DSC00159.jpg` | Lobby Corner Lounge | Interiors | Gallery |
| `DSC00162.jpg` | Golden Elevator & Dining Entrance | Interiors | Property Highlights / Facilities |
| `DSC00165.jpg` | Polished Granite Elevator Foyer | Interiors | Gallery |
| `DSC00168.jpg` | Elevator Cabin Front View | Interiors | Gallery |
| `DSC00171.jpg` | Dining Hall Long Marble Tables | Dining | Property Highlights / Dining Section |
| `DSC00174.jpg` | Dining Room Warm Interior Lighting | Dining | Gallery |
| `DSC00177.jpg` | Dining Hall Panoramic Perspective | Dining | About Page / Dining Spread |
| `DSC00180.jpg` | Intimate Dining Table Setup | Dining | Gallery |
| `DSC00183.jpg` | Deluxe Room Bed & Wood Feature Wall | Rooms | Deluxe Room Gallery |
| `DSC00186.jpg` | Deluxe Room Symmetrical Bed & AC View | Rooms | Deluxe Room Hero / Showcase |
| `DSC00188.jpg` | Deluxe Bed White Linens Detail | Rooms | Deluxe Room Gallery |
| `DSC00194.jpg` | Deluxe Bedside Perspective | Rooms | Deluxe Room Gallery |
| `DSC00197.jpg` | Deluxe Window Shades & Room View | Rooms | Deluxe Room Gallery |
| `DSC00204.jpg` | Wall-Hung Toilet & Marble Bathroom Tiles | Bathrooms | Property Highlights / Bathrooms |
| `DSC00206.jpg` | Ceramic Vanity Sink & Chrome Faucet | Bathrooms | Bathroom Gallery |
| `DSC00209.jpg` | Rain Shower System & Water Geyser | Bathrooms | Bathroom Gallery |
| `DSC00212.jpg` | Super Deluxe Suite Living Area & Balcony | Rooms | Super Deluxe Hero / Showcase |
| `DSC00215.jpg` | Super Deluxe Mini Fridge, Kettle & TV | Rooms | Super Deluxe Suite Gallery |
| `DSC00218.jpg` | Super Deluxe Maroon Couch & Artwork | Rooms | Super Deluxe Suite Gallery |
| `DSC00221.jpg` | Super Deluxe Suite Room Perspective | Rooms | Super Deluxe Suite Gallery |

---

## 3. Technology Stack & Design System

* **Core:** React 19, TypeScript, Vite
* **Styling:** Custom Vanilla CSS Design System (`src/index.css`)
  * Tailored warm ivory palette (`#F8F6F1`, `#F0E9DE`, `#30251F`, `#76685D`, `#A67C45`)
  * Editorial typography: *Cormorant Garamond* (headings) + *Manrope* (body and UI)
  * Asymmetric, photography-led layouts (no cookie-cutter AI cards)
  * Accessible lightbox with keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`)
* **Backend Database:** Supabase / PostgreSQL (`public.booking_enquiries`)
  * Row Level Security (RLS) enabled
  * Public can only `INSERT` verified enquiries
  * Staff authenticated users can view, update, and manage enquiries
* **WhatsApp Deep Integration:**
  * Prefilled URL parameter generator adhering to standard hospitality enquiry templates
  * Fallback mechanism ensuring guests can always send enquiries even during network downtime

---

## 4. Administrative Staff Portal (`/admin`)

* **URL Route:** `http://127.0.0.1:5173/#admin` (or click "Staff Portal" in the footer)
* **Access Passcode (Demo):** `kingscrown2026`
* **Features:**
  * Live enquiry list synced with Supabase PostgreSQL
  * Search by guest name, contact number, or message
  * Filter by status (`all`, `pending`, `contacted`, `confirmed`, `cancelled`)
  * One-click prefilled WhatsApp response to guest
  * Update enquiry status or delete cancelled enquiries

---

## 5. Development & Deployment

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```
Output bundle is generated into `dist/` with route-level code splitting and optimized assets.

---

## 6. Environment Variables (`.env`)

```env
VITE_SUPABASE_URL=https://xtyckznwxhdxqyfsyzhk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_HOTEL_NAME="Hotel Kings Crown"
VITE_HOTEL_WHATSAPP="+919399112249"
VITE_HOTEL_PHONE="+919399112249"
VITE_HOTEL_ADDRESS="B-21, Mahalaxmi Road, Behind WTP, Malviya Nagar, Jaipur, Rajasthan 302017, India"
```
