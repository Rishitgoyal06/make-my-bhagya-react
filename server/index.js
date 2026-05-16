require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();

// Standard middleware
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// --- SERVICES DATA ---
// Centrally managed service data for easy updates
const services = {
  vastu: [
    {
      id: "vastu-doc-home-office",
      title: "Home Vastu + Office Vastu Document",
      price: "₹1,000",
      badge: "Vastu Document",
      summary: "A combined home and office review document focused on harmony, prosperity, peace, and flow across both spaces.",
      bullets: [
        "Main entrance, bedroom, kitchen and prosperity corner analysis",
        "Living room energy flow and children room direction review",
        "Health zone, toilet balance and negative block identification",
        "5-element balance across home and office zones"
      ]
    },
    {
      id: "vastu-visit-office",
      title: "Office Vastu Visit",
      price: "₹3,500",
      badge: "On-Site Office",
      summary: "A practical office Vastu visit built to improve team direction, work energy, client flow, and operational stability.",
      bullets: [
        "Complete office Vastu analysis without demolition",
        "Correct directions for teams, departments and client interaction",
        "Colour and placement guidance for smoother operations",
        "Remedies for money flow, stability and conversions"
      ]
    },
    {
      id: "vastu-visit-home",
      title: "Home Vastu Visit",
      price: "₹2,500",
      badge: "On-Site Home",
      summary: "A detailed home Vastu check focused on peace, health, prosperity, and simple corrections that do not require demolition.",
      bullets: [
        "Room-by-room home Vastu evaluation",
        "Corrections through placement changes and colour guidance",
        "Remedies for money, health and family peace",
        "Personalized improvement plan for your home energy"
      ]
    }
  ],
  tarot: [
    {
      id: "tarot-course-advanced",
      title: "Advanced Tarot Card Course",
      price: "₹14,999",
      badge: "Professional Course",
      summary: "An advanced course for readers ready to master deeper intuition, timelines, multi-spread work, and client-facing practice.",
      bullets: [
        "Advanced Major and Minor Arcana interpretation",
        "Energy reading, intuition and future timeline techniques",
        "Relationship, career, finance and block-clearing spreads",
        "Case studies, worksheets, lifetime guidance and certificate"
      ]
    },
    {
      id: "tarot-course-basic",
      title: "Tarot Course — Basic",
      price: "₹5,000",
      badge: "Beginner Course",
      summary: "A beginner-friendly tarot course designed to take someone from zero knowledge to confident reading step by step.",
      bullets: [
        "Major Arcana, Minor Arcana and upright-reversed meanings",
        "How to ask better questions and read for yourself and others",
        "Basic spreads like 3-card and past-present-future",
        "Practice sessions, PDF notes and certificate included"
      ]
    },
    {
      id: "tarot-reading-advanced",
      title: "Advanced Tarot Reading",
      price: "₹1,500",
      badge: "Deep Reading",
      summary: "A deeper tarot session focused on karmic patterns, emotional blocks, timelines, soul lessons, and transformation guidance.",
      bullets: [
        "Hidden truths in relationships, career and money",
        "Future timelines and repeated pattern analysis",
        "Shadow work, chakra or energy block guidance",
        "Action steps and remedies for positive shifts"
      ]
    },
    {
      id: "tarot-reading-quick",
      title: "Tarot Card Reading",
      price: "₹300",
      badge: "Quick Clarity",
      summary: "A focused reading for current life questions around career, finance, relationships, health, and next-step clarity.",
      bullets: [
        "Understand present energies and hidden influences",
        "Get guidance on decisions and personal growth",
        "See what is developing and what action helps most",
        "Ideal for quick but accurate insight"
      ]
    }
  ],
  numerology: [
    {
      id: "num-fame-rajyog",
      title: "Fame & Rajyog Numerology",
      price: "₹5,100",
      badge: "Leadership Energy",
      summary: "A numerology session that reveals recognition, authority, influence, luxury, and public success indicators in your chart.",
      bullets: [
        "Fame numbers, Rajyog numbers and leadership patterns",
        "Public presence, spotlight potential and authority traits",
        "Lucky colours, days and recognition remedies",
        "Career direction based on your strongest chart energies"
      ]
    },
    {
      id: "num-life-path-grid",
      title: "1-Year, 3-Year & 5-Year Life Path Prediction",
      price: "₹6,100",
      badge: "Future Cycles",
      summary: "A roadmap-style prediction service showing your upcoming personal and professional energy cycles over 1, 3, and 5 years.",
      bullets: [
        "Career, money and relationship shifts across time",
        "Transformation windows and expansion phases",
        "Important years for stability, growth and major decisions",
        "Long-term destiny alignment and planning clarity"
      ]
    },
    {
      id: "num-financial-abundance",
      title: "Financial Abundance — Yearly Membership",
      price: "₹1,00,000",
      badge: "Premium Membership",
      summary: "A high-touch abundance-focused numerology membership designed to align long-term money flow, opportunities, and wealth remedies.",
      bullets: [
        "Wealth numbers, earning potential and money block analysis",
        "Name, signature, dates, colours and direction guidance",
        "Personalized remedies for abundance activation",
        "Long-term financial path and vibration support"
      ]
    },
    {
      id: "num-couple-matching",
      title: "Couple Matching — Numerology Compatibility",
      price: "₹2,400",
      badge: "Relationship Match",
      summary: "Compatibility guidance for love, marriage, communication, bonding, and long-term relationship harmony.",
      bullets: [
        "Personal and couple numerology chart comparison",
        "Compatibility score for love, communication and bonding",
        "Harmony remedies and relationship improvement guidance",
        "Long-term success and stability prediction"
      ]
    },
    {
      id: "num-car",
      title: "Car Numerology",
      price: "₹1,100",
      badge: "Vehicle Energy",
      summary: "A detailed car number analysis to help choose or evaluate a vehicle number for smoother journeys and positive energy.",
      bullets: [
        "Compatibility with your birth details",
        "Lucky number suggestions for new vehicle selection",
        "Imbalance remedies for existing number plates",
        "Support for safer and more prosperous travel energy"
      ]
    },
    {
      id: "num-mobile",
      title: "Mobile Numerology",
      price: "₹1,100",
      badge: "Daily Energy",
      summary: "Mobile number analysis for luck, opportunities, peace, growth, and day-to-day energetic support.",
      bullets: [
        "Complete mobile number vibration analysis",
        "Lucky and supportive number suggestions",
        "Remedies for negative or blocked number patterns",
        "Energy alignment for money, peace and progress"
      ]
    },
    {
      id: "num-business-suggestion",
      title: "Business Suggestion",
      price: "₹11,000",
      badge: "Brand & Business",
      summary: "A numerology-driven business setup service covering name vibration, branding signals, lucky directions, and attraction energy.",
      bullets: [
        "Chaldean and Pythagorean analysis",
        "Business name ideas, spelling corrections and logo numerology",
        "Lucky colours, numbers, documents, mobile and vehicle guidance",
        "Remedies and energy balancing for customers and sales"
      ]
    },
    {
      id: "num-student-parents",
      title: "Student + Parents Numerology Report",
      price: "₹2,500",
      badge: "Family Guidance",
      summary: "A report built around education, career direction, family compatibility, concentration, and parent-child energy balance.",
      bullets: [
        "Life path, destiny and talent-weakness analysis",
        "Education focus, memory and concentration insights",
        "Future career guidance and child current cycle review",
        "Compatibility and parenting strength observations"
      ]
    },
    {
      id: "num-name",
      title: "Name Numerology",
      price: "₹1,100",
      badge: "Identity Alignment",
      summary: "A focused report on name vibration, spelling optimization, lucky numbers, and supportive colours.",
      bullets: [
        "Detailed name analysis and correction suggestions",
        "Lucky colours and numbers for alignment",
        "PDF-style structured guidance",
        "Useful for personal or professional naming clarity"
      ]
    },
    {
      id: "num-personal-consult",
      title: "Personal Numerology Consultation",
      price: "₹999",
      badge: "1:1 Consultation",
      summary: "A one-on-one 45-minute consultation for a deeper review of your complete numerology profile and current life themes.",
      bullets: [
        "Direct expert consultation through video call",
        "Deep dive into your complete numerology profile",
        "Space to ask personalized questions",
        "Ideal for clients wanting expert interpretation, not just a report"
      ]
    }
  ]
};

const featuredService = {
  id: "industrial-vastu-visit",
  title: "Construction / Factory / Land Vastu Visit",
  price: "₹11,000",
  badge: "Industrial Vastu",
  image: "/industry.png",
  summary: "A complete on-site Vastu audit for factories, land, construction zones, and industrial workflows with practical directional guidance.",
  bullets: [
    "Land shape, slope, geography and soil vibration analysis",
    "Main gate, factory building, office cabin and production layout guidance",
    "Machinery placement, storage flow, loading-unloading and vehicle movement",
    "Power house, boiler, generator, water tank and fire element alignment",
    "Compound wall energy and full 5-element balance review"
  ]
};

// --- ROUTES ---

// Get all services by category
app.get('/v1/services/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  const data = services[category];
  
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ success: false, message: "Category not found" });
  }
});

// Get featured service
app.get('/v1/services/featured', (req, res) => {
  res.json(featuredService);
});

// Payment verification endpoint
app.post('/v1/payments/verify', (req, res) => {
  const {
    paymentId,
    orderId,
    signature,
    name,
    email,
    phone,
    serviceId,
    amount
  } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!secret) {
    console.error("Critical Error: RAZORPAY_KEY_SECRET is missing in .env");
    return res.status(500).json({ 
      success: false, 
      message: "Server configuration error. Please check environment variables." 
    });
  }

  // Verification Logic
  // Formula: HMAC-SHA256(order_id + "|" + payment_id, secret)
  // For standard payments without an order_id created via API, 
  // the logic might differ, but typical high-end integrations use this.
  const body = (orderId || '') + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === signature) {
    console.log("-----------------------------------------");
    console.log("✅ PAYMENT VERIFIED SUCCESSFULLY");
    console.log(`User: ${name} (${email})`);
    console.log(`Phone: ${phone}`);
    console.log(`Service: ${serviceId}`);
    console.log(`Amount: ₹${amount / 100}`);
    console.log(`Payment ID: ${paymentId}`);
    console.log("-----------------------------------------");

    // TODO: Implement your database saving logic here
    // e.g., await db.bookings.create({ ... })

    return res.status(200).json({ 
      success: true, 
      message: "Payment verified and booking logged." 
    });
  } else {
    console.error("❌ Signature mismatch. Potential fraud attempt.");
    return res.status(400).json({ 
      success: false, 
      message: "Security verification failed. Invalid signature." 
    });
  }
});

// Root / Health check
app.get('/', (req, res) => {
  res.send('Make My Bhagya Backend is running.');
});

app.listen(PORT, () => {
  console.log(`
  🔮 Make My Bhagya Backend
  🚀 Server: http://localhost:${PORT}
  🛠️  Endpoint: http://localhost:${PORT}/v1/payments/verify
  `);
});
