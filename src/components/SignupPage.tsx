import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  Upload, 
  ChevronDown, 
  ArrowLeft, 
  ArrowRight,
  Shield,
  Globe,
  Users,
  Car,
  Truck,
  Bike,
  FileText,
  MapPin,
  Calendar,
  Fuel,
  Building,
  CreditCard,
  UserPlus,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface FormData {
  // Account Type
  accountType: 'individual' | 'fleet' | '';
  
  // Basic Info
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  preferredLanguage: string;
  referralCode: string;
  
  // Individual Vehicle Details
  vehicleRegNumber: string;
  vehicleType: string;
  makeModel: string;
  yearOfManufacture: string;
  fuelType: string;
  address: string;
  alternateContact: string;
  
  // Fleet/Business Details
  companyName: string;
  businessType: string;
  gstNumber: string;
  fleetSize: string;
  officialEmail: string;
  contactPersonName: string;
  contactPersonPhone: string;
  companyAddress: string;
  companyLogo: File | null;
  kycDocuments: File | null;
  driverEmails: string;
  
  // Agreements
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeComms: boolean;
}

const SignupPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');

  const [formData, setFormData] = useState<FormData>({
    accountType: '',
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    preferredLanguage: 'english',
    referralCode: '',
    vehicleRegNumber: '',
    vehicleType: '',
    makeModel: '',
    yearOfManufacture: '',
    fuelType: '',
    address: '',
    alternateContact: '',
    companyName: '',
    businessType: '',
    gstNumber: '',
    fleetSize: '',
    officialEmail: '',
    contactPersonName: '',
    contactPersonPhone: '',
    companyAddress: '',
    companyLogo: null,
    kycDocuments: null,
    driverEmails: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeComms: false
  });

  const languages = [
    { code: 'english', name: 'English' },
    { code: 'hindi', name: 'हिंदी (Hindi)' },
    { code: 'bengali', name: 'বাংলা (Bengali)' },
    { code: 'telugu', name: 'తెలుగు (Telugu)' },
    { code: 'marathi', name: 'मराठी (Marathi)' },
    { code: 'tamil', name: 'தமிழ் (Tamil)' },
    { code: 'gujarati', name: 'ગુજરાતી (Gujarati)' },
    { code: 'urdu', name: 'اردو (Urdu)' },
    { code: 'kannada', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'odia', name: 'ଓଡ଼ିଆ (Odia)' },
    { code: 'punjabi', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'malayalam', name: 'മലയാളം (Malayalam)' },
    { code: 'assamese', name: 'অসমীয়া (Assamese)' }
  ];

  const vehicleTypes = [
    'Car', 'Bike', 'Truck', 'Tractor', 'Bus', 'Auto Rickshaw', 'Tempo', 'Other'
  ];

  const fuelTypes = [
    'Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid', 'LPG', 'Other'
  ];

  const businessTypes = [
    'Fleet Operator', 'Logistics', 'Rental', 'Taxi/Cab', 'School Transport', 
    'Corporate Fleet', 'Delivery Services', 'Construction', 'Agriculture', 'Other'
  ];

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Very Weak', color: 'text-red-500' };
      case 2: return { text: 'Weak', color: 'text-orange-500' };
      case 3: return { text: 'Fair', color: 'text-yellow-500' };
      case 4: return { text: 'Good', color: 'text-blue-500' };
      case 5: return { text: 'Strong', color: 'text-green-500' };
      default: return { text: 'Very Weak', color: 'text-red-500' };
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: keyof FormData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Signing up with ${provider}`);
    // Implement social signup logic
  };

  const sendOTP = async () => {
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 2000);
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setCurrentStep(6);
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsLoading(false);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.accountType !== '';
      case 2:
        return formData.fullName && formData.email && formData.mobile && 
               formData.password && formData.confirmPassword && 
               formData.password === formData.confirmPassword &&
               getPasswordStrength(formData.password) >= 3;
      case 3:
        if (formData.accountType === 'individual') {
          return formData.vehicleRegNumber && formData.vehicleType && 
                 formData.makeModel && formData.yearOfManufacture && 
                 formData.fuelType && formData.address;
        } else {
          return formData.companyName && formData.businessType && 
                 formData.fleetSize && formData.officialEmail && 
                 formData.contactPersonName && formData.contactPersonPhone && 
                 formData.companyAddress;
        }
      case 4:
        return formData.agreeTerms && formData.agreePrivacy;
      default:
        return true;
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Step {currentStep} of 6</span>
        <span className="text-sm text-gray-500">{Math.round((currentStep / 6) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 6) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Account Type</h2>
        <p className="text-gray-600">Select the option that best describes your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
            formData.accountType === 'individual' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => handleInputChange('accountType', 'individual')}
        >
          <div className="flex items-center mb-4">
            <User className="h-8 w-8 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Individual Vehicle Owner</h3>
          </div>
          <p className="text-gray-600 mb-4">Perfect for personal vehicle owners who want to make their car, bike, or truck smarter and safer.</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Single vehicle management
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Personal safety features
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Voice control in 12 languages
            </li>
          </ul>
        </div>

        <div 
          className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
            formData.accountType === 'fleet' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => handleInputChange('accountType', 'fleet')}
        >
          <div className="flex items-center mb-4">
            <Building2 className="h-8 w-8 text-purple-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Commercial Fleet/Business</h3>
          </div>
          <p className="text-gray-600 mb-4">Ideal for businesses managing multiple vehicles, from small fleets to large commercial operations.</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Multi-vehicle dashboard
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Driver management
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Fleet analytics & reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Account Information</h2>
        <p className="text-gray-600">Let's get you set up with the essentials</p>
      </div>

      {/* Social Signup Options */}
      <div className="space-y-3">
        <p className="text-center text-gray-600 mb-4">Sign up with your social account</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => handleSocialSignup('google')}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-2" />
            Google
          </button>
          <button
            onClick={() => handleSocialSignup('microsoft')}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-5 h-5 mr-2 bg-blue-600 rounded"></div>
            Microsoft
          </button>
          <button
            onClick={() => handleSocialSignup('facebook')}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-5 h-5 mr-2 bg-blue-700 rounded"></div>
            Facebook
          </button>
          <button
            onClick={() => handleSocialSignup('apple')}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-5 h-5 mr-2 bg-black rounded"></div>
            Apple
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 98765 43210"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Language <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={formData.preferredLanguage}
              onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Create Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Create a strong password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm">
                <span className={getPasswordStrengthText(getPasswordStrength(formData.password)).color}>
                  {getPasswordStrengthText(getPasswordStrength(formData.password)).text}
                </span>
                <span className="text-gray-500">{formData.password.length}/8+ characters</span>
              </div>
              <div className="mt-1 flex space-x-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded ${
                      getPasswordStrength(formData.password) >= level
                        ? level <= 2 ? 'bg-red-500' : level <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {formData.confirmPassword && (
            <div className="mt-1 flex items-center text-sm">
              {formData.password === formData.confirmPassword ? (
                <>
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">Passwords match</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-600">Passwords don't match</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Referral Code (Optional)
        </label>
        <input
          type="text"
          value={formData.referralCode}
          onChange={(e) => handleInputChange('referralCode', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter referral code if you have one"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {formData.accountType === 'individual' ? 'Vehicle Details' : 'Business Information'}
        </h2>
        <p className="text-gray-600">
          {formData.accountType === 'individual' 
            ? 'Tell us about your vehicle for better service' 
            : 'Provide your business details for fleet management'
          }
        </p>
      </div>

      {formData.accountType === 'individual' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Registration Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Car className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.vehicleRegNumber}
                onChange={(e) => handleInputChange('vehicleRegNumber', e.target.value.toUpperCase())}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="MH12AB1234"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Car className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={formData.vehicleType}
                onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                required
              >
                <option value="">Select vehicle type</option>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Make & Model <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.makeModel}
              onChange={(e) => handleInputChange('makeModel', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Maruti Suzuki Swift"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year of Manufacture <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={formData.yearOfManufacture}
                onChange={(e) => handleInputChange('yearOfManufacture', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                required
              >
                <option value="">Select year</option>
                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuel Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Fuel className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={formData.fuelType}
                onChange={(e) => handleInputChange('fuelType', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                required
              >
                <option value="">Select fuel type</option>
                {fuelTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alternate Contact (Optional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                value={formData.alternateContact}
                onChange={(e) => handleInputChange('alternateContact', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your complete address for installation/service"
                rows={3}
                required
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                required
              >
                <option value="">Select business type</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GST Number (Optional)
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.gstNumber}
                onChange={(e) => handleInputChange('gstNumber', e.target.value.toUpperCase())}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="22AAAAA0000A1Z5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fleet Size <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Truck className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={formData.fleetSize}
                onChange={(e) => handleInputChange('fleetSize', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                required
              >
                <option value="">Select fleet size</option>
                <option value="1-5">1-5 vehicles</option>
                <option value="6-20">6-20 vehicles</option>
                <option value="21-50">21-50 vehicles</option>
                <option value="51-100">51-100 vehicles</option>
                <option value="100+">100+ vehicles</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Official Email ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={formData.officialEmail}
                onChange={(e) => handleInputChange('officialEmail', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="company@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.contactPersonName}
                onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contact person name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person Phone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                value={formData.contactPersonPhone}
                onChange={(e) => handleInputChange('contactPersonPhone', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+91 98765 43210"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                value={formData.companyAddress}
                onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter complete company address"
                rows={3}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Company Logo (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="company-logo" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Upload company logo
                  </span>
                  <span className="mt-1 block text-sm text-gray-500">
                    PNG, JPG up to 10MB
                  </span>
                </label>
                <input
                  id="company-logo"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('companyLogo', e.target.files?.[0] || null)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              KYC/Business Documents (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="kyc-docs" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Upload documents
                  </span>
                  <span className="mt-1 block text-sm text-gray-500">
                    PDF, DOC up to 10MB
                  </span>
                </label>
                <input
                  id="kyc-docs"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload('kycDocuments', e.target.files?.[0] || null)}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver Emails (Optional)
            </label>
            <div className="relative">
              <UserPlus className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                value={formData.driverEmails}
                onChange={(e) => handleInputChange('driverEmails', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter driver emails separated by commas (e.g., driver1@email.com, driver2@email.com)"
                rows={3}
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              We'll send invitations to these drivers to join your fleet
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Security & Compliance</h2>
        <p className="text-gray-600">Please review and accept our terms to continue</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeTerms}
              onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <div className="ml-3">
              <label htmlFor="terms" className="text-sm font-medium text-gray-900">
                I agree to the Terms & Conditions <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mt-1">
                By checking this box, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
                and acknowledge that you have read our service agreement.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="privacy"
              checked={formData.agreePrivacy}
              onChange={(e) => handleInputChange('agreePrivacy', e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <div className="ml-3">
              <label htmlFor="privacy" className="text-sm font-medium text-gray-900">
                I agree to the Privacy Policy <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mt-1">
                By checking this box, you acknowledge that you have read and understood our{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>{' '}
                and consent to the collection and use of your data as described.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="communications"
              checked={formData.agreeComms}
              onChange={(e) => handleInputChange('agreeComms', e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div className="ml-3">
              <label htmlFor="communications" className="text-sm font-medium text-gray-900">
                I consent to receive communications (Optional)
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Receive updates about new features, promotions, and important service announcements via email and SMS.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex">
            <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Your data is encrypted and stored securely. We use industry-standard security measures to protect your information.
                You can update your privacy preferences anytime in your account settings.
              </p>
            </div>
          </div>
        </div>

        {/* Captcha Placeholder */}
        <div className="bg-gray-100 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center space-x-3">
            <input
              type="checkbox"
              id="captcha"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="captcha" className="text-sm text-gray-700">
              I'm not a robot
            </label>
            <Shield className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">reCAPTCHA verification</p>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Account</h2>
        <p className="text-gray-600">We've sent verification codes to secure your account</p>
      </div>

      {!otpSent ? (
        <div className="text-center">
          <div className="bg-blue-50 rounded-xl p-8 mb-6">
            <Mail className="mx-auto h-16 w-16 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to verify</h3>
            <p className="text-gray-600 mb-6">
              We'll send verification codes to:
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center">
                <Mail className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-700">{formData.email}</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-700">{formData.mobile}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={sendOTP}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send Verification Codes'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Verification Code
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Check your email: {formData.email}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Verification Code
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={mobileOtp}
                  onChange={(e) => setMobileOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Check your SMS: {formData.mobile}
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={verifyOTP}
              disabled={isLoading || emailOtp.length !== 6 || mobileOtp.length !== 6}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify Account'}
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Didn't receive the codes?{' '}
            <button
              onClick={sendOTP}
              className="text-blue-600 hover:underline"
            >
              Resend codes
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep6 = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to FixPoint Drishti!</h2>
        <p className="text-xl text-gray-600 mb-6">
          Your account has been successfully created
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start Checklist</h3>
        <div className="space-y-3 text-left">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            <span className="text-gray-700">Account created and verified</span>
          </div>
          <div className="flex items-center">
            <div className="h-5 w-5 border-2 border-gray-300 rounded mr-3"></div>
            <span className="text-gray-700">Complete your profile</span>
          </div>
          <div className="flex items-center">
            <div className="h-5 w-5 border-2 border-gray-300 rounded mr-3"></div>
            <span className="text-gray-700">
              {formData.accountType === 'individual' ? 'Add your vehicle details' : 'Set up your fleet'}
            </span>
          </div>
          <div className="flex items-center">
            <div className="h-5 w-5 border-2 border-gray-300 rounded mr-3"></div>
            <span className="text-gray-700">Download the mobile app</span>
          </div>
          <div className="flex items-center">
            <div className="h-5 w-5 border-2 border-gray-300 rounded mr-3"></div>
            <span className="text-gray-700">Book hardware installation</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => window.location.href = '/products'}
          className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
        >
          Browse Products
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
          <div className="text-left">
            <h4 className="text-sm font-medium text-yellow-800">Next Steps</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Check your email for important account information and setup instructions. 
              Our team will contact you within 24 hours to schedule hardware installation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src="/logo-16june.png" 
                  alt="FixPoint Drishti" 
                  className="h-10 w-auto mr-3"
                />
                <div>
                  <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
                  <p className="text-blue-100">Join India's first Voice-AI vehicle platform</p>
                </div>
              </div>
              <div className="text-right text-white">
                <div className="text-sm opacity-90">Already have an account?</div>
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="text-white hover:underline font-medium"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            {renderProgressBar()}
            
            <div className="min-h-[600px]">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
              {currentStep === 6 && renderStep6()}
            </div>

            {/* Navigation Buttons */}
            {currentStep < 6 && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </button>

                {currentStep === 5 ? (
                  otpSent && (
                    <button
                      onClick={verifyOTP}
                      disabled={isLoading || emailOtp.length !== 6 || mobileOtp.length !== 6}
                      className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {isLoading ? 'Verifying...' : 'Complete Signup'}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  )
                ) : (
                  <button
                    onClick={currentStep === 4 ? sendOTP : nextStep}
                    disabled={!isStepValid() || isLoading}
                    className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {currentStep === 4 ? 'Create Account' : 'Next'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Trusted by thousands of vehicle owners across India</p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              10,000+ Users
            </div>
            <div className="flex items-center">
              <Car className="h-4 w-4 mr-1" />
              15,000+ Vehicles
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              100% Secure
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;