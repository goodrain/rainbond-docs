import React from 'react';
import styles from './styles.module.scss';

interface Requirement {
  label: string;
  value: string;
}

interface GettingStartedProps {
  title: string;
  requirements: Requirement[];
  installCommand: string;
  accessUrl: string;
}

const GettingStarted: React.FC<GettingStartedProps> = ({
  title,
  requirements,
  installCommand,
  accessUrl,
}) => {
  return (
    <section className="py-16 md:py-24 bg-primary-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            3-Minute Quick Installation
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Minimum Requirements</h3>
              <div className="space-y-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary mr-2 flex-shrink-0"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <div>
                      <p className="font-medium">{req.label}</p>
                      <p className="text-gray-600">{req.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Installation Command</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-white overflow-x-auto text-sm font-mono">
                  {installCommand}
                </pre>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                After the command is executed successfully, open a browser and enter{' '}
                <code className="bg-primary-light px-1 py-0.5 rounded">
                  {accessUrl}
                </code>{' '}
                to access the platform and start deploying applications.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <a
            href="https://www.rainbond.com/docs/installation/"
            className="btn-primary inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-200 transform hover:scale-105"
          >
            View Full Installation Guide
          </a>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted; 