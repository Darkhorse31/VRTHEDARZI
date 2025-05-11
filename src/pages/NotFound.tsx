
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background tailor-pattern-bg">
      <div className="text-center max-w-md p-6">
        <h1 className="text-6xl font-bold text-tailor-blue mb-4">404</h1>
        <div className="w-16 h-1 bg-tailor-gold mx-auto mb-6"></div>
        <p className="text-xl text-tailor-slate mb-6">
          This page has been misplaced, just like that measuring tape we can never find.
        </p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-tailor-blue hover:bg-tailor-blue/90">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
