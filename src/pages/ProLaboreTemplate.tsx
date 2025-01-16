import React, { useState } from 'react';
import { Save, Plus, Trash2, ToggleLeft, ToggleRight, FileDown } from 'lucide-react';
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
    padding: 12,
    color: '#FFFFFF',
    marginBottom: 8
  },
  headerTitle: {
    fontSize: 18,
    marginBottom: 6
  },
  companyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#60A5FA',
    paddingBottom: 6
  },
  analysis: {
    backgroundColor: '#EFF6FF',
    padding: 8,
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 4
  },
  analysisTitle: {
    fontSize: 12,
    color: '#1E40AF',
    marginBottom: 4
  },
  mainContent: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 12
  },
  column: {
    flex: 1
  },
  section: {
    marginBottom: 8
  },
  sectionTitle: {
    fontSize: 11,
    color: '#1E40AF',
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 2
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    gap: 4
  },
  label: {
    fontSize: 9,
    color: '#4B5563',
    flex: 1
  },
  value: {
    fontSize: 9,
    color: '#111827',
    textAlign: 'right'
  },
  footer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB'
  }
});

const ProLaborePDF = ({ fields, groupedFields }: { fields: TemplateField[], groupedFields: Record<string, TemplateField[]> }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Relatório de Pró-labore</Text>
        <View style={styles.companyInfo}>
          <View>
            <Text style={{ color: '#93C5FD', fontSize: 10, marginBottom: 2 }}>Empresa</Text>
            <Text style={{ fontSize: 10 }}>Nome da Empresa</Text>
          </View>
          <View>
            <Text style={{ color: '#93C5FD', fontSize: 10, marginBottom: 2 }}>CNPJ</Text>
            <Text style={{ fontSize: 10 }}>00.000.000/0001-00</Text>
          </View>
          <View>
            <Text style={{ color: '#93C5FD', fontSize: 10, marginBottom: 2 }}>Data</Text>
            <Text style={{ fontSize: 10 }}>{new Date().toLocaleDateString('pt-BR')}</Text>
          </View>
        </View>
      </View>

      <View style={styles.analysis}>
        <Text style={styles.analysisTitle}>Análise e Recomendações</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Pró-labore Recomendado:</Text>
          <Text style={{ ...styles.value, color: '#2563EB' }}>R$ 0,00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pró-labore Máximo:</Text>
          <Text style={{ ...styles.value, color: '#2563EB' }}>R$ 0,00</Text>
        </View>
        <Text style={{ fontSize: 8, color: '#4B5563', marginTop: 4 }}>
          Com base na análise dos dados fornecidos, recomendamos manter o pró-labore dentro destes valores para garantir a saúde financeira da empresa.
        </Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.column}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Faturamento</Text>
            {groupedFields['faturamento']?.filter(f => f.enabled).map((field) => (
              <View key={field.id} style={styles.row}>
                <Text style={styles.label}>{field.label}:</Text>
                <Text style={styles.value}>
                  {field.type === 'currency' ? 'R$ 0,00' :
                   field.type === 'number' ? '0,00%' :
                   field.type === 'date' ? new Date().toLocaleDateString('pt-BR') :
                   'Exemplo'}
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
                  {field.type === 'currency' ? 'R$ 0,00' :
                   field.type === 'number' ? '0,00%' :
                   field.type === 'date' ? new Date().toLocaleDateString('pt-BR') :
                   'Exemplo'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Custos Variáveis</Text>
            {groupedFields['custos_variaveis']?.filter(f => f.enabled).map((field) => (
              <View key={field.id} style={styles.row}>
                <Text style={styles.label}>{field.label}:</Text>
                <Text style={styles.value}>
                  {field.type === 'currency' ? 'R$ 0,00' :
                   field.type === 'number' ? '0,00%' :
                   field.type === 'date' ? new Date().toLocaleDateString('pt-BR') :
                   'Exemplo'}
                </Text>
              </View>
            ))}
          </View>
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
    { id: '1', label: 'Receita com Serviços', type: 'currency', required: true, enabled: true, group: 'faturamento' },
    { id: '2', label: 'Receita com Produtos', type: 'currency', required: true, enabled: true, group: 'faturamento' },
    { id: '3', label: 'Outras Receitas', type: 'currency', required: true, enabled: true, group: 'faturamento' },
    { id: '4', label: 'Custos Mensais', type: 'currency', required: true, enabled: true, group: 'custos_fixos' },
    { id: '5', label: 'Pró-labore Atual', type: 'currency', required: true, enabled: true, group: 'custos_fixos' },
    { id: '6', label: 'Custo da Mercadoria (%)', type: 'number', required: true, enabled: true, group: 'custos_variaveis' },
    { id: '7', label: 'Impostos (%)', type: 'number', required: true, enabled: true, group: 'custos_variaveis' },
    { id: '8', label: 'Taxas de Cartão (%)', type: 'number', required: true, enabled: true, group: 'custos_variaveis' },
    { id: '9', label: 'Devoluções (%)', type: 'number', required: true, enabled: true, group: 'custos_variaveis' },
    { id: '10', label: 'Comissões (%)', type: 'number', required: true, enabled: true, group: 'custos_variaveis' },
    { id: '11', label: 'Outros Custos (%)', type: 'number', required: true, enabled: true, group: 'custos_variaveis' }
  ]);
  const [showNotification, setShowNotification] = useState(false);

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
                document={<ProLaborePDF fields={fields} groupedFields={groupedFields} />}
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
            <div className="relative bg-white border border-gray-200 rounded-lg shadow-sm" style={{ height: '842px', width: '595px', transform: 'scale(0.7)', transformOrigin: 'top left' }}>
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3">
                <h1 className="text-xl font-bold text-white mb-2">Relatório de Pró-labore</h1>
                <div className="grid grid-cols-3 gap-4 border-t border-blue-400 pt-2">
                  <div>
                    <p className="text-sm text-blue-200">Empresa</p>
                    <p className="font-medium text-white">Nome da Empresa</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">CNPJ</p>
                    <p className="font-medium text-white">00.000.000/0001-00</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Data</p>
                    <p className="font-medium text-white">{new Date().toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <h2 className="text-lg font-bold text-blue-800 mb-2">Análise e Recomendações</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pró-labore Recomendado:</span>
                      <span className="font-bold text-blue-600">R$ 0,00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pró-labore Máximo:</span>
                      <span className="font-bold text-blue-600">R$ 0,00</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Com base na análise dos dados fornecidos, recomendamos manter o pró-labore dentro destes valores para garantir a saúde financeira da empresa.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-blue-800 border-b border-blue-100 pb-1 mb-2">
                        Faturamento
                      </h3>
                      <div className="space-y-1">
                        {groupedFields['faturamento']?.filter(f => f.enabled).map((field) => (
                          <div key={field.id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">{field.label}:</span>
                            <span className="font-medium">
                              {field.type === 'currency' ? 'R$ 0,00' :
                               field.type === 'number' ? '0,00%' :
                               field.type === 'date' ? new Date().toLocaleDateString('pt-BR') :
                               'Exemplo'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-blue-800 border-b border-blue-100 pb-1 mb-2">
                        Custos Fixos
                      </h3>
                      <div className="space-y-1">
                        {groupedFields['custos_fixos']?.filter(f => f.enabled).map((field) => (
                          <div key={field.id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">{field.label}:</span>
                            <span className="font-medium">
                              {field.type === 'currency' ? 'R$ 0,00' :
                               field.type === 'number' ? '0,00%' :
                               field.type === 'date' ? new Date().toLocaleDateString('pt-BR') :
                               'Exemplo'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-blue-800 border-b border-blue-100 pb-1 mb-2">
                      Custos Variáveis
                    </h3>
                    <div className="space-y-1">
                      {groupedFields['custos_variaveis']?.filter(f => f.enabled).map((field) => (
                        <div key={field.id} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{field.label}:</span>
                          <span className="font-medium">
                            {field.type === 'currency' ? 'R$ 0,00' :
                             field.type === 'number' ? '0,00%' :
                             field.type === 'date' ? new Date().toLocaleDateString('pt-BR') :
                             'Exemplo'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-3 left-0 right-0 text-center text-gray-500 text-xs border-t border-gray-200 pt-2">
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