import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleGoBack = () => {
    if (canGoBack) navigate(-1);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center px-6 text-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="bg-white shadow-xl rounded-xl px-8 py-10 max-w-md w-full border border-gray-200">
        <div className="flex flex-col items-center">
          <Ghost className="w-14 h-14 mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800">
            Page Not Found
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            The page you’re looking for doesn’t exist or may have been moved.
          </p>

          <div className="mt-6 flex gap-4">
            <Button onClick={() => navigate("/")}>Go Home</Button>
            {canGoBack && (
              <Button variant="outline" onClick={handleGoBack}>
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
