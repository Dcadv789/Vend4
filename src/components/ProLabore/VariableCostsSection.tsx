import React from 'react';
import { NumberInput } from '../NumberInput';
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Custos Variáveis
      </h2>
      <NumberInput
        label="Vendas"
        suffix="%"
        format="percentage"
        value={costs.sales}
        onChange={(value) => onCostChange('sales', value)}
      />
      <NumberInput
        label="Impostos"
        suffix="%"
        format="percentage"
        value={costs.taxes}
        onChange={(value) => onCostChange('taxes', value)}
      />
      <NumberInput
        label="Taxas de Cartão"
        suffix="%"
        format="percentage"
        value={costs.cardFees}
        onChange={(value) => onCostChange('cardFees', value)}
      />
      <NumberInput
        label="Devoluções"
        suffix="%"
        format="percentage"
        value={costs.returns}
        onChange={(value) => onCostChange('returns', value)}
      />
      <NumberInput
        label="Comissões"
        suffix="%"
        format="percentage"
        value={costs.commission}
        onChange={(value) => onCostChange('commission', value)}
      />
      <NumberInput
        label="Outros"
        suffix="%"
        format="percentage"
        value={costs.others}
        onChange={(value) => onCostChange('others', value)}
      />
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          Total: {formatPercentage(totalCosts)}
        </p>
      </div>
    </div>
  );
};