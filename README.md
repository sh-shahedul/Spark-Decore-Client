# ✨ SparkDecore - Smart Home & Ceremony Decoration Booking System



## 🌟 Live Website
**[Visit SparkDecore Live →](https://spark-decore.netlify.app/)**

**[Visit SparkDecore Servere →](https://github.com/sh-shahedul/spark-decore-server)**

---

## 📖 Project Overview

**SparkDecore** is a modern appointment management system designed for decoration companies offering both in-studio consultations and on-site decoration services for homes and ceremonies. The platform enables users to explore decoration packages, check decorator availability, book services with preferred date & time, make secure payments, and track their service status in real-time.

### 🎯 Purpose
SparkDecore solves major challenges faced by local decoration businesses:
- Eliminates walk-in crowds and long waiting times
- Provides smart online booking for consultations and services
- Manages multiple decorators with their specialties
- Coordinates on-site service assignments efficiently
- Offers real-time project status tracking with integrated payments

---

## 🔑 Key Features

### For Users
- 🎨 **Browse Decoration Packages** - Explore various decoration services with detailed information
- 📅 **Smart Booking System** - Book consultations or on-site services with preferred date & time
- 💳 **Secure Payment** - Integrated Stripe payment system for seamless transactions
- 📍 **Service Coverage Map** - Interactive map showing service areas using React Leaflet
- 📊 **Booking Management** - View, update, or cancel bookings from personal dashboard
- 🔔 **Real-time Status Updates** - Track decoration project status from assignment to completion
- 📜 **Payment History** - Access complete transaction history

### For Decorators
- 📋 **Project Dashboard** - View all assigned decoration projects
- 📆 **Today's Schedule** - Daily task management and planning
- 🔄 **Status Updates** - Update project status step-by-step (Planning → Materials → On the Way → Setup → Completed)
- 💰 **Earnings Summary** - Track personal earnings and payment history

### For Admins
- 👥 **Decorator Management** - Complete CRUD operations for decorator accounts
- 🎨 **Service Management** - Create, update, and delete decoration services/packages
- 📊 **Booking Oversight** - Manage all user bookings and payment verification
- 🎯 **Decorator Assignment** - Assign decorators to on-site services after payment confirmation
- 📈 **Revenue Analytics** - Monitor business performance with interactive charts
- 📊 **Service Demand Analysis** - Histogram showing number of services booked

### Technical Features
- 🔐 **Role-Based Authentication** - Secure JWT-based auth with role management (User/Decorator/Admin)
- 🔍 **Advanced Search & Filter** - Search by service name, filter by type and budget range
- 📱 **Fully Responsive** - Mobile-first design with seamless experience across devices
- ⚡ **Optimized Performance** - React Query for efficient data fetching and caching
- 🎭 **Smooth Animations** - Framer Motion and GSAP for delightful user interactions
- 🌐 **Interactive Maps** - React Leaflet integration for service coverage visualization

---

## 🛠️ Technology Stack

### Frontend Technologies
| Technology | Purpose |
|-----------|---------|
| **React 19** | Core UI library |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Advanced animations |
| **GSAP** | Complex animation sequences |
| **React Router 7** | Client-side routing |
| **TanStack React Query** | Server state management |
| **Axios** | HTTP client |
| **Firebase** | Authentication & hosting |

### UI Components & Libraries
| Package | Usage |
|---------|-------|
| **Lucide React** | Modern icon system |
| **React Icons** | Additional icon library |
| **Heroicons** | Hero section icons |
| **Swiper** | Touch slider/carousel |
| **React Hot Toast** | Toast notifications |
| **SweetAlert2** | Beautiful alerts |
| **React Simple Typewriter** | Typewriter effects |

### Data Visualization
| Library | Purpose |
|---------|---------|
| **Recharts** | Composable chart library |
| **React CountUp** | Animated counters |

### Maps & Forms
| Package | Functionality |
|---------|---------------|
| **React Leaflet** | Interactive maps |
| **Leaflet** | Map core library |
| **React Hook Form** | Form validation & handling |

---

## 📦 NPM Packages Used

```json
{
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.12",
    "axios": "^1.13.2",
    "chart.js": "^4.5.1",
    "firebase": "^12.6.0",
    "framer-motion": "^12.23.25",
    "gsap": "^3.14.2",
    "leaflet": "^1.9.4",
    "lucide-react": "^0.561.0",
    "react": "^19.2.0",
    "react-chartjs-2": "^5.3.1",
    "react-countup": "^6.5.3",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.68.0",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.5.0",
    "react-leaflet": "^5.0.0-rc.2",
    "react-router": "^7.10.1",
    "react-simple-typewriter": "^5.0.1",
    "recharts": "^3.5.1",
    "sweetalert2": "^11.26.4",
    "swiper": "^12.0.3",
    "tailwindcss": "^4.1.17"
  }
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Firebase account
- MongoDB Atlas account
- Stripe account for payments

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sh-shahedul/Spark-Decore-Client
cd spark-decore-client
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_API_URL=your_backend_api_url
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. **Run the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

---

## 👤 Admin Credentials

For testing admin features, use these credentials:

**Email:** `sabbirrahman@gmail.com`  
**Password:** `1234aA!`



## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Role-based access control (RBAC)
- ✅ Environment variables for sensitive data
- ✅ Secure payment processing with Stripe
- ✅ Protected API routes
- ✅ Input validation and sanitization
- ✅ CORS configuration

---

## 📊 Project Status Workflow

```
Assigned → Planning Phase → Materials Prepared → On the Way → Setup in Progress → Completed
```

Each status can be updated by the assigned decorator through their dashboard.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact Information

- **Email:** shahedulhoque2003@gmail.com
- **GitHub:** [sh-shahedul](https://github.com/sh-shahedul)

---


## 🙏 Acknowledgments

- UI inspiration from Urban Company and The Knot
- Icons by Lucide and Heroicons
- Maps powered by React Leaflet
- Payment processing by Stripe

---

<div align="center">

### 🌟 If you like this project, please give it a star! ⭐

**Made with ❤️ by SparkDecore Team**

[⬆ Back to Top](#-sparkdecore---smart-home--ceremony-decoration-booking-system)

</div>
