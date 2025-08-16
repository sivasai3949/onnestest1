import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import './ChatBot.css';

import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input/input';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Utility: build emoji flag from ISO code
const getCountryFlag = (countryCode) => {
  try {
    return countryCode
      .toUpperCase()
      .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
  } catch {
    return '🏳️';
  }
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UI states
  const [showProjectOptions, setShowProjectOptions] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  // Phone states
  const [country, setCountry] = useState('IN');
  const [phoneValue, setPhoneValue] = useState('');
  const [nationalNumber, setNationalNumber] = useState('');

  // Refs
  const phoneInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const countryChangeTimeoutRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    product: '',
    mobile: '',
    message: ''
  });

  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm Onnes Cryo Assistant. I'd love to help you get in touch with our team. May I have your Name?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [userInput, setUserInput] = useState('');

  // Country option list (compact display)
  const countryOptions = useMemo(() => {
    const countries = getCountries();
    return countries.map((countryCode) => {
      const code = `+${getCountryCallingCode(countryCode)}`;
      const name = en[countryCode] || countryCode;
      const flag = getCountryFlag(countryCode);
      // Compact label: flag ISO +code (tooltip keeps full name)
      return {
        value: countryCode,
        code,
        name,
        flag,
        displayShort: `${flag} ${countryCode} ${code}`,
        displayTitle: `${flag} ${name} (${countryCode}) ${code}`
      };
    });
  }, []);

  const projectOptions = useMemo(
    () => [
      { value: 'SPACE', label: '🚀 SPACE' },
      { value: 'DEFENCE', label: '🛡️ DEFENCE' },
      { value: 'GROUND', label: '🌍 GROUND' },
      { value: 'OTHERS', label: '⚙️ OTHERS' }
    ],
    []
  );

  const questions = useMemo(
    () => [
      {
        field: 'fullName',
        question: "Hi! I'm Onnes Cryo Assistant. I'd love to help you get in touch with our team. May I have your Name?",
        validation: (value) => /^[a-zA-Z\\s]+$/.test(value.trim()),
        errorMessage: 'Please enter a valid name using only alphabets and spaces.'
      },
      {
        field: 'email',
        question: 'Great! Now, could you please provide your email?',
        validation: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value.trim()),
        errorMessage: 'Please enter a valid email address.'
      },
      {
        field: 'product',
        question: 'Your Query is related to which segment? Please select from the options below:',
        validation: (value) => ['space', 'defence', 'ground', 'others', '1', '2', '3', '4'].includes(value.toLowerCase()),
        errorMessage: 'Please select a valid segment.',
        showOptions: true
      },
      {
        field: 'mobile',
        question: 'Could you please provide your mobile number with country code?',
        validation: () => {
          if (!phoneValue) return false;
          try {
            return isValidPhoneNumber(phoneValue);
          } catch {
            return false;
          }
        },
        errorMessage: 'Please enter a valid phone number.',
        showPhoneInput: true
      },
      {
        field: 'message',
        question: 'Finally, please tell us more about your project or any specific requirements you have:',
        validation: (value) => value.trim().length > 0,
        errorMessage: 'Please enter your message.'
      }
    ],
    [phoneValue]
  );

  const scrollToBottom = useCallback(() => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      if (messagesEndRef.current && !showPhoneInput) {
        messagesEndRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        });
      }
    }, 100);
  }, [showPhoneInput]);

  useEffect(() => {
    if (messages.length > 0) scrollToBottom();
  }, [messages, scrollToBottom]);

  // REMOVED: Auto-focus on open to prevent immediate keyboard popup and "going up" on mobile
  // If you want a delayed focus, uncomment and adjust the timeout:
  // useEffect(() => {
  //   if (isOpen && inputRef.current && !showProjectOptions && !showPhoneInput) {
  //     const id = setTimeout(() => inputRef.current && inputRef.current.focus(), 500);
  //     return () => clearTimeout(id);
  //   }
  // }, [isOpen, showProjectOptions, showPhoneInput]);

  useEffect(() => {
    if (showPhoneInput && phoneInputRef.current) {
      const id = setTimeout(() => phoneInputRef.current && phoneInputRef.current.focus(), 200);
      return () => clearTimeout(id);
    }
  }, [showPhoneInput]);

  useEffect(() => {
    return () => {
      if (countryChangeTimeoutRef.current) clearTimeout(countryChangeTimeoutRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // NEW: Fix for mobile keyboard resizing the viewport - dynamically set container height
  useEffect(() => {
    const fixChatbotHeight = () => {
      const chatContainer = document.querySelector('.chatbot-container');
      if (chatContainer && window.innerWidth <= 480) { // Apply only on mobile-sized screens
        const visibleHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        chatContainer.style.height = `${visibleHeight}px`;
      }
    };

    window.addEventListener('resize', fixChatbotHeight);
    window.addEventListener('orientationchange', fixChatbotHeight);

    // Initial call
    if (isOpen) {
      fixChatbotHeight();
    }

    return () => {
      window.removeEventListener('resize', fixChatbotHeight);
      window.removeEventListener('orientationchange', fixChatbotHeight);
    };
  }, [isOpen]);

  const addBotMessage = useCallback((text, options = {}) => {
    const { showOptions = false, showPhone = false } = options;
    setIsTyping(true);
    const id = setTimeout(() => {
      setMessages((prev) => [...prev, { type: 'bot', text, timestamp: new Date().toLocaleTimeString() }]);
      setIsTyping(false);
      if (showOptions) setShowProjectOptions(true);
      if (showPhone) setShowPhoneInput(true);
    }, 300);
    return () => clearTimeout(id);
  }, []);

  const addUserMessage = useCallback((text) => {
    setMessages((prev) => [...prev, { type: 'user', text, timestamp: new Date().toLocaleTimeString() }]);
  }, []);

  const normalizeProjectType = useCallback((input) => {
    const x = input.toLowerCase();
    if (x === '1' || x === 'space') return 'SPACE';
    if (x === '2' || x === 'defence') return 'DEFENCE';
    if (x === '3' || x === 'ground') return 'GROUND';
    if (x === '4' || x === 'others') return 'OTHERS';
    return input.toUpperCase();
  }, []);

  const handleProjectOptionSelect = useCallback(
    (selectedValue) => {
      setShowProjectOptions(false);
      addUserMessage(selectedValue);
      const updatedForm = { ...formData, product: selectedValue };
      setFormData(updatedForm);
      setTimeout(() => {
        const nextQ = questions[currentStep + 1];
        addBotMessage(nextQ.question, { showPhone: !!nextQ.showPhoneInput });
        setCurrentStep(currentStep + 1);
      }, 200);
    },
    [addUserMessage, formData, questions, currentStep, addBotMessage]
  );

  const handlePhoneCountryChange = useCallback((newCountryCode) => {
    if (countryChangeTimeoutRef.current) clearTimeout(countryChangeTimeoutRef.current);
    countryChangeTimeoutRef.current = setTimeout(() => {
      setCountry(newCountryCode);
      setTimeout(() => phoneInputRef.current && phoneInputRef.current.focus(), 100);
    }, 200);
  }, []);

  const handlePhoneValueChange = useCallback((val) => {
    if (!val) {
      setPhoneValue('');
      setNationalNumber('');
      return;
    }

    // Extract only digits
    const digits = val.replace(/\D/g, '');

    // Default length
    let maxLen = Infinity;

    const parsed = parsePhoneNumberFromString(val);
    if (parsed && parsed.country) {
      try {
        if (parsed.country === 'IN') {
          maxLen = 10; // India fixed
        } else {
          const possibleLengths = parsed.metadata.possibleLengths().national || [];
          if (Array.isArray(possibleLengths) && possibleLengths.length > 0) {
            maxLen = Math.max(...possibleLengths);
          }
        }
      } catch (err) {
        console.warn('Error checking phone length:', err);
      }
    }

    let trimmedVal = val;
    if (parsed?.countryCallingCode) {
      const cc = parsed.countryCallingCode;
      const nationalDigits = digits.replace(new RegExp(`^${cc}`), '');
      const trimmedNational = nationalDigits.slice(0, maxLen);
      trimmedVal = `+${cc}${trimmedNational}`;
      setNationalNumber(trimmedNational);
    } else {
      // Fallback if country unknown
      const withoutPlus = digits;
      const trimmedDigits = withoutPlus.slice(0, maxLen);
      trimmedVal = `+${trimmedDigits}`;
      setNationalNumber(trimmedDigits);
    }

    setPhoneValue(trimmedVal);
  }, []);

  const handlePhoneSubmit = useCallback(() => {
    if (!phoneValue || !isValidPhoneNumber(phoneValue)) {
      addBotMessage('Please enter a valid phone number.');
      return;
    }

    setShowPhoneInput(false);
    const selectedCountry = countryOptions.find((c) => c.value === country);
    const displayText = `${selectedCountry?.flag} ${selectedCountry?.name} ${phoneValue}`;
    addUserMessage(displayText);

    const updatedForm = { ...formData, mobile: phoneValue };
    setFormData(updatedForm);

    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        addBotMessage(questions[currentStep + 1].question);
        setCurrentStep(currentStep + 1);
      }, 200);
    } else {
      setTimeout(() => {
        addBotMessage(
          "⏳ Thank you for providing all the information! I'm now submitting your details to our team..."
        );
        submitToBackend(updatedForm);
      }, 200);
    }
  }, [
    phoneValue,
    country,
    countryOptions,
    addUserMessage,
    formData,
    currentStep,
    questions,
    addBotMessage
  ]);

  const submitToBackend = async (finalData) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/admin-contact', finalData);
      setTimeout(() => {
        addBotMessage(
          '🎉 Perfect! Your message has been submitted successfully. Our team will get back to you shortly. Thank you for your interest in Onnes!'
        );
        setTimeout(() => {
          setIsOpen(false);
          resetChat();
        }, 2000);
      }, 200);
    } catch (e) {
      setTimeout(() => {
        addBotMessage(
          '❌ Sorry, there was an error submitting your message. Please try again later or visit our contact page directly.'
        );
        setTimeout(() => {
          setIsOpen(false);
          resetChat();
        }, 2000);
      }, 200);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!userInput.trim() || isSubmitting) return;

      const q = questions[currentStep];
      const val = userInput.trim();

      addUserMessage(val);
      setUserInput('');

      if (!q.validation(val)) {
        const errorMsg = typeof q.errorMessage === 'function' ? q.errorMessage() : q.errorMessage;
        setTimeout(() => addBotMessage(errorMsg), 150);
        return;
      }

      let processed = val;
      if (q.field === 'product') processed = normalizeProjectType(val);

      const updatedForm = { ...formData, [q.field]: processed };
      setFormData(updatedForm);

      if (currentStep < questions.length - 1) {
        const nextQ = questions[currentStep + 1];
        setTimeout(() => {
          addBotMessage(nextQ.question, {
            showOptions: !!nextQ.showOptions,
            showPhone: !!nextQ.showPhoneInput
          });
          setCurrentStep(currentStep + 1);
        }, 200);
      } else {
        setTimeout(() => {
          addBotMessage(
            "⏳ Thank you for providing all the information! I'm now submitting your details to our team..."
          );
          submitToBackend(updatedForm);
        }, 200);
      }
    },
    [userInput, isSubmitting, questions, currentStep, addUserMessage, addBotMessage, normalizeProjectType, formData]
  );

  const resetChat = useCallback(() => {
    setCurrentStep(0);
    setIsSubmitting(false);
    setShowProjectOptions(false);
    setShowPhoneInput(false);
    setCountry('IN');
    setPhoneValue('');
    setNationalNumber('');
    setFormData({
      fullName: '',
      email: '',
      product: '',
      mobile: '',
      message: ''
    });
    setMessages([
      {
        type: 'bot',
        text: "Hi! I'm Onnes Cryo Assistant. I'd love to help you get in touch with our team. May I have your Name?",
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setUserInput('');
  }, []);

  const toggleChat = useCallback(() => setIsOpen(prev => !prev), []);

  // FIXED: Handle Enter key for phone input
  const handlePhoneKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handlePhoneSubmit();
    }
  }, [handlePhoneSubmit]);

  return (
    <>
      {/* Floating Chat Icon */}
      <div className={`chatbot-icon ${isOpen ? 'active' : ''}`} onClick={toggleChat}>
        <Icon icon={isOpen ? 'material-symbols:close' : 'material-symbols:chat'} />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Icon icon="material-symbols:support-agent" />
              </div>
              <div>
                <h4>Onnes Cryo Assistant</h4>
                <span className="online-status">Online</span>
              </div>
            </div>
            <button className="chatbot-close" onClick={toggleChat}>
              <Icon icon="material-symbols:minimize" />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={`message-${i}-${m.timestamp}`} className={`message ${m.type}`}>
                <div className="message-content">
                  <p style={{ whiteSpace: 'pre-line' }}>{m.text}</p>
                  <span className="message-time">{m.timestamp}</span>
                </div>
              </div>
            ))}

            {/* Project Options */}
            {showProjectOptions && (
              <div className="project-options-container">
                {projectOptions.map((opt) => (
                  <button
                    key={`project-${opt.value}`}
                    className="project-option-btn"
                    onClick={() => handleProjectOptionSelect(opt.value)}
                  >
                    <span className="option-text">{opt.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Phone Input Section - FIXED */}
            {showPhoneInput && (
              <div className="phone-input-container">
                <div className="phone-input-wrapper">
                  <select
                    className="country-select"
                    aria-label="Select country"
                    value={country}
                    onChange={(e) => handlePhoneCountryChange(e.target.value)}
                  >
                    {countryOptions.map((c) => (
                      <option
                        key={c.value}
                        value={c.value}
                        title={c.displayTitle}
                      >
                        {c.displayShort}
                      </option>
                    ))}
                  </select>
                  <PhoneInput
                    key={`phone-input-${country}`}
                    ref={phoneInputRef}
                    className="phone-number-input"
                    country={country}
                    international
                    withCountryCallingCode
                    value={phoneValue}
                    onChange={handlePhoneValueChange}
                    placeholder="Enter phone number"
                    onKeyDown={handlePhoneKeyDown}
                  />
                  <button
                    type="button"
                    className="phone-submit-btn"
                    onClick={handlePhoneSubmit}
                    disabled={!phoneValue || !isValidPhoneNumber(phoneValue)}
                    title="Submit phone number"
                  >
                    <Icon icon="material-symbols:send" />
                  </button>
                </div>
                <div className="phone-counter">
                  {phoneValue
                    ? `Selected: ${getCountryFlag(country)} ${en[country]} ${phoneValue}`
                    : 'Please enter a valid phone number'}
                </div>
              </div>
            )}

            {(isTyping || isSubmitting) && (
              <div className="message bot">
                <div className="message-content typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Main input form */}
          <form className="chatbot-input-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={
                  showProjectOptions
                    ? 'Or type your choice...'
                    : showPhoneInput
                    ? 'Use the phone input above...'
                    : isSubmitting
                    ? 'Processing...'
                    : 'Type your message...'
                }
                disabled={isTyping || isSubmitting || showPhoneInput}
              />
              <button
                type="submit"
                disabled={isTyping || !userInput.trim() || isSubmitting || showPhoneInput}
              >
                <Icon
                  icon={
                    isSubmitting
                      ? 'material-symbols:hourglass-empty'
                      : 'material-symbols:send'
                  }
                />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
