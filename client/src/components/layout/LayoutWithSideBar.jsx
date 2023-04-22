import * as React from "react";
import MainLayout from "@/components/layout/MainLayout";
import SideBar from "@/components/common/SideBar";
export default function LayoutWithSideBar({ children }) {
  return (
    <MainLayout>
      <div className="xl:flex">
        <SideBar />
        <div className="flex-1 w-full overflow-x-auto">
          <main>{children}</main>
        </div>
      </div>
    </MainLayout>
  );
}
