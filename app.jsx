// Weland Labs — interactive homepage
const { useState, useEffect, useRef } = React;

// ===== ICONS =====
const Icon = {
  Drop: (p) => (
    <svg width="48" height="48" viewBox="0 0 432 432" {...p}>
      <path className="st0" d="M141.8,350.5c-20.5-18.1-31.8-42.3-31.8-68.3c0-44.1,22.9-76.4,49.5-113.8c20-28.1,42.3-59.5,56.5-100 c14.2,40.5,36.5,71.9,56.5,100c7.1,10,13.9,19.6,20.1,29.1l10.3-6.1c-6.5-10-13.5-19.9-20.6-30c-23.5-33-47.7-67.2-60.5-114.9 L216,24.8l-5.8,21.7c-12.8,47.7-37,81.9-60.5,114.9C123.1,198.8,98,234.2,98,282.2c0,29.5,12.7,56.9,35.8,77.3 c18.8,16.6,43.5,27.2,69.2,29.9v-12.1C180.2,374.6,158.5,365.2,141.8,350.5z"/>
      <path className="st1" d="M319.8,259.2c0.1,0.5,0.2,0.9,0.2,1.4c0.2,0.9,0.3,1.8,0.5,2.7c0.1,0.6,0.2,1.2,0.3,1.9 c0.1,0.8,0.2,1.5,0.3,2.3c0.1,0.7,0.2,1.3,0.2,2c0.1,0.7,0.1,1.5,0.2,2.2s0.1,1.3,0.2,2c0.1,0.9,0.1,1.7,0.1,2.6 c0,0.6,0.1,1.1,0.1,1.7c0,1.4,0.1,2.9,0.1,4.3c0,1.6,0,3.2-0.1,4.8c-0.1,2.4-0.4,4.8-0.7,7.2c-0.2,1.6-0.5,3.2-0.8,4.7 c-2.6,13.3-8.2,25.8-16.6,36.9c-3.9,5.2-8.5,10.1-13.6,14.6c-11.8,10.4-26.1,18.2-41.5,22.7c-2.4,0.7-4.9,1.4-7.4,1.9 c-1.7,0.4-3.3,0.7-5,1c-6.7,1.2-13.5,1.8-20.3,1.8v12c30.2,0,60.2-11.1,82.2-30.5c23.1-20.4,35.8-47.8,35.8-77.3 c0-1.6,0-3.1-0.1-4.6c0-1-0.1-1.9-0.1-2.9c0-0.5,0-1-0.1-1.5c-0.1-1.3-0.2-2.6-0.3-3.8c0-0.1,0-0.2,0-0.4 c-2.4-24.7-11.5-46-23.6-66.5l-10.3,6.1C309,224.7,316.4,241,319.8,259.2z"/>
      <path className="st0" d="M149,290.7l-11.7,2.8c6.7,27.9,29.1,49.6,58.4,56.8l2.8-11.7C174,332.6,154.5,313.8,149,290.7z"/>
    </svg>
  ),
  Microscope: (p) => (
    <svg width="48" height="48" viewBox="0 0 432 432" {...p}>
      <path className="st0" d="M200,206c-29.8,0-54-24.2-54-54s24.2-54,54-54s54,24.2,54,54S229.8,206,200,206z M200,110 c-23.2,0-42,18.8-42,42s18.8,42,42,42s42-18.8,42-42S223.2,110,200,110z"/>
      <path className="st0" d="M264,238h-40c-7.7,0-14-6.3-14-14v-26.7h12V224c0,1.1,0.9,2,2,2h40c1.1,0,2-0.9,2-2V72c0-1.1-0.9-2-2-2h-40 c-1.1,0-2,0.9-2,2v34.7h-12V72c0-7.7,6.3-14,14-14h40c7.7,0,14,6.3,14,14v152C278,231.7,271.7,238,264,238z"/>
      <path className="st1" d="M230,51h-12V40c0-7.7,6.3-14,14-14h24c7.7,0,14,6.3,14,14v9h-12v-9c0-1.1-0.9-2-2-2h-24c-1.1,0-2,0.9-2,2V51z"/>
      <path className="st0" d="M252.9,270h-17.9c-7,0-13-5.3-13.9-12.3l-3.1-25l11.9-1.5l3.1,25c0.1,1,1,1.8,2,1.8h17.9c1,0,1.9-0.8,2-1.8 l3.1-25l11.9,1.5l-3.1,25C266,264.7,260,270,252.9,270z"/>
      <rect className="st1" x="181.2" y="298" width="122.8" height="12"/>
      <path className="st0" d="M350,406H82v-31.8l16-24v-124c0-28.4,14-54.9,37.4-71l13.2-9l6.8,9.9l-13.2,9C122,178.9,110,201.8,110,226.2 v127.6l-16,24V394h244v-23.5L317.5,350h-144L154,330.5v-93.4c0-15.2,7.5-29.4,20-38l8.9-6.1l6.8,9.9l-8.9,6.1 c-9.3,6.3-14.8,16.8-14.8,28.1v88.4l12.5,12.5h144l27.5,27.5V406z"/>
    </svg>
  ),
  Tube: (p) => (
    <svg width="48" height="48" viewBox="0 0 432 432" {...p}>
      <path className="st0" d="M304.6,116v6h44v-6h12v6h8V30h-84v92h8v-6H304.6z M296.6,42h60v68h-60V42z"/>
      <polygon className="st0" points="298.6,146 292.6,146 292.6,182 304.6,182 304.6,122 292.6,122 292.6,134 298.6,134 "/>
      <rect className="st0" x="292.6" y="116" width="12" height="6"/>
      <path className="st0" d="M282.7,291.1c-14.8,21.6-46.8,18.1-47.1,18.1l-2.9-0.3l-14.3,14.3l8.5,8.5l10.3-10.3 c3.8,0.2,10.8,0.2,18.8-1.3c16.1-3,28.7-10.7,36.6-22.2V276L282.7,291.1z"/>
      <path className="st0" d="M348.6,189.3v-7.2c-0.6,0-1.3-0.1-2-0.1h-42v6h-12v-6h-50v12h104c3.9,0,7,0.9,8.8,2.6c1.5,1.4,2.2,3.4,2.2,6 c0,16.7-20.7,27.3-35,27.3h-34.5l-12.8,12.8c-17.8,17.8-40.2,13.5-49,10.9l-3.5,11.5c4.4,1.3,11.6,3,20,3 c12.4,0,27.6-3.6,40.9-16.9l8.8-8.8V236h12v6h18c9.4,0,18.3-2.4,26-7v-12.4h12v2.3c5.7-6.8,9-14.8,9-22.3c0-5.9-2.1-11-6-14.8 c-0.8-0.8-1.8-1.6-3-2.3v3.7H348.6z"/>
      <rect className="st0" x="292.6" y="182" width="12" height="6"/>
      <path className="st0" d="M214.4,159.4c11.2-11.2,22.2-13.4,36.2-13.4h42v-12h-42c-14.4,0-29.8,2.1-44.7,17L126,230.9l8.5,8.5 L214.4,159.4z"/>
      <rect className="st0" x="292.6" y="134" width="6" height="12"/>
      <path className="st0" d="M348.6,182.1c5.4,0.3,9.2,1.8,12,3.5V122h-12V182.1z"/>
      <rect className="st0" x="348.6" y="116" width="12" height="6"/>
      <path className="st0" d="M348.6,189.3h12v-3.7c-2.8-1.7-6.6-3.2-12-3.5V189.3z"/>
      <path className="st0" d="M356.7,229c-2.5,2.3-5.2,4.3-8.1,6v8.6h12v-18.8C359.4,226.3,358.1,227.7,356.7,229z"/>
      <path className="st0" d="M304.6,364v-10h-6v-12h6V242h-11.5l-0.5,0.5V276l1-1.5l10,6.6l-11,16.8c0,0,0,0,0,0V364 c0,17.5,10.6,32.2,25,36.6v-12.9C310,383.6,304.6,374.5,304.6,364z"/>
      <path className="st0" d="M303.6,281l-10-6.6l-1,1.5v21.9c0,0,0,0,0,0L303.6,281z"/>
      <polygon className="st0" points="292.6,236 292.6,242.5 293.1,242 304.6,242 304.6,236 "/>
      <path className="st0" d="M348.6,222.6V235c2.9-1.7,5.6-3.7,8.1-6c1.4-1.3,2.7-2.7,3.9-4.1v-2.3H348.6z"/>
      <path className="st1" d="M348.6,364c0,14.3-9.9,26-22,26v12c18.7,0,34-17,34-38V252.7h-12V364z"/>
      <polygon className="st0" points="214.1,327.5 218.3,323.2 134.5,239.4 130.2,243.6 121.7,235.1 126,230.9 114.6,219.5 62.4,271.8 70.9,280.2 114.6,236.5 218.1,340 174.4,383.8 182.9,392.2 235.1,340 226.8,331.7 222.6,336 "/>
      <rect className="st0" x="217.5" y="323.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -168.4919 252.4059)" width="6" height="12"/>
      <rect className="st0" x="125.1" y="231.2" transform="matrix(0.707 -0.7072 0.7072 0.707 -130.2486 160.0984)" width="6" height="12"/>
      <rect className="st0" x="108.6" y="272.7" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -167.2499 164.2231)" width="12" height="22.6"/>
      <rect className="st0" x="304.6" y="342" width="26" height="12"/>
      <rect className="st0" x="298.6" y="342" width="6" height="12"/>
    </svg>
  ),
  Biopsy: (p) => (
    <svg width="48" height="48" viewBox="0 0 432 432" {...p}>
      <path className="st0" d="M395.3,404.6c-0.3-0.6-8.3-13.7-11.5-19.6c-12.2-22.7-8.7-34.2-5.5-44.3c0.8-2.6,1.6-5.1,2.1-7.8 c2.3-12.7,0.1-65.2-1.6-73.1c-1.4-6.5-9.9-9-14.9-9.9l-1.9-0.3l-1.3-1.3c-6.1-6.1-14.2-9.8-21.2-9.8h-2.7l-1.8-2 c-7.6-8.4-17.1-9.7-25.5-10.9l-3.9-0.5l-1.5-2.5c-0.1-0.2-9.6-16.3-15-26c-0.5-0.4-2.8-1.3-6.6-0.6c-4.1,0.7-9.1,3.1-11.9,7.7 c1,6.4,2.5,15.2,4.4,26.7l0.1,0.8l-0.1,0.8c-0.8,9.4-5.6,60.3-5.7,60.8l-11.9-1.1c0-0.5,4.6-48.9,5.6-60c-2.1-12.4-3.6-21.6-4.6-28 l-0.3-1.8l0.8-1.6c4.9-10.8,16.2-16,25.3-16.4c7.2-0.3,12.8,2.2,15.4,6.8c4.1,7.3,10.6,18.4,13.5,23.4c8.6,1.2,19.6,3.3,29,12.6 c8.9,0.7,18.3,5,25.7,11.9c12.6,2.7,20.6,9.3,22.6,18.8c2,9.4,4.4,63.2,1.7,77.8c-0.6,3.4-1.5,6.3-2.4,9.2c-2.8,9-5.2,16.8,4.6,35 c3.1,5.7,11.1,19,11.2,19.1L395.3,404.6z"/>
      <path className="st0" d="M295.1,404.3l-8.4-15.7c-3.8-7.4-10-11-17.1-15.1c-7.1-4.1-15.1-8.7-21.7-17.8c-4.4-6.1-24.9-63-24.9-80.9h12 c0,14.4,19.1,68.5,22.7,73.9c5,6.9,11.3,10.6,18,14.4c8.1,4.7,16.4,9.5,21.8,20.1l8.3,15.6L295.1,404.3z"/>
      <path className="st0" d="M144.4,263.4c-65.1,0-118-52.9-118-118s52.9-118,118-118s118,52.9,118,118S209.5,263.4,144.4,263.4z M144.4,39.4c-58.4,0-106,47.6-106,106s47.6,106,106,106s106-47.6,106-106S202.9,39.4,144.4,39.4z"/>
      <rect className="st0" x="250.3" y="185.9" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -65.2344 239.3277)" width="12" height="25"/>
      <rect className="st0" x="236.3" y="219.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.718 244.9606)" width="12" height="64.5"/>
      <polygon className="st1" points="188.5,197.4 154.4,168.2 154.4,81.4 166.4,81.4 166.4,162.7 196.3,188.3 "/>
      <rect className="st1" x="197" y="144.6" transform="matrix(0.6508 -0.7593 0.7593 0.6508 -49.457 209.4883)" width="12" height="27.8"/>
      <polygon className="st1" points="100.4,197.4 92.6,188.3 122.4,162.7 122.4,81.4 134.4,81.4 134.4,168.2 "/>
      <rect className="st1" x="71.9" y="152.5" transform="matrix(0.7593 -0.6508 0.6508 0.7593 -82.4851 94.0361)" width="27.8" height="12"/>
    </svg>
  ),
  Check: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Arrow: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Phone: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Menu: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Facebook: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
    </svg>
  ),
  LinkedIn: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14M8.27 18.5v-8.13H5.56v8.13h2.71M6.92 9.18a1.57 1.57 0 1 0 0-3.14 1.57 1.57 0 0 0 0 3.14M18.5 18.5v-4.46c0-2.5-1.6-3.71-3.34-3.71-1.18 0-2 .67-2.36 1.31v-1.13H10.1v8.13h2.71v-4.42c0-1.05.7-1.66 1.5-1.66.78 0 1.48.39 1.48 1.62v4.46h2.71"/>
    </svg>
  ),
};

// ===== DATA =====
const services = [
  { icon: <Icon.Drop />, title: "Blood Draws", desc: "Stop in at our hospitals or clinics. Walk-in appointments are accepted; we welcome every patient — no appointment needed.", href: "Services.html#blood-draws" },
  { icon: <Icon.Microscope />, title: "Laboratory Testing", desc: "We perform comprehensive testing on blood and other specimens to help detect, monitor, and prevent a wide range of conditions.", href: "Services.html#lab-testing" },
  { icon: <Icon.Tube />, title: "Sample Collection", desc: "Urine, stool, and serum sample specimen drop-off options designed around your schedule.", href: "Services.html#sample-collection" },
  { icon: <Icon.Biopsy />, title: "Tissue Biopsy Analysis", desc: "We perform comprehensive testing to detect and characterize benign and malignant tissue and preserve a wide range of conditions.", href: "Services.html#tissue-biopsy" },
];

const locations = [
  {
    id: "main",
    name: "Main Lab",
    address: "1311 1st Avenue SE",
    city: "Cedar Rapids, IA 52402",
    weekday: "Mon–Fri: 6am–6pm",
    sat: "Sat: 8am–noon",
    sun: "Sun: Closed",
    phone1: "319.555.1411",
    phone2: "1.800.728.7203",
  },
  {
    id: "czech",
    name: "Czech Square",
    address: "84 16th Avenue SW",
    city: "Cedar Rapids, IA 52404",
    weekday: "Mon–Fri: 7am–5pm",
    sat: "Sat: 8am–noon",
    sun: "Sun: Closed",
    phone1: "319.555.2102",
    phone2: "1.800.728.7203",
  },
  {
    id: "southwest",
    name: "Southwest",
    address: "2421 Edgewood Rd SW",
    city: "Cedar Rapids, IA 52404",
    weekday: "Mon–Fri: 6am–6pm",
    sat: "Sat: 8am–noon",
    sun: "Sun: Closed",
    phone1: "319.555.3344",
    phone2: "1.800.728.7203",
  },
  {
    id: "marion",
    name: "Marion",
    address: "2300 Blairs Ferry Rd",
    city: "Marion, IA 52302",
    weekday: "Mon–Fri: 7am–5pm",
    sat: "Sat: Closed",
    sun: "Sun: Closed",
    phone1: "319.555.7788",
    phone2: "1.800.728.7203",
  },
];

const blogPosts = [
  { tag: "preparation", cls: "blog-img-1", src: "assets/blog-1.jpg", title: "Fasting Before a Lab Test", desc: "Here's everything you need to know about fasting before bloodwork — what to eat, when to stop, and why your provider asks for it.", img: "clock + plate", href: "Blog - Fasting Before a Lab Test What You Actually Need to Know.html" },
  { tag: "costs", cls: "blog-img-2", src: "assets/blog-2.jpg", title: "How Much Does Lab Work Cost Without Insurance?", desc: "Walking into a lab without insurance? Here's the real out-of-pocket cost breakdown for the most common panels.", img: "coins", href: "Blog - How Much Does Lab Work Cost Without Insurance.html" },
  { tag: "hydration", cls: "blog-img-3", src: "assets/blog-3.jpg", title: "Can I Drink Water Before a Blood Test?", desc: "Hydration matters — but so do the rules of your specific test. Here's exactly what to drink (and what to avoid).", img: "water glass", href: "Blog - Can I Drink Water Before a Blood Test.html" },
  { tag: "results", cls: "blog-img-4", src: "assets/blog-4.jpg", title: "How Long Do Lab Results Take (and Why)?", desc: "The timeline from sample to result depends on the test, the lab workflow, and your provider. Here's what to expect.", img: "test tubes", href: "Blog - How Long Do Lab Results Take and Why.html" },
];

// ===== COMPONENTS =====

function Logo({ height = 56, variant = "default" }) {
  const textFill = variant === "footer" ? "#ffffff" : "#052942";
  const viewBox = variant === "footer" ? "20 18 389 60" : "0 0 409.3 100.8";
  return (
    <svg height={height} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" aria-label="Weland Labs" style={{display:"block"}}>
      <polygon fill="#45BBEC" points="91.3,25.4 102.1,25.4 87.4,70.5 76.1,70.5 68.9,50.1 64.6,50.1 73.3,74.5 90.3,74.5 107.6,21.4 92.1,21.4 "/>
      <path fill="#80C241" d="M74.7,21.2h-17l-6.3,18.9l-5.5-18.8H24.5l17.3,53.2h13.1c0.4-1.3,0.7-2.7,1.1-4H44.7L30.1,25.4h12.8l8.3,28.1l9.4-28.2h11.2l6.8,20.4h4.2L74.7,21.2z"/>
      <g fill={textFill}>
        <polygon points="161.2,30.5 153,59.7 144.7,30.5 139.9,30.5 131.7,59.7 123.5,30.5 118.7,30.5 129.4,67.5 134,67.5 142.3,38.5 150.7,67.5 155.2,67.5 166,30.5 "/>
        <path d="M188.5,54.9h2.4c0.1-3.3-0.3-6.1-1.3-8.5c-1-2.4-2.5-4.2-4.4-5.5c-2-1.3-4.3-1.9-7.1-1.9c-2.7,0-5,0.6-7,1.8c-2,1.2-3.6,2.9-4.7,5.1c-1.1,2.2-1.7,4.8-1.7,7.9c0,2.9,0.6,5.4,1.7,7.6c1.1,2.2,2.7,3.9,4.7,5.1c2,1.2,4.4,1.8,7.1,1.8c2.7,0,5.1-0.7,7.3-2s3.8-3.2,4.9-5.7L186,59c-0.8,1.6-1.8,2.8-3.2,3.6c-1.4,0.8-2.9,1.3-4.8,1.3c-2.7,0-4.8-0.9-6.3-2.7c-1.3-1.6-2-3.7-2.2-6.3h16.7H188.5z M169.6,51.2c0.3-2.3,1-4.1,2.1-5.4c1.5-1.8,3.6-2.7,6.5-2.7c2.6,0,4.6,0.8,6,2.5c1.1,1.3,1.7,3.2,2,5.6H169.6z"/>
        <rect x="194.7" y="29.7" width="4.6" height="37.8"/>
        <path d="M226,44.4c-0.8-1.8-2.1-3.2-3.9-4.1s-4-1.4-6.5-1.4c-3.1,0-5.7,0.7-7.6,2.1c-1.9,1.4-3.2,3.3-3.9,5.7l4.3,1.3c0.5-1.7,1.4-2.9,2.7-3.7c1.3-0.8,2.7-1.2,4.4-1.2c2.5,0,4.3,0.6,5.3,1.8c0.9,1.1,1.4,2.7,1.5,4.7c-1,0.1-2,0.3-3.1,0.4c-1.7,0.2-3.3,0.5-5,0.7s-3.1,0.6-4.4,0.9c-1.4,0.4-2.6,1-3.6,1.7c-1,0.7-1.8,1.6-2.4,2.7c-0.5,1.1-0.8,2.3-0.8,3.8c0,1.5,0.4,2.9,1.1,4.1c0.7,1.3,1.8,2.3,3.2,3c1.4,0.8,3.1,1.1,5.2,1.1c2.7,0,5-0.6,6.8-1.7c1.4-0.8,2.5-2,3.4-3.4v4.3h4.1V50.3c0-1.1-0.1-2.1-0.2-3.1C226.6,46.2,226.4,45.2,226,44.4z M222.3,55.2c0,1-0.2,2-0.4,2.9c-0.2,1.1-0.7,2.2-1.4,3.2c-0.7,1-1.7,1.7-2.9,2.3c-1.2,0.6-2.6,0.9-4.3,0.9c-1.3,0-2.4-0.2-3.2-0.6c-0.8-0.4-1.4-1-1.8-1.7s-0.6-1.4-0.6-2.2c0-0.9,0.2-1.6,0.6-2.2c0.4-0.6,0.9-1.1,1.6-1.5c0.7-0.4,1.4-0.7,2.1-0.9c1-0.3,2.2-0.5,3.5-0.7c1.3-0.2,2.6-0.4,4.1-0.6c0.9-0.1,1.9-0.3,2.8-0.4C222.3,54.1,222.3,54.6,222.3,55.2z"/>
        <path d="M254.8,45.2c-0.5-1.1-1.1-2.2-2-3.1c-0.8-0.9-1.9-1.7-3.2-2.3c-1.3-0.6-2.8-0.8-4.6-0.8c-2.4,0-4.5,0.5-6.2,1.6c-1.2,0.7-2.2,1.7-3,2.8v-3.6h-4.1v27.8h4.6V52.9c0-1.6,0.2-3,0.6-4.2c0.4-1.2,0.9-2.2,1.6-3c0.7-0.8,1.5-1.4,2.4-1.8c0.9-0.4,2-0.6,3.1-0.6c1.5,0,2.7,0.3,3.7,0.8s1.7,1.3,2.3,2.3c0.6,1,1,2.1,1.2,3.3c0.2,1.2,0.4,2.5,0.4,3.8v13.9h4.6V52.1c0-1-0.1-2.2-0.3-3.4C255.6,47.6,255.3,46.4,254.8,45.2z"/>
        <path d="M280,42.3c-0.5-0.5-1-1-1.6-1.4c-1.8-1.3-4-1.9-6.6-1.9c-2.6,0-4.8,0.6-6.6,1.9c-1.9,1.3-3.3,3-4.3,5.2s-1.5,4.7-1.5,7.5s0.5,5.3,1.5,7.5c1,2.2,2.4,4,4.3,5.3c1.9,1.3,4.1,1.9,6.7,1.9c2.6,0,4.8-0.6,6.6-1.9c0.8-0.6,1.5-1.3,2.1-2v3.2h4.1v-37H280V42.3z M279.7,59c-0.6,1.6-1.5,2.8-2.7,3.7c-1.2,0.9-2.7,1.3-4.6,1.3c-1.8,0-3.3-0.5-4.5-1.4c-1.2-0.9-2.1-2.2-2.7-3.8c-0.6-1.6-0.9-3.4-0.9-5.3c0-2,0.3-3.7,0.9-5.3c0.6-1.6,1.5-2.8,2.7-3.8c1.2-0.9,2.8-1.4,4.7-1.4c1.8,0,3.3,0.4,4.5,1.3c1.2,0.9,2.1,2.1,2.6,3.7c0.6,1.6,0.9,3.4,0.9,5.4C280.5,55.6,280.2,57.4,279.7,59z"/>
        <polygon points="304.8,30.5 300.2,30.5 300.2,67.5 322,67.5 322,63.1 304.8,63.1 "/>
        <path d="M345.7,44.4c-0.8-1.8-2.1-3.2-3.9-4.1s-4-1.4-6.5-1.4c-3.1,0-5.7,0.7-7.6,2.1c-1.9,1.4-3.2,3.3-3.9,5.7l4.3,1.3c0.5-1.7,1.4-2.9,2.7-3.7s2.7-1.2,4.4-1.2c2.5,0,4.3,0.6,5.3,1.8c0.9,1.1,1.4,2.7,1.5,4.7c-1,0.1-2,0.3-3.1,0.4c-1.7,0.2-3.3,0.5-5,0.7s-3.1,0.6-4.4,0.9c-1.4,0.4-2.6,1-3.6,1.7c-1,0.7-1.8,1.6-2.4,2.7c-0.5,1.1-0.8,2.3-0.8,3.8c0,1.5,0.4,2.9,1.1,4.1c0.7,1.3,1.8,2.3,3.2,3c1.4,0.8,3.1,1.1,5.2,1.1c2.7,0,5-0.6,6.8-1.7c1.4-0.8,2.5-2,3.4-3.4v4.3h4.1V50.3c0-1.1-0.1-2.1-0.2-3.1C346.4,46.2,346.1,45.2,345.7,44.4z M342,55.2c0,1-0.2,2-0.4,2.9c-0.2,1.1-0.7,2.2-1.4,3.2c-0.7,1-1.7,1.7-2.9,2.3c-1.2,0.6-2.6,0.9-4.3,0.9c-1.3,0-2.4-0.2-3.2-0.6c-0.8-0.4-1.4-1-1.8-1.7s-0.6-1.4-0.6-2.2c0-0.9,0.2-1.6,0.6-2.2c0.4-0.6,0.9-1.1,1.6-1.5s1.4-0.7,2.1-0.9c1-0.3,2.2-0.5,3.5-0.7c1.3-0.2,2.6-0.4,4.1-0.6c0.9-0.1,1.9-0.3,2.8-0.4C342,54.1,342,54.6,342,55.2z"/>
        <path d="M370.8,40.9c-1.9-1.3-4.1-1.9-6.6-1.9c-2.6,0-4.8,0.6-6.6,1.9c-0.6,0.4-1.1,0.9-1.6,1.4V30.5h-4.6v37h4.1v-3.2c0.6,0.8,1.3,1.4,2.1,2c1.8,1.3,4,1.9,6.6,1.9c2.6,0,4.8-0.6,6.7-1.9c1.9-1.3,3.3-3,4.3-5.3c1-2.2,1.5-4.7,1.5-7.5s-0.5-5.3-1.5-7.5C374.1,43.9,372.7,42.1,370.8,40.9z M370.8,58.9c-0.6,1.6-1.5,2.8-2.7,3.8c-1.2,0.9-2.7,1.4-4.5,1.4c-1.9,0-3.4-0.5-4.6-1.3c-1.2-0.9-2.1-2.1-2.7-3.7c-0.6-1.6-0.9-3.4-0.9-5.4c0-2,0.3-3.8,0.9-5.4c0.6-1.6,1.5-2.8,2.6-3.7c1.2-0.9,2.7-1.3,4.5-1.3c1.9,0,3.4,0.5,4.7,1.4c1.2,0.9,2.1,2.2,2.7,3.8c0.6,1.6,0.9,3.3,0.9,5.3C371.7,55.5,371.4,57.3,370.8,58.9z"/>
        <path d="M400.7,56c-0.6-1-1.6-1.8-3-2.6s-3.3-1.4-5.8-2c-2.2-0.5-3.8-1-5-1.5c-1.1-0.4-1.9-0.9-2.3-1.4c-0.4-0.5-0.6-1-0.6-1.7c0-1.2,0.6-2.1,1.7-2.8c1.1-0.7,2.6-1,4.4-1c1.9,0.1,3.4,0.5,4.7,1.4c1.2,0.9,1.9,2,2.2,3.5l4.7-0.8c-0.2-1.6-0.8-3.1-1.8-4.3c-1-1.2-2.4-2.2-4-2.8c-1.7-0.7-3.5-1-5.7-1c-2.1,0-4,0.3-5.6,1c-1.6,0.7-2.8,1.6-3.7,2.8c-0.9,1.2-1.3,2.6-1.3,4.3c0,1.3,0.3,2.5,0.9,3.4c0.6,0.9,1.6,1.7,3,2.4s3.3,1.4,5.8,2c2.3,0.6,4,1.1,5.1,1.6c1.1,0.4,1.9,0.9,2.2,1.4c0.4,0.5,0.5,1.1,0.5,1.9c0,1.4-0.5,2.4-1.6,3.2c-1.1,0.8-2.6,1.2-4.5,1.2c-2,0-3.7-0.4-5-1.3s-2.2-2.1-2.6-3.6l-4.7,0.7c0.5,2.6,1.8,4.6,3.9,6.1c2.1,1.4,4.8,2.2,8.1,2.2c3.5,0,6.2-0.8,8.2-2.3c2-1.5,3-3.6,3-6.3C401.6,58.2,401.3,57,400.7,56z"/>
      </g>
    </svg>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#" className="nav-logo" aria-label="Weland Labs home">
          <Logo />
        </a>
        <nav className={`nav-links${open ? " open" : ""}`}>
          <a href="Services.html">Services</a>
          <a href="Locations.html">Locations</a>
          <a href="About.html">About Us</a>
          <a href="FAQ.html">FAQ</a>
          <a href="#blog">Blog</a>
          <a href="Contact.html" className="nav-cta">Contact</a>
        </nav>
        <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <Icon.Close /> : <Icon.Menu />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-grid hero-grid--reverse">
        <div className="hero-text">
          <p className="eyebrow">No appointment needed</p>
          <h1>Precision Testing.<br/>Personal Care.</h1>
          <p>For over 50 years, Weland Labs has delivered accurate, timely, and compassionate diagnostic testing to patients, physicians, and healthcare systems across Eastern Iowa. With advanced technology, experienced professionals, and a commitment to efficiency, we make lab testing simple, accessible, and reliable.</p>
          <div className="hero-actions">
            <a href="Services.html" className="btn btn-primary">Services</a>
            <a href="Locations.html" className="btn btn-ghost">Locations <Icon.Arrow /></a>
          </div>
        </div>
        <div className="hero-image" aria-hidden="true"></div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" data-screen-label="02 Services">
      <div className="container">
        <div className="section-head">
          <h2>Comprehensive Lab Services</h2>
          <a href="Services.html" className="view-all">View All <Icon.Arrow /></a>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <a key={i} href={s.href} className="service-card-link">
              <article className="service-card" tabIndex="0">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testing() {
  return (
    <section className="testing" data-screen-label="03 Accurate testing">
      <div className="container">
        <div className="testing-grid">
          <div className="testing-image" aria-hidden="true">
            <div className="placeholder">[ provider with patient ]</div>
          </div>
          <div>
            <h2>Accurate testing. Clear answers.</h2>
            <p style={{color: "var(--muted)", fontSize: "15px", lineHeight: 1.7, margin: "0 0 8px"}}>
              Weland Labs provides a full range of diagnostic services for patients referred by hospitals, clinics, and healthcare providers. From routine screenings to specialized analyses, our team delivers fast, reliable results to support confident clinical decisions.
            </p>
            <ul className="testing-bullets">
              <li><span className="check"><Icon.Check /></span> Fast turnaround times so you and your provider can act quickly</li>
              <li><span className="check"><Icon.Check /></span> Convenient access with multiple locations and walk-in availability</li>
              <li><span className="check"><Icon.Check /></span> Lower out-of-pocket costs compared to many hospital systems</li>
              <li><span className="check"><Icon.Check /></span> Efficient visits — most patients are in and out in under 20 minutes</li>
            </ul>
            <a href="#" className="btn btn-outline">Read more <Icon.Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Locations() {
  const [active, setActive] = useState("main");
  const loc = locations.find(l => l.id === active);
  return (
    <section id="locations" className="locations" data-screen-label="04 Locations">
      <div className="container">
        <div className="section-head">
          <h2>Four Convenient Locations</h2>
        </div>
        <div className="locations-card">
          <div className="location-tabs" role="tablist">
            {locations.map(l => (
              <button
                key={l.id}
                role="tab"
                aria-selected={active === l.id}
                className={`location-tab${active === l.id ? " active" : ""}`}
                onClick={() => setActive(l.id)}
              >
                {l.name}
              </button>
            ))}
          </div>
          <div className="location-content">
            <div className="location-image" data-loc={loc.id} aria-hidden="true">
              <div className="placeholder">[ {loc.name} exterior photo ]</div>
            </div>
            <div className="location-info">
              <div>
                <h4>{loc.name.toUpperCase()}</h4>
              </div>
              <div className="location-info-row">
                <div>
                  <p className="addr">{loc.address}<br/>{loc.city}</p>
                  <div className="location-hours">
                    <strong>{loc.weekday}</strong><br/>
                    {loc.sat}<br/>
                    {loc.sun}
                  </div>
                </div>
                <div className="location-meta">
                  <a href={`tel:${loc.phone1}`}><span className="icon"><Icon.Phone /></span> {loc.phone1}</a>
                  <a href={`tel:${loc.phone2}`}><span className="icon"><Icon.Phone /></span> {loc.phone2}</a>
                  <a href="#" className="directions-link">Directions <Icon.Arrow /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="blog" data-screen-label="05 Blog">
      <div className="container">
        <div className="section-head">
          <h2>Blog</h2>
          <a href="Blog.html" className="view-all">View All <Icon.Arrow /></a>
        </div>
        <div className="blog-grid">
          {blogPosts.map((p, i) => (
            <a key={i} href={p.href} className="blog-card-link">
              <article className="blog-card">
                <div className="blog-image">
                  <img src={p.src} alt={p.img} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <>
      <section className="cta-band">
        <div className="container">
          <div>
            <h2>Need a test today?</h2>
            <p>Walk in to any of our four locations during open hours, or call ahead if you'd like us to confirm prep instructions for your specific test.</p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="Locations.html" className="btn btn-primary">Find a location <Icon.Arrow /></a>
            <a href="Contact.html" className="btn btn-ghost">Contact us <Icon.Arrow /></a>
          </div>
        </div>
      </section>
      <footer className="footer" id="contact">
        <div className="container footer-inner">
          <div className="footer-logo">
            <Logo height={40} variant="footer" />
          </div>
          <div className="footer-social">
            <a href="#" className="social-icon" aria-label="Facebook"><Icon.Facebook /></a>
            <a href="#" className="social-icon" aria-label="LinkedIn"><Icon.LinkedIn /></a>
          </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply text scale to a CSS custom property on the root
  useEffect(() => {
    document.documentElement.style.setProperty('--text-scale', t.textScale);
  }, [t.textScale]);

  // simple intersection observer for fade-up
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Testing />
        <Locations />
        <Blog />
      </main>
      <Footer />
      <TweaksPanel>
        <TweakSection label="Typography" />
        <TweakSlider label="Text size" value={t.textScale} min={0.85} max={1.4} step={0.05} unit="×"
                     onChange={(v) => setTweak('textScale', Math.round(v * 100) / 100)} />
      </TweaksPanel>
    </>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "textScale": 1
}/*EDITMODE-END*/;

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
