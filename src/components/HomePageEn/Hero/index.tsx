import React from 'react';
import styles from './styles.module.scss';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaButtons: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
  };
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  ctaButtons,
}) => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          {title}
        </h1>
        <p className="text-lg text-primary font-medium mb-4">
          {subtitle}
        </p>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={ctaButtons.primary.link}
            className="btn-primary inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-200 transform hover:scale-105"
          >
            {ctaButtons.primary.text}
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
              className="ml-2"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a
            href={ctaButtons.secondary.link}
            className="btn-outline inline-flex items-center px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:border-primary hover:text-primary transition-all duration-200"
          >
            {ctaButtons.secondary.text}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero; 