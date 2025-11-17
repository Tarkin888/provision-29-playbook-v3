import { Role } from "@/types/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface RoleCardProps {
  role: Role;
}

const RoleCard = ({ role }: RoleCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col"
      onClick={() => navigate(`/roles/${role.id}`)}
    >
      <div 
        className="h-1 rounded-t-lg"
        style={{ backgroundColor: role.color }}
      />
      <CardHeader className="flex-1">
        <div className="flex items-start gap-4">
          <div 
            className="text-5xl flex-shrink-0"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          >
            {role.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xl mb-2 leading-tight">{role.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {role.description.slice(0, 120)}...
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>📋</span>
          <span>{role.keyResponsibilities.length} key responsibilities</span>
        </div>
        <Button 
          variant="outline" 
          className="w-full"
          style={{ 
            borderColor: role.color,
            color: role.color 
          }}
        >
          View Guide
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoleCard;
