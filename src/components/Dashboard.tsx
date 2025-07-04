import React, { useState, useEffect } from 'react';
import { 
  Car, 
  MapPin, 
  Battery, 
  Thermometer, 
  Gauge, 
  Bell, 
  Settings, 
  Users, 
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  ChevronDown,
  Wifi,
  WifiOff,
  Play,
  Square,
  Shield,
  Route,
  Rewind,
  Brain,
  Wrench,
  Fuel,
  Navigation,
  Eye,
  Zap,
  TrendingUp,
  Activity,
  Plus,
  UserPlus,
  FileText,
  CreditCard,
  Calendar,
  Search,
  Filter,
  Edit,
  Trash2,
  Phone,
  MessageSquare,
  Download,
  Upload,
  Star,
  IndianRupee,
  Building,
  Truck,
  UserCheck,
  Receipt,
  PieChart,
  Target,
  Award,
  Headphones,
  Smartphone,
  Lock,
  Globe,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Save,
  Send,
  Mail,
  MapPinIcon,
  Calendar as CalendarIcon,
  DollarSign
} from 'lucide-react';

interface DashboardProps {
  type: 'individual' | 'commercial';
  onTypeChange?: (type: 'individual' | 'commercial') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ type, onTypeChange }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDashboardMenu, setShowDashboardMenu] = useState(false);
  const [deviceConnected, setDeviceConnected] = useState(true);
  const [vehicleRunning, setVehicleRunning] = useState(false);
  const [geofenceEnabled, setGeofenceEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Quick Actions Modal States
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [showCreateBookingModal, setShowCreateBookingModal] = useState(false);
  const [showGenerateInvoiceModal, setShowGenerateInvoiceModal] = useState(false);
  const [showScheduleMaintenanceModal, setShowScheduleMaintenanceModal] = useState(false);
  const [showViewReportsModal, setShowViewReportsModal] = useState(false);

  // Form States
  const [vehicleForm, setVehicleForm] = useState({
    registrationNumber: '',
    make: '',
    model: '',
    year: '',
    fuelType: 'Petrol',
    seatingCapacity: '',
    color: '',
    purchasePrice: '',
    insuranceExpiry: '',
    pucExpiry: ''
  });

  const [driverForm, setDriverForm] = useState({
    name: '',
    phone: '',
    email: '',
    licenseNumber: '',
    licenseExpiry: '',
    address: '',
    emergencyContact: '',
    salary: '',
    joiningDate: ''
  });

  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    vehicleId: '',
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    dropLocation: '',
    totalAmount: '',
    advanceAmount: '',
    purpose: 'Personal'
  });

  const [invoiceForm, setInvoiceForm] = useState({
    bookingId: '',
    customerName: '',
    customerPhone: '',
    vehicleNumber: '',
    rentalDays: '',
    dailyRate: '',
    extraCharges: '',
    discount: '',
    gstRate: '18',
    notes: ''
  });

  const [maintenanceForm, setMaintenanceForm] = useState({
    vehicleId: '',
    serviceType: 'Regular Service',
    scheduledDate: '',
    serviceCenter: '',
    estimatedCost: '',
    description: '',
    priority: 'Medium'
  });

  // Live updating metrics
  const [liveMetrics, setLiveMetrics] = useState({
    totalRevenue: 2450000,
    activeRentals: 23,
    monthlyBookings: 1247,
    profitMargin: 125000,
    customerSatisfaction: 4.7,
    vehicleUtilization: 78,
    fuelEfficiency: 14.2,
    maintenanceCost: 45000
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Update live metrics every 3 seconds
  useEffect(() => {
    const metricsTimer = setInterval(() => {
      setLiveMetrics(prev => ({
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 5000),
        activeRentals: Math.max(20, prev.activeRentals + Math.floor(Math.random() * 3) - 1),
        monthlyBookings: prev.monthlyBookings + Math.floor(Math.random() * 2),
        profitMargin: prev.profitMargin + Math.floor(Math.random() * 2000),
        customerSatisfaction: Math.min(5.0, Math.max(4.0, prev.customerSatisfaction + (Math.random() * 0.2 - 0.1))),
        vehicleUtilization: Math.min(100, Math.max(60, prev.vehicleUtilization + Math.floor(Math.random() * 6) - 3)),
        fuelEfficiency: Math.max(10, prev.fuelEfficiency + (Math.random() * 0.4 - 0.2)),
        maintenanceCost: prev.maintenanceCost + Math.floor(Math.random() * 1000)
      }));
    }, 3000);

    return () => clearInterval(metricsTimer);
  }, []);

  // Enhanced dummy data for individual dashboard
  const vehicleInfo = {
    id: 'MH-01-AB-1234',
    name: 'Honda City',
    type: 'Sedan',
    model: '2022 Honda City ZX CVT',
    fuelType: 'Petrol',
    engineCapacity: '1.5L i-VTEC',
    transmission: 'CVT Automatic',
    color: 'Pearl White',
    registrationDate: '2022-03-15',
    insuranceExpiry: '2025-03-14',
    lastService: '2024-11-15',
    nextService: '2025-02-15',
    odometer: 15420,
    status: vehicleRunning ? 'running' : 'parked',
    location: {
      address: 'Bandra West, Mumbai, Maharashtra',
      coordinates: { lat: 19.0596, lng: 72.8295 },
      landmark: 'Near Linking Road'
    },
    realTimeData: {
      speed: vehicleRunning ? Math.floor(Math.random() * 60) + 20 : 0,
      rpm: vehicleRunning ? Math.floor(Math.random() * 1000) + 1500 : 0,
      fuelLevel: Math.max(20, Math.floor(Math.random() * 80) + 20),
      batteryVoltage: 12.6,
      engineTemp: vehicleRunning ? Math.floor(Math.random() * 20) + 85 : Math.floor(Math.random() * 10) + 30,
      oilPressure: vehicleRunning ? Math.floor(Math.random() * 10) + 40 : 0,
      coolantLevel: 85,
      brakeFluidLevel: 92,
      tirePressure: {
        frontLeft: Math.floor(Math.random() * 3) + 30,
        frontRight: Math.floor(Math.random() * 3) + 30,
        rearLeft: Math.floor(Math.random() * 3) + 29,
        rearRight: Math.floor(Math.random() * 3) + 30
      }
    }
  };

  const drivingPatterns = {
    weeklyStats: {
      totalDistance: 245,
      averageSpeed: 42,
      fuelEfficiency: 14.2,
      drivingScore: 85,
      harshBraking: 3,
      rapidAcceleration: 2,
      overspeeding: 1
    },
    recentTrips: [
      {
        id: 1,
        from: 'Home - Bandra',
        to: 'Office - BKC',
        distance: 12.5,
        duration: '35 mins',
        avgSpeed: 21,
        fuelUsed: 0.8,
        score: 88,
        timestamp: '2024-12-19 09:15'
      },
      {
        id: 2,
        from: 'Office - BKC',
        to: 'Mall - Palladium',
        distance: 8.2,
        duration: '22 mins',
        avgSpeed: 22,
        fuelUsed: 0.6,
        score: 92,
        timestamp: '2024-12-19 18:30'
      },
      {
        id: 3,
        from: 'Mall - Palladium',
        to: 'Home - Bandra',
        distance: 6.8,
        duration: '18 mins',
        avgSpeed: 23,
        fuelUsed: 0.5,
        score: 90,
        timestamp: '2024-12-19 21:45'
      }
    ]
  };

  const aiPredictions = [
    {
      id: 1,
      type: 'maintenance',
      severity: 'medium',
      title: 'Brake Pad Replacement Due',
      description: 'Based on driving patterns and brake usage, brake pads will need replacement in approximately 2,500 km',
      estimatedDate: '2025-01-15',
      confidence: 87,
      action: 'Schedule service appointment'
    },
    {
      id: 2,
      type: 'fuel',
      severity: 'low',
      title: 'Fuel Efficiency Optimization',
      description: 'AI suggests adjusting driving style during peak hours to improve fuel efficiency by 8%',
      estimatedSaving: '₹450/month',
      confidence: 92,
      action: 'View driving tips'
    },
    {
      id: 3,
      type: 'battery',
      severity: 'high',
      title: 'Battery Health Declining',
      description: 'Battery voltage patterns indicate potential failure within 3-4 months',
      estimatedDate: '2025-03-20',
      confidence: 78,
      action: 'Get battery tested'
    },
    {
      id: 4,
      type: 'tire',
      severity: 'medium',
      title: 'Tire Rotation Recommended',
      description: 'Uneven wear patterns detected. Tire rotation will extend tire life by 15%',
      estimatedDate: '2025-01-05',
      confidence: 85,
      action: 'Schedule tire service'
    }
  ];

  const geofences = [
    {
      id: 1,
      name: 'Home Zone',
      type: 'safe',
      radius: 500,
      center: 'Bandra West',
      active: true,
      alerts: 'Entry/Exit notifications'
    },
    {
      id: 2,
      name: 'Office Zone',
      type: 'work',
      radius: 300,
      center: 'BKC',
      active: true,
      alerts: 'Arrival notifications'
    },
    {
      id: 3,
      name: 'Service Center',
      type: 'service',
      radius: 200,
      center: 'Kurla',
      active: false,
      alerts: 'Service reminders'
    }
  ];

  const additionalFeatures = [
    {
      id: 1,
      name: 'Anti-Theft Protection',
      icon: Shield,
      status: 'active',
      description: 'Real-time theft alerts and immobilizer control',
      lastActivity: 'No suspicious activity detected'
    },
    {
      id: 2,
      name: 'Route Optimization',
      icon: Route,
      status: 'active',
      description: 'AI-powered route suggestions for fuel efficiency',
      lastActivity: 'Saved 15 mins on last trip'
    },
    {
      id: 3,
      name: 'Driver Behavior Analysis',
      icon: Eye,
      status: 'active',
      description: 'Comprehensive driving pattern analysis',
      lastActivity: 'Score improved by 5 points this week'
    },
    {
      id: 4,
      name: 'Maintenance Scheduler',
      icon: Wrench,
      status: 'active',
      description: 'Automated service reminders and scheduling',
      lastActivity: 'Next service due in 45 days'
    },
    {
      id: 5,
      name: 'Emergency Response',
      icon: Zap,
      status: 'active',
      description: 'Automatic crash detection and emergency calling',
      lastActivity: 'System tested successfully'
    }
  ];

  // Commercial Dashboard Data
  const commercialVehicles = [
    {
      id: 'MH-01-AB-1234',
      name: 'Maruti Swift Dzire',
      type: 'Sedan',
      status: 'rented',
      driver: 'Rajesh Kumar',
      customer: 'Amit Sharma',
      location: 'Andheri West, Mumbai',
      fuelLevel: Math.floor(Math.random() * 40) + 60,
      dailyRate: 2500,
      bookingEnd: '2024-12-22',
      earnings: 15000,
      lastUpdate: '2 mins ago'
    },
    {
      id: 'MH-02-CD-5678',
      name: 'Toyota Innova Crysta',
      type: 'SUV',
      status: 'available',
      driver: 'Unassigned',
      customer: null,
      location: 'Bandra East, Mumbai',
      fuelLevel: Math.floor(Math.random() * 30) + 70,
      dailyRate: 4500,
      bookingEnd: null,
      earnings: 0,
      lastUpdate: '5 mins ago'
    },
    {
      id: 'MH-03-EF-9012',
      name: 'Mahindra Scorpio',
      type: 'SUV',
      status: 'maintenance',
      driver: 'Suresh Patil',
      customer: null,
      location: 'Service Center, Kurla',
      fuelLevel: Math.floor(Math.random() * 20) + 30,
      dailyRate: 3800,
      bookingEnd: null,
      earnings: 0,
      lastUpdate: '1 hour ago'
    },
    {
      id: 'MH-04-GH-3456',
      name: 'Honda City',
      type: 'Sedan',
      status: 'rented',
      driver: 'Vikram Singh',
      customer: 'Priya Mehta',
      location: 'Powai, Mumbai',
      fuelLevel: Math.floor(Math.random() * 35) + 45,
      dailyRate: 2800,
      bookingEnd: '2024-12-25',
      earnings: 22400,
      lastUpdate: '10 mins ago'
    },
    {
      id: 'MH-05-IJ-7890',
      name: 'Hyundai Creta',
      type: 'SUV',
      status: 'available',
      driver: 'Unassigned',
      customer: null,
      location: 'Malad West, Mumbai',
      fuelLevel: Math.floor(Math.random() * 25) + 75,
      dailyRate: 3500,
      bookingEnd: null,
      earnings: 0,
      lastUpdate: '15 mins ago'
    }
  ];

  const drivers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@email.com',
      licenseNumber: 'MH-1234567890',
      rating: 4.8,
      totalTrips: 245,
      monthlyEarnings: 45000,
      status: 'active',
      currentVehicle: 'MH-01-AB-1234',
      joiningDate: '2023-01-15',
      experience: '8 years'
    },
    {
      id: 2,
      name: 'Suresh Patil',
      phone: '+91 87654 32109',
      email: 'suresh.patil@email.com',
      licenseNumber: 'MH-0987654321',
      rating: 4.6,
      totalTrips: 189,
      monthlyEarnings: 38000,
      status: 'maintenance',
      currentVehicle: 'MH-03-EF-9012',
      joiningDate: '2023-03-20',
      experience: '6 years'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      phone: '+91 76543 21098',
      email: 'vikram.singh@email.com',
      licenseNumber: 'MH-1122334455',
      rating: 4.9,
      totalTrips: 312,
      monthlyEarnings: 52000,
      status: 'active',
      currentVehicle: 'MH-04-GH-3456',
      joiningDate: '2022-11-10',
      experience: '10 years'
    },
    {
      id: 4,
      name: 'Amit Desai',
      phone: '+91 65432 10987',
      email: 'amit.desai@email.com',
      licenseNumber: 'MH-5566778899',
      rating: 4.7,
      totalTrips: 156,
      monthlyEarnings: 35000,
      status: 'available',
      currentVehicle: null,
      joiningDate: '2023-06-05',
      experience: '5 years'
    }
  ];

  const recentBookings = [
    {
      id: 'BK001',
      customerName: 'Amit Sharma',
      customerPhone: '+91 99887 76655',
      vehicleNumber: 'MH-01-AB-1234',
      driver: 'Rajesh Kumar',
      pickupDate: '2024-12-19',
      returnDate: '2024-12-22',
      totalAmount: 15000,
      status: 'active',
      paymentStatus: 'paid'
    },
    {
      id: 'BK002',
      customerName: 'Priya Mehta',
      customerPhone: '+91 88776 65544',
      vehicleNumber: 'MH-04-GH-3456',
      driver: 'Vikram Singh',
      pickupDate: '2024-12-17',
      returnDate: '2024-12-25',
      totalAmount: 22400,
      status: 'active',
      paymentStatus: 'partial'
    },
    {
      id: 'BK003',
      customerName: 'Rohit Gupta',
      customerPhone: '+91 77665 54433',
      vehicleNumber: 'MH-02-CD-5678',
      driver: 'Suresh Patil',
      pickupDate: '2024-12-15',
      returnDate: '2024-12-18',
      totalAmount: 13500,
      status: 'completed',
      paymentStatus: 'paid'
    }
  ];

  const financialData = {
    revenue: {
      today: 45000,
      thisWeek: 285000,
      thisMonth: 1250000,
      lastMonth: 1180000
    },
    expenses: {
      fuel: 185000,
      maintenance: 95000,
      insurance: 45000,
      salaries: 280000,
      other: 65000
    },
    profit: {
      gross: 1250000,
      net: 580000,
      margin: 46.4
    }
  };

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Low Fuel Alert - MH-01-AB-1234',
      message: 'Vehicle fuel level is below 25%. Driver notified.',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Booking Completed',
      message: 'BK003 completed successfully. Payment received: ₹13,500',
      time: '2 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Booking Request',
      message: 'Customer Neha Patel requested Toyota Innova for 3 days',
      time: '4 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'warning',
      title: 'Maintenance Due',
      message: 'MH-03-EF-9012 service due in 2 days. Schedule appointment.',
      time: '1 day ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleVehicle = () => {
    setVehicleRunning(!vehicleRunning);
  };

  const connectDevice = () => {
    setDeviceConnected(!deviceConnected);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rented':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'available':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Quick Action Handlers
  const handleAddVehicle = () => {
    console.log('Adding vehicle:', vehicleForm);
    // Here you would typically send data to backend
    alert(`Vehicle ${vehicleForm.registrationNumber} added successfully!`);
    setShowAddVehicleModal(false);
    setVehicleForm({
      registrationNumber: '',
      make: '',
      model: '',
      year: '',
      fuelType: 'Petrol',
      seatingCapacity: '',
      color: '',
      purchasePrice: '',
      insuranceExpiry: '',
      pucExpiry: ''
    });
  };

  const handleAddDriver = () => {
    console.log('Adding driver:', driverForm);
    alert(`Driver ${driverForm.name} added successfully!`);
    setShowAddDriverModal(false);
    setDriverForm({
      name: '',
      phone: '',
      email: '',
      licenseNumber: '',
      licenseExpiry: '',
      address: '',
      emergencyContact: '',
      salary: '',
      joiningDate: ''
    });
  };

  const handleCreateBooking = () => {
    console.log('Creating booking:', bookingForm);
    alert(`Booking created for ${bookingForm.customerName}!`);
    setShowCreateBookingModal(false);
    setBookingForm({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      vehicleId: '',
      pickupDate: '',
      returnDate: '',
      pickupLocation: '',
      dropLocation: '',
      totalAmount: '',
      advanceAmount: '',
      purpose: 'Personal'
    });
  };

  const handleGenerateInvoice = () => {
    console.log('Generating invoice:', invoiceForm);
    alert(`Invoice generated for booking ${invoiceForm.bookingId}!`);
    setShowGenerateInvoiceModal(false);
    setInvoiceForm({
      bookingId: '',
      customerName: '',
      customerPhone: '',
      vehicleNumber: '',
      rentalDays: '',
      dailyRate: '',
      extraCharges: '',
      discount: '',
      gstRate: '18',
      notes: ''
    });
  };

  const handleScheduleMaintenance = () => {
    console.log('Scheduling maintenance:', maintenanceForm);
    alert(`Maintenance scheduled for ${maintenanceForm.vehicleId}!`);
    setShowScheduleMaintenanceModal(false);
    setMaintenanceForm({
      vehicleId: '',
      serviceType: 'Regular Service',
      scheduledDate: '',
      serviceCenter: '',
      estimatedCost: '',
      description: '',
      priority: 'Medium'
    });
  };

  const handleViewReports = () => {
    console.log('Viewing reports');
    alert('Opening detailed reports dashboard...');
    setShowViewReportsModal(false);
  };

  const renderNotificationPanel = () => (
    <div className="absolute right-0 top-16 w-96 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <button 
            onClick={() => setShowNotifications(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p>No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="p-3 border-t bg-gray-50">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );

  const renderDashboardSwitcher = () => (
    <div className="relative">
      <button
        onClick={() => setShowDashboardMenu(!showDashboardMenu)}
        className="flex items-center space-x-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
      >
        <span>{type === 'individual' ? 'Individual Dashboard' : 'Commercial Fleet Dashboard'}</span>
        <ChevronDown className="h-5 w-5" />
      </button>
      
      {showDashboardMenu && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50">
          <div className="py-2">
            <button
              onClick={() => {
                onTypeChange?.('individual');
                setShowDashboardMenu(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                type === 'individual' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Car className="h-5 w-5" />
                <div>
                  <div className="font-medium">Individual Dashboard</div>
                  <div className="text-sm text-gray-500">Personal vehicle monitoring</div>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => {
                onTypeChange?.('commercial');
                setShowDashboardMenu(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                type === 'commercial' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5" />
                <div>
                  <div className="font-medium">Commercial Fleet Dashboard</div>
                  <div className="text-sm text-gray-500">Multi-vehicle fleet management</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Modal Components
  const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const AddVehicleModal = () => (
    <Modal isOpen={showAddVehicleModal} onClose={() => setShowAddVehicleModal(false)} title="Add New Vehicle">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number *</label>
            <input
              type="text"
              value={vehicleForm.registrationNumber}
              onChange={(e) => setVehicleForm({...vehicleForm, registrationNumber: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="MH-01-AB-1234"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Make *</label>
            <input
              type="text"
              value={vehicleForm.make}
              onChange={(e) => setVehicleForm({...vehicleForm, make: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Maruti Suzuki"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
            <input
              type="text"
              value={vehicleForm.model}
              onChange={(e) => setVehicleForm({...vehicleForm, model: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Swift Dzire"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
            <input
              type="number"
              value={vehicleForm.year}
              onChange={(e) => setVehicleForm({...vehicleForm, year: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2023"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type *</label>
            <select
              value={vehicleForm.fuelType}
              onChange={(e) => setVehicleForm({...vehicleForm, fuelType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seating Capacity *</label>
            <input
              type="number"
              value={vehicleForm.seatingCapacity}
              onChange={(e) => setVehicleForm({...vehicleForm, seatingCapacity: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <input
              type="text"
              value={vehicleForm.color}
              onChange={(e) => setVehicleForm({...vehicleForm, color: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="White"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price (₹)</label>
            <input
              type="number"
              value={vehicleForm.purchasePrice}
              onChange={(e) => setVehicleForm({...vehicleForm, purchasePrice: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="800000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Expiry</label>
            <input
              type="date"
              value={vehicleForm.insuranceExpiry}
              onChange={(e) => setVehicleForm({...vehicleForm, insuranceExpiry: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PUC Expiry</label>
            <input
              type="date"
              value={vehicleForm.pucExpiry}
              onChange={(e) => setVehicleForm({...vehicleForm, pucExpiry: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex space-x-4 pt-4">
          <button
            onClick={handleAddVehicle}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add Vehicle
          </button>
          <button
            onClick={() => setShowAddVehicleModal(false)}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );

  const AddDriverModal = () => (
    <Modal isOpen={showAddDriverModal} onClose={() => setShowAddDriverModal(false)} title="Add New Driver">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              value={driverForm.name}
              onChange={(e) => setDriverForm({...driverForm, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Rajesh Kumar"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              value={driverForm.phone}
              onChange={(e) => setDriverForm({...driverForm, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={driverForm.email}
              onChange={(e) => setDriverForm({...driverForm, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="rajesh@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">License Number *</label>
            <input
              type="text"
              value={driverForm.licenseNumber}
              onChange={(e) => setDriverForm({...driverForm, licenseNumber: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="MH-1234567890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">License Expiry *</label>
            <input
              type="date"
              value={driverForm.licenseExpiry}
              onChange={(e) => setDriverForm({...driverForm, licenseExpiry: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
            <input
              type="tel"
              value={driverForm.emergencyContact}
              onChange={(e) => setDriverForm({...driverForm, emergencyContact: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 87654 32109"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Salary (₹)</label>
            <input
              type="number"
              value={driverForm.salary}
              onChange={(e) => setDriverForm({...driverForm, salary: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="25000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
            <input
              type="date"
              value={driverForm.joiningDate}
              onChange={(e) => setDriverForm({...driverForm, joiningDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={driverForm.address}
            onChange={(e) => setDriverForm({...driverForm, address: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Complete address..."
          />
        </div>
        <div className="flex space-x-4 pt-4">
          <button
            onClick={handleAddDriver}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add Driver
          </button>
          <button
            onClick={() => setShowAddDriverModal(false)}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );

  const CreateBookingModal = () => (
    <Modal isOpen={showCreateBookingModal} onClose={() => setShowCreateBookingModal(false)} title="Create New Booking">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
            <input
              type="text"
              value={bookingForm.customerName}
              onChange={(e) => setBookingForm({...bookingForm, customerName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Amit Sharma"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Phone *</label>
            <input
              type="tel"
              value={bookingForm.customerPhone}
              onChange={(e) => setBookingForm({...bookingForm, customerPhone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 99887 76655"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
            <input
              type="email"
              value={bookingForm.customerEmail}
              onChange={(e) => setBookingForm({...bookingForm, customerEmail: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="amit@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle *</label>
            <select
              value={bookingForm.vehicleId}
              onChange={(e) => setBookingForm({...bookingForm, vehicleId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Vehicle</option>
              {commercialVehicles.filter(v => v.status === 'available').map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} ({vehicle.id}) - ₹{vehicle.dailyRate}/day
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date *</label>
            <input
              type="date"
              value={bookingForm.pickupDate}
              onChange={(e) => setBookingForm({...bookingForm, pickupDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return Date *</label>
            <input
              type="date"
              value={bookingForm.returnDate}
              onChange={(e) => setBookingForm({...bookingForm, returnDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location *</label>
            <input
              type="text"
              value={bookingForm.pickupLocation}
              onChange={(e) => setBookingForm({...bookingForm, pickupLocation: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Andheri West, Mumbai"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Drop Location</label>
            <input
              type="text"
              value={bookingForm.dropLocation}
              onChange={(e) => setBookingForm({...bookingForm, dropLocation: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="BKC, Mumbai"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (₹) *</label>
            <input
              type="number"
              value={bookingForm.totalAmount}
              onChange={(e) => setBookingForm({...bookingForm, totalAmount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="15000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Advance Amount (₹)</label>
            <input
              type="number"
              value={bookingForm.advanceAmount}
              onChange={(e) => setBookingForm({...bookingForm, advanceAmount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="5000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
            <select
              value={bookingForm.purpose}
              onChange={(e) => setBookingForm({...bookingForm, purpose: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
              <option value="Wedding">Wedding</option>
              <option value="Tourism">Tourism</option>
              <option value="Airport Transfer">Airport Transfer</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4 pt-4">
          <button
            onClick={handleCreateBooking}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Create Booking
          </button>
          <button
            onClick={() => setShowCreateBookingModal(false)}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );

  const GenerateInvoiceModal = () => (
    <Modal isOpen={showGenerateInvoiceModal} onClose={() => setShowGenerateInvoiceModal(false)} title="Generate Invoice">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Booking ID *</label>
            <select
              value={invoiceForm.bookingId}
              onChange={(e) => setInvoiceForm({...invoiceForm, bookingId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Booking</option>
              {recentBookings.map(booking => (
                <option key={booking.id} value={booking.id}>
                  {booking.id} - {booking.customerName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
            <input
              type="text"
              value={invoiceForm.customerName}
              onChange={(e) => setInvoiceForm({...invoiceForm, customerName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Amit Sharma"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Phone</label>
            <input
              type="tel"
              value={invoiceForm.customerPhone}
              onChange={(e) => setInvoiceForm({...invoiceForm, customerPhone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 99887 76655"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number *</label>
            <input
              type="text"
              value={invoiceForm.vehicleNumber}
              onChange={(e) => setInvoiceForm({...invoiceForm, vehicleNumber: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="MH-01-AB-1234"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rental Days *</label>
            <input
              type="number"
              value={invoiceForm.rentalDays}
              onChange={(e) => setInvoiceForm({...invoiceForm, rentalDays: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Daily Rate (₹) *</label>
            <input
              type="number"
              value={invoiceForm.dailyRate}
              onChange={(e) => setInvoiceForm({...invoiceForm, dailyRate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Extra Charges (₹)</label>
            <input
              type="number"
              value={invoiceForm.extraCharges}
              onChange={(e) => setInvoiceForm({...invoiceForm, extraCharges: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (₹)</label>
            <input
              type="number"
              value={invoiceForm.discount}
              onChange={(e) => setInvoiceForm({...invoiceForm, discount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GST Rate (%)</label>
            <select
              value={invoiceForm.gstRate}
              onChange={(e) => setInvoiceForm({...invoiceForm, gstRate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={invoiceForm.notes}
            onChange={(e) => setInvoiceForm({...invoiceForm, notes: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Additional notes or terms..."
          />
        </div>
        <div className="flex space-x-4 pt-4">
          <button
            onClick={handleGenerateInvoice}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Generate Invoice
          </button>
          <button
            onClick={() => setShowGenerateInvoiceModal(false)}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );

  const ScheduleMaintenanceModal = () => (
    <Modal isOpen={showScheduleMaintenanceModal} onClose={() => setShowScheduleMaintenanceModal(false)} title="Schedule Maintenance">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle *</label>
            <select
              value={maintenanceForm.vehicleId}
              onChange={(e) => setMaintenanceForm({...maintenanceForm, vehicleId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Vehicle</option>
              {commercialVehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} ({vehicle.id})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
            <select
              value={maintenanceForm.serviceType}
              onChange={(e) => setMaintenanceForm({...maintenanceForm, serviceType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Regular Service">Regular Service</option>
              <option value="Oil Change">Oil Change</option>
              <option value="Brake Service">Brake Service</option>
              <option value="Tire Replacement">Tire Replacement</option>
              <option value="AC Service">AC Service</option>
              <option value="Engine Repair">Engine Repair</option>
              <option value="Body Work">Body Work</option>
              <option value="Insurance Claim">Insurance Claim</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date *</label>
            <input
              type="date"
              value={maintenanceForm.scheduledDate}
              onChange={(e) => setMaintenanceForm({...maintenanceForm, scheduledDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Center</label>
            <input
              type="text"
              value={maintenanceForm.serviceCenter}
              onChange={(e) => setMaintenanceForm({...maintenanceForm, serviceCenter: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Authorized Service Center, Kurla"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost (₹)</label>
            <input
              type="number"
              value={maintenanceForm.estimatedCost}
              onChange={(e) => setMaintenanceForm({...maintenanceForm, estimatedCost: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="5000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={maintenanceForm.priority}
              onChange={(e) => setMaintenanceForm({...maintenanceForm, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={maintenanceForm.description}
            onChange={(e) => setMaintenanceForm({...maintenanceForm, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the maintenance work required..."
          />
        </div>
        <div className="flex space-x-4 pt-4">
          <button
            onClick={handleScheduleMaintenance}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Schedule Maintenance
          </button>
          <button
            onClick={() => setShowScheduleMaintenanceModal(false)}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );

  const ViewReportsModal = () => (
    <Modal isOpen={showViewReportsModal} onClose={() => setShowViewReportsModal(false)} title="Business Reports">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Revenue Report</h4>
            <p className="text-sm text-blue-700 mb-3">Monthly revenue breakdown and trends</p>
            <button 
              onClick={() => alert('Downloading Revenue Report...')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Download PDF
            </button>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Vehicle Utilization</h4>
            <p className="text-sm text-green-700 mb-3">Fleet performance and utilization metrics</p>
            <button 
              onClick={() => alert('Downloading Utilization Report...')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
            >
              Download PDF
            </button>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Driver Performance</h4>
            <p className="text-sm text-yellow-700 mb-3">Driver ratings and performance analysis</p>
            <button 
              onClick={() => alert('Downloading Driver Report...')}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700 transition-colors"
            >
              Download PDF
            </button>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">Customer Analysis</h4>
            <p className="text-sm text-purple-700 mb-3">Customer behavior and satisfaction metrics</p>
            <button 
              onClick={() => alert('Downloading Customer Report...')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
            >
              Download PDF
            </button>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">Maintenance Report</h4>
            <p className="text-sm text-red-700 mb-3">Vehicle maintenance costs and schedules</p>
            <button 
              onClick={() => alert('Downloading Maintenance Report...')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              Download PDF
            </button>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900 mb-2">Financial Summary</h4>
            <p className="text-sm text-indigo-700 mb-3">Complete financial overview and P&L</p>
            <button 
              onClick={() => alert('Downloading Financial Report...')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
            >
              Download PDF
            </button>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-3">Custom Report Generator</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Revenue Analysis</option>
                <option>Fleet Performance</option>
                <option>Driver Analytics</option>
                <option>Customer Insights</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last 6 months</option>
                <option>Last year</option>
                <option>Custom range</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={() => alert('Generating custom report...')}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );

  // Individual Dashboard Components (existing code)
  const renderDeviceConnection = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Drishti Device Status</h3>
        <div className="flex items-center space-x-2">
          {deviceConnected ? (
            <>
              <Wifi className="h-5 w-5 text-green-500" />
              <span className="text-sm text-green-600 font-medium">Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-600 font-medium">Disconnected</span>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Vehicle Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Model:</span>
              <span className="font-medium">{vehicleInfo.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{vehicleInfo.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fuel Type:</span>
              <span className="font-medium">{vehicleInfo.fuelType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Engine:</span>
              <span className="font-medium">{vehicleInfo.engineCapacity}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Device Controls</h4>
          <div className="space-y-3">
            <button
              onClick={connectDevice}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                deviceConnected 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {deviceConnected ? 'Disconnect Device' : 'Connect Device'}
            </button>
            
            <button
              onClick={toggleVehicle}
              disabled={!deviceConnected}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                !deviceConnected 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : vehicleRunning
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {vehicleRunning ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{vehicleRunning ? 'Stop Engine' : 'Start Engine'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVehicleStatus = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Real-time Vehicle Status</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          vehicleInfo.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {vehicleInfo.status.charAt(0).toUpperCase() + vehicleInfo.status.slice(1)}
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Gauge className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{vehicleInfo.realTimeData.speed}</div>
          <div className="text-sm text-gray-600">km/h</div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{vehicleInfo.realTimeData.rpm}</div>
          <div className="text-sm text-gray-600">RPM</div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Fuel className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{vehicleInfo.realTimeData.fuelLevel}%</div>
          <div className="text-sm text-gray-600">Fuel</div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Thermometer className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{vehicleInfo.realTimeData.engineTemp}°C</div>
          <div className="text-sm text-gray-600">Engine</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Current Location</h4>
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">{vehicleInfo.location.address}</p>
              <p className="text-xs text-gray-600">{vehicleInfo.location.landmark}</p>
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Tire Pressure</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Front Left:</span>
              <span className="font-medium">{vehicleInfo.realTimeData.tirePressure.frontLeft} PSI</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Front Right:</span>
              <span className="font-medium">{vehicleInfo.realTimeData.tirePressure.frontRight} PSI</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rear Left:</span>
              <span className="font-medium">{vehicleInfo.realTimeData.tirePressure.rearLeft} PSI</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rear Right:</span>
              <span className="font-medium">{vehicleInfo.realTimeData.tirePressure.rearRight} PSI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGeofencing = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Geofencing</h3>
        <button
          onClick={() => setGeofenceEnabled(!geofenceEnabled)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            geofenceEnabled 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {geofenceEnabled ? 'Enabled' : 'Disabled'}
        </button>
      </div>
      
      <div className="space-y-3">
        {geofences.map((fence) => (
          <div key={fence.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className={`h-5 w-5 ${fence.active ? 'text-green-500' : 'text-gray-400'}`} />
              <div>
                <p className="font-medium text-gray-900">{fence.name}</p>
                <p className="text-sm text-gray-600">{fence.center} • {fence.radius}m radius</p>
              </div>
            </div>
            <button className={`px-3 py-1 rounded-full text-xs font-medium ${
              fence.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {fence.active ? 'Active' : 'Inactive'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDrivingPatterns = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Driving Patterns & Analytics</h3>
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
          <Rewind className="h-4 w-4" />
          <span className="text-sm font-medium">Replay Last Trip</span>
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{drivingPatterns.weeklyStats.totalDistance}</div>
          <div className="text-sm text-gray-600">km this week</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{drivingPatterns.weeklyStats.drivingScore}</div>
          <div className="text-sm text-gray-600">Driving Score</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{drivingPatterns.weeklyStats.fuelEfficiency}</div>
          <div className="text-sm text-gray-600">km/l avg</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{drivingPatterns.weeklyStats.averageSpeed}</div>
          <div className="text-sm text-gray-600">km/h avg</div>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Recent Trips</h4>
        <div className="space-y-3">
          {drivingPatterns.recentTrips.map((trip) => (
            <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Navigation className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {trip.from} → {trip.to}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <span>{trip.distance} km</span>
                  <span>{trip.duration}</span>
                  <span>{trip.avgSpeed} km/h avg</span>
                  <span>{trip.fuelUsed}L fuel</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  trip.score >= 90 ? 'text-green-600' : 
                  trip.score >= 80 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {trip.score}/100
                </div>
                <div className="text-xs text-gray-500">{trip.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAIPredictions = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="h-6 w-6 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Predictions & Insights</h3>
      </div>
      
      <div className="space-y-4">
        {aiPredictions.map((prediction) => (
          <div key={prediction.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(prediction.severity)}`}>
                    {prediction.severity.toUpperCase()}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{prediction.title}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{prediction.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Confidence: {prediction.confidence}%</span>
                  {prediction.estimatedDate && <span>Est. Date: {prediction.estimatedDate}</span>}
                  {prediction.estimatedSaving && <span>Potential Saving: {prediction.estimatedSaving}</span>}
                </div>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              {prediction.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdditionalFeatures = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Features</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {additionalFeatures.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <div key={feature.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <IconComponent className="h-6 w-6 text-blue-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{feature.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    feature.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {feature.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
              <p className="text-xs text-gray-500">{feature.lastActivity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Commercial Dashboard Components
  const renderCommercialOverview = () => {
    const renderVehicleCard = (vehicle: any) => (
      <div key={vehicle.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => console.log('Vehicle clicked:', vehicle.id)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
              <p className="text-sm text-gray-500">{vehicle.id}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
            {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{vehicle.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{vehicle.lastUpdate}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Fuel className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-lg font-semibold text-gray-900">{vehicle.fuelLevel}%</div>
            <div className="text-xs text-gray-500">Fuel</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <IndianRupee className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-lg font-semibold text-gray-900">{vehicle.dailyRate}</div>
            <div className="text-xs text-gray-500">Daily Rate</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-lg font-semibold text-gray-900">₹{vehicle.earnings.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Earnings</div>
          </div>
        </div>
        
        {vehicle.status === 'rented' && (
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700">Customer: {vehicle.customer}</span>
              <span className="text-green-600 font-medium">Until: {vehicle.bookingEnd}</span>
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button 
              onClick={() => setShowAddVehicleModal(true)}
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Plus className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">Add Vehicle</span>
            </button>
            
            <button 
              onClick={() => setShowAddDriverModal(true)}
              className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <UserPlus className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">Add Driver</span>
            </button>
            
            <button 
              onClick={() => setShowCreateBookingModal(true)}
              className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Calendar className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">New Booking</span>
            </button>
            
            <button 
              onClick={() => setShowGenerateInvoiceModal(true)}
              className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <FileText className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-900">Generate Invoice</span>
            </button>
            
            <button 
              onClick={() => setShowScheduleMaintenanceModal(true)}
              className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Wrench className="h-8 w-8 text-red-600 mb-2" />
              <span className="text-sm font-medium text-red-900">Schedule Service</span>
            </button>
            
            <button 
              onClick={() => setShowViewReportsModal(true)}
              className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <BarChart3 className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-indigo-900">View Reports</span>
            </button>
          </div>
        </div>

        {/* Live Business Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{liveMetrics.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +12.5% from last month
                </p>
              </div>
              <IndianRupee className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Rentals</p>
                <p className="text-2xl font-bold text-gray-900">{liveMetrics.activeRentals}</p>
                <p className="text-sm text-blue-600 flex items-center">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +3 from yesterday
                </p>
              </div>
              <Car className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{liveMetrics.monthlyBookings}</p>
                <p className="text-sm text-purple-600 flex items-center">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +8.2% growth
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Profit Margin</p>
                <p className="text-2xl font-bold text-gray-900">₹{liveMetrics.profitMargin.toLocaleString()}</p>
                <p className="text-sm text-orange-600 flex items-center">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +15.3% this month
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">{liveMetrics.customerSatisfaction.toFixed(1)}/5.0</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(liveMetrics.customerSatisfaction) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vehicle Utilization</p>
                <p className="text-2xl font-bold text-gray-900">{liveMetrics.vehicleUtilization}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: `${liveMetrics.vehicleUtilization}%`}}></div>
                </div>
              </div>
              <Gauge className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fuel Efficiency</p>
                <p className="text-2xl font-bold text-gray-900">{liveMetrics.fuelEfficiency.toFixed(1)} km/l</p>
                <p className="text-sm text-green-600 flex items-center">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +2.1% improvement
                </p>
              </div>
              <Fuel className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Maintenance Cost</p>
                <p className="text-2xl font-bold text-gray-900">₹{liveMetrics.maintenanceCost.toLocaleString()}</p>
                <p className="text-sm text-red-600 flex items-center">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  -5.8% from last month
                </p>
              </div>
              <Wrench className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>
        
        {/* Vehicle Status */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Fleet Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialVehicles.map(renderVehicleCard)}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                        <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.vehicleNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{booking.totalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => console.log('View booking:', booking.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => console.log('Edit booking:', booking.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderOverview = () => {
    if (type === 'individual') {
      return (
        <div className="space-y-6">
          {renderDeviceConnection()}
          {renderVehicleStatus()}
          {renderGeofencing()}
          {renderDrivingPatterns()}
          {renderAIPredictions()}
          {renderAdditionalFeatures()}
        </div>
      );
    }

    return renderCommercialOverview();
  };

  const renderFleetManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Fleet Management</h2>
          <button 
            onClick={() => setShowAddVehicleModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Vehicle</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commercialVehicles.map((vehicle) => (
            <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Registration:</span>
                  <span className="font-medium">{vehicle.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">{vehicle.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Rate:</span>
                  <span className="font-medium">₹{vehicle.dailyRate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fuel Level:</span>
                  <span className="font-medium">{vehicle.fuelLevel}%</span>
                </div>
                {vehicle.driver !== 'Unassigned' && (
                  <div className="flex justify-between">
                    <span>Driver:</span>
                    <span className="font-medium">{vehicle.driver}</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => console.log('Edit vehicle:', vehicle.id)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Edit
                </button>
                <button 
                  onClick={() => console.log('View details:', vehicle.id)}
                  className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDriverManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Driver Management</h2>
          <button 
            onClick={() => setShowAddDriverModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Driver</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {drivers.map((driver) => (
            <div key={driver.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                    <p className="text-sm text-gray-500">{driver.experience} experience</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                  {driver.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className="font-medium">{driver.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>License:</span>
                  <span className="font-medium">{driver.licenseNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium ml-1">{driver.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Total Trips:</span>
                  <span className="font-medium">{driver.totalTrips}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Earnings:</span>
                  <span className="font-medium text-green-600">₹{driver.monthlyEarnings.toLocaleString()}</span>
                </div>
                {driver.currentVehicle && (
                  <div className="flex justify-between">
                    <span>Current Vehicle:</span>
                    <span className="font-medium">{driver.currentVehicle}</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => console.log('Call driver:', driver.phone)}
                  className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors flex items-center justify-center space-x-1"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call</span>
                </button>
                <button 
                  onClick={() => console.log('Message driver:', driver.id)}
                  className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Message</span>
                </button>
                <button 
                  onClick={() => console.log('Edit driver:', driver.id)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFinancialManagement = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Today:</span>
              <span className="font-semibold text-green-600">₹{financialData.revenue.today.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">This Week:</span>
              <span className="font-semibold text-green-600">₹{financialData.revenue.thisWeek.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">This Month:</span>
              <span className="font-semibold text-green-600">₹{financialData.revenue.thisMonth.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Month:</span>
              <span className="font-semibold text-gray-600">₹{financialData.revenue.lastMonth.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenses Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Fuel:</span>
              <span className="font-semibold text-red-600">₹{financialData.expenses.fuel.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Maintenance:</span>
              <span className="font-semibold text-red-600">₹{financialData.expenses.maintenance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Insurance:</span>
              <span className="font-semibold text-red-600">₹{financialData.expenses.insurance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Salaries:</span>
              <span className="font-semibold text-red-600">₹{financialData.expenses.salaries.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Other:</span>
              <span className="font-semibold text-red-600">₹{financialData.expenses.other.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Gross Profit:</span>
              <span className="font-semibold text-blue-600">₹{financialData.profit.gross.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Net Profit:</span>
              <span className="font-semibold text-blue-600">₹{financialData.profit.net.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Profit Margin:</span>
              <span className="font-semibold text-blue-600">{financialData.profit.margin}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button 
            onClick={() => setShowGenerateInvoiceModal(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>Generate Invoice</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-12-19</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Booking Payment - BK001</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Income
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹15,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => console.log('Download receipt')}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-12-18</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Fuel Expense - MH-01-AB-1234</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Expense
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹2,500</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => console.log('Download receipt')}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAdvancedAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vehicle Utilization</p>
              <p className="text-2xl font-bold text-gray-900">{liveMetrics.vehicleUtilization}%</p>
              <p className="text-sm text-blue-600">Optimal range: 75-85%</p>
            </div>
            <Gauge className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: `${liveMetrics.vehicleUtilization}%`}}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{liveMetrics.customerSatisfaction.toFixed(1)}/5.0</p>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(liveMetrics.customerSatisfaction) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            <Award className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fuel Efficiency</p>
              <p className="text-2xl font-bold text-gray-900">{liveMetrics.fuelEfficiency.toFixed(1)} km/l</p>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                +2.1% improvement
              </p>
            </div>
            <Fuel className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Trip Duration</p>
              <p className="text-2xl font-bold text-gray-900">2.5 hrs</p>
              <p className="text-sm text-purple-600">Per booking</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Vehicles</h3>
          <div className="space-y-4">
            {commercialVehicles.slice(0, 3).map((vehicle, index) => (
              <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{vehicle.name}</p>
                    <p className="text-sm text-gray-500">{vehicle.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{vehicle.earnings.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">This month</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Insights</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-900 font-medium">Repeat Customers</span>
              <span className="text-blue-600 font-semibold">68%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-green-900 font-medium">Average Booking Value</span>
              <span className="text-green-600 font-semibold">₹18,500</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-purple-900 font-medium">Peak Booking Hours</span>
              <span className="text-purple-600 font-semibold">9 AM - 11 AM</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-orange-900 font-medium">Most Popular Vehicle</span>
              <span className="text-orange-600 font-semibold">Toyota Innova</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Charts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <PieChart className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h4 className="font-medium text-gray-900 mb-2">Revenue Distribution</h4>
            <p className="text-sm text-gray-600">Interactive chart showing revenue by vehicle type</p>
            <button 
              onClick={() => console.log('View revenue chart')}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              View Chart
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <BarChart3 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h4 className="font-medium text-gray-900 mb-2">Monthly Trends</h4>
            <p className="text-sm text-gray-600">Booking trends and seasonal patterns</p>
            <button 
              onClick={() => console.log('View trends chart')}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
            >
              View Chart
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Email Notifications</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Enabled</button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">SMS Alerts</span>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm">Disabled</button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Auto Reports</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Weekly</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {renderDashboardSwitcher()}
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                >
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && renderNotificationPanel()}
              </div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <img 
                  src="/mohit-sharma.jpg" 
                  alt="Mohit Sharma" 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">Mohit Sharma</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Overview</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Analytics</span>
              </div>
            </button>
            
            {type === 'commercial' && (
              <>
                <button
                  onClick={() => setActiveTab('fleet')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'fleet'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4" />
                    <span>Fleet Management</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('drivers')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'drivers'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Drivers</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('financial')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'financial'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="h-4 w-4" />
                    <span>Financial</span>
                  </div>
                </button>
              </>
            )}
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'analytics' && (type === 'commercial' ? renderAdvancedAnalytics() : renderOverview())}
        {activeTab === 'fleet' && renderFleetManagement()}
        {activeTab === 'drivers' && renderDriverManagement()}
        {activeTab === 'financial' && renderFinancialManagement()}
        {activeTab === 'settings' && renderSettings()}
      </div>

      {/* Modals */}
      <AddVehicleModal />
      <AddDriverModal />
      <CreateBookingModal />
      <GenerateInvoiceModal />
      <ScheduleMaintenanceModal />
      <ViewReportsModal />
    </div>
  );
};

export default Dashboard;