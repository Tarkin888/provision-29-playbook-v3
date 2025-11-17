import { P29Data } from "@/data";
import RoleCard from "@/components/roles/RoleCard";

const Roles = () => {
  const roles = P29Data.roles.getAll();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Role-Specific Guidance for Provision 29
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in">
            Tailored advice for your specific responsibilities in the P29 journey
          </p>
        </div>
      </section>

      {/* Role Cards Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Roles;
