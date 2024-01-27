/* eslint-disable react/prop-types */
import Header from "./headers";
import Content from "./content";
import Footer from "./footers";

import { Outlet } from "@/components/local";
import { Toaster } from "@/components/ui/toaster";
import useStore, { loadingSelector } from "@/store";

function General() {
  const loading = useStore(loadingSelector);
  return (
    <div>
      <Toaster />
      <div className="flex-col md:flex">
        <Header />
        <Content loading={loading}>
          <Outlet />
        </Content>
        <Footer />
      </div>
    </div>
  );
}

export { General };
