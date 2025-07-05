import React, { useState, useEffect } from 'react';
import { Car, Zap, Menu, X, Shield, Users, BarChart3, Settings, Bell, MapPin, Battery, Thermometer, Gauge, Clock, Phone, Mail, MapPinIcon, HelpCircle, FileText, Wrench, Award, MessageCircle, Brain, Cpu, Cog, TrendingUp, Globe } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TireHealthPage from './components/TireHealthPage';
import QRSafetyPage from './components/QRSafetyPage';
import PreBookingModal from './components/PreBookingModal';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showPreBookingModal, setShowPreBookingModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    {
      id: 1,
      name: "DRISHTI Universal Device",
      description: "An AI-powered, OBD2 + GPS device that works with all types of vehicles (2W, 3W, 4W, trucks, tractors) for real-time tracking, diagnostics, predictive maintenance, theft detection, and driver coaching.",
      image: "/images/1.webp",
      features: [
        "Works with all vehicle types (2W, 3W, 4W, trucks, tractors)",
        "AI-powered diagnostics and predictive maintenance", 
        "Real-time GPS tracking and theft detection",
        "Driver coaching and behavior analysis",
        "OBD2 integration for comprehensive vehicle data"
      ],
      category: "universal",
      deliveryTime: "2-3 weeks",
      warranty: "3 years comprehensive",
      compatibility: "All vehicle types"
    },
    {
      id: 2,
      name: "DRISHTI Dashcam",
      description: "Centralized hardware and software solution for fleet management and analytics with advanced video recording capabilities.",
      image: "/images/2.webp",
      features: [
        "HD video recording with night vision",
        "AI motion detection and incident alerts",
        "Cloud storage with GPS speed logging",
        "Fleet management and analytics dashboard",
        "Live monitoring and remote access"
      ],
      category: "fleet",
      deliveryTime: "1-2 weeks",
      warranty: "2 years standard",
      compatibility: "All vehicles with 12V power"
    },
    {
      id: 3,
      name: "DRISHTI Smart Converters",
      description: "Devices for Wi-Fi connectivity and AI alerting, enabling integration with various vehicle types for enhanced safety and performance.",
      image: "/images/3.webp",
      features: [
        "Wi-Fi connectivity for seamless integration",
        "AI-powered safety alerts and notifications",
        "Performance optimization and monitoring",
        "Universal vehicle compatibility",
        "Advanced safety upgrade system"
      ],
      category: "connectivity",
      deliveryTime: "1-2 weeks", 
      warranty: "2 years standard",
      compatibility: "Any vehicle type"
    }
  ];

  const handlePreBooking = (product: any) => {
    setSelectedProduct(product);
    setShowPreBookingModal(true);
  };

  // Typing animation component
  const TypingText: React.FC<{ text: string; speed?: number; className?: string }> = ({ 
    text, 
    speed = 50, 
    className = "" 
  }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text, speed]);

    return (
      <span className={className}>
        {displayText}
        {currentIndex < text.length && (
          <span className="animate-pulse">|</span>
        )}
      </span>
    );
  };

  const renderHeader = () => (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <img 
              src="/logo-16june.png" 
              alt="FixPoint Drishti Logo" 
              className="h-12 w-auto"
            />
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => setCurrentPage('home')} className={`${currentPage === 'home' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 font-medium transition-colors`}>
              Home
            </button>
            <button onClick={() => setCurrentPage('products')} className={`${currentPage === 'products' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 font-medium transition-colors`}>
              Products
            </button>
            <button onClick={() => setCurrentPage('tire-health')} className={`${currentPage === 'tire-health' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 font-medium transition-colors`}>
              Tire Health
            </button>
            <button onClick={() => setCurrentPage('qr-safety')} className={`${currentPage === 'qr-safety' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 font-medium transition-colors`}>
              QR Safety System
            </button>
            <button onClick={() => setCurrentPage('support')} className={`${currentPage === 'support' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 font-medium transition-colors`}>
              Support
            </button>
            <button onClick={() => setCurrentPage('contact')} className={`${currentPage === 'contact' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 font-medium transition-colors`}>
              Contact
            </button>
          </nav>

          <div className="hidden md:flex space-x-4">
            <button 
              onClick={() => setCurrentPage('dashboard-individual')} 
              className="btn-primary"
            >
              Dashboard
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="text-left text-gray-700 hover:text-blue-600">
                Home
              </button>
              <button onClick={() => { setCurrentPage('products'); setIsMenuOpen(false); }} className="text-left text-gray-700 hover:text-blue-600">
                Products
              </button>
              <button onClick={() => { setCurrentPage('tire-health'); setIsMenuOpen(false); }} className="text-left text-gray-700 hover:text-blue-600">
                Tire Health
              </button>
              <button onClick={() => { setCurrentPage('qr-safety'); setIsMenuOpen(false); }} className="text-left text-gray-700 hover:text-blue-600">
                QR Safety System
              </button>
              <button onClick={() => { setCurrentPage('support'); setIsMenuOpen(false); }} className="text-left text-gray-700 hover:text-blue-600">
                Support
              </button>
              <button onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }} className="text-left text-gray-700 hover:text-blue-600">
                Contact
              </button>
              <button 
                onClick={() => { setCurrentPage('dashboard-individual'); setIsMenuOpen(false); }} 
                className="text-left text-blue-600 font-medium"
              >
                Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );

  const renderFooter = () => (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo-16june.png" 
                alt="FixPoint Drishti Logo" 
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Revolutionizing vehicle management with intelligent monitoring and predictive analytics.
            </p>
            <div className="text-sm text-gray-500">
              <p className="font-medium text-white mb-1">FIXPOINTTECHNOLOGY PRIVATE LIMITED</p>
              <p>Registered in India</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => setCurrentPage('products')} className="hover:text-white transition-colors">DRISHTI Universal Device</button></li>
              <li><button onClick={() => setCurrentPage('products')} className="hover:text-white transition-colors">DRISHTI Dashcam</button></li>
              <li><button onClick={() => setCurrentPage('products')} className="hover:text-white transition-colors">DRISHTI Smart Converters</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => setCurrentPage('help-center')} className="hover:text-white transition-colors">Help Center</button></li>
              <li><button onClick={() => setCurrentPage('installation')} className="hover:text-white transition-colors">Installation</button></li>
              <li><button onClick={() => setCurrentPage('warranty')} className="hover:text-white transition-colors">Warranty</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 8871258981</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <a href="https://wa.me/918871258981" className="hover:text-white transition-colors">
                  WhatsApp: +91 8871258981
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:mohit@fixpointshop.in" className="hover:text-white transition-colors">
                  mohit@fixpointshop.in
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4" />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 FIXPOINTTECHNOLOGY PRIVATE LIMITED. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  const renderHomePage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-teal-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Pre-booking Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full px-8 py-3 mb-8 font-bold text-sm shadow-lg animate-bounce">
              <span className="mr-2">🎯</span>
              PRE-BOOKING LIVE!
              <span className="ml-2">🎯</span>
            </div>
            
            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <TypingText 
                  text="Smarter."
                  speed={100}
                  className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
                />
              </h1>
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <TypingText 
                  text="Safer."
                  speed={100}
                  className="block bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent"
                />
              </h1>
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <TypingText 
                  text="Connected."
                  speed={100}
                  className="block bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent"
                />
              </h1>
            </div>
            
            {/* Subtitle */}
            <div className="mt-12 mb-12">
              <TypingText 
                text="India's first integrated hardware and software AI and DeepTech powered solution designed to make your existing vehicle smarter, safer, and truly connected."
                speed={25}
                className="text-xl md:text-2xl text-blue-100 max-w-5xl mx-auto leading-relaxed block"
              />
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
              <button 
                onClick={() => setCurrentPage('dashboard-individual')} 
                className="group relative bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">Individual Dashboard</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
              <button 
                onClick={() => setCurrentPage('dashboard-commercial')} 
                className="group relative border-3 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">Commercial Fleet</span>
              </button>
            </div>
            
            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Intelligence</h3>
                <p className="text-blue-200">Advanced AI algorithms for predictive maintenance and smart insights</p>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Enhanced Safety</h3>
                <p className="text-blue-200">Real-time monitoring and instant alerts for maximum protection</p>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Universal Compatibility</h3>
                <p className="text-blue-200">Works with all vehicle types - 2W, 3W, 4W, trucks, tractors</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose FixPoint Drishti?</h2>
            <p className="section-subtitle">India's first universal vehicle intelligence platform</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* India's First Universal Solution */}
            <div className="card hover-lift">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">India's First Universal Solution</h3>
                  <p className="text-gray-600 leading-relaxed">
                    FixPoint Drishti is the country's first integrated hardware and software platform designed to make any existing vehicle smart, regardless of type or age.
                  </p>
                </div>
              </div>
            </div>

            {/* Real-Time Intelligence */}
            <div className="card hover-lift">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Real-Time Intelligence</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Instantly monitor vehicle health, location, and driver behavior for enhanced safety, security, and operational efficiency.
                  </p>
                </div>
              </div>
            </div>

            {/* Seamless Integration */}
            <div className="card hover-lift">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Cog className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Seamless Integration</h3>
                  <p className="text-gray-600 leading-relaxed">
                    No complex installations—Drishti works with your current vehicles, providing advanced features without the need for upgrades or replacements.
                  </p>
                </div>
              </div>
            </div>

            {/* AI-Powered Insights */}
            <div className="card hover-lift">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Cpu className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">AI-Powered Insights</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Benefit from predictive maintenance, theft alerts, and actionable analytics, all powered by cutting-edge AI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Empowering Owners and Fleets - Full Width */}
          <div className="card hover-lift bg-gradient-to-r from-blue-50 to-teal-50 border-l-4 border-blue-500">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Empowering Owners and Fleets</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Whether you manage a single car or an entire fleet, FixPoint Drishti helps reduce costs, prevent breakdowns, and ensure peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Our DRISHTI Product Range</h2>
            <p className="section-subtitle">Universal AI-powered solutions for every vehicle type</p>
            <button 
              onClick={() => setShowAllProducts(!showAllProducts)}
              className="text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              View All Products ({products.length})
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showAllProducts ? products : products.slice(0, 3)).map((product) => (
              <div key={product.id} className="card hover-lift relative overflow-hidden">
                {/* Product Image */}
                <div className="mb-6 bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-contain"
                  />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">
                    <span className="inline-flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Delivery: {product.deliveryTime}</span>
                    </span>
                    <span className="mx-2">•</span>
                    <span className="inline-flex items-center space-x-1">
                      <Shield className="h-4 w-4" />
                      <span>{product.warranty}</span>
                    </span>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    Compatible with: {product.compatibility}
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handlePreBooking(product)}
                  className="w-full btn-primary hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  Pre-Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Founders Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">About the Founders</h2>
            <p className="section-subtitle">Driving innovation in vehicle technology</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Mohit Sharma */}
            <div className="card text-center hover-lift">
              <img 
                src="/images/Mohit Image (1) (1) (2) copy.jpg" 
                alt="Mohit Sharma" 
                className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-lg"
              />
              <h3 className="text-2xl font-bold mb-2">Mohit Sharma</h3>
              <p className="text-blue-600 font-semibold mb-4 text-lg">Director & CEO</p>
              
              <div className="text-left space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">B.Tech in Electrical Engineering, MBA in Marketing & Finance</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">3+ years experience in automotive sales and marketing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">70+ professional certifications</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Leads business strategy and growth for FixPoint Technology</p>
                </div>
              </div>
            </div>

            {/* Ajay Sharma */}
            <div className="card text-center hover-lift">
              <img 
                src="/images/Passport Size Photo - Ajay Sharma  copy.jpg" 
                alt="Ajay Sharma" 
                className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-lg"
              />
              <h3 className="text-2xl font-bold mb-2">Ajay Sharma</h3>
              <p className="text-blue-600 font-semibold mb-4 text-lg">Director & CTO</p>
              
              <div className="text-left space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">B.Tech in Electronics & Communication</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">3+ years in hardware development and automotive electronics</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Former Tech Lead at a Y Combinator-funded startup</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Expert in AI/ML, product architecture, and manufacturing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Combined Vision Statement */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              Together, Mohit and Ajay Sharma combine proven business and deep tech expertise to drive FixPoint's vision of universal, AI-powered vehicle intelligence for India.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-100 mb-2">{'< 2 hrs'}</div>
              <div className="text-blue-200">Average Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-100 mb-2">99.9%</div>
              <div className="text-blue-200">System Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-100 mb-2">24/7</div>
              <div className="text-blue-200">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Vehicle?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of satisfied customers who trust FixPoint Drishti</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('dashboard-individual')} 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors hover-lift"
            >
              Start Individual Trial
            </button>
            <button 
              onClick={() => setCurrentPage('dashboard-commercial')} 
              className="border-2 border-blue-600 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors hover-lift"
            >
              Request Commercial Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderProductsPage = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="section-title">Our DRISHTI Products</h1>
          <p className="section-subtitle">Universal AI-powered vehicle intelligence solutions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="card hover-lift relative overflow-hidden">
              {/* Product Image */}
              <div className="mb-6 bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
              
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">
                  <span className="inline-flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Delivery: {product.deliveryTime}</span>
                  </span>
                  <span className="mx-2">•</span>
                  <span className="inline-flex items-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>{product.warranty}</span>
                  </span>
                </div>
                <div className="text-sm text-blue-600 font-medium">
                  Compatible with: {product.compatibility}
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handlePreBooking(product)}
                className="w-full btn-primary hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Pre-Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSupportPage = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="section-title">Support Center</h1>
          <p className="section-subtitle">We're here to help you succeed</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card hover-lift text-center cursor-pointer" onClick={() => setCurrentPage('help-center')}>
            <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Help Center</h3>
            <p className="text-gray-600">Find answers to common questions</p>
          </div>
          
          <div className="card hover-lift text-center cursor-pointer" onClick={() => setCurrentPage('installation')}>
            <Settings className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Installation</h3>
            <p className="text-gray-600">Step-by-step installation guides</p>
          </div>
          
          <div className="card hover-lift text-center cursor-pointer" onClick={() => setCurrentPage('warranty')}>
            <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Warranty</h3>
            <p className="text-gray-600">Warranty information and claims</p>
          </div>
          
          <div className="card hover-lift text-center cursor-pointer" onClick={() => setCurrentPage('contact')}>
            <MessageCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-gray-600">Get in touch with our team</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHelpCenterPage = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="section-title">Help Center</h1>
          <p className="section-subtitle">Frequently Asked Questions</p>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">How do I install the DRISHTI device?</h3>
            <p className="text-gray-600">Our certified technicians will install the device at your location. The installation typically takes 30-45 minutes and includes complete setup and testing.</p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">What is the warranty period?</h3>
            <p className="text-gray-600">All DRISHTI products come with a comprehensive warranty covering hardware defects and software updates. Universal Device: 3 years, Dashcam & Smart Converters: 2 years.</p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Can I track multiple vehicles?</h3>
            <p className="text-gray-600">Yes, our DRISHTI Universal Device and Dashcam support unlimited vehicle tracking with centralized dashboard management for fleet operations.</p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Is there a mobile app available?</h3>
            <p className="text-gray-600">Yes, we provide mobile apps for both iOS and Android with full feature access and real-time notifications for all DRISHTI products.</p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Which vehicles are compatible with DRISHTI products?</h3>
            <p className="text-gray-600">DRISHTI Universal Device works with all vehicle types (2W, 3W, 4W, trucks, tractors). Dashcam works with any vehicle having 12V power. Smart Converters are compatible with any vehicle type.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInstallationPage = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="section-title">Installation Guide</h1>
          <p className="section-subtitle">Professional installation process</p>
        </div>
        
        <div className="space-y-8">
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Schedule Installation</h3>
                <p className="text-gray-600">Contact our team to schedule a convenient installation time. We offer flexible scheduling including weekends.</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Pre-Installation Check</h3>
                <p className="text-gray-600">Our technician will inspect your vehicle and explain the installation process and device placement for your specific DRISHTI product.</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Device Installation</h3>
                <p className="text-gray-600">Professional installation of the DRISHTI device with proper wiring and secure mounting. OBD2 connection for Universal Device, dashboard mounting for Dashcam.</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Testing & Setup</h3>
                <p className="text-gray-600">Complete system testing, account setup, and mobile app configuration with training on all features and functionalities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWarrantyPage = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="section-title">Warranty Information</h1>
          <p className="section-subtitle">Comprehensive coverage for peace of mind</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Hardware Warranty</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• DRISHTI Universal Device: 3-year comprehensive coverage</li>
              <li>• DRISHTI Dashcam: 2-year standard coverage</li>
              <li>• DRISHTI Smart Converters: 2-year standard coverage</li>
              <li>• Free replacement for defective units</li>
              <li>• On-site repair service</li>
              <li>• 24/7 technical support</li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Software Warranty</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Lifetime software updates</li>
              <li>• New feature additions</li>
              <li>• Security patches</li>
              <li>• Performance optimizations</li>
              <li>• AI algorithm improvements</li>
              <li>• Cloud service updates</li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Service Warranty</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Free installation service</li>
              <li>• Annual maintenance check</li>
              <li>• Remote diagnostics</li>
              <li>• Training and support</li>
              <li>• Vehicle compatibility verification</li>
              <li>• Performance optimization</li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Extended Warranty</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Available up to 5 years</li>
              <li>• Accidental damage coverage</li>
              <li>• Priority support</li>
              <li>• Loaner device program</li>
              <li>• Advanced replacement service</li>
              <li>• Fleet management support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">Get in touch with our team</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-6">Send us a message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
                <button type="submit" className="w-full btn-primary">Send Message</button>
              </form>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="card">
              <div className="flex items-center space-x-4">
                <Phone className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p className="text-gray-600">+91 8871258981</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center space-x-4">
                <MessageCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold">WhatsApp</h3>
                  <a href="https://wa.me/918871258981" className="text-blue-600 hover:text-blue-700">
                    +91 8871258981
                  </a>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center space-x-4">
                <Mail className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <a href="mailto:mohit@fixpointshop.in" className="text-blue-600 hover:text-blue-700">
                    mohit@fixpointshop.in
                  </a>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center space-x-4">
                <MapPin className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold">Location</h3>
                  <p className="text-gray-600">
                    FIXPOINTTECHNOLOGY PRIVATE LIMITED<br />
                    India
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center space-x-4">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return renderHomePage();
      case 'products':
        return renderProductsPage();
      case 'tire-health':
        return <TireHealthPage />;
      case 'qr-safety':
        return <QRSafetyPage />;
      case 'support':
        return renderSupportPage();
      case 'help-center':
        return renderHelpCenterPage();
      case 'installation':
        return renderInstallationPage();
      case 'warranty':
        return renderWarrantyPage();
      case 'contact':
        return renderContactPage();
      case 'dashboard-individual':
        return <Dashboard type="individual" onTypeChange={(type) => setCurrentPage(`dashboard-${type}`)} />;
      case 'dashboard-commercial':
        return <Dashboard type="commercial" onTypeChange={(type) => setCurrentPage(`dashboard-${type}`)} />;
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      {renderCurrentPage()}
      {renderFooter()}
      
      {/* Pre-Booking Modal */}
      {showPreBookingModal && selectedProduct && (
        <PreBookingModal
          product={selectedProduct}
          isOpen={showPreBookingModal}
          onClose={() => {
            setShowPreBookingModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}

export default App;