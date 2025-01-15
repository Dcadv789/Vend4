import React from 'react';
import { NumberInput } from '../NumberInput';
import { formatCurrency } from '../../utils/formatters';

interface FixedCostsSectionProps {
  costs: {
    monthly: number;
    proLabore: number;
  };
  onCostChange: (key: string, value: number) => void;
}

export const FixedCostsSection: React.FC<FixedCostsSectionProps> = ({ costs, onCostChange }) => {
  const totalCosts = Object.values(costs).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-2">
      <div className="border border-gray-200 rounded-lg p-2">
        <div className="flex items-center">
          <label className="w-3/5 text-sm font-medium text-gray-700 truncate pr-2">
            Custos Mensais
          </label>
          <div className="w-2/5">
            <NumberInput
              label=""
              prefix="R$"
              format="currency"
              value={costs.monthly}
              onChange={(value) => onCostChange('monthly', value)}
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-2">
        <div className="flex items-center">
          <label className="w-3/5 text-sm font-medium text-gray-700 truncate pr-2">
            Pró-Labore Atual
          </label>
          <div className="w-2/5">
            <NumberInput
              label=""
              prefix="R$"
              format="currency"
              value={costs.proLabore}
              onChange={(value) => onCostChange('proLabore', value)}
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200">
        <p className="text-lg font-semibold text-gray-900">
          Total: {formatCurrency(totalCosts)}
        </p>
      </div>
    </div>
  );
};