import React, { useState } from 'react';
import { X, Check, AlertCircle, Phone, Mail, MessageCircle, Calendar, CreditCard, Shield, Clock, MapPin, User, Building, Car } from 'lucide-react';

interface PreBookingModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

const PreBookingModal: React.FC<PreBookingModalProps> = ({ product, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Vehicle Information
    vehicleType: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    registrationNumber: '',
    
    // Business Information (for commercial)
    businessType: 'individual',
    companyName: '',
    gstNumber: '',
    fleetSize: '',
    
    // Preferences
    installationDate: '',
    installationTime: '',
    paymentMethod: 'online',
    specialRequirements: '',
    
    // Agreement
    termsAccepted: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: any = {};
    
    switch (step) {
      case 1: // Personal Information
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Invalid Indian phone number';
        break;
        
      case 2: // Address Information
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
        else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid pincode';
        break;
        
      case 3: // Vehicle Information
        if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
        if (!formData.vehicleBrand.trim()) newErrors.vehicleBrand = 'Vehicle brand is required';
        if (!formData.vehicleModel.trim()) newErrors.vehicleModel = 'Vehicle model is required';
        if (!formData.vehicleYear) newErrors.vehicleYear = 'Vehicle year is required';
        break;
        
      case 4: // Business Information
        if (formData.businessType === 'business') {
          if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
          if (!formData.fleetSize) newErrors.fleetSize = 'Fleet size is required';
        }
        break;
        
      case 5: // Preferences & Agreement
        if (!formData.installationDate) newErrors.installationDate = 'Installation date is required';
        if (!formData.installationTime) newErrors.installationTime = 'Installation time is required';
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Send WhatsApp message
      const message = `🎯 *New Pre-Booking Request*

*Product:* ${product.name}
*Price:* ${product.price}

*Customer Details:*
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}

*Vehicle Details:*
Type: ${formData.vehicleType}
Brand: ${formData.vehicleBrand}
Model: ${formData.vehicleModel}
Year: ${formData.vehicleYear}
Registration: ${formData.registrationNumber || 'Not provided'}

*Installation:*
Date: ${formData.installationDate}
Time: ${formData.installationTime}
Payment: ${formData.paymentMethod}

${formData.businessType === 'business' ? `*Business Details:*
Company: ${formData.companyName}
GST: ${formData.gstNumber || 'Not provided'}
Fleet Size: ${formData.fleetSize}` : ''}

${formData.specialRequirements ? `*Special Requirements:*
${formData.specialRequirements}` : ''}

Please contact the customer to confirm the booking.`;

      const whatsappUrl = `https://wa.me/918871258981?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }, 2000);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <React.Fragment key={step}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step <= currentStep 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}>
            {step < currentStep ? <Check className="h-4 w-4" /> : step}
          </div>
          {step < 5 && (
            <div className={`w-12 h-1 ${
              step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="9876543210"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alternate Phone
          </label>
          <input
            type="tel"
            value={formData.alternatePhone}
            onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Optional"
          />
        </div>
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Installation Address</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Complete Address *
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="House/Flat No., Building Name, Street, Area"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Mumbai"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <select
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Other">Other</option>
            </select>
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode *
            </label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.pincode ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="400001"
            />
            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVehicleInfo = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Type *
          </label>
          <select
            value={formData.vehicleType}
            onChange={(e) => handleInputChange('vehicleType', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.vehicleType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Vehicle Type</option>
            <option value="Car">Car</option>
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
            <option value="Bus">Bus</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Auto Rickshaw">Auto Rickshaw</option>
            <option value="Tempo">Tempo</option>
            <option value="Other">Other</option>
          </select>
          {errors.vehicleType && <p className="text-red-500 text-xs mt-1">{errors.vehicleType}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Brand *
          </label>
          <input
            type="text"
            value={formData.vehicleBrand}
            onChange={(e) => handleInputChange('vehicleBrand', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.vehicleBrand ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Maruti, Hyundai, Tata, etc."
          />
          {errors.vehicleBrand && <p className="text-red-500 text-xs mt-1">{errors.vehicleBrand}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Model *
          </label>
          <input
            type="text"
            value={formData.vehicleModel}
            onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.vehicleModel ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Swift, Creta, Nexon, etc."
          />
          {errors.vehicleModel && <p className="text-red-500 text-xs mt-1">{errors.vehicleModel}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Manufacturing Year *
          </label>
          <select
            value={formData.vehicleYear}
            onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.vehicleYear ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Year</option>
            {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.vehicleYear && <p className="text-red-500 text-xs mt-1">{errors.vehicleYear}</p>}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Registration Number
          </label>
          <input
            type="text"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange('registrationNumber', e.target.value.toUpperCase())}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="MH01AB1234 (Optional)"
          />
        </div>
      </div>
    </div>
  );

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Business Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="individual"
                checked={formData.businessType === 'individual'}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="mr-2"
              />
              Individual
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="business"
                checked={formData.businessType === 'business'}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="mr-2"
              />
              Business/Fleet
            </label>
          </div>
        </div>
        
        {formData.businessType === 'business' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Your Company Name"
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GST Number
                </label>
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) => handleInputChange('gstNumber', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="22AAAAA0000A1Z5 (Optional)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fleet Size *
                </label>
                <select
                  value={formData.fleetSize}
                  onChange={(e) => handleInputChange('fleetSize', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.fleetSize ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Fleet Size</option>
                  <option value="1-5">1-5 vehicles</option>
                  <option value="6-10">6-10 vehicles</option>
                  <option value="11-25">11-25 vehicles</option>
                  <option value="26-50">26-50 vehicles</option>
                  <option value="51-100">51-100 vehicles</option>
                  <option value="100+">100+ vehicles</option>
                </select>
                {errors.fleetSize && <p className="text-red-500 text-xs mt-1">{errors.fleetSize}</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Installation Preferences</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Installation Date *
          </label>
          <input
            type="date"
            value={formData.installationDate}
            onChange={(e) => handleInputChange('installationDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.installationDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.installationDate && <p className="text-red-500 text-xs mt-1">{errors.installationDate}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Time Slot *
          </label>
          <select
            value={formData.installationTime}
            onChange={(e) => handleInputChange('installationTime', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.installationTime ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Time Slot</option>
            <option value="9:00 AM - 12:00 PM">9:00 AM - 12:00 PM</option>
            <option value="12:00 PM - 3:00 PM">12:00 PM - 3:00 PM</option>
            <option value="3:00 PM - 6:00 PM">3:00 PM - 6:00 PM</option>
            <option value="Flexible">Flexible</option>
          </select>
          {errors.installationTime && <p className="text-red-500 text-xs mt-1">{errors.installationTime}</p>}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Method
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="online"
              checked={formData.paymentMethod === 'online'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="mr-2"
            />
            Online Payment (UPI/Card/Net Banking)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="cash"
              checked={formData.paymentMethod === 'cash'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="mr-2"
            />
            Cash on Installation
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Special Requirements
        </label>
        <textarea
          value={formData.specialRequirements}
          onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Any special installation requirements or notes..."
        />
      </div>
      
      <div className="space-y-3">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
            className="mr-2 mt-1"
          />
          <span className="text-sm text-gray-700">
            I accept the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> *
          </span>
        </label>
        {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted}</p>}
        
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.marketingConsent}
            onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
            className="mr-2 mt-1"
          />
          <span className="text-sm text-gray-700">
            I agree to receive marketing communications and product updates
          </span>
        </label>
      </div>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Pre-Booking Confirmed!</h3>
      <p className="text-gray-600 mb-6">
        Thank you for choosing FixPoint Drishti. Your pre-booking request has been submitted successfully.
      </p>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-blue-600" />
            <span>Our team will call you within 2 hours to confirm your booking</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span>Installation will be scheduled as per your preferred date and time</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4 text-blue-600" />
            <span>You'll receive updates via WhatsApp and SMS</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={`https://wa.me/918871258981?text=Hi, I just completed my pre-booking for ${product.name}. My name is ${formData.fullName}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat on WhatsApp
        </a>
        <button
          onClick={onClose}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pre-Book {product.name}</h2>
            <p className="text-gray-600">Complete your booking in 5 simple steps</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Product Summary */}
        <div className="p-6 bg-blue-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{product.price}</div>
              {product.originalPrice && (
                <div className="text-sm text-gray-400 line-through">{product.originalPrice}</div>
              )}
              {product.discount && (
                <div className="text-sm text-green-600 font-medium">{product.discount}</div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted && renderStepIndicator()}
          
          {isSubmitted ? (
            renderSuccessMessage()
          ) : (
            <>
              {currentStep === 1 && renderPersonalInfo()}
              {currentStep === 2 && renderAddressInfo()}
              {currentStep === 3 && renderVehicleInfo()}
              {currentStep === 4 && renderBusinessInfo()}
              {currentStep === 5 && renderPreferences()}
            </>
          )}
        </div>

        {/* Footer */}
        {!isSubmitted && (
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Previous
            </button>
            
            <div className="text-sm text-gray-500">
              Step {currentStep} of 5
            </div>
            
            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Confirm Pre-Booking'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreBookingModal;