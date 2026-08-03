import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false, speed: 300, minimum: 0.2 });

const RouteProgress = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 150);
    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname]);

  return null;
};

export default RouteProgress;
