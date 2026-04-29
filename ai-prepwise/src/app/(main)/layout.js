import DashboradProvider from "./provider";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <DashboradProvider>
      <div className="p-3 sm:p-6 md:p-10">
        {children}
        </div>
      </DashboradProvider>
    </div>
  );
}