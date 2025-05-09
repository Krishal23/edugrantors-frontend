import { useEffect } from "react";

const usePreventBackNavigation = () => {
  useEffect(() => {
    const preventBack = () => {
      alert("You cannot navigate back during the quiz. Please finish the quiz before leaving.");
      history.pushState(null, "", location.href); 
    };

    const warnBeforeUnload = (event:BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

   
    history.pushState(null, "", location.href);

  
    window.addEventListener("popstate", preventBack);

   
    window.addEventListener("beforeunload", warnBeforeUnload);

    return () => {
      
      window.removeEventListener("popstate", preventBack);
      window.removeEventListener("beforeunload", warnBeforeUnload);
    };
  }, []);
};

export default usePreventBackNavigation;
