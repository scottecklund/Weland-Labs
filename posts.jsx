// Shared blog post data + helpers. Loaded by Blog.html and every post page.

const blogPosts = [
{
  slug: "fasting-before-a-lab-test",
  category: "Preparation",
  title: "Fasting Before a Lab Test: What You Actually Need to Know",
  dek: "Here's everything you need to know about fasting before bloodwork — what to eat, when to stop, and which tests don't require it at all.",
  date: "March 18, 2026",
  read: "5 min read",
  author: "Dr. Anne Weland",
  authorRole: "Medical Director",
  image: "assets/blog-1.jpg",
  imageAlt: "Glass of water and an apple on a clean kitchen counter",
  body: [
    { kind: "p", text: "If your provider asked you to fast before a lab test, the instruction can feel a little vague. How long? Is water OK? What about coffee, gum, or that morning multivitamin? The short answer: it depends on the test — but the rules are simpler than they look." },
    { kind: "h2", text: "Why fasting matters" },
    { kind: "p", text: "Many of the most common labs measure substances that change rapidly with what you eat. A glucose test taken 30 minutes after a banana will not look like a glucose test taken first thing in the morning. Fasting gives the lab a clean baseline so your provider can compare your numbers to standard ranges instead of guessing how breakfast moved them." },
    { kind: "h2", text: "Which tests typically require fasting" },
    { kind: "ul", items: [
      "Fasting glucose and A1C (when ordered together)",
      "Lipid panel (cholesterol, triglycerides, HDL, LDL)",
      "Comprehensive metabolic panel (when ordered fasting)",
      "Iron studies, in some cases",
      "Glucose tolerance test"
    ]},
    { kind: "h2", text: "How long to fast" },
    { kind: "p", text: "The standard window is 8–12 hours, with 10–12 being typical for a lipid panel. That sounds long until you realize it includes the time you spend asleep. Most patients have their last meal at 8 or 9 pm and come in for an early-morning draw — easy and uneventful." },
    { kind: "callout", text: "Plain water is always allowed and actually encouraged. Hydrated veins are easier to draw from, and your phlebotomist will thank you." },
    { kind: "h2", text: "What counts as breaking the fast" },
    { kind: "p", text: "Anything with calories or sweetener: coffee with milk, juice, smoothies, gum, mints, cough drops. Black coffee and tea are technically calorie-free but still affect some test markers, so we ask patients to avoid them too. Take your prescribed medications as normal unless your provider tells you otherwise." },
    { kind: "h2", text: "When you can stop fasting" },
    { kind: "p", text: "As soon as the draw is done. Bring a snack and a bottle of water — most of our locations have a small bench right outside the lab room where patients eat before they head out." }
  ]
},
{
  slug: "lab-work-cost-without-insurance",
  category: "Costs",
  title: "How Much Does Lab Work Cost Without Insurance?",
  dek: "Walking into a lab without insurance? Here's the real out-of-pocket cost for the most common tests, and how to plan ahead.",
  date: "February 27, 2026",
  read: "6 min read",
  author: "Marcus Lin",
  authorRole: "Patient Services Lead",
  image: "assets/blog-2.jpg",
  imageAlt: "Clipboard with lab order paperwork on a desk",
  body: [
    { kind: "p", text: "Lab pricing has a reputation for being opaque — and frankly, it deserves it. The same blood draw can be billed three different ways depending on insurance, hospital affiliation, and whether the order came from a primary care office or an emergency room. Here's how it actually works at an independent reference lab like ours." },
    { kind: "h2", text: "Self-pay pricing at Weland" },
    { kind: "p", text: "We publish flat self-pay rates for the tests we run most often. There's no surprise. You pay at the front desk before the draw, and you walk out with a receipt and an itemized list of what was ordered." },
    { kind: "ul", items: [
      "Basic metabolic panel (BMP): $32",
      "Comprehensive metabolic panel (CMP): $48",
      "Lipid panel: $36",
      "Hemoglobin A1C: $28",
      "Complete blood count (CBC): $24",
      "Thyroid panel (TSH + free T4): $58"
    ]},
    { kind: "h2", text: "Why hospital labs charge more" },
    { kind: "p", text: "If you've ever seen a $400 cholesterol panel on a hospital bill, you're not imagining things. Hospital-affiliated labs add facility fees on top of the test cost — usually a multiple of the underlying lab work. Independent labs like ours don't carry that overhead, which is why our self-pay prices are typically 60–80% lower for the same panel." },
    { kind: "callout", text: "If your provider gave you a lab order, ask whether it can be sent to an independent lab. Most orders are portable, and the savings on a routine panel can be significant." },
    { kind: "h2", text: "What to bring" },
    { kind: "p", text: "A photo ID, the lab order from your provider, and a card or cash. We accept HSA and FSA cards. If your provider sent the order electronically, we likely already have it on file under your name." },
    { kind: "h2", text: "If your costs feel high" },
    { kind: "p", text: "Talk to us. We have a financial assistance application for patients who qualify, and we can also put together a payment plan for larger orders like genetic panels or specialty testing." }
  ]
},
{
  slug: "drinking-water-before-a-blood-test",
  category: "Hydration",
  title: "Can I Drink Water Before a Blood Test?",
  dek: "Hydration matters — but so do the rules of your specific test. Here's exactly what to drink and when.",
  date: "February 11, 2026",
  read: "3 min read",
  author: "Dr. Anne Weland",
  authorRole: "Medical Director",
  image: "assets/blog-3.jpg",
  imageAlt: "A glass of water on a wooden table",
  body: [
    { kind: "p", text: "Yes — almost always yes. Plain water is allowed before nearly every routine lab test, including the ones where you're asked to fast. Drinking water before your draw is not just permitted; it's a small thing that makes the whole appointment go better." },
    { kind: "h2", text: "Why hydration helps" },
    { kind: "p", text: "Veins fill out and become easier to find when you're well-hydrated. Drawing from a hydrated vein is faster, more comfortable, and less likely to require a second stick. Patients who come in dehydrated — especially after a long fast — are the ones most likely to have a slow draw or feel lightheaded afterward." },
    { kind: "h2", text: "What counts as 'water'" },
    { kind: "ul", items: [
      "Tap water — yes",
      "Filtered or bottled water — yes",
      "Sparkling water (no flavoring) — yes, in moderation",
      "Lemon water with a squeeze — fine",
      "Flavored or sweetened water — no, that breaks the fast",
      "Coffee, tea, juice, smoothies — no during a fast"
    ]},
    { kind: "callout", text: "Aim for two big glasses of water in the hour before your appointment. You'll feel better and your phlebotomist will love you." },
    { kind: "h2", text: "When water is restricted" },
    { kind: "p", text: "A few specialty tests — most notably some endocrine and renal-function studies — restrict fluid intake. If your provider gave you specific instructions about water, follow them. If you're not sure, call the location you're visiting before the day of your draw and we'll check the order for you." }
  ]
},
{
  slug: "how-long-do-lab-results-take",
  category: "Results",
  title: "How Long Do Lab Results Take (and Why)?",
  dek: "The timeline from sample to result depends on the test, the lab workflow, and where the order was sent. Here's what to expect.",
  date: "January 23, 2026",
  read: "4 min read",
  author: "Priya Shah",
  authorRole: "Lab Operations Manager",
  image: "assets/blog-4.jpg",
  imageAlt: "Lab technician reviewing test results on a screen",
  body: [
    { kind: "p", text: "Once your blood is drawn, what actually happens to it? And why does a basic panel come back the same afternoon while a thyroid antibody test takes a week? The answer is workflow, and it varies more than most patients realize." },
    { kind: "h2", text: "Routine bloodwork: same day to 24 hours" },
    { kind: "p", text: "Common panels — CBC, BMP, CMP, lipids, A1C — are run on automated analyzers and finished in a few hours. If you draw before noon, your provider usually sees the result by end of business day. The patient portal posts shortly after." },
    { kind: "h2", text: "Microbiology and cultures: 2–5 days" },
    { kind: "p", text: "Cultures need time to grow. A standard urine culture takes 48 hours; a wound or throat culture often runs 72. Sensitivity testing — figuring out which antibiotic the bug responds to — adds another day on top." },
    { kind: "h2", text: "Pathology and specialty: 5–10 days" },
    { kind: "p", text: "Tissue biopsies, complex hormone panels, autoimmune workups, and most genetic testing route through a specialty lab. The waiting feels long, but the work is real: a pathologist is reading slides, a chemist is running a multi-step assay, or a sequencer is doing what it does." },
    { kind: "callout", text: "If you haven't heard back in the expected window, call your provider's office first — most results are released through the portal as soon as they post." },
    { kind: "h2", text: "Why some results 'pend'" },
    { kind: "p", text: "Sometimes a result is held briefly while a tech repeats it for accuracy or while a pathologist reviews a borderline finding. That's a feature, not a delay — it means the lab is doing its job before the number lands in your chart." }
  ]
}];


// Helper: get the related posts for a given slug (everything else, in order).
function relatedPosts(currentSlug) {
  return blogPosts.filter((p) => p.slug !== currentSlug);
}

function postBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug);
}

// Build a filesystem-safe href for a post's HTML page.
// Must match the sanitizer used when the files were generated:
// strip : ? ( ) and collapse whitespace.
function postUrl(post) {
  const safe = post.title.replace(/[:?()]/g, "").replace(/\s+/g, " ").trim();
  return `Blog - ${safe}.html`;
}

Object.assign(window, { blogPosts, relatedPosts, postBySlug, postUrl });
