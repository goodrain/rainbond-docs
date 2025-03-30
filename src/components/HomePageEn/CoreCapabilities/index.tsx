import React from 'react';
import FeatureCard from './FeatureCard';
import styles from './styles.module.scss';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

interface CoreCapabilitiesProps {
  title: string;
  features: FeatureCard[];
}

const CoreCapabilities: React.FC<CoreCapabilitiesProps> = ({ title, features }) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Rainbond provides a complete application management platform with enterprise-grade features
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities; 