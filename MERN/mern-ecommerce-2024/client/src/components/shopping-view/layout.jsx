import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import { useEffect } from "react";

function ShoppingLayout() {

  useEffect(() => {
    window.document.title = "Ecommerce Shopping"
  }, [])

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
