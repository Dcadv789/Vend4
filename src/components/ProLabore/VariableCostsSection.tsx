import React from 'react';
import { formatPercentage } from '../../utils/formatters';

interface VariableCostsSectionProps {
  costs: {
    sales: number;
    taxes: number;
    cardFees: number;
    returns: number;
    commission: number;
    others: number;
  };
  onCostChange: (key: string, value: number) => void;
}

export const VariableCostsSection: React.FC<VariableCostsSectionProps> = ({ costs, onCostChange }) => {
  const totalCosts = Object.values(costs).reduce((a, b) => a + b, 0);
  const [focusedInput, setFocusedInput] = React.useState<string | null>(null);

  const handleInputFocus = (key: string) => {
    setFocusedInput(key);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const handleInputChange = (key: string, value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (numericValue === '') {
      onCostChange(key, 0);
      return;
    }

    const decimalValue = Number(numericValue) / 100;
    onCostChange(key, decimalValue);
  };

  const formatInputValue = (key: string, value: number) => {
    if (focusedInput === key) {
      const numStr = (value * 100).toFixed(2);
      return numStr.replace(/[.,]00$/, '');
    }
    return formatPercentage(value);
  };

  return (
    <div className="space-y-2">
      <div className="border border-gray-200 rounded-lg p-2">
        <div className="flex items-center">
          <label className="w-3/5 text-sm font-medium text-gray-700 truncate pr-2 pl-2">
            Custo da Mercadoria
          </label>
          <div className="w-2/5">
            <input
              type="text"
              value={formatInputValue('sales', costs.sales)}
              onChange={(e) => handleInputChange('sales', e.target.value)}
              onFocus={() => handleInputFocus('sales')}
              onBlur={handleInputBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0,00%"
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-2">
        <div className="flex items-center">
          <label className="w-3/5 text-sm font-medium text-gray-700 truncate pr-2 pl-2">
            Impostos
          </label>
          <div className="w-2/5">
            <input
              type="text"
              value={formatInputValue('taxes', costs.taxes)}
              onChange={(e) => handleInputChange('taxes', e.target.value)}
              onFocus={() => handleInputFocus('taxes')}
              onBlur={handleInputBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0,00%"
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-2">
        <div className="flex items-center">
          <label className="w-3/5 text-sm font-medium text-gray-700 truncate pr-2 pl-2">
            Taxas de Cartão
          </label>
          <div className="w-2/5">
            <input
              type="text"
              value={formatInputValue('cardFees', costs.cardFees)}
              onChange={(e) => handleInputChange('cardFees', e.target.value)}
              onFocus={() => handleInputFocus('cardFees')}
              onBlur={handleInputBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0,00%"
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-2">
        <div className="flex items-center">
          <label className="w-3/5 text-sm font-medium text-gray-700 truncate pr-2 pl-2">
            Devoluções
          </label>
          <div className="w-2/5">
            <input
              type="text"
              value={formatInputValue('returns', costs.returns)}
              onChange={(e) => handleInputChange('returns', e.target.value)}
              onFocus={() => handleInputFocus('returns')}
              onBlur={handleInputBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0,00%"
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-2">
        <div className="flex items-center">
          <label className="w-3/5 text-sm font-medium text-gray-700 truncate pr-2 pl-2">
            Comissões
          </label>
          <div className="w-2/5">
            <input
              type="text"
              value={formatInputValue('commission', costs.commission)}
              onChange={(e) => handleInputChange('commission', e.target.value)}
              onFocus={() => handleInputFocus('commission')}
              onBlur={handleInputBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0,00%"
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-2">
        <div className="flex items-center">
          <label className="w-3/5 text-sm font-medium text-gray-700 truncate pr-2 pl-2">
            Outros Custos
          </label>
          <div className="w-2/5">
            <input
              type="text"
              value={formatInputValue('others', costs.others)}
              onChange={(e) => handleInputChange('others', e.target.value)}
              onFocus={() => handleInputFocus('others')}
              onBlur={handleInputBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0,00%"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200">
        <p className="text-lg font-semibold text-gray-900 px-2">
          Total: {formatPercentage(totalCosts)}
        </p>
      </div>
    </div>
  );
};