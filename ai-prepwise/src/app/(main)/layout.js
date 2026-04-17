import DashboradProvider from "./provider";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <DashboradProvider>
      <div className=" p-10">
        {children}
        </div>
      </DashboradProvider>
    </div>
  );
}