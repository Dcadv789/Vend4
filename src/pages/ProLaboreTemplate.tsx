import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, ToggleLeft, ToggleRight, FileDown, Building2 } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Notification } from '../components/Notification';

interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency';
  required: boolean;
  enabled: boolean;
  group: 'faturamento' | 'custos_fixos' | 'custos_variaveis';
}

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Helvetica'
  },
  header: {
    backgroundColor: '#1E40AF',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  headerContent: {
    flex: 1
  },
  headerLogo: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginLeft: 20,
    marginBottom: 20
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    marginBottom: 12
  },
  companyInfo: {
    marginBottom: 12
  },
  companyRow: {
    flexDirection: 'row',
    marginBottom: 4
  },
  companyLabel: {
    color: '#93C5FD',
    fontSize: 14,
    width: 80
  },
  companyValue: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1
  },
  dateTimeDivider: {
    borderTopWidth: 1,
    borderTopColor: '#93C5FD',
    marginTop: 8,
    paddingTop: 8
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateTimeLabel: {
    color: '#93C5FD',
    fontSize: 12,
    marginRight: 4
  },
  dateTimeValue: {
    color: '#FFFFFF',
    fontSize: 12
  },
  content: {
    padding: 20
  },
  section: {
    marginBottom: 15,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 4
  },
  sectionTitle: {
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 4
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  label: {
    fontSize: 12,
    color: '#64748B',
    flex: 1
  },
  value: {
    fontSize: 12,
    color: '#1E293B',
    flex: 1,
    textAlign: 'right'
  },
  analysis: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    marginBottom: 15,
    borderRadius: 4
  },
  analysisTitle: {
    fontSize: 16,
    color: '#1E40AF',
    marginBottom: 8
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0'
  }
});

const ProLaborePDF = ({ fields, groupedFields, companyName, cnpj, lastCalculation }: { 
  fields: TemplateField[], 
  groupedFields: Record<string, TemplateField[]>,
  companyName: string,
  cnpj: string,
  lastCalculation: any
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Relatório de Pró-labore</Text>
          <View style={styles.companyInfo}>
            <View style={styles.companyRow}>
              <Text style={styles.companyLabel}>Empresa:</Text>
              <Text style={styles.companyValue}>{companyName || 'Nome da Empresa'}</Text>
            </View>
            <View style={styles.companyRow}>
              <Text style={styles.companyLabel}>CNPJ:</Text>
              <Text style={styles.companyValue}>{cnpj || '00.000.000/0001-00'}</Text>
            </View>
          </View>
          <View style={styles.dateTimeDivider}>
            <View style={styles.dateTimeRow}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.dateTimeLabel}>Data:</Text>
                <Text style={styles.dateTimeValue}>
                  {new Date().toLocaleDateString('pt-BR')}
                </Text>
              </View>
            </View>
            <View style={[styles.dateTimeRow, { marginTop: 4 }]}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.dateTimeLabel}>Horário:</Text>
                <Text style={styles.dateTimeValue}>
                  {new Date().toLocaleTimeString('pt-BR', { 
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.headerLogo} />
      </View>

      <View style={styles.content}>
        <View style={styles.analysis}>
          <Text style={styles.analysisTitle}>Análise e Recomendações</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Pró-labore Recomendado:</Text>
            <Text style={styles.value}>
              {lastCalculation ? 
                (lastCalculation.maximumRecommended * 0.7).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }) : 
                'R$ 0,00'
              }
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pró-labore Máximo:</Text>
            <Text style={styles.value}>
              {lastCalculation ? 
                lastCalculation.maximumRecommended.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }) : 
                'R$ 0,00'
              }
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Faturamento</Text>
          {groupedFields['faturamento']?.filter(f => f.enabled).map((field) => (
            <View key={field.id} style={styles.row}>
              <Text style={styles.label}>{field.label}:</Text>
              <Text style={styles.value}>
                {lastCalculation?.revenue?.[field.id] ?
                  lastCalculation.revenue[field.id].toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }) :
                  field.type === 'currency' ? 'R$ 0,00' :
                  field.type === 'number' ? '0,00%' :
                  field.type === 'date' ? new Date().toLocaleDateString('pt-BR') :
                  'Exemplo'
                }
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custos Fixos</Text>
          {groupedFields['custos_fixos']?.filter(f => f.enabled).map((field) => (
            <View key={field.id} style={styles.row}>
              <Text style={styles.label}>{field.label}:</Text>
              <Text style={styles.value}>
                {lastCalculation?.fixedCosts?.[field.id] ?
                  lastCalculation.fixedCosts[field.id].toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }) :
                  field.type === 'currency' ? 'R$ 0,00' :
                  field.type === 'number' ? '0,00%' :
                  field.type === 'date' ? new Date().toLocaleDateString('pt-BR') :
                  'Exemplo'
                }
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custos Variáveis</Text>
          {groupedFields['custos_variaveis']?.filter(f => f.enabled).map((field) => (
            <View key={field.id} style={styles.row}>
              <Text style={styles.label}>{field.label}:</Text>
              <Text style={styles.value}>
                {lastCalculation?.variableCosts?.[field.id] ?
                  `${lastCalculation.variableCosts[field.id].toFixed(2)}%` :
                  field.type === 'currency' ? 'R$ 0,00' :
                  field.type === 'number' ? '0,00%' :
                  field.type === 'date' ? new Date().toLocaleDateString('pt-BR') :
                  'Exemplo'
                }
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.footer}>
        DC Advisors® - Todos os direitos reservados
      </Text>
    </Page>
  </Document>
);

export default function ProLaboreTemplate() {
  const [fields, setFields] = useState<TemplateField[]>([
    { id: 'services', label: 'Receita com Serviços', type: 'currency', required: true, enabled: true, group: 'faturamento' },
    { id: 'products', label: 'Receita com Produtos', type: 'currency', required: true, enabled: true, group: 'faturamento' },
    { id: 'others', label: 'Outras Receitas', type: 'currency', required: true, enabled: true, group: 'faturamento' },
    { id: 'monthly', label: 'Custos Mensais', type: 'currency', required: true, enabled: true, group: 'custos_fixos' },
    { id: 'proLabore', label: 'Pró-labore Atual', type: 'currency', required: true, enabled: true, group: 'custos_fixos' },
    { id: 'sales', label: 'Custo da Mercadoria (%)', type: 'number', required: true, enabled: true, group: 'custos_variaveis' },
    { id: 'taxes', label: 'Impostos (%)', type: 'number', required: true, enabled: true, group: 'custos_variaveis' },
    { id: 'cardFees', label: 'Taxas de Cartão (%)', type: 'number', required: true, enabled: true, group: 'custos_variaveis' },
    { id: 'returns', label: 'Devoluções (%)', type: 'number', required: true, enabled: true, group: 'custos_variaveis' },
    { id: 'commission', label: 'Comissões (%)', type: 'number', required: true, enabled: true, group: 'custos_variaveis' },
    { id: 'others', label: 'Outros Custos (%)', type: 'number', required: true, enabled: true, group: 'custos_variaveis' }
  ]);
  const [showNotification, setShowNotification] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [lastCalculation, setLastCalculation] = useState<any>(null);

  useEffect(() => {
    const savedCompanyName = localStorage.getItem('companyName');
    const savedCnpj = localStorage.getItem('cnpj');
    const savedCalculation = localStorage.getItem('lastProLaboreCalculation');
    
    if (savedCompanyName) setCompanyName(savedCompanyName);
    if (savedCnpj) setCnpj(savedCnpj);
    if (savedCalculation) setLastCalculation(JSON.parse(savedCalculation));
  }, []);

  const handleToggleField = (id: string) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, enabled: !field.enabled } : field
    ));
  };

  const handleSaveTemplate = () => {
    setShowNotification(true);
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'currency':
        return '💰';
      case 'number':
        return '📊';
      case 'date':
        return '📅';
      default:
        return '📝';
    }
  };

  const groupedFields = fields.reduce((acc, field) => {
    if (!acc[field.group]) {
      acc[field.group] = [];
    }
    acc[field.group].push(field);
    return acc;
  }, {} as Record<string, TemplateField[]>);

  const getGroupTitle = (group: string) => {
    switch (group) {
      case 'faturamento':
        return 'Faturamento';
      case 'custos_fixos':
        return 'Custos Fixos';
      case 'custos_variaveis':
        return 'Custos Variáveis';
      default:
        return group;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {showNotification && (
        <Notification
          message="Template salvo com sucesso!"
          onClose={() => setShowNotification(false)}
        />
      )}

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Template de Pró-labore
        </h1>
        <p className="text-blue-100">
          Configure os campos que serão exibidos no relatório de pró-labore
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="p-6 space-y-8">
            {Object.entries(groupedFields).map(([group, groupFields]) => (
              <div key={group} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {getGroupTitle(group)}
                </h3>
                <div className="space-y-3">
                  {groupFields.map((field) => (
                    <div key={field.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{getFieldIcon(field.type)}</span>
                        <div>
                          <p className="font-medium text-gray-900">{field.label}</p>
                          <p className="text-sm text-gray-500">
                            {field.type === 'currency' ? 'Valor monetário' : 
                             field.type === 'number' ? 'Valor numérico' : 
                             field.type === 'date' ? 'Data' : 'Texto'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleField(field.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          field.enabled ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-500'
                        }`}
                      >
                        {field.enabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-4">
              <button
                onClick={handleSaveTemplate}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save size={20} className="mr-2" />
                Salvar Template
              </button>

              <PDFDownloadLink
                document={
                  <ProLaborePDF 
                    fields={fields} 
                    groupedFields={groupedFields} 
                    companyName={companyName} 
                    cnpj={cnpj}
                    lastCalculation={lastCalculation}
                  />
                }
                fileName="relatorio-pro-labore.pdf"
                className="flex-1 inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {({ loading }) => (
                  <>
                    <FileDown size={20} className="mr-2" />
                    {loading ? 'Gerando PDF...' : 'Exportar PDF'}
                  </>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pré-visualização</h3>
            <div className="relative bg-white" style={{ height: '842px', width: '595px', transform: 'scale(0.7)', transformOrigin: 'top left' }}>
              <div className="bg-blue-600 p-5 flex justify-between items-start">
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-white mb-4">Relatório de Pró-labore</h1>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-200">Empresa:</span>
                      <span className="font-medium text-white">{companyName || 'Nome da Empresa'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-200">CNPJ:</span>
                      <span className="font-medium text-white">{cnpj || '00.000.000/0001-00'}</span>
                    </div>
                    <div className="pt-4 mt-4 border-t border-blue-400">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-200">Data:</span>
                          <span className="text-white">{new Date().toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-200">Horário:</span>
                          <span className="text-white">
                            {new Date().toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                              hour12: false
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-blue-600" />
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h2 className="text-lg font-bold text-blue-800 mb-2">Análise e Recomendações</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pró-labore Recomendado:</span>
                      <span className="font-bold text-blue-600">
                        {lastCalculation ? 
                          (lastCalculation.maximumRecommended * 0.7).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }) : 
                          'R$ 0,00'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pró-labore Máximo:</span>
                      <span className="font-bold text-blue-600">
                        {lastCalculation ? 
                          lastCalculation.maximumRecommended.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }) : 
                          'R$ 0,00'
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(groupedFields).map(([group, groupFields]) => (
                    <div key={group} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-semibold text-blue-800 border-b border-blue-100 pb-2 mb-3">
                        {getGroupTitle(group)}
                      </h3>
                      <div className="space-y-2">
                        {groupFields.filter(f => f.enabled).map((field) => (
                          <div key={field.id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">{field.label}:</span>
                            <span className="font-medium">
                              {lastCalculation?.[group === 'faturamento' ? 'revenue' : 
                                              group === 'custos_fixos' ? 'fixedCosts' : 
                                              'variableCosts']?.[field.id] ?
                                (group === 'custos_variaveis' ? 
                                  `${lastCalculation.variableCosts[field.id].toFixed(2)}%` :
                                  lastCalculation[group === 'faturamento' ? 'revenue' : 'fixedCosts'][field.id]
                                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                ) :
                                field.type === 'currency' ? 'R$ 0,00' :
                                field.type === 'number' ? '0,00%' :
                                field.type === 'date' ? new Date().toLocaleDateString('pt-BR') :
                                'Exemplo'
                              }
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-5 left-0 right-0 text-center text-gray-500 text-xs border-t border-gray-200 pt-4 mx-5">
                  DC Advisors® - Todos os direitos reservados
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}