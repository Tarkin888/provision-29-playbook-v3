import React, { createContext, useContext, useState, useEffect } from 'react';

export type FiscalYearEnd = 'march' | 'june' | 'september' | 'december';

interface FiscalYearContextType {
  fiscalYearEnd: FiscalYearEnd;
  setFiscalYearEnd: (yearEnd: FiscalYearEnd) => void;
  getComplianceFYStart: () => Date;
  getComplianceFYEnd: () => Date;
  getAnnualReportDueDate: () => Date;
  getPreparationYearLabel: () => string;
  getComplianceYearLabel: () => string;
  getFiscalQuarterLabel: (quarter: number) => string;
}

const FiscalYearContext = createContext<FiscalYearContextType | undefined>(undefined);

const FISCAL_YEAR_MONTHS = {
  march: 3,
  june: 6,
  september: 9,
  december: 12,
};

export const FiscalYearProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fiscalYearEnd, setFiscalYearEndState] = useState<FiscalYearEnd>(() => {
    const stored = localStorage.getItem('p29-fiscal-year-end');
    return (stored as FiscalYearEnd) || 'december';
  });

  useEffect(() => {
    localStorage.setItem('p29-fiscal-year-end', fiscalYearEnd);
  }, [fiscalYearEnd]);

  const setFiscalYearEnd = (yearEnd: FiscalYearEnd) => {
    setFiscalYearEndState(yearEnd);
  };

  const getComplianceFYStart = (): Date => {
    const month = FISCAL_YEAR_MONTHS[fiscalYearEnd];
    
    // If fiscal year ends in March, June, or September, compliance FY starts in 2026
    // If December, compliance FY starts January 2026
    if (fiscalYearEnd === 'december') {
      return new Date(2026, 0, 1); // January 1, 2026
    } else if (fiscalYearEnd === 'march') {
      return new Date(2026, 3, 1); // April 1, 2026
    } else if (fiscalYearEnd === 'june') {
      return new Date(2026, 6, 1); // July 1, 2026
    } else {
      return new Date(2026, 9, 1); // October 1, 2026
    }
  };

  const getComplianceFYEnd = (): Date => {
    const month = FISCAL_YEAR_MONTHS[fiscalYearEnd];
    
    if (fiscalYearEnd === 'december') {
      return new Date(2026, 11, 31); // December 31, 2026
    } else if (fiscalYearEnd === 'march') {
      return new Date(2027, 2, 31); // March 31, 2027
    } else if (fiscalYearEnd === 'june') {
      return new Date(2027, 5, 30); // June 30, 2027
    } else {
      return new Date(2027, 8, 30); // September 30, 2027
    }
  };

  const getAnnualReportDueDate = (): Date => {
    const fyEnd = getComplianceFYEnd();
    // Annual reports typically due 4 months after fiscal year-end
    return new Date(fyEnd.getFullYear(), fyEnd.getMonth() + 4, fyEnd.getDate());
  };

  const getPreparationYearLabel = (): string => {
    return '[Preparation Year - 2025]';
  };

  const getComplianceYearLabel = (): string => {
    const start = getComplianceFYStart();
    const end = getComplianceFYEnd();
    
    if (start.getFullYear() === end.getFullYear()) {
      return `[Compliance FY: ${start.getFullYear()}]`;
    } else {
      return `[Compliance FY: ${start.getFullYear()}-${end.getFullYear()}]`;
    }
  };

  const getFiscalQuarterLabel = (quarter: number): string => {
    const start = getComplianceFYStart();
    const quarterStart = new Date(start);
    quarterStart.setMonth(start.getMonth() + (quarter - 1) * 3);
    
    const quarterEnd = new Date(quarterStart);
    quarterEnd.setMonth(quarterStart.getMonth() + 2);
    
    const formatMonth = (date: Date) => date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
    
    return `[Fiscal Q${quarter}: ${formatMonth(quarterStart)} - ${formatMonth(quarterEnd)}]`;
  };

  return (
    <FiscalYearContext.Provider
      value={{
        fiscalYearEnd,
        setFiscalYearEnd,
        getComplianceFYStart,
        getComplianceFYEnd,
        getAnnualReportDueDate,
        getPreparationYearLabel,
        getComplianceYearLabel,
        getFiscalQuarterLabel,
      }}
    >
      {children}
    </FiscalYearContext.Provider>
  );
};

export const useFiscalYear = () => {
  const context = useContext(FiscalYearContext);
  if (context === undefined) {
    throw new Error('useFiscalYear must be used within a FiscalYearProvider');
  }
  return context;
};
