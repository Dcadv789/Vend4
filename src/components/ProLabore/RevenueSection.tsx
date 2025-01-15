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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Faturamento
      </h2>
      <NumberInput
        label="Serviços"
        prefix="R$"
        format="currency"
        value={revenue.services}
        onChange={(value) => onRevenueChange('services', value)}
      />
      <NumberInput
        label="Produtos"
        prefix="R$"
        format="currency"
        value={revenue.products}
        onChange={(value) => onRevenueChange('products', value)}
      />
      <NumberInput
        label="Outros"
        prefix="R$"
        format="currency"
        value={revenue.others}
        onChange={(value) => onRevenueChange('others', value)}
      />
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          Total: {formatCurrency(totalRevenue)}
        </p>
      </div>
    </div>
  );
};