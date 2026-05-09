import React from "react";
import { useParams } from "react-router-dom";

interface Provider {
  name: string;
  specialty: string;
  state: string;
}

interface ProviderListProps {
  providers: Provider[];
}

const ProviderList: React.FC<ProviderListProps> = ({ providers }) => {
  const { stateName } = useParams<{ stateName: string }>();
  const stateProviders = providers.filter((p) => p.state === stateName);

  return (
    <div>
      <h2>Medical Providers in {stateName}</h2>
      <ul>
        {stateProviders.map((provider, idx) => (
          <li key={idx}>
            {provider.name} - {provider.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProviderList;
