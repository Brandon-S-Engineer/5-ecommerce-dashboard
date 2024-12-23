import React from 'react';
import { render, screen } from '@testing-library/react';
import Overview from './overview';

jest.mock('recharts', () => {
  const OriginalRecharts = jest.requireActual('recharts');
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, // Simplify ResponsiveContainer
    BarChart: ({ children, data }: { children: React.ReactNode; data: Array<any> }) => (
      <div
        data-testid='barchart'
        data-items={JSON.stringify(data)}>
        {children}
      </div>
    ),
    XAxis: ({ dataKey }: { dataKey: string }) => (
      <div
        data-testid='xaxis'
        data-key={dataKey}
      />
    ),
    YAxis: ({ tickFormatter }: { tickFormatter?: (value: number) => string }) => (
      <div
        data-testid='yaxis'
        data-format={tickFormatter ? 'true' : 'false'}
      />
    ),
    Bar: ({ dataKey }: { dataKey: string }) => (
      <div
        data-testid='bar'
        data-key={dataKey}
      />
    ),
  };
});

describe('Overview Component', () => {
  interface MockData {
    name: string;
    total: number;
  }

  const mockData: MockData[] = [
    { name: 'January', total: 1000 },
    { name: 'February', total: 2000 },
    { name: 'March', total: 1500 },
  ];

  it('renders the BarChart with the correct data', () => {
    render(<Overview data={mockData} />);
    const barChart = screen.getByTestId('barchart');
    expect(barChart).toBeInTheDocument();
    expect(barChart).toHaveAttribute('data-items', JSON.stringify(mockData));
  });

  it('renders the XAxis with the correct dataKey', () => {
    render(<Overview data={mockData} />);
    const xAxis = screen.getByTestId('xaxis');
    expect(xAxis).toBeInTheDocument();
    expect(xAxis).toHaveAttribute('data-key', 'name');
  });

  it('renders the YAxis with the tickFormatter', () => {
    render(<Overview data={mockData} />);
    const yAxis = screen.getByTestId('yaxis');
    expect(yAxis).toBeInTheDocument();
    expect(yAxis).toHaveAttribute('data-format', 'true');
  });

  it('renders the Bar with the correct dataKey', () => {
    render(<Overview data={mockData} />);
    const bar = screen.getByTestId('bar');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('data-key', 'total');
  });
});
