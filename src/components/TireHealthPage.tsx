import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Shield, 
  Smartphone, 
  Eye, 
  Thermometer, 
  AlertTriangle, 
  FileText, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Bell, 
  BarChart3, 
  Settings, 
  Car, 
  Battery, 
  Gauge, 
  Wrench, 
  TrendingUp, 
  Navigation, 
  Cloud, 
  Star, 
  Award, 
  Users, 
  Calendar, 
  DollarSign, 
  Activity, 
  Target, 
  Layers,
  ScanLine,
  Scan,
  Search,
  Download,
  Upload,
  RefreshCw,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Save,
  Share2,
  Filter,
  SortAsc,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  X,
  Check,
  Info,
  HelpCircle,
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  Archive,
  BookOpen,
  Database,
  Lock,
  Unlock,
  Key,
  CreditCard,
  Receipt,
  PieChart,
  LineChart,
  BarChart,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Phone,
  Fuel,
  Truck,
  Bus,
  Bike,
  Zap
} from 'lucide-react';

const TireHealthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('vehicle-setup');
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  const [selectedTire, setSelectedTire] = useState('front-left');
  const [warrantyFilter, setWarrantyFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Vehicle types and categories
  const vehicleCategories = {
    'two-wheeler': {
      name: 'Two Wheeler',
      icon: Bike,
      types: [
        { id: 'motorcycle', name: 'Motorcycle', tires: 2, brands: ['Hero', 'Honda', 'Bajaj', 'TVS', 'Royal Enfield', 'KTM'] },
        { id: 'scooter', name: 'Scooter', tires: 2, brands: ['Honda', 'TVS', 'Suzuki', 'Yamaha', 'Hero'] },
        { id: 'electric-bike', name: 'Electric Bike', tires: 2, brands: ['Ather', 'Ola', 'TVS', 'Bajaj', 'Hero'] }
      ]
    },
    'three-wheeler': {
      name: 'Three Wheeler',
      icon: Car,
      types: [
        { id: 'auto-rickshaw', name: 'Auto Rickshaw', tires: 3, brands: ['Bajaj', 'TVS', 'Mahindra', 'Piaggio'] },
        { id: 'tempo', name: 'Tempo', tires: 3, brands: ['Mahindra', 'Tata', 'Force'] },
        { id: 'electric-rickshaw', name: 'Electric Rickshaw', tires: 3, brands: ['Mahindra', 'Kinetic', 'Lohia'] }
      ]
    },
    'four-wheeler': {
      name: 'Four Wheeler',
      icon: Car,
      types: [
        { id: 'hatchback', name: 'Hatchback', tires: 4, brands: ['Maruti', 'Hyundai', 'Tata', 'Honda', 'Toyota'] },
        { id: 'sedan', name: 'Sedan', tires: 4, brands: ['Honda', 'Hyundai', 'Toyota', 'Skoda', 'Volkswagen'] },
        { id: 'suv', name: 'SUV', tires: 4, brands: ['Tata', 'Mahindra', 'Hyundai', 'Kia', 'Toyota'] },
        { id: 'luxury', name: 'Luxury Car', tires: 4, brands: ['BMW', 'Mercedes', 'Audi', 'Jaguar', 'Volvo'] },
        { id: 'electric-car', name: 'Electric Car', tires: 4, brands: ['Tata', 'MG', 'Hyundai', 'Kia', 'BMW'] }
      ]
    },
    'commercial': {
      name: 'Commercial Vehicle',
      icon: Truck,
      types: [
        { id: 'pickup', name: 'Pickup Truck', tires: 4, brands: ['Tata', 'Mahindra', 'Isuzu', 'Force'] },
        { id: 'mini-truck', name: 'Mini Truck', tires: 4, brands: ['Tata', 'Mahindra', 'Ashok Leyland', 'Eicher'] },
        { id: 'truck', name: 'Heavy Truck', tires: 6, brands: ['Tata', 'Ashok Leyland', 'Mahindra', 'Eicher'] },
        { id: 'bus', name: 'Bus', tires: 6, brands: ['Tata', 'Ashok Leyland', 'Mahindra', 'Force'] },
        { id: 'trailer', name: 'Trailer', tires: 8, brands: ['Tata', 'Ashok Leyland', 'Mahindra'] }
      ]
    }
  };

  // Tire specifications by vehicle type
  const tireSpecs = {
    'motorcycle': { sizes: ['90/90-12', '100/90-17', '110/70-17', '120/70-17'], pressure: '28-32 PSI' },
    'scooter': { sizes: ['90/90-10', '90/90-12', '100/90-10', '110/70-12'], pressure: '24-28 PSI' },
    'electric-bike': { sizes: ['90/90-12', '100/90-12', '110/70-12'], pressure: '26-30 PSI' },
    'auto-rickshaw': { sizes: ['4.00-8', '135/145-10', '145/70-12'], pressure: '32-36 PSI' },
    'tempo': { sizes: ['5.00-12', '145R12', '155R12'], pressure: '35-40 PSI' },
    'electric-rickshaw': { sizes: ['4.00-8', '135-10', '145-10'], pressure: '30-35 PSI' },
    'hatchback': { sizes: ['155/80R13', '165/80R14', '175/65R14', '185/60R15'], pressure: '30-35 PSI' },
    'sedan': { sizes: ['175/65R14', '185/65R15', '195/65R15', '205/60R16'], pressure: '32-36 PSI' },
    'suv': { sizes: ['215/65R16', '225/65R17', '235/60R18', '255/55R18'], pressure: '35-40 PSI' },
    'luxury': { sizes: ['225/50R17', '245/45R18', '255/40R19', '275/35R20'], pressure: '36-42 PSI' },
    'electric-car': { sizes: ['185/65R15', '195/55R16', '205/55R16', '215/50R17'], pressure: '35-38 PSI' },
    'pickup': { sizes: ['215/75R15', '225/75R16', '235/75R15', '245/70R16'], pressure: '35-40 PSI' },
    'mini-truck': { sizes: ['6.50R16', '7.00R16', '7.50R16', '185R14C'], pressure: '45-50 PSI' },
    'truck': { sizes: ['9.00R20', '10.00R20', '11.00R20', '12.00R20'], pressure: '90-100 PSI' },
    'bus': { sizes: ['9.00R20', '10.00R20', '11.00R20', '275/70R22.5'], pressure: '90-110 PSI' },
    'trailer': { sizes: ['11.00R20', '12.00R20', '295/80R22.5', '315/80R22.5'], pressure: '100-120 PSI' }
  };

  // Dynamic tire data based on vehicle selection
  const generateTireData = (vehicleType: string, tireCount: number) => {
    const specs = tireSpecs[vehicleType as keyof typeof tireSpecs];
    const tirePositions = tireCount === 2 ? ['front', 'rear'] :
                         tireCount === 3 ? ['front', 'rear-left', 'rear-right'] :
                         tireCount === 4 ? ['front-left', 'front-right', 'rear-left', 'rear-right'] :
                         tireCount === 6 ? ['front-left', 'front-right', 'middle-left', 'middle-right', 'rear-left', 'rear-right'] :
                         ['front-left', 'front-right', 'middle-left-1', 'middle-right-1', 'middle-left-2', 'middle-right-2', 'rear-left', 'rear-right'];

    const data: any = {};
    tirePositions.forEach((position, index) => {
      data[position] = {
        pressure: Math.random() * 5 + (vehicleType.includes('truck') || vehicleType.includes('bus') ? 95 : 30),
        temperature: Math.random() * 15 + 40,
        treadDepth: Math.random() * 3 + 5,
        wearPattern: ['even', 'center-wear', 'edge-wear', 'irregular'][Math.floor(Math.random() * 4)],
        health: Math.floor(Math.random() * 30 + 70),
        manufacturer: ['MRF', 'Apollo', 'JK Tyre', 'Bridgestone', 'Michelin', 'Continental'][Math.floor(Math.random() * 6)],
        model: ['ZLX', 'Alnac 4G', 'UX Royale', 'Turanza T001', 'Energy XM2', 'ComfortContact'][Math.floor(Math.random() * 6)],
        size: specs?.sizes[Math.floor(Math.random() * specs.sizes.length)] || '205/55R16',
        installDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        warrantyExpiry: new Date(Date.now() + Math.random() * 730 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        mileage: Math.floor(Math.random() * 50000 + 5000),
        lastInspection: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
    });
    return data;
  };

  // Warranty claims data
  const warrantyClaims = [
    {
      id: 'WC001',
      vehicleId: selectedVehicle?.registrationNumber || 'MH-01-AB-1234',
      tirePosition: 'front-right',
      manufacturer: 'Apollo',
      claimType: 'Premature Wear',
      status: 'approved',
      submittedDate: '2024-11-10',
      expectedResolution: '2024-12-25',
      claimAmount: '₹4,500',
      description: 'Uneven wear pattern detected within warranty period',
      documents: ['tire_photo.jpg', 'purchase_receipt.pdf', 'inspection_report.pdf'],
      claimOfficer: 'Rajesh Kumar',
      claimOfficerPhone: '+91 98765 43210'
    },
    {
      id: 'WC002',
      vehicleId: selectedVehicle?.registrationNumber || 'MH-01-AB-1234',
      tirePosition: 'rear-right',
      manufacturer: 'Bridgestone',
      claimType: 'Manufacturing Defect',
      status: 'processing',
      submittedDate: '2024-12-01',
      expectedResolution: '2024-12-30',
      claimAmount: '₹6,200',
      description: 'Sidewall bulge detected during routine inspection',
      documents: ['defect_photo.jpg', 'warranty_card.pdf'],
      claimOfficer: 'Priya Sharma',
      claimOfficerPhone: '+91 98765 43211'
    },
    {
      id: 'WC003',
      vehicleId: selectedVehicle?.registrationNumber || 'MH-01-AB-1234',
      tirePosition: 'front-left',
      manufacturer: 'MRF',
      claimType: 'Road Hazard',
      status: 'rejected',
      submittedDate: '2024-10-15',
      expectedResolution: '2024-11-01',
      claimAmount: '₹3,800',
      description: 'Puncture damage - not covered under warranty terms',
      documents: ['damage_photo.jpg'],
      claimOfficer: 'Amit Patel',
      claimOfficerPhone: '+91 98765 43212',
      rejectionReason: 'Road hazard damage not covered under standard warranty'
    }
  ];

  // Service centers data with vehicle-specific services
  const getServiceCenters = (vehicleCategory: string) => {
    const baseServices = ['Tire Installation', 'Balancing', 'Alignment', 'Warranty Claims', 'Puncture Repair'];
    const commercialServices = ['Fleet Services', 'Bulk Discounts', 'On-site Service', '24/7 Emergency'];
    const luxuryServices = ['Premium Installation', 'Nitrogen Filling', 'Run-flat Tires', 'Performance Tuning'];
    
    let services = [...baseServices];
    if (vehicleCategory === 'commercial') services = [...services, ...commercialServices];
    if (vehicleCategory === 'luxury') services = [...services, ...luxuryServices];

    return [
      {
        id: 'SC001',
        name: 'MRF Tyres Zone',
        address: 'Shop No. 15, Linking Road, Bandra West, Mumbai',
        distance: '2.3 km',
        rating: 4.5,
        availability: 'available',
        services: services,
        phone: '+91 98765 43210',
        workingHours: '9:00 AM - 8:00 PM',
        specialization: vehicleCategory === 'commercial' ? ['MRF', 'Apollo', 'JK Tyre', 'Commercial Tires'] : ['MRF', 'Apollo', 'JK Tyre'],
        pricing: vehicleCategory === 'commercial' ? 'Commercial Rates' : 'Standard Rates',
        certifications: ['ISO 9001', 'Authorized Dealer', vehicleCategory === 'commercial' ? 'Fleet Certified' : 'Passenger Vehicle Certified']
      },
      {
        id: 'SC002',
        name: 'Apollo Tyres Service Center',
        address: 'Ground Floor, Turner Road, Bandra West, Mumbai',
        distance: '3.1 km',
        rating: 4.3,
        availability: 'busy',
        services: services,
        phone: '+91 98765 43211',
        workingHours: '8:30 AM - 7:30 PM',
        specialization: vehicleCategory === 'luxury' ? ['Apollo', 'Bridgestone', 'Michelin', 'Continental'] : ['Apollo', 'Bridgestone'],
        pricing: vehicleCategory === 'luxury' ? 'Premium Rates' : 'Standard Rates',
        certifications: ['ISO 9001', 'Authorized Dealer']
      },
      {
        id: 'SC003',
        name: 'Bridgestone Select',
        address: 'Hill Road, Bandra West, Mumbai',
        distance: '4.2 km',
        rating: 4.7,
        availability: 'available',
        services: services,
        phone: '+91 98765 43212',
        workingHours: '9:00 AM - 9:00 PM',
        specialization: ['Bridgestone', 'Michelin', 'Continental', 'Premium Brands'],
        pricing: 'Premium Rates',
        certifications: ['ISO 9001', 'Premium Dealer', 'Luxury Vehicle Certified']
      }
    ];
  };

  const startTireScan = async () => {
    setIsScanning(true);
    
    // Simulate camera access and scanning
    setTimeout(() => {
      const vehicleType = selectedVehicle?.type || 'hatchback';
      const isCommercial = vehicleType.includes('truck') || vehicleType.includes('bus');
      
      const mockResults = {
        treadDepth: Math.random() * 3 + (isCommercial ? 8 : 5), // Commercial vehicles have deeper treads
        wearPattern: ['even', 'center-wear', 'edge-wear', 'irregular'][Math.floor(Math.random() * 4)],
        damage: Math.random() > 0.7 ? ['minor-crack', 'sidewall-damage', 'puncture', 'none'][Math.floor(Math.random() * 4)] : 'none',
        pressure: Math.random() * 10 + (isCommercial ? 90 : 28),
        temperature: Math.random() * 15 + 40,
        healthScore: Math.floor(Math.random() * 30 + 70),
        aiConfidence: Math.floor(Math.random() * 10 + 90),
        recommendations: [
          `Tire pressure is ${Math.random() > 0.5 ? 'optimal' : 'slightly low'}`,
          `Tread depth is ${Math.random() > 0.3 ? 'within safe limits' : 'approaching minimum'}`,
          Math.random() > 0.6 ? 'No immediate replacement needed' : 'Consider replacement within 3 months',
          `Schedule rotation in ${Math.floor(Math.random() * 3000 + 1000)} km`
        ],
        scanId: `SCAN_${Date.now()}`,
        timestamp: new Date().toISOString(),
        location: 'Mumbai, Maharashtra'
      };
      
      setScanResults(mockResults);
      
      // Add to scan history
      const newScan = {
        id: mockResults.scanId,
        vehicleId: selectedVehicle?.registrationNumber || 'Unknown',
        tirePosition: selectedTire,
        timestamp: mockResults.timestamp,
        healthScore: mockResults.healthScore,
        issues: mockResults.damage !== 'none' ? [mockResults.damage] : [],
        recommendations: mockResults.recommendations.length
      };
      
      setScanHistory(prev => [newScan, ...prev.slice(0, 9)]); // Keep last 10 scans
      setIsScanning(false);
    }, 3000);
  };

  const getTirePositions = (vehicleType: string, tireCount: number) => {
    if (tireCount === 2) return [
      { id: 'front', name: 'Front Tire', icon: '🏍️' },
      { id: 'rear', name: 'Rear Tire', icon: '🏍️' }
    ];
    
    if (tireCount === 3) return [
      { id: 'front', name: 'Front Tire', icon: '🛺' },
      { id: 'rear-left', name: 'Rear Left', icon: '🛺' },
      { id: 'rear-right', name: 'Rear Right', icon: '🛺' }
    ];
    
    if (tireCount === 4) return [
      { id: 'front-left', name: 'Front Left', icon: '🚗' },
      { id: 'front-right', name: 'Front Right', icon: '🚗' },
      { id: 'rear-left', name: 'Rear Left', icon: '🚗' },
      { id: 'rear-right', name: 'Rear Right', icon: '🚗' }
    ];
    
    if (tireCount === 6) return [
      { id: 'front-left', name: 'Front Left', icon: '🚛' },
      { id: 'front-right', name: 'Front Right', icon: '🚛' },
      { id: 'middle-left', name: 'Middle Left', icon: '🚛' },
      { id: 'middle-right', name: 'Middle Right', icon: '🚛' },
      { id: 'rear-left', name: 'Rear Left', icon: '🚛' },
      { id: 'rear-right', name: 'Rear Right', icon: '🚛' }
    ];
    
    return [
      { id: 'front-left', name: 'Front Left', icon: '🚚' },
      { id: 'front-right', name: 'Front Right', icon: '🚚' },
      { id: 'middle-left-1', name: 'Mid Left 1', icon: '🚚' },
      { id: 'middle-right-1', name: 'Mid Right 1', icon: '🚚' },
      { id: 'middle-left-2', name: 'Mid Left 2', icon: '🚚' },
      { id: 'middle-right-2', name: 'Mid Right 2', icon: '🚚' },
      { id: 'rear-left', name: 'Rear Left', icon: '🚚' },
      { id: 'rear-right', name: 'Rear Right', icon: '🚚' }
    ];
  };

  const getHealthColor = (health: number) => {
    if (health >= 85) return 'text-green-600 bg-green-100';
    if (health >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderVehicleSetupTab = () => (
    <div className="space-y-6">
      {/* Vehicle Category Selection */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Vehicle Category</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {Object.entries(vehicleCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedVehicle({ ...selectedVehicle, category: key })}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-colors ${
                  selectedVehicle?.category === key 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-gray-600" />
                  <div className="text-xs sm:text-sm font-medium">{category.name}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vehicle Type Selection */}
      {selectedVehicle?.category && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Vehicle Type</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {vehicleCategories[selectedVehicle.category as keyof typeof vehicleCategories].types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedVehicle({ 
                  ...selectedVehicle, 
                  type: type.id, 
                  typeName: type.name,
                  tireCount: type.tires,
                  brands: type.brands
                })}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-colors text-left ${
                  selectedVehicle?.type === type.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm sm:text-base">{type.name}</div>
                <div className="text-xs sm:text-sm text-gray-600">{type.tires} Tires</div>
                <div className="text-xs text-gray-500 mt-1">
                  Brands: {type.brands.slice(0, 3).join(', ')}
                  {type.brands.length > 3 && ` +${type.brands.length - 3} more`}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Vehicle Details Form */}
      {selectedVehicle?.type && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
              <input
                type="text"
                placeholder="MH-01-AB-1234"
                value={selectedVehicle?.registrationNumber || ''}
                onChange={(e) => setSelectedVehicle({ ...selectedVehicle, registrationNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <select
                value={selectedVehicle?.brand || ''}
                onChange={(e) => setSelectedVehicle({ ...selectedVehicle, brand: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Brand</option>
                {selectedVehicle?.brands?.map((brand: string) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <input
                type="text"
                placeholder="Enter model"
                value={selectedVehicle?.model || ''}
                onChange={(e) => setSelectedVehicle({ ...selectedVehicle, model: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                value={selectedVehicle?.year || ''}
                onChange={(e) => setSelectedVehicle({ ...selectedVehicle, year: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Year</option>
                {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
              <select
                value={selectedVehicle?.fuelType || ''}
                onChange={(e) => setSelectedVehicle({ ...selectedVehicle, fuelType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="cng">CNG</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Mileage (km)</label>
              <input
                type="number"
                placeholder="50000"
                value={selectedVehicle?.mileage || ''}
                onChange={(e) => setSelectedVehicle({ ...selectedVehicle, mileage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {selectedVehicle?.registrationNumber && selectedVehicle?.brand && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Vehicle Setup Complete</span>
              </div>
              <div className="text-sm text-green-700">
                {selectedVehicle.typeName} • {selectedVehicle.brand} {selectedVehicle.model} • {selectedVehicle.tireCount} Tires
              </div>
              <button
                onClick={() => setActiveTab('tire-scan')}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Proceed to Tire Scanning
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tire Specifications */}
      {selectedVehicle?.type && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Tire Specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-sm text-gray-900">Tire Sizes</div>
              <div className="text-sm text-gray-600 mt-1">
                {tireSpecs[selectedVehicle.type as keyof typeof tireSpecs]?.sizes.join(', ') || 'Standard sizes'}
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-sm text-gray-900">Recommended Pressure</div>
              <div className="text-sm text-gray-600 mt-1">
                {tireSpecs[selectedVehicle.type as keyof typeof tireSpecs]?.pressure || '30-35 PSI'}
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-sm text-gray-900">Tire Count</div>
              <div className="text-sm text-gray-600 mt-1">
                {selectedVehicle.tireCount} Tires
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTireScanTab = () => {
    if (!selectedVehicle?.registrationNumber) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Vehicle Setup Required</h3>
          <p className="text-gray-600 mb-4">Please complete vehicle setup before scanning tires.</p>
          <button
            onClick={() => setActiveTab('vehicle-setup')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Setup Vehicle
          </button>
        </div>
      );
    }

    const tirePositions = getTirePositions(selectedVehicle.type, selectedVehicle.tireCount);
    const tireData = generateTireData(selectedVehicle.type, selectedVehicle.tireCount);

    return (
      <div className="space-y-6">
        {/* Vehicle Info Header */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedVehicle.brand} {selectedVehicle.model} ({selectedVehicle.registrationNumber})
              </h3>
              <p className="text-sm text-gray-600">
                {selectedVehicle.typeName} • {selectedVehicle.year} • {selectedVehicle.fuelType}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('vehicle-setup')}
              className="mt-2 sm:mt-0 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Change Vehicle
            </button>
          </div>
        </div>

        {/* Tire Selection */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Tire for Scanning</h3>
          <div className={`grid gap-3 ${
            selectedVehicle.tireCount === 2 ? 'grid-cols-2' :
            selectedVehicle.tireCount === 3 ? 'grid-cols-3' :
            selectedVehicle.tireCount === 4 ? 'grid-cols-2 sm:grid-cols-4' :
            selectedVehicle.tireCount === 6 ? 'grid-cols-2 sm:grid-cols-3' :
            'grid-cols-2 sm:grid-cols-4'
          }`}>
            {tirePositions.map((position) => (
              <button
                key={position.id}
                onClick={() => setSelectedTire(position.id)}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-colors ${
                  selectedTire === position.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg sm:text-2xl mb-1">{position.icon}</div>
                  <div className="text-xs sm:text-sm font-medium">{position.name}</div>
                  {tireData[position.id] && (
                    <div className={`text-xs mt-1 px-2 py-1 rounded-full ${getHealthColor(tireData[position.id].health)}`}>
                      {tireData[position.id].health}%
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Camera Scan Interface */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">AI Visual Tire Scan</h3>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <Camera className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">Computer Vision Analysis</span>
            </div>
          </div>
          
          <div className="relative bg-gray-100 rounded-lg aspect-video mb-4 flex items-center justify-center">
            {isScanning ? (
              <div className="text-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 mb-2">Analyzing tire condition...</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <div>✓ Measuring tread depth</div>
                  <div>✓ Detecting wear patterns</div>
                  <div>✓ Checking for damage</div>
                  <div>✓ Analyzing pressure indicators</div>
                </div>
              </div>
            ) : (
              <div className="text-center p-4">
                <ScanLine className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Position tire in camera view</p>
                <p className="text-sm text-gray-500">Ensure good lighting and clear view of tire tread</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={startTireScan}
              disabled={isScanning}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isScanning 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isScanning ? 'Scanning...' : 'Start AI Scan'}
            </button>
            
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Upload Photo
            </button>
            
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Manual Entry
            </button>
          </div>
        </div>

        {/* Scan Results */}
        {scanResults && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Scan Results</h3>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <span className="text-sm text-gray-600">AI Confidence:</span>
                <span className="text-sm font-medium text-green-600">{scanResults.aiConfidence}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <Gauge className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-gray-900">{scanResults.treadDepth.toFixed(1)}mm</div>
                <div className="text-xs sm:text-sm text-gray-600">Tread Depth</div>
              </div>
              
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mx-auto mb-2" />
                <div className="text-sm sm:text-lg font-bold text-gray-900 capitalize">{scanResults.wearPattern.replace('-', ' ')}</div>
                <div className="text-xs sm:text-sm text-gray-600">Wear Pattern</div>
              </div>
              
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <Battery className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-gray-900">{scanResults.pressure.toFixed(1)} PSI</div>
                <div className="text-xs sm:text-sm text-gray-600">Pressure</div>
              </div>
              
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-lg sm:text-2xl font-bold text-gray-900">{scanResults.healthScore}%</div>
                <div className="text-xs sm:text-sm text-gray-600">Health Score</div>
              </div>
            </div>
            
            {scanResults.damage !== 'none' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="font-medium text-red-800">Damage Detected</span>
                </div>
                <p className="text-sm text-red-700 capitalize">{scanResults.damage.replace('-', ' ')}</p>
              </div>
            )}
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">AI Recommendations</h4>
              <ul className="space-y-1">
                {scanResults.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Save Scan Report
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                Share Results
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                Schedule Service
              </button>
            </div>
          </div>
        )}

        {/* Current Tire Status */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Current Status - {selectedTire.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Tire
          </h3>
          
          {tireData[selectedTire] && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Tire Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Manufacturer:</span>
                    <span className="font-medium">{tireData[selectedTire].manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model:</span>
                    <span className="font-medium">{tireData[selectedTire].model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{tireData[selectedTire].size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Install Date:</span>
                    <span className="font-medium">{tireData[selectedTire].installDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Warranty Expiry:</span>
                    <span className="font-medium">{tireData[selectedTire].warrantyExpiry}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Current Readings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pressure:</span>
                    <span className="font-medium">{tireData[selectedTire].pressure.toFixed(1)} PSI</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Temperature:</span>
                    <span className="font-medium">{tireData[selectedTire].temperature.toFixed(1)}°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tread Depth:</span>
                    <span className="font-medium">{tireData[selectedTire].treadDepth.toFixed(1)}mm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Health Score:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(tireData[selectedTire].health)}`}>
                      {tireData[selectedTire].health}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scan History */}
        {scanHistory.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Scans</h3>
            <div className="space-y-3">
              {scanHistory.slice(0, 5).map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{scan.tirePosition.replace('-', ' ')}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(scan.healthScore)}`}>
                        {scan.healthScore}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(scan.timestamp).toLocaleDateString()} • {scan.recommendations} recommendations
                      {scan.issues.length > 0 && ` • ${scan.issues.length} issues found`}
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderWarrantyTab = () => (
    <div className="space-y-6">
      {/* Warranty Overview */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Warranty Management</h3>
          <button 
            onClick={() => {/* Handle new claim */}}
            className="mt-2 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Claim
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-green-600">{selectedVehicle?.tireCount || 4}</div>
            <div className="text-xs sm:text-sm text-gray-600">Active Warranties</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-blue-600">1</div>
            <div className="text-xs sm:text-sm text-gray-600">Processing Claims</div>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">2</div>
            <div className="text-xs sm:text-sm text-gray-600">Expiring Soon</div>
          </div>
        </div>
      </div>

      {/* Claims Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Warranty Claims</h3>
          <select 
            value={warrantyFilter}
            onChange={(e) => setWarrantyFilter(e.target.value)}
            className="mt-2 sm:mt-0 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Claims</option>
            <option value="approved">Approved</option>
            <option value="processing">Processing</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div className="space-y-4">
          {warrantyClaims
            .filter(claim => warrantyFilter === 'all' || claim.status === warrantyFilter)
            .map((claim) => (
            <div key={claim.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                    <span className="font-medium text-gray-900">Claim #{claim.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)} w-fit`}>
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{claim.description}</p>
                  <div className="text-xs text-gray-500">
                    Vehicle: {claim.vehicleId} • Position: {claim.tirePosition.replace('-', ' ')}
                  </div>
                </div>
                <div className="text-right mt-2 sm:mt-0">
                  <div className="text-lg font-bold text-gray-900">{claim.claimAmount}</div>
                  <div className="text-sm text-gray-500">{claim.manufacturer}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm mb-3">
                <div>
                  <span className="text-gray-600">Claim Type:</span>
                  <div className="font-medium">{claim.claimType}</div>
                </div>
                <div>
                  <span className="text-gray-600">Submitted:</span>
                  <div className="font-medium">{claim.submittedDate}</div>
                </div>
                <div>
                  <span className="text-gray-600">Expected Resolution:</span>
                  <div className="font-medium">{claim.expectedResolution}</div>
                </div>
                <div>
                  <span className="text-gray-600">Claim Officer:</span>
                  <div className="font-medium">{claim.claimOfficer}</div>
                </div>
              </div>
              
              {claim.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                  <div className="text-sm font-medium text-red-800 mb-1">Rejection Reason</div>
                  <div className="text-sm text-red-700">{claim.rejectionReason}</div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </button>
                <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                  Download Documents
                </button>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  Contact Officer
                </button>
                {claim.status === 'processing' && (
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    Upload Evidence
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manufacturer Integration */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Manufacturer Integration</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {['MRF', 'Apollo', 'JK Tyre', 'Bridgestone', 'Michelin', 'Continental', 'Goodyear', 'Pirelli'].map((manufacturer) => (
            <div key={manufacturer} className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <Car className="h-6 w-6 text-gray-600" />
              </div>
              <div className="font-medium text-gray-900 text-sm">{manufacturer}</div>
              <div className="text-xs text-green-600">Connected</div>
              <button className="mt-2 text-xs text-blue-600 hover:text-blue-700">
                View Warranties
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderServiceCenterTab = () => {
    const serviceCenters = getServiceCenters(selectedVehicle?.category || 'four-wheeler');
    
    return (
      <div className="space-y-6">
        {/* Service Center Locator */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Authorized Service Centers</h3>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0">
              <select 
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Centers</option>
                <option value="available">Available Now</option>
                <option value="nearby">Nearby (5km)</option>
                <option value="warranty">Warranty Service</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <MapPin className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {serviceCenters.map((center) => (
              <div key={center.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{center.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(center.availability)} w-fit`}>
                        {center.availability.charAt(0).toUpperCase() + center.availability.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{center.address}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{center.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{center.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{center.workingHours}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 lg:mt-0">
                    <button className="w-full lg:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Book Appointment
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Services Offered</h5>
                    <div className="flex flex-wrap gap-1">
                      {center.services.map((service, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Specialization</h5>
                    <div className="flex flex-wrap gap-1">
                      {center.specialization.map((brand, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>Call Now</span>
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center space-x-1">
                    <Navigation className="h-4 w-4" />
                    <span>Get Directions</span>
                  </button>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Check Availability</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
            Tire Health Scanning & Warranty Management
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Advanced AI-powered tire monitoring with comprehensive warranty management
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 sm:mb-8 overflow-x-auto">
          <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 min-w-max">
            <button
              onClick={() => setActiveTab('vehicle-setup')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'vehicle-setup'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Vehicle Setup</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('tire-scan')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'tire-scan'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Camera className="h-4 w-4" />
                <span>Tire Scanning</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('warranty')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'warranty'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Warranty Management</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('service-centers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'service-centers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Service Centers</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'vehicle-setup' && renderVehicleSetupTab()}
        {activeTab === 'tire-scan' && renderTireScanTab()}
        {activeTab === 'warranty' && renderWarrantyTab()}
        {activeTab === 'service-centers' && renderServiceCenterTab()}
      </div>
    </div>
  );
};

export default TireHealthPage;