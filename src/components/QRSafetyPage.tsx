import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Globe, Phone, Video, Mic, Shield, MapPin, Clock, Bell, Wifi, Lock, Unlock, Key, Users, Edit, Trash2, Plus, Download, Share2, Copy, Scan, AlertTriangle, CheckCircle, X, Check, Info, HelpCircle, ExternalLink, Settings, BarChart3, Activity, TrendingUp, Database, Cloud, Smartphone, Camera, Zap, Navigation, Car, Battery, Thermometer, Eye, Layers, Target, Filter, Search, RefreshCw, MoreHorizontal, ChevronDown, ChevronRight, ArrowUp, ArrowDown, Star, Award, Calendar, FileText, Archive, BookOpen, CreditCard, Receipt, PieChart, LineChart, BarChart, Volume2, VolumeX, PlayCircle, PauseCircle, StopCircle, Maximize, Minimize, RotateCcw, Save, Upload, SortAsc, Minus, Mail, Heart, UserPlus, UserMinus, PhoneCall, MessageSquare, Send, Printer, Package, Truck, CreditCard as CreditCardIcon, IndianRupee, Building, Home, Briefcase, GraduationCap, Stethoscope, Pill, Siren, Ambulance, ShieldCheck, Radio, Headphones, Mic2, SpeakerIcon, Bluetooth, WifiOff, Signal, SignalHigh, SignalLow, SignalMedium, Fingerprint, SpaceIcon as FaceIcon, ScanFace, QrCodeIcon, NfcIcon, Vibrate, FlashlightIcon, SunIcon, MoonIcon, CloudRain, Snowflake, Wind, Thermometer as TempIcon, Droplets, Umbrella, Sun, CloudSnow, Cloudy, Cloudy as PartlyCloudyDay, Tornado, Zap as Lightning, Rainbow, Sunrise, Sunset } from 'lucide-react';

interface EmergencyContact {
  id: string;
  type: 'primary' | 'secondary' | 'tertiary';
  name: string;
  relation: string;
  phone: string;
  email: string;
  address: string;
  language: string;
  isVerified: boolean;
  lastContacted: string;
  medicalInfo: {
    bloodType: string;
    allergies: string[];
    medications: string[];
    emergencyMedical: string;
    doctorName: string;
    doctorPhone: string;
    hospitalPreference: string;
  };
  preferences: {
    preferredContactMethod: 'call' | 'sms' | 'whatsapp';
    availableHours: string;
    canReceiveVideoCall: boolean;
    speaksEnglish: boolean;
  };
}

interface InsuranceData {
  provider: string;
  policyNumber: string;
  expiryDate: string;
  coverage: string;
  claimNumber: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  branchAddress: string;
  policyType: string;
  premiumAmount: string;
  lastClaimDate: string;
  claimHistory: Array<{
    claimId: string;
    date: string;
    amount: string;
    status: string;
    description: string;
  }>;
}

interface QRAnalytics {
  totalScans: number;
  emergencyActivations: number;
  uniqueScanners: number;
  avgResponseTime: number;
  scansByLocation: Array<{
    location: string;
    count: number;
    lastScan: string;
  }>;
  scansByTime: Array<{
    hour: number;
    count: number;
  }>;
  emergencyTypes: Array<{
    type: string;
    count: number;
    avgResponseTime: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'emergency' | 'info' | 'medical' | 'insurance' | 'test';
    scanner: string;
    location: string;
    timestamp: string;
    action: string;
    responseTime?: number;
    outcome?: string;
  }>;
  monthlyStats: Array<{
    month: string;
    scans: number;
    emergencies: number;
    avgResponse: number;
  }>;
}

interface StickerOrder {
  id: string;
  quantity: number;
  size: string;
  placement: string[];
  customization: {
    vehicleNumber: string;
    ownerName: string;
    emergencyMessage: string;
    languages: string[];
  };
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  estimatedDelivery: string;
  totalAmount: number;
}

const QRSafetyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('qr-generator');
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [qrData, setQrData] = useState<any>(null);
  const [selectedSticker, setSelectedSticker] = useState('windshield');
  const [stickerSize, setStickerSize] = useState('medium');
  const [emergencyLanguage, setEmergencyLanguage] = useState('hindi');
  const [analyticsFilter, setAnalyticsFilter] = useState('all');
  const [showAddContact, setShowAddContact] = useState(false);
  const [editingContact, setEditingContact] = useState<string | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [testMode, setTestMode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Realistic emergency contacts data
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    {
      id: 'ec001',
      type: 'primary',
      name: 'Mohit Sharma',
      relation: 'Self (Owner)',
      phone: '+91 98765 43210',
      email: 'mohit.sharma@fixpointdrishti.com',
      address: 'A-401, Sunrise Apartments, Linking Road, Bandra West, Mumbai - 400050',
      language: 'Hindi',
      isVerified: true,
      lastContacted: '2024-12-15T10:30:00Z',
      medicalInfo: {
        bloodType: 'O+',
        allergies: ['Penicillin', 'Shellfish'],
        medications: ['Metformin 500mg (Diabetes)', 'Lisinopril 10mg (BP)'],
        emergencyMedical: 'Type 2 Diabetes - Insulin dependent. Carries glucose tablets. Emergency contact: Dr. Rajesh Gupta',
        doctorName: 'Dr. Rajesh Gupta',
        doctorPhone: '+91 98765 43220',
        hospitalPreference: 'Lilavati Hospital, Bandra'
      },
      preferences: {
        preferredContactMethod: 'call',
        availableHours: '24/7',
        canReceiveVideoCall: true,
        speaksEnglish: true
      }
    },
    {
      id: 'ec002',
      type: 'secondary',
      name: 'Priya Sharma',
      relation: 'Spouse',
      phone: '+91 98765 43211',
      email: 'priya.sharma@gmail.com',
      address: 'A-401, Sunrise Apartments, Linking Road, Bandra West, Mumbai - 400050',
      language: 'Hindi',
      isVerified: true,
      lastContacted: '2024-12-10T15:45:00Z',
      medicalInfo: {
        bloodType: 'A+',
        allergies: ['Aspirin', 'Latex'],
        medications: ['Amlodipine 5mg (Hypertension)', 'Vitamin D3'],
        emergencyMedical: 'Hypertension - Regular monitoring required. No known drug allergies except Aspirin.',
        doctorName: 'Dr. Sunita Mehta',
        doctorPhone: '+91 98765 43221',
        hospitalPreference: 'Holy Family Hospital, Bandra'
      },
      preferences: {
        preferredContactMethod: 'whatsapp',
        availableHours: '6:00 AM - 11:00 PM',
        canReceiveVideoCall: true,
        speaksEnglish: true
      }
    },
    {
      id: 'ec003',
      type: 'tertiary',
      name: 'Rajesh Kumar',
      relation: 'Brother',
      phone: '+91 98765 43212',
      email: 'rajesh.kumar@techcorp.in',
      address: 'B-203, Green Valley Society, Andheri East, Mumbai - 400069',
      language: 'Hindi',
      isVerified: true,
      lastContacted: '2024-11-28T09:15:00Z',
      medicalInfo: {
        bloodType: 'B+',
        allergies: [],
        medications: [],
        emergencyMedical: 'No known medical conditions. Healthy adult.',
        doctorName: 'Dr. Amit Patel',
        doctorPhone: '+91 98765 43222',
        hospitalPreference: 'Kokilaben Dhirubhai Ambani Hospital'
      },
      preferences: {
        preferredContactMethod: 'call',
        availableHours: '9:00 AM - 9:00 PM',
        canReceiveVideoCall: false,
        speaksEnglish: true
      }
    },
    {
      id: 'ec004',
      type: 'tertiary',
      name: 'Neha Sharma',
      relation: 'Daughter',
      phone: '+91 98765 43213',
      email: 'neha.sharma@student.edu',
      address: 'Hostel Room 204, IIT Bombay, Powai, Mumbai - 400076',
      language: 'English',
      isVerified: true,
      lastContacted: '2024-12-12T20:30:00Z',
      medicalInfo: {
        bloodType: 'O+',
        allergies: ['Peanuts'],
        medications: [],
        emergencyMedical: 'Severe peanut allergy - carries EpiPen. Student at IIT Bombay.',
        doctorName: 'Dr. Campus Health Center',
        doctorPhone: '+91 22 2576 7777',
        hospitalPreference: 'IIT Bombay Health Center / Hiranandani Hospital'
      },
      preferences: {
        preferredContactMethod: 'whatsapp',
        availableHours: '7:00 AM - 12:00 AM',
        canReceiveVideoCall: true,
        speaksEnglish: true
      }
    }
  ]);

  // Realistic insurance data
  const [insuranceData, setInsuranceData] = useState<InsuranceData>({
    provider: 'HDFC ERGO General Insurance',
    policyNumber: 'HDFC/2024/VEH/001234567',
    expiryDate: '2025-06-15',
    coverage: '₹10,00,000 (Comprehensive)',
    claimNumber: '1800-266-0101',
    agentName: 'Suresh Patel',
    agentPhone: '+91 98765 43214',
    agentEmail: 'suresh.patel@hdfcergo.com',
    branchAddress: 'HDFC ERGO, Ground Floor, Linking Road, Bandra West, Mumbai - 400050',
    policyType: 'Comprehensive Motor Insurance',
    premiumAmount: '₹18,500 (Annual)',
    lastClaimDate: '2023-08-15',
    claimHistory: [
      {
        claimId: 'CLM2023001',
        date: '2023-08-15',
        amount: '₹25,000',
        status: 'Settled',
        description: 'Minor accident - Front bumper damage'
      },
      {
        claimId: 'CLM2022003',
        date: '2022-11-20',
        amount: '₹8,500',
        status: 'Settled',
        description: 'Windshield replacement due to stone chip'
      }
    ]
  });

  // Realistic QR Analytics data
  const [qrAnalytics, setQrAnalytics] = useState<QRAnalytics>({
    totalScans: 1247,
    emergencyActivations: 8,
    uniqueScanners: 156,
    avgResponseTime: 1.8,
    scansByLocation: [
      { location: 'Bandra West, Mumbai', count: 342, lastScan: '2024-12-15T14:30:00Z' },
      { location: 'Linking Road, Mumbai', count: 189, lastScan: '2024-12-15T11:20:00Z' },
      { location: 'Andheri East, Mumbai', count: 156, lastScan: '2024-12-14T16:45:00Z' },
      { location: 'Powai, Mumbai', count: 134, lastScan: '2024-12-14T09:15:00Z' },
      { location: 'Worli, Mumbai', count: 98, lastScan: '2024-12-13T18:30:00Z' },
      { location: 'Juhu, Mumbai', count: 87, lastScan: '2024-12-13T12:10:00Z' },
      { location: 'Malad West, Mumbai', count: 76, lastScan: '2024-12-12T20:45:00Z' },
      { location: 'Goregaon East, Mumbai', count: 65, lastScan: '2024-12-12T08:30:00Z' },
      { location: 'Thane West', count: 54, lastScan: '2024-12-11T15:20:00Z' },
      { location: 'Navi Mumbai', count: 46, lastScan: '2024-12-11T10:15:00Z' }
    ],
    scansByTime: [
      { hour: 0, count: 12 }, { hour: 1, count: 8 }, { hour: 2, count: 5 }, { hour: 3, count: 3 },
      { hour: 4, count: 7 }, { hour: 5, count: 15 }, { hour: 6, count: 28 }, { hour: 7, count: 45 },
      { hour: 8, count: 67 }, { hour: 9, count: 89 }, { hour: 10, count: 78 }, { hour: 11, count: 92 },
      { hour: 12, count: 85 }, { hour: 13, count: 76 }, { hour: 14, count: 82 }, { hour: 15, count: 94 },
      { hour: 16, count: 88 }, { hour: 17, count: 102 }, { hour: 18, count: 95 }, { hour: 19, count: 87 },
      { hour: 20, count: 65 }, { hour: 21, count: 48 }, { hour: 22, count: 32 }, { hour: 23, count: 18 }
    ],
    emergencyTypes: [
      { type: 'Medical Emergency', count: 3, avgResponseTime: 1.2 },
      { type: 'Accident', count: 2, avgResponseTime: 2.1 },
      { type: 'Vehicle Breakdown', count: 2, avgResponseTime: 1.5 },
      { type: 'Theft/Security', count: 1, avgResponseTime: 0.8 }
    ],
    recentActivity: [
      {
        id: 'act001',
        type: 'emergency',
        scanner: 'Mumbai Police Constable Patil',
        location: 'Linking Road, Bandra West',
        timestamp: '2024-12-15T14:30:00Z',
        action: 'Emergency contact called - Medical assistance requested',
        responseTime: 1.2,
        outcome: 'Ambulance dispatched, family contacted'
      },
      {
        id: 'act002',
        type: 'info',
        scanner: 'Traffic Police Officer Singh',
        location: 'Turner Road Junction',
        timestamp: '2024-12-15T11:20:00Z',
        action: 'Vehicle information accessed for traffic violation',
        responseTime: 0.8,
        outcome: 'Owner contacted, fine issued'
      },
      {
        id: 'act003',
        type: 'medical',
        scanner: 'Paramedic Ravi Kumar',
        location: 'Hill Road, Bandra',
        timestamp: '2024-12-14T16:45:00Z',
        action: 'Medical information accessed during emergency response',
        responseTime: 0.5,
        outcome: 'Medical history shared with hospital'
      },
      {
        id: 'act004',
        type: 'insurance',
        scanner: 'HDFC ERGO Agent Sharma',
        location: 'Andheri East',
        timestamp: '2024-12-14T09:15:00Z',
        action: 'Insurance details retrieved for claim processing',
        responseTime: 1.0,
        outcome: 'Claim initiated successfully'
      },
      {
        id: 'act005',
        type: 'test',
        scanner: 'Vehicle Owner',
        location: 'Home - Bandra West',
        timestamp: '2024-12-13T18:30:00Z',
        action: 'QR code functionality test',
        responseTime: 0.3,
        outcome: 'All systems operational'
      },
      {
        id: 'act006',
        type: 'emergency',
        scanner: 'Good Samaritan - Rajesh',
        location: 'Western Express Highway',
        timestamp: '2024-12-12T20:45:00Z',
        action: 'Vehicle breakdown assistance - Emergency contacts notified',
        responseTime: 2.1,
        outcome: 'Roadside assistance arranged'
      },
      {
        id: 'act007',
        type: 'info',
        scanner: 'Parking Attendant',
        location: 'Phoenix Mall, Kurla',
        timestamp: '2024-12-12T15:20:00Z',
        action: 'Vehicle owner contact for parking violation',
        responseTime: 1.5,
        outcome: 'Vehicle moved, no penalty'
      },
      {
        id: 'act008',
        type: 'medical',
        scanner: 'Dr. Emergency Room',
        location: 'Lilavati Hospital',
        timestamp: '2024-12-11T22:10:00Z',
        action: 'Patient medical history accessed during treatment',
        responseTime: 0.4,
        outcome: 'Treatment plan adjusted based on medical info'
      }
    ],
    monthlyStats: [
      { month: 'Dec 2024', scans: 247, emergencies: 3, avgResponse: 1.8 },
      { month: 'Nov 2024', scans: 198, emergencies: 2, avgResponse: 1.5 },
      { month: 'Oct 2024', scans: 156, emergencies: 1, avgResponse: 2.1 },
      { month: 'Sep 2024', scans: 134, emergencies: 2, avgResponse: 1.9 },
      { month: 'Aug 2024', scans: 189, emergencies: 0, avgResponse: 0 },
      { month: 'Jul 2024', scans: 167, emergencies: 1, avgResponse: 1.3 }
    ]
  });

  // Supported languages with realistic data
  const supportedLanguages = [
    { code: 'hi', name: 'Hindi', native: 'हिंदी', speakers: '600M+' },
    { code: 'en', name: 'English', native: 'English', speakers: '125M+' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', speakers: '83M+' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', speakers: '56M+' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', speakers: '75M+' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', speakers: '81M+' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', speakers: '44M+' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം', speakers: '35M+' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', speakers: '97M+' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', speakers: '33M+' },
    { code: 'ur', name: 'Urdu', native: 'اردو', speakers: '70M+' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', speakers: '38M+' }
  ];

  // Sticker placement options with detailed specifications
  const stickerPlacements = [
    {
      id: 'windshield',
      name: 'Front Windshield',
      description: 'Primary location for emergency responders - highly visible',
      recommended: true,
      visibility: 'Excellent',
      durability: 'Excellent',
      legalCompliance: 'Fully Compliant',
      installationDifficulty: 'Easy',
      weatherResistance: '5 years',
      cost: '₹299'
    },
    {
      id: 'rear-window',
      name: 'Rear Window',
      description: 'Secondary location for rear-end incidents and parking situations',
      recommended: true,
      visibility: 'Very Good',
      durability: 'Excellent',
      legalCompliance: 'Fully Compliant',
      installationDifficulty: 'Easy',
      weatherResistance: '5 years',
      cost: '₹299'
    },
    {
      id: 'side-windows',
      name: 'Side Windows',
      description: 'Additional visibility for side impact scenarios',
      recommended: false,
      visibility: 'Good',
      durability: 'Good',
      legalCompliance: 'Check Local Laws',
      installationDifficulty: 'Medium',
      weatherResistance: '3 years',
      cost: '₹199'
    },
    {
      id: 'fuel-cap',
      name: 'Fuel Cap',
      description: 'Hidden location for theft protection and fuel station emergencies',
      recommended: false,
      visibility: 'Low',
      durability: 'Excellent',
      legalCompliance: 'Fully Compliant',
      installationDifficulty: 'Easy',
      weatherResistance: '5 years',
      cost: '₹199'
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      description: 'Internal location for driver reference and passenger access',
      recommended: false,
      visibility: 'Medium',
      durability: 'Good',
      legalCompliance: 'Fully Compliant',
      installationDifficulty: 'Easy',
      weatherResistance: '3 years',
      cost: '₹149'
    },
    {
      id: 'number-plate',
      name: 'Number Plate Frame',
      description: 'Integrated with number plate for maximum visibility',
      recommended: true,
      visibility: 'Excellent',
      durability: 'Excellent',
      legalCompliance: 'Check RTO Guidelines',
      installationDifficulty: 'Medium',
      weatherResistance: '5 years',
      cost: '₹399'
    }
  ];

  // Sticker orders tracking
  const [stickerOrders, setStickerOrders] = useState<StickerOrder[]>([
    {
      id: 'ORD001',
      quantity: 4,
      size: 'medium',
      placement: ['windshield', 'rear-window', 'fuel-cap', 'dashboard'],
      customization: {
        vehicleNumber: 'MH-01-AB-1234',
        ownerName: 'Mohit Sharma',
        emergencyMessage: 'In case of emergency, scan QR code for instant help',
        languages: ['Hindi', 'English', 'Marathi']
      },
      orderDate: '2024-12-10T10:30:00Z',
      status: 'delivered',
      trackingNumber: 'FPD1234567890',
      estimatedDelivery: '2024-12-13',
      totalAmount: 1196
    },
    {
      id: 'ORD002',
      quantity: 2,
      size: 'large',
      placement: ['windshield', 'rear-window'],
      customization: {
        vehicleNumber: 'MH-02-CD-5678',
        ownerName: 'Priya Sharma',
        emergencyMessage: 'Emergency QR - Scan for immediate assistance',
        languages: ['Hindi', 'English']
      },
      orderDate: '2024-12-14T15:45:00Z',
      status: 'processing',
      estimatedDelivery: '2024-12-18',
      totalAmount: 698
    }
  ]);

  const generateQRCode = async () => {
    setIsGenerating(true);
    
    // Simulate QR code generation with realistic data
    const qrContent = {
      vehicleId: 'MH-01-AB-1234',
      ownerName: 'Mohit Sharma',
      emergencyContacts: emergencyContacts.map(contact => ({
        name: contact.name,
        phone: contact.phone,
        relation: contact.relation,
        type: contact.type,
        medicalInfo: contact.medicalInfo,
        preferences: contact.preferences
      })),
      insurance: insuranceData,
      medicalInfo: emergencyContacts[0]?.medicalInfo,
      location: 'Real-time GPS coordinates will be shared when scanned',
      timestamp: new Date().toISOString(),
      languages: supportedLanguages.map(lang => lang.code),
      emergencyServices: {
        police: '100',
        ambulance: '108',
        fire: '101',
        disaster: '1078',
        women: '1091',
        child: '1098',
        senior: '14567'
      },
      features: {
        dynamicUpdates: true,
        gpsIntegration: true,
        voiceMessages: true,
        videoCall: true,
        blockchainVerified: true,
        nfcBackup: true,
        multiLanguage: true,
        medicalData: true,
        insuranceIntegration: true,
        emergencyServices: true
      },
      qrVersion: '2.1',
      generatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
      securityHash: 'SHA256:' + Math.random().toString(36).substring(2, 15)
    };

    // Simulate API call delay
    setTimeout(() => {
      setQrData(qrContent);
      setQrCodeUrl(`https://api.fixpointdrishti.com/qr/${qrContent.vehicleId}/${qrContent.securityHash.split(':')[1]}`);
      setIsGenerating(false);
      setShowQRGenerator(true);
    }, 2000);
  };

  const addEmergencyContact = (contactData: Partial<EmergencyContact>) => {
    const newContact: EmergencyContact = {
      id: `ec${Date.now()}`,
      type: 'tertiary',
      name: '',
      relation: '',
      phone: '',
      email: '',
      address: '',
      language: 'Hindi',
      isVerified: false,
      lastContacted: new Date().toISOString(),
      medicalInfo: {
        bloodType: '',
        allergies: [],
        medications: [],
        emergencyMedical: '',
        doctorName: '',
        doctorPhone: '',
        hospitalPreference: ''
      },
      preferences: {
        preferredContactMethod: 'call',
        availableHours: '9:00 AM - 9:00 PM',
        canReceiveVideoCall: false,
        speaksEnglish: false
      },
      ...contactData
    };
    
    setEmergencyContacts([...emergencyContacts, newContact]);
    setShowAddContact(false);
  };

  const updateEmergencyContact = (id: string, updates: Partial<EmergencyContact>) => {
    setEmergencyContacts(contacts => 
      contacts.map(contact => 
        contact.id === id ? { ...contact, ...updates } : contact
      )
    );
    setEditingContact(null);
  };

  const deleteEmergencyContact = (id: string) => {
    setEmergencyContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const testEmergencyContact = async (contactId: string) => {
    const contact = emergencyContacts.find(c => c.id === contactId);
    if (!contact) return;

    setTestMode(true);
    
    // Simulate test call/message
    setTimeout(() => {
      alert(`Test ${contact.preferences.preferredContactMethod} sent to ${contact.name} (${contact.phone}). Response time: 0.8 seconds`);
      
      // Update analytics
      const newActivity = {
        id: `test${Date.now()}`,
        type: 'test' as const,
        scanner: 'System Test',
        location: 'Dashboard',
        timestamp: new Date().toISOString(),
        action: `Test ${contact.preferences.preferredContactMethod} to ${contact.name}`,
        responseTime: 0.8,
        outcome: 'Test successful'
      };
      
      setQrAnalytics(prev => ({
        ...prev,
        recentActivity: [newActivity, ...prev.recentActivity.slice(0, 7)]
      }));
      
      setTestMode(false);
    }, 1500);
  };

  const downloadQRCode = () => {
    if (!qrData) return;
    
    // Create a downloadable QR code
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 400;
    canvas.height = 400;
    
    // Simple QR code representation (in real app, use proper QR library)
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 400, 400);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(20, 20, 360, 360);
    
    // Add some QR pattern simulation
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (Math.random() > 0.5) {
          ctx.fillStyle = '#000000';
          ctx.fillRect(20 + i * 18, 20 + j * 18, 16, 16);
        }
      }
    }
    
    // Download
    const link = document.createElement('a');
    link.download = `drishti-qr-${qrData.vehicleId}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const shareQRCode = async () => {
    if (!qrCodeUrl) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Drishti Emergency QR Code',
          text: 'My vehicle emergency QR code for instant assistance',
          url: qrCodeUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(qrCodeUrl);
      alert('QR code URL copied to clipboard!');
    }
  };

  const copyQRUrl = () => {
    if (!qrCodeUrl) return;
    navigator.clipboard.writeText(qrCodeUrl);
    alert('QR code URL copied to clipboard!');
  };

  const printStickers = () => {
    if (!qrData) return;
    
    // Open print dialog with sticker layout
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Drishti QR Safety Stickers</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .sticker { 
              width: 3in; height: 3in; border: 2px solid #000; 
              margin: 10px; display: inline-block; text-align: center;
              padding: 10px; box-sizing: border-box;
            }
            .qr-placeholder { 
              width: 2in; height: 2in; background: #000; 
              margin: 0 auto 10px; 
            }
            .vehicle-info { font-size: 12px; font-weight: bold; }
            .emergency-text { font-size: 10px; margin-top: 5px; }
          </style>
        </head>
        <body>
          <h2>Drishti QR Safety Stickers - ${qrData.vehicleId}</h2>
          <div class="sticker">
            <div class="qr-placeholder"></div>
            <div class="vehicle-info">${qrData.vehicleId}</div>
            <div class="emergency-text">EMERGENCY QR<br/>Scan for instant help</div>
          </div>
          <div class="sticker">
            <div class="qr-placeholder"></div>
            <div class="vehicle-info">${qrData.vehicleId}</div>
            <div class="emergency-text">आपातकाल QR<br/>तत्काल सहायता के लिए स्कैन करें</div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
  };

  const orderStickers = (orderData: Partial<StickerOrder>) => {
    const newOrder: StickerOrder = {
      id: `ORD${Date.now()}`,
      quantity: 1,
      size: 'medium',
      placement: ['windshield'],
      customization: {
        vehicleNumber: qrData?.vehicleId || '',
        ownerName: qrData?.ownerName || '',
        emergencyMessage: 'Emergency QR - Scan for assistance',
        languages: ['Hindi', 'English']
      },
      orderDate: new Date().toISOString(),
      status: 'pending',
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      totalAmount: 299,
      ...orderData
    };
    
    setStickerOrders([newOrder, ...stickerOrders]);
    setShowOrderForm(false);
    alert(`Order placed successfully! Order ID: ${newOrder.id}`);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medical':
        return <Stethoscope className="h-5 w-5 text-blue-500" />;
      case 'insurance':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'test':
        return <CheckCircle className="h-5 w-5 text-purple-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const renderQRGeneratorTab = () => (
    <div className="space-y-6">
      {/* QR Code Generator */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Enhanced Drishti QR Safety Sticker</h3>
          <button 
            onClick={generateQRCode}
            disabled={isGenerating}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isGenerating 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isGenerating ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating...</span>
              </div>
            ) : (
              'Generate QR Code'
            )}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Advanced QR Features</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium text-sm">Multi-Language Support</div>
                  <div className="text-xs text-gray-600">12 Indian languages with native scripts</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium text-sm">Smart Contact Hierarchy</div>
                  <div className="text-xs text-gray-600">Primary, secondary, tertiary with preferences</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Stethoscope className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-medium text-sm">Medical Information</div>
                  <div className="text-xs text-gray-600">Blood type, allergies, medications, doctor details</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-500" />
                <div>
                  <div className="font-medium text-sm">Real-time GPS</div>
                  <div className="text-xs text-gray-600">Live location sharing with emergency services</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Video className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="font-medium text-sm">Video Emergency Call</div>
                  <div className="text-xs text-gray-600">One-touch video calling with family</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium text-sm">Blockchain Security</div>
                  <div className="text-xs text-gray-600">Tamper-proof data with SHA256 encryption</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Wifi className="h-5 w-5 text-indigo-500" />
                <div>
                  <div className="font-medium text-sm">NFC + QR Backup</div>
                  <div className="text-xs text-gray-600">Dual technology for maximum compatibility</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <RefreshCw className="h-5 w-5 text-teal-500" />
                <div>
                  <div className="font-medium text-sm">Dynamic Updates</div>
                  <div className="text-xs text-gray-600">Content updates without reprinting stickers</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">QR Code Preview</h4>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              {qrData ? (
                <div>
                  <div className="relative">
                    <QrCode className="h-32 w-32 mx-auto mb-4 text-gray-800" />
                    <div className="absolute top-0 right-0 bg-green-500 text-white rounded-full p-1">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Dynamic QR Code Generated</p>
                  <p className="text-xs text-gray-500 mb-4">Vehicle: {qrData.vehicleId} | Version: {qrData.qrVersion}</p>
                  <div className="space-y-2">
                    <button 
                      onClick={downloadQRCode}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download QR Code</span>
                    </button>
                    <button 
                      onClick={printStickers}
                      className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-2"
                    >
                      <Printer className="h-4 w-4" />
                      <span>Print Stickers</span>
                    </button>
                    <button 
                      onClick={shareQRCode}
                      className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-2"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share QR Code</span>
                    </button>
                    <button 
                      onClick={copyQRUrl}
                      className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-2"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy URL</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <QrCode className="h-32 w-32 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm text-gray-500">Click "Generate QR Code" to create your safety sticker</p>
                  <p className="text-xs text-gray-400 mt-2">Includes all emergency contacts and medical information</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* QR Configuration */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Language</label>
            <select 
              value={emergencyLanguage}
              onChange={(e) => setEmergencyLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.native}) - {lang.speakers}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sticker Size</label>
            <select 
              value={stickerSize}
              onChange={(e) => setStickerSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="small">Small (2" x 2") - ₹199</option>
              <option value="medium">Medium (3" x 3") - ₹299</option>
              <option value="large">Large (4" x 4") - ₹399</option>
              <option value="extra-large">Extra Large (5" x 5") - ₹499</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Placement</label>
            <select 
              value={selectedSticker}
              onChange={(e) => setSelectedSticker(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {stickerPlacements.map((placement) => (
                <option key={placement.id} value={placement.id}>
                  {placement.name} - {placement.cost}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">QR Code Security Features</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Blockchain Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Real-time Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Language Support Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Multi-Language Support</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {supportedLanguages.map((lang) => (
            <div key={lang.code} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="font-medium text-gray-900">{lang.name}</div>
              <div className="text-sm text-gray-600">{lang.native}</div>
              <div className="text-xs text-gray-500">{lang.speakers} speakers</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEmergencyContactsTab = () => (
    <div className="space-y-6">
      {/* Emergency Contacts Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts Management</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowAddContact(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Add Contact</span>
            </button>
            <button 
              onClick={() => {
                const selected = emergencyContacts.filter(c => selectedContacts.includes(c.id));
                if (selected.length > 0) {
                  Promise.all(selected.map(c => testEmergencyContact(c.id)));
                }
              }}
              disabled={selectedContacts.length === 0 || testMode}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>Test Selected</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {emergencyContacts.map((contact) => (
            <div key={contact.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedContacts([...selectedContacts, contact.id]);
                      } else {
                        setSelectedContacts(selectedContacts.filter(id => id !== contact.id));
                      }
                    }}
                    className="mt-1"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{contact.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        contact.type === 'primary' ? 'bg-red-100 text-red-700' :
                        contact.type === 'secondary' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                      </span>
                      {contact.isVerified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{contact.relation} • {contact.phone}</p>
                    <p className="text-xs text-gray-500">
                      Language: {contact.language} • 
                      Prefers: {contact.preferences.preferredContactMethod} • 
                      Available: {contact.preferences.availableHours}
                    </p>
                    <p className="text-xs text-gray-400">Last contacted: {formatTimestamp(contact.lastContacted)}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => testEmergencyContact(contact.id)}
                    disabled={testMode}
                    className="text-green-600 hover:text-green-700 disabled:text-gray-400"
                    title="Test Contact"
                  >
                    <Phone className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setEditingContact(contact.id)}
                    className="text-blue-600 hover:text-blue-700"
                    title="Edit Contact"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deleteEmergencyContact(contact.id)}
                    className="text-red-600 hover:text-red-700"
                    title="Delete Contact"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center space-x-2">
                    <Stethoscope className="h-4 w-4" />
                    <span>Medical Information</span>
                  </h5>
                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="text-gray-600">Blood Type:</span>
                      <span className="font-medium ml-1">{contact.medicalInfo.bloodType || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Allergies:</span>
                      <span className="font-medium ml-1">
                        {contact.medicalInfo.allergies.length > 0 ? contact.medicalInfo.allergies.join(', ') : 'None'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Medications:</span>
                      <span className="font-medium ml-1">
                        {contact.medicalInfo.medications.length > 0 ? contact.medicalInfo.medications.join(', ') : 'None'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium ml-1">
                        {contact.medicalInfo.doctorName || 'Not specified'}
                        {contact.medicalInfo.doctorPhone && ` (${contact.medicalInfo.doctorPhone})`}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Hospital Preference:</span>
                      <span className="font-medium ml-1">{contact.medicalInfo.hospitalPreference || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Contact Preferences</span>
                  </h5>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3" />
                      <span>Primary: {contact.preferences.preferredContactMethod}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>Available: {contact.preferences.availableHours}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Video className="h-3 w-3" />
                      <span>Video calls: {contact.preferences.canReceiveVideoCall ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-3 w-3" />
                      <span>English: {contact.preferences.speaksEnglish ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3" />
                      <span>{contact.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {contact.medicalInfo.emergencyMedical && (
                <div className="mt-3 p-3 bg-red-50 rounded-lg">
                  <h5 className="text-sm font-medium text-red-900 mb-1 flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Critical Medical Information</span>
                  </h5>
                  <p className="text-sm text-red-800">{contact.medicalInfo.emergencyMedical}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Insurance Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Insurance Information</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edit Insurance Details</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <span>Policy Details</span>
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Provider:</span>
                <span className="font-medium">{insuranceData.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Policy Number:</span>
                <span className="font-medium">{insuranceData.policyNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Policy Type:</span>
                <span className="font-medium">{insuranceData.policyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Coverage:</span>
                <span className="font-medium">{insuranceData.coverage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Premium:</span>
                <span className="font-medium">{insuranceData.premiumAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expiry Date:</span>
                <span className="font-medium">{insuranceData.expiryDate}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
              <Phone className="h-5 w-5 text-green-500" />
              <span>Contact Information</span>
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Claim Helpline:</span>
                <span className="font-medium">{insuranceData.claimNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Agent Name:</span>
                <span className="font-medium">{insuranceData.agentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Agent Phone:</span>
                <span className="font-medium">{insuranceData.agentPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Agent Email:</span>
                <span className="font-medium">{insuranceData.agentEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Branch:</span>
                <span className="font-medium text-xs">{insuranceData.branchAddress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Claim History */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <FileText className="h-5 w-5 text-purple-500" />
            <span>Recent Claim History</span>
          </h4>
          <div className="space-y-2">
            {insuranceData.claimHistory.map((claim, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{claim.claimId}</div>
                  <div className="text-xs text-gray-600">{claim.description}</div>
                  <div className="text-xs text-gray-500">{claim.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm">{claim.amount}</div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    claim.status === 'Settled' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {claim.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStickerManagementTab = () => (
    <div className="space-y-6">
      {/* Sticker Placement Options */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Sticker Placement & Management</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Sticker Placement Options</h4>
            <div className="space-y-3">
              {stickerPlacements.map((placement) => (
                <div key={placement.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="font-medium text-gray-900">{placement.name}</div>
                      {placement.recommended && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          Recommended
                        </span>
                      )}
                      <span className="text-sm font-medium text-blue-600">{placement.cost}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedSticker(placement.id)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        selectedSticker === placement.id 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedSticker === placement.id ? 'Selected' : 'Select'}
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">{placement.description}</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Visibility:</span>
                      <span className="font-medium ml-1">{placement.visibility}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Durability:</span>
                      <span className="font-medium ml-1">{placement.durability}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Legal:</span>
                      <span className="font-medium ml-1">{placement.legalCompliance}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Installation:</span>
                      <span className="font-medium ml-1">{placement.installationDifficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Sticker Specifications</h4>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-medium text-sm text-gray-900 mb-2 flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Material & Durability</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Weather-resistant vinyl with UV protection</li>
                  <li>• 5-year outdoor durability guarantee</li>
                  <li>• Waterproof and fade-resistant</li>
                  <li>• Temperature range: -40°C to +80°C</li>
                </ul>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-sm text-gray-900 mb-2 flex items-center space-x-2">
                  <Smartphone className="h-4 w-4" />
                  <span>Technology Features</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• QR Code + NFC backup technology</li>
                  <li>• Smartphone compatibility (iOS/Android)</li>
                  <li>• Dynamic content updates</li>
                  <li>• Blockchain verification</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-sm text-gray-900 mb-2 flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>Size & Customization</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Multiple sizes: 2"×2" to 5"×5"</li>
                  <li>• Vehicle-specific QR codes</li>
                  <li>• Multi-language emergency text</li>
                  <li>• Custom branding for fleets</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="font-medium text-sm text-gray-900 mb-2 flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span>Installation & Support</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Professional installation available</li>
                  <li>• Installation kit included</li>
                  <li>• 24/7 technical support</li>
                  <li>• Replacement warranty</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-4">
          <button 
            onClick={() => setShowOrderForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Package className="h-4 w-4" />
            <span>Order Stickers</span>
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Bulk Order (Fleet)</span>
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Request Sample</span>
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>Installation Service</span>
          </button>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order History</h3>
        
        <div className="space-y-4">
          {stickerOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">Order #{order.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {order.quantity} stickers • {order.size} size • {order.customization.vehicleNumber}
                  </p>
                  <p className="text-xs text-gray-500">
                    Ordered: {formatTimestamp(order.orderDate)} • 
                    Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">₹{order.totalAmount}</div>
                  {order.trackingNumber && (
                    <div className="text-sm text-blue-600">Track: {order.trackingNumber}</div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Placement:</span>
                  <div className="font-medium">{order.placement.join(', ')}</div>
                </div>
                <div>
                  <span className="text-gray-600">Languages:</span>
                  <div className="font-medium">{order.customization.languages.join(', ')}</div>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Emergency Message:</span>
                  <div className="font-medium">{order.customization.emergencyMessage}</div>
                </div>
              </div>
              
              <div className="mt-3 flex space-x-2">
                {order.status === 'delivered' && (
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Reorder
                  </button>
                )}
                {order.trackingNumber && (
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Track Package
                  </button>
                )}
                <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                  Download Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fleet Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Management (Commercial)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Car className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">125</div>
            <div className="text-sm text-gray-600">Active QR Stickers</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">118</div>
            <div className="text-sm text-gray-600">Verified Stickers</div>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">7</div>
            <div className="text-sm text-gray-600">Pending Updates</div>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-sm text-gray-600">Needs Replacement</div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Fleet Management Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Centralized QR management for 1000+ vehicles</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Bulk update emergency contacts and medical info</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Real-time tracking of QR scan frequency</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Automated alerts for expired stickers</span>
              </li>
            </ul>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Integration with fleet management systems</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Custom branding for corporate fleets</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Advanced analytics and reporting</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>24/7 emergency response coordination</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">QR Analytics Dashboard</h3>
          <div className="flex items-center space-x-2">
            <select 
              value={analyticsFilter}
              onChange={(e) => setAnalyticsFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Scan className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{qrAnalytics.totalScans.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Scans</div>
            <div className="text-xs text-green-600 mt-1">↗ +12% this month</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{qrAnalytics.avgResponseTime}s</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
            <div className="text-xs text-green-600 mt-1">↗ 15% faster</div>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{qrAnalytics.emergencyActivations}</div>
            <div className="text-sm text-gray-600">Emergency Activations</div>
            <div className="text-xs text-red-600 mt-1">↗ +2 this month</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{qrAnalytics.uniqueScanners}</div>
            <div className="text-sm text-gray-600">Unique Scanners</div>
            <div className="text-xs text-purple-600 mt-1">↗ +8 new users</div>
          </div>
        </div>
      </div>

      {/* Scan Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scans by Location */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scans by Location</h3>
          <div className="space-y-3">
            {qrAnalytics.scansByLocation.slice(0, 5).map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{location.location}</div>
                  <div className="text-xs text-gray-500">Last scan: {formatTimestamp(location.lastScan)}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(location.count / qrAnalytics.scansByLocation[0].count) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{location.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Types */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Types</h3>
          <div className="space-y-3">
            {qrAnalytics.emergencyTypes.map((emergency, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{emergency.type}</div>
                  <div className="text-xs text-gray-500">Avg response: {emergency.avgResponseTime}s</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${(emergency.count / Math.max(...qrAnalytics.emergencyTypes.map(e => e.count))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{emergency.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent QR Activity</h3>
        
        <div className="space-y-4">
          {qrAnalytics.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    QR scanned by {activity.scanner}
                  </p>
                  <span className="text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</span>
                </div>
                <p className="text-sm text-gray-600">{activity.action}</p>
                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                  <span>📍 {activity.location}</span>
                  {activity.responseTime && (
                    <span>⏱️ {activity.responseTime}s response</span>
                  )}
                  {activity.outcome && (
                    <span>✅ {activity.outcome}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Scan Types Distribution</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Information Scans</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <span className="text-sm font-medium">68%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Emergency Scans</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                  <span className="text-sm font-medium">18%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Medical Scans</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '9%' }}></div>
                  </div>
                  <span className="text-sm font-medium">9%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Insurance Scans</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">System Performance</h4>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-800">Excellent Response Time</div>
                <div className="text-xs text-green-600">Average emergency response: 1.8 seconds</div>
                <div className="text-xs text-green-600">98% under 3 seconds</div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-800">High System Reliability</div>
                <div className="text-xs text-blue-600">99.9% uptime, 0.1% failed scans</div>
                <div className="text-xs text-blue-600">Zero data breaches</div>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-sm font-medium text-purple-800">Outstanding User Satisfaction</div>
                <div className="text-xs text-purple-600">4.9/5 rating from emergency responders</div>
                <div className="text-xs text-purple-600">96% would recommend</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Month</th>
                <th className="text-right py-2">Total Scans</th>
                <th className="text-right py-2">Emergencies</th>
                <th className="text-right py-2">Avg Response (s)</th>
                <th className="text-right py-2">Growth</th>
              </tr>
            </thead>
            <tbody>
              {qrAnalytics.monthlyStats.map((stat, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 font-medium">{stat.month}</td>
                  <td className="py-2 text-right">{stat.scans}</td>
                  <td className="py-2 text-right">{stat.emergencies}</td>
                  <td className="py-2 text-right">{stat.avgResponse || 'N/A'}</td>
                  <td className="py-2 text-right">
                    {index < qrAnalytics.monthlyStats.length - 1 && (
                      <span className={`text-xs ${
                        stat.scans > qrAnalytics.monthlyStats[index + 1].scans 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {stat.scans > qrAnalytics.monthlyStats[index + 1].scans ? '↗' : '↘'} 
                        {Math.abs(((stat.scans - qrAnalytics.monthlyStats[index + 1].scans) / qrAnalytics.monthlyStats[index + 1].scans * 100)).toFixed(1)}%
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Enhanced Drishti QR Safety Sticker System
          </h1>
          <p className="text-xl text-gray-600">
            Advanced QR emergency response system with multi-language support, blockchain verification, and real-time analytics
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Blockchain Secured</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="h-4 w-4 text-blue-500" />
              <span>12 Languages</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4 text-purple-500" />
              <span>Emergency Verified</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-orange-500" />
              <span>24/7 Active</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('qr-generator')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'qr-generator'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <QrCode className="h-4 w-4" />
                <span>QR Generator</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('emergency-contacts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'emergency-contacts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Emergency Contacts</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('sticker-management')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sticker-management'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Sticker Management</span>
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
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'qr-generator' && renderQRGeneratorTab()}
        {activeTab === 'emergency-contacts' && renderEmergencyContactsTab()}
        {activeTab === 'sticker-management' && renderStickerManagementTab()}
        {activeTab === 'analytics' && renderAnalyticsTab()}

        {/* Test Mode Indicator */}
        {testMode && (
          <div className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Testing emergency contact...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRSafetyPage;