import React, { useState } from 'react';

const PhoneInput = ({ value, onChange, error, required = false }) => {
  const [selectedCountry, setSelectedCountry] = useState('LK'); // Default to Sri Lanka
  const [phoneNumber, setPhoneNumber] = useState('');

  // Popular countries with their codes
  const countries = [
    { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰' },
    { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
    { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
    { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
    { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
    { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
    { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
    { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
    { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
    { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
    { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
    { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
    { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰' },
    { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
    { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
    { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
    { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
    { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
    { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
    { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' }
  ];

  const selectedCountryData = countries.find(c => c.code === selectedCountry) || countries[0];

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    
    const countryData = countries.find(c => c.code === newCountry);
    const fullNumber = phoneNumber ? `${countryData.dialCode} ${phoneNumber}` : '';
    
    if (onChange) {
      onChange({
        target: {
          value: fullNumber,
          name: 'phone'
        }
      });
    }
  };

  const handlePhoneChange = (e) => {
    let inputValue = e.target.value;
    
    // Remove any non-digit characters except spaces and dashes
    inputValue = inputValue.replace(/[^\d\s\-]/g, '');
    
    // Handle country-specific formatting
    if (selectedCountry === 'LK') {
      // For Sri Lankan numbers, remove leading zero if present
      if (inputValue.startsWith('0')) {
        inputValue = inputValue.substring(1);
      }
      // Format Sri Lankan mobile numbers (7X XXXX XXXX)
      if (inputValue.length > 0 && inputValue[0] === '7') {
        inputValue = inputValue.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3');
      }
    } else if (selectedCountry === 'US' || selectedCountry === 'CA') {
      // Format US/Canada numbers (XXX) XXX-XXXX
      inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (selectedCountry === 'GB') {
      // Format UK mobile numbers XXXX XXXXXX
      if (inputValue.length > 0 && inputValue[0] === '7') {
        inputValue = inputValue.replace(/(\d{4})(\d{6})/, '$1 $2');
      }
    }
    
    setPhoneNumber(inputValue);
    
    // Create the full international number
    const cleanInput = inputValue.replace(/[\s\-\(\)]/g, '');
    const fullNumber = cleanInput ? `${selectedCountryData.dialCode} ${cleanInput}` : '';
    
    if (onChange) {
      onChange({
        target: {
          value: fullNumber,
          name: 'phone'
        }
      });
    }
  };

  // Initialize with existing value if provided
  React.useEffect(() => {
    if (value && !phoneNumber) {
      // Parse existing value
      const countryMatch = countries.find(c => value.startsWith(c.dialCode));
      if (countryMatch) {
        setSelectedCountry(countryMatch.code);
        setPhoneNumber(value.replace(countryMatch.dialCode, '').trim());
      }
    }
  }, [value, phoneNumber]);

  const getPlaceholder = () => {
    switch (selectedCountry) {
      case 'LK':
        return '78 5522 049';
      case 'US':
      case 'CA':
        return '(555) 123-4567';
      case 'GB':
        return '7911 123456';
      case 'IN':
        return '98765 43210';
      case 'AU':
        return '412 345 678';
      case 'DE':
        return '1512 3456789';
      case 'FR':
        return '6 12 34 56 78';
      case 'SG':
        return '9123 4567';
      case 'HK':
        return '9123 4567';
      case 'JP':
        return '90 1234 5678';
      default:
        return 'Phone number';
    }
  };

  return (
    <div className="phone-input-container">
      <label className="form-field-label">
        Phone Number
        {required && <span className="required">*</span>}
      </label>
      
      <div className="phone-input-wrapper">
        {/* Country Selector */}
        <div className="country-selector">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="country-select"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.dialCode}
              </option>
            ))}
          </select>
        </div>
        
        {/* Phone Number Input */}
        <div className="phone-number-input">
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder={getPlaceholder()}
            className={`form-field-input ${error ? 'error' : ''}`}
          />
        </div>
      </div>
      
      {/* Preview of full number */}
      <div className="phone-preview">
        {phoneNumber && (
          <span className="phone-preview-text">
            Full number: {selectedCountryData.dialCode} {phoneNumber.replace(/[\s\-\(\)]/g, '')}
          </span>
        )}
        {selectedCountry === 'LK' && !phoneNumber && (
          <span className="phone-hint-text">
            💡 Tip: Enter your number without the leading 0 (e.g., 785522049 instead of 0785522049)
          </span>
        )}
      </div>
      
      {error && (
        <p className="form-field-error">{error}</p>
      )}
    </div>
  );
};

export default PhoneInput;
