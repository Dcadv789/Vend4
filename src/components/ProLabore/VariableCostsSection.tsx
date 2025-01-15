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

  const formatInputPercentage = (value: number) => {
    return `${(value).toFixed(2)}%`;
  };

  const handleInputChange = (key: string, value: string) => {
    const numericValue = value.replace(/[^\d,]/g, '');
    onCostChange(key, Number(numericValue));
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
              value={formatInputPercentage(costs.sales)}
              onChange={(e) => handleInputChange('sales', e.target.value)}
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
              value={formatInputPercentage(costs.taxes)}
              onChange={(e) => handleInputChange('taxes', e.target.value)}
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
              value={formatInputPercentage(costs.cardFees)}
              onChange={(e) => handleInputChange('cardFees', e.target.value)}
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
              value={formatInputPercentage(costs.returns)}
              onChange={(e) => handleInputChange('returns', e.target.value)}
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
              value={formatInputPercentage(costs.commission)}
              onChange={(e) => handleInputChange('commission', e.target.value)}
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
              value={formatInputPercentage(costs.others)}
              onChange={(e) => handleInputChange('others', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0,00%"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200">
        <p className="text-lg font-semibold text-gray-900 px-2">
          Total: {totalCosts.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};