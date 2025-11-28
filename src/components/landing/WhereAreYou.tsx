import { Link } from 'react-router-dom';

const WhereAreYou = () => {
  return (
    <div className="bg-background rounded-lg shadow-sm border border-border p-6 mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Where is your organisation in the P29 journey?
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Link 
          to="/roadmap?phase=1" 
          className="block p-4 rounded-lg border-2 border-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
        >
          <div className="text-blue-600 dark:text-blue-400 font-semibold">Not Yet Started</div>
          <p className="text-sm text-muted-foreground mt-1">Need to define scope and secure board mandate</p>
        </Link>
        <Link 
          to="/roadmap?phase=2" 
          className="block p-4 rounded-lg border-2 border-border hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950/20 transition-colors"
        >
          <div className="text-teal-600 dark:text-teal-400 font-semibold">Scoping Complete</div>
          <p className="text-sm text-muted-foreground mt-1">Documenting controls and ownership</p>
        </Link>
        <Link 
          to="/roadmap?phase=3" 
          className="block p-4 rounded-lg border-2 border-border hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors"
        >
          <div className="text-orange-600 dark:text-orange-400 font-semibold">Framework Designed</div>
          <p className="text-sm text-muted-foreground mt-1">Building assurance capability and testing</p>
        </Link>
        <Link 
          to="/roadmap?phase=4" 
          className="block p-4 rounded-lg border-2 border-border hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors"
        >
          <div className="text-green-600 dark:text-green-400 font-semibold">Ready for FY2026</div>
          <p className="text-sm text-muted-foreground mt-1">Executing tests and collecting evidence</p>
        </Link>
      </div>
    </div>
  );
};

export default WhereAreYou;
