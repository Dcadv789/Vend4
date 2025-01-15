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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Custos Fixos
      </h2>
      <NumberInput
        label="Custos Mensais"
        prefix="R$"
        format="currency"
        value={costs.monthly}
        onChange={(value) => onCostChange('monthly', value)}
      />
      <NumberInput
        label="Pró-Labore Atual"
        prefix="R$"
        format="currency"
        value={costs.proLabore}
        onChange={(value) => onCostChange('proLabore', value)}
      />
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          Total: {formatCurrency(totalCosts)}
        </p>
      </div>
    </div>
  );
};