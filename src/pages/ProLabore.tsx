import React, { useState } from 'react';
import { RevenueSection } from '../components/ProLabore/RevenueSection';
import { FixedCostsSection } from '../components/ProLabore/FixedCostsSection';
import { VariableCostsSection } from '../components/ProLabore/VariableCostsSection';
import { ResultsSection } from '../components/ProLabore/ResultsSection';

export default function ProLabore() {
  const [revenue, setRevenue] = useState({
    services: 0,
    products: 0,
    others: 0
  });

  const [fixedCosts, setFixedCosts] = useState({
    monthly: 0,
    proLabore: 0
  });

  const [variableCosts, setVariableCosts] = useState({
    sales: 0,
    taxes: 0,
    cardFees: 0,
    returns: 0,
    commission: 0,
    others: 0
  });

  const handleRevenueChange = (key: string, value: number) => {
    setRevenue(prev => ({ ...prev, [key]: value }));
  };

  const handleFixedCostChange = (key: string, value: number) => {
    setFixedCosts(prev => ({ ...prev, [key]: value }));
  };

  const handleVariableCostChange = (key: string, value: number) => {
    setVariableCosts(prev => ({ ...prev, [key]: value }));
  };

  const calculateResults = () => {
    const totalRevenue = Object.values(revenue).reduce((a, b) => a + b, 0);
    const totalVariableCosts = Object.values(variableCosts).reduce((a, b) => a + b, 0) / 100;
    const totalFixedCosts = fixedCosts.monthly;

    const preliminaryCalculation = totalRevenue * (1 - totalVariableCosts) - totalFixedCosts;
    const maximumRecommended = preliminaryCalculation * 0.3;

    return {
      preliminaryCalculation,
      maximumRecommended,
      currentProLabore: fixedCosts.proLabore,
      userName: 'Usuário',
      monthlyFixedCosts: totalFixedCosts
    };
  };

  const results = calculateResults();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cálculo de Pró-labore
        </h1>
        <p className="text-gray-600">
          Calcule o valor ideal do seu pró-labore com base no faturamento e custos da sua empresa
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <RevenueSection
            revenue={revenue}
            onRevenueChange={handleRevenueChange}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <FixedCostsSection
            costs={fixedCosts}
            onCostChange={handleFixedCostChange}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <VariableCostsSection
            costs={variableCosts}
            onCostChange={handleVariableCostChange}
          />
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <ResultsSection {...results} />
      </div>
    </div>
  );
}