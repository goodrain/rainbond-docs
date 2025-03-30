import React from 'react';
import UserCard from './UserCard';
import styles from './styles.module.scss';

interface UserPersona {
  title: string;
  icon: string;
  needs: string[];
  useCases: string[];
}

interface TargetUsersProps {
  title: string;
  personas: UserPersona[];
}

const TargetUsers: React.FC<TargetUsersProps> = ({ title, personas }) => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Rainbond serves both developers and platform administrators with different needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {personas.map((persona, index) => (
            <UserCard
              key={index}
              title={persona.title}
              icon={persona.icon}
              needs={persona.needs}
              useCases={persona.useCases}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetUsers; 