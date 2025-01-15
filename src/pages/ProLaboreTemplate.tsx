import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { Notification } from '../components/Notification';

interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency';
  required: boolean;
}

export default function ProLaboreTemplate() {
  const [fields, setFields] = useState<TemplateField[]>([
    { id: '1', label: 'Nome da Empresa', type: 'text', required: true },
    { id: '2', label: 'CNPJ', type: 'text', required: true },
    { id: '3', label: 'Data do Cálculo', type: 'date', required: true },
    { id: '4', label: 'Valor do Pró-labore', type: 'currency', required: true }
  ]);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddField = () => {
    const newField: TemplateField = {
      id: Date.now().toString(),
      label: '',
      type: 'text',
      required: false
    };
    setFields([...fields, newField]);
  };

  const handleUpdateField = (id: string, updates: Partial<TemplateField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const handleDeleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleSaveTemplate = () => {
    // Save template logic here
    setShowNotification(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {showNotification && (
        <Notification
          message="Template salvo com sucesso!"
          onClose={() => setShowNotification(false)}
        />
      )}

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Template de Exportação
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure o template para exportação dos cálculos de pró-labore
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="space-y-6">
            {fields.map((field) => (
              <div key={field.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Rótulo do Campo
                    </label>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => handleUpdateField(field.id, { label: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tipo do Campo
                      </label>
                      <select
                        value={field.type}
                        onChange={(e) => handleUpdateField(field.id, { type: e.target.value as TemplateField['type'] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="text">Texto</option>
                        <option value="number">Número</option>
                        <option value="date">Data</option>
                        <option value="currency">Moeda</option>
                      </select>
                    </div>
                    <div className="flex items-center pt-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => handleUpdateField(field.id, { required: e.target.checked })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Obrigatório
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteField(field.id)}
                  className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleAddField}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              <Plus size={16} className="mr-2" />
              Adicionar Campo
            </button>
            <button
              onClick={handleSaveTemplate}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save size={16} className="mr-2" />
              Salvar Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}