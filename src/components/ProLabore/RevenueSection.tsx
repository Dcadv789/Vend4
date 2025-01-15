import React from 'react';
import { NumberInput } from '../NumberInput';
import { formatCurrency } from '../../utils/formatters';

interface RevenueSectionProps {
  revenue: {
    services: number;
    products: number;
    others: number;
  };
  onRevenueChange: (key: string, value: number) => void;
}

export const RevenueSection: React.FC<RevenueSectionProps> = ({ revenue, onRevenueChange }) => {
  const totalRevenue = Object.values(revenue).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-2">
      <div className="border border-gray-200 rounded-lg p-2">
        <div className="flex items-center">
          <label className="w-3/5 text-sm font-medium text-gray-700 truncate pr-2">
            Receita com Serviços
          </label>
          <div className="w-2/5">
            <NumberInput
              label=""
              prefix="R$"
              format="currency"
              value={revenue.services}
              onChange={(value) => onRevenueChange('services', value)}
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-2">
        <div className="flex items-center">
          <label className="w-3/5 text-sm font-medium text-gray-700 truncate pr-2">
            Receita com Produtos
          </label>
          <div className="w-2/5">
            <NumberInput
              label=""
              prefix="R$"
              format="currency"
              value={revenue.products}
              onChange={(value) => onRevenueChange('products', value)}
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-2">
        <div className="flex items-center">
          <label className="w-3/5 text-sm font-medium text-gray-700 truncate pr-2">
            Outras Receitas
          </label>
          <div className="w-2/5">
            <NumberInput
              label=""
              prefix="R$"
              format="currency"
              value={revenue.others}
              onChange={(value) => onRevenueChange('others', value)}
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200">
        <p className="text-lg font-semibold text-gray-900">
          Total: {formatCurrency(totalRevenue)}
        </p>
      </div>
    </div>
  );
};