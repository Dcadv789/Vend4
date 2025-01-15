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
    <div className="space-y-2">
      <div className="border border-gray-200 rounded-lg p-2">
        <div className="flex items-center">
          <label className="w-3/5 text-sm font-medium text-gray-700 truncate pr-2 pl-2">
            Custo da Mercadoria
          </label>
          <div className="w-2/5">
            <NumberInput
              label=""
              suffix="%"
              format="percentage"
              value={costs.sales}
              onChange={(value) => onCostChange('sales', value)}
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
            <NumberInput
              label=""
              suffix="%"
              format="percentage"
              value={costs.taxes}
              onChange={(value) => onCostChange('taxes', value)}
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
            <NumberInput
              label=""
              suffix="%"
              format="percentage"
              value={costs.cardFees}
              onChange={(value) => onCostChange('cardFees', value)}
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
            <NumberInput
              label=""
              suffix="%"
              format="percentage"
              value={costs.returns}
              onChange={(value) => onCostChange('returns', value)}
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
            <NumberInput
              label=""
              suffix="%"
              format="percentage"
              value={costs.commission}
              onChange={(value) => onCostChange('commission', value)}
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
            <NumberInput
              label=""
              suffix="%"
              format="percentage"
              value={costs.others}
              onChange={(value) => onCostChange('others', value)}
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200">
        <p className="text-lg font-semibold text-gray-900 px-2">
          Total: {(totalCosts / 100).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};