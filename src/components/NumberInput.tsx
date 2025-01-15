import React, { useState, useEffect } from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  format?: 'currency' | 'percentage';
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  prefix,
  suffix,
  format = 'currency'
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      if (format === 'currency') {
        setDisplayValue(formatCurrency(value));
      } else {
        setDisplayValue(formatPercentage(value));
      }
    }
  }, [value, format, isFocused]);

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatPercentage = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setDisplayValue(format === 'currency' ? formatCurrency(value) : formatPercentage(value));
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/[^\d,]/g, '').replace(',', '.');
    
    if (format === 'currency') {
      const numericValue = Number(newValue);
      onChange(numericValue);
      setDisplayValue(formatCurrency(numericValue));
    } else {
      // Para percentagem, não multiplicamos por 100 ao salvar
      const numericValue = Number(newValue);
      onChange(numericValue);
      setDisplayValue(formatPercentage(numericValue));
    }
  };

  return (
    <div className="relative rounded-md shadow-sm">
      {prefix && (
        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{prefix}</span>
        </div>
      )}
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`block w-full rounded-md border-gray-300 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
          prefix ? 'pl-7' : 'pl-3'
        } ${suffix ? 'pr-8' : 'pr-3'}`}
      />
      {suffix && (
        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{suffix}</span>
        </div>
      )}
    </div>
  );
};