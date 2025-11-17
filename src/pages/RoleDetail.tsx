import { useParams } from 'react-router-dom';
import { P29Data } from '@/data';

const RoleDetail = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const role = roleId ? P29Data.roles.getById(roleId) : null;

  if (!role) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Role Not Found</h1>
        <p className="text-lg text-muted-foreground">
          The role you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-5xl">{role.icon}</span>
        <h1 className="text-4xl font-bold">{role.name}</h1>
      </div>
      <p className="text-lg text-muted-foreground mb-8">
        {role.description}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Key Responsibilities</h2>
          <ul className="space-y-2">
            {role.keyResponsibilities.map((responsibility, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Critical Questions</h2>
          <ul className="space-y-2">
            {role.criticalQuestions.map((question, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoleDetail;
