import React from 'react';
import { QuotationForm } from './QuotationForm';
import { QuotationList } from './QuotationList';

export const QuotationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <QuotationForm />
      <QuotationList />
    </div>
  );
};