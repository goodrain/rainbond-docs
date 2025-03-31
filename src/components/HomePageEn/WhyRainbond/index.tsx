import React, { useState } from 'react';
import TabPanel from './TabPanel';
import styles from './styles.module.scss';

interface TabContent {
  title: string;
  painPoints: string[];
  benefits: string[];
}

interface WhyRainbondProps {
  title: string;
  tabs: {
    developer: TabContent;
    ops: TabContent;
  };
  comparison: {
    platformType: string;
    products: string[];
    differentiation: string[];
  }[];
}

const WhyRainbond: React.FC<WhyRainbondProps> = ({ title, tabs, comparison }) => {
  const [activeTab, setActiveTab] = useState<'developer' | 'ops'>('developer');

  return (
    <section className="py-16 md:py-24 bg-primary-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Rainbond provides a complete application management platform with enterprise-grade features
          </p>
        </div>
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex border-b">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'developer'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('developer')}
              >
                Developer Perspective
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'ops'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('ops')}
              >
                Ops/Platform Admin Perspective
              </button>
            </div>
            <TabPanel
              isActive={activeTab === 'developer'}
              title={tabs.developer.title}
              painPoints={tabs.developer.painPoints}
              benefits={tabs.developer.benefits}
            />
            <TabPanel
              isActive={activeTab === 'ops'}
              title={tabs.ops.title}
              painPoints={tabs.ops.painPoints}
              benefits={tabs.ops.benefits}
            />
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Positioning Differences with Mainstream Platforms
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Platform Type</th>
                      <th className="text-left p-4 font-medium">Representative Products</th>
                      <th className="text-left p-4 font-medium">Rainbond's Differentiation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((item, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="p-4 font-medium">{item.platformType}</td>
                        <td className="p-4">{item.products.join(', ')}</td>
                        <td className="p-4">
                          <ul className="space-y-2">
                            {item.differentiation.map((diff, idx) => (
                              <li key={idx} className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-primary mr-2"
                                >
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                  <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                                <span>{diff}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRainbond; 