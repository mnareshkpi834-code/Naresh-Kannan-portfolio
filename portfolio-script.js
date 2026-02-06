 /* ===============================
   CANVAS ANIMATION CONFIGURATION
================================ */
const frameCount = 200;

// Path to your image sequence - UPDATE THIS PATH TO MATCH YOUR IMAGES FOLDER
const imagePath = index =>
  `images/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

const canvas = document.getElementById("scroll-canvas");
const ctx = canvas.getContext("2d");

const images = [];
let imagesLoaded = 0;
let currentFrame = 0;

/* ===============================
   RETINA CANVAS SETUP
================================ */
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeCanvas);

/* ===============================
   IMAGE PRELOAD
================================ */
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = imagePath(i);

  img.onload = () => {
    imagesLoaded++;

    // Start animation ONLY after all images load
    if (imagesLoaded === frameCount) {
      resizeCanvas();
      drawImage(images[0]);
      requestAnimationFrame(animate);
    }
  };

  img.onerror = () => {
    console.error(`Failed to load image: ${imagePath(i)}`);
  };

  images.push(img);
}

/* ===============================
   DRAW IMAGE ON CANVAS
================================ */
function drawImage(img) {
  if (!img.complete) return;
  
  const dpr = window.devicePixelRatio || 1;
  const canvasWidth = canvas.width / dpr;
  const canvasHeight = canvas.height / dpr;

  const imgRatio = img.width / img.height;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth, drawHeight;

  if (imgRatio > canvasRatio) {
    drawHeight = canvasHeight;
    drawWidth = imgRatio * drawHeight;
  } else {
    drawWidth = canvasWidth;
    drawHeight = drawWidth / imgRatio;
  }

  const x = (canvasWidth - drawWidth) / 2;
  const y = (canvasHeight - drawHeight) / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, x, y, drawWidth, drawHeight);
}

/* ===============================
   SCROLL PROGRESS CALCULATION
================================ */
function getScrollProgress() {
  const section = document.querySelector(".hero-section");
  const scrollTop = window.scrollY;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight - window.innerHeight;

  return Math.min(
    Math.max((scrollTop - sectionTop) / sectionHeight, 0),
    1
  );
}

/* ===============================
   ANIMATION LOOP
================================ */
function animate() {
  const scrollProgress = getScrollProgress();
  const frameIndex = Math.floor(scrollProgress * (frameCount - 1));

  if (frameIndex !== currentFrame && images[frameIndex]) {
    currentFrame = frameIndex;
    drawImage(images[currentFrame]);
  }

  requestAnimationFrame(animate);
}

/* ===============================
   NAVIGATION FUNCTIONALITY
================================ */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('activescrolled');
  }
});

/* ===============================
   SCROLL REVEAL ANIMATIONS
================================ */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });
});

/* ===============================
   SMOOTH SCROLL ENHANCEMENTS
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/* ===============================
   CARD HOVER EFFECTS
================================ */
document.querySelectorAll('.skill-card, .project-card, .cert-card, .education-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

/* ===============================
   PERFORMANCE OPTIMIZATION
================================ */
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
});

/* ===============================
   LOADING INDICATOR
================================ */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  console.log('Portfolio website loaded successfully! 🚀');
  console.log(`Canvas animation with ${frameCount} frames`);
  console.log(`Images loaded: ${imagesLoaded}/${frameCount}`);
});

/* ===============================
   GEMINI CHATBOT LOGIC
================================ */
// Using a dynamic import to ensure it works within your existing script
import("https://esm.run/@google/generative-ai").then(module => {
    const { GoogleGenerativeAI } = module;

    const API_KEY = "AIzaSyBTgc-UF_7z5FNog0g4rKYi6iIOV5ikq8g"; 
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Add your system prompt here
const systemPrompt = `You are a personal portfolio chatbot representing Naresh Kannan M.
Your role is to answer questions about Naresh clearly, professionally, and confidently,
using ONLY the information provided below. Do not invent or assume any details.

If a question is outside the provided information, politely say that the information
is not available and suggest contacting Naresh directly.

Always respond in a friendly, concise, and professional tone.
Use simple explanations when the visitor is non-technical.
Use technical depth when the question is engineering-related.

====================
PROFILE SUMMARY
====================
Name: Naresh Kannan M  
Role: Electrical and Electronics Engineering Student  
Status: Pursuing B.E (Honours) in Electrical and Electronics Engineering  
Institution: TPGIT, Vellore (Anna University)  
CGPA: 8.36 (up to 6th semester)  
Duration: Nov 2022 – May 2026  

Naresh is a motivated electrical engineer focused on power systems, protection schemes,
switchgear, and renewable energy applications. He aims to contribute to safe and reliable
electrical network operations while continuously growing professionally.

====================
EDUCATION
====================
• B.E (Hons.) – Electrical and Electronics Engineering  
  TPGIT, Vellore (Anna University)  
  CGPA: 8.36 (up to 6th semester)

• HSC – Tamil Nadu State Board  
  Don Bosco MHSS, Dharmapuri  
  Score: 90% (2021)

• SSLC – Tamil Nadu State Board  
  Don Bosco MHSS, Dharmapuri  
  Score: 89% (2019)

====================
TECHNICAL SKILLS
====================
• Power Systems and Switchgear Protection  
• Renewable Energy Systems  
• SCADA Systems  
• AutoCAD Designing  
• MATLAB / Simulink  
• PCB Design using KiCad  
• MS Office  

====================
PROJECTS
====================
• Smart Home Automation using ESP8266 and Blynk IoT  
• Temperature and Humidity Monitoring System using ESP32  

====================
INTERNSHIP
====================
Organization: The Mysore Electrical Industries Ltd.
(Government of Karnataka Undertaking)  
Location: Bangalore  
Duration: 15 Days (July 7 – July 23, 2025)

Experience:
• Worked on MCVCB and PCVCB assembly, testing, and wiring  
• Assisted in manufacturing of Current Transformers (CTs)  
• Gained hands-on exposure to industrial switchgear systems  
• Followed quality control and safety procedures  

====================
CERTIFICATIONS
====================
• Vivado and ASIC Flow Workshop  
  College of Engineering, Guindy (Anna University), Chennai  
  Month: April 2025  

====================
SOFT SKILLS
====================
• Problem Solving  
• Quick Learning  
• Team Work  
• Presence of Mind  

====================
ADDITIONAL INFORMATION
====================
• Conservation Economics – 100%  
• Forests and Their Management – 98%  

====================
AREA OF INTEREST
====================
• Power Systems  
• Switchgear and Protection  
• Renewable Energy  
• GATE 2026 preparation  

====================
LANGUAGES
====================
• English  
• Tamil  
• Kannada  

====================
CONTACT DETAILS
====================
Phone: 6379829385  
Email: mnareshkpi834@gmail.com  
LinkedIn: https://www.linkedin.com/in/naresh-kannan-m-b7406b2a1  

====================
RESPONSE RULES
====================
• When asked “Tell me about you” → give a short professional summary.
• When asked about skills/projects/internship → explain clearly and accurately.
• When asked personal or unrelated questions → politely redirect to professional topics.
• Never exaggerate, fabricate, or add experience not listed above."
`;

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: systemPrompt,
    });

    const chatSession = model.startChat({ history: [] });

    // UI Elements
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle Window Logic - Fixed
    if (chatToggle && chatContainer) {
        chatToggle.addEventListener('click', (e) => {
            e.preventDefault();
            chatContainer.classList.toggle('chat-hidden');
            console.log("Chat toggled"); // Debug check
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatContainer.classList.add('chat-hidden');
        });
    }

    async function handleChat() {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage(text, true);
        chatInput.value = '';

        try {
            const result = await chatSession.sendMessage(text);
            const response = await result.response;
            appendMessage(response.text(), false);
        } catch (err) {
            appendMessage("I'm having trouble connecting.", false);
            console.error("Gemini Error:", err);
        }
    }

    function appendMessage(text, isUser) {
        const msg = document.createElement('div');
        msg.classList.add('message', isUser ? 'user-msg' : 'bot-msg');
        msg.innerText = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });
    
}).catch(err => console.error("Failed to load Gemini SDK:", err));