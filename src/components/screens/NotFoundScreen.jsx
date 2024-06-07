import { useLocation } from "react-router-dom";

function NotFoundScreen() {
  
  const location = useLocation();
  const message =
    location.state?.error_message || "No se pudo encontrar la página solicitada.";

  return (
    <div className="flex flex-wrap flex-col items-center mt-20">
      <h1 className="text-3xl">Página No Encontrada</h1>
      <div className="my-10 text-3xl">😥</div>
      <div className="">{message}</div>
    </div>
  );
}

export default NotFoundScreen;
