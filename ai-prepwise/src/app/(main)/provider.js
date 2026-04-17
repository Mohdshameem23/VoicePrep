import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar"
import WelcomeContainer from "./dashboard/_components/WelcomeContainer"

function DashboradProvider({children}) {
  return (
    <SidebarProvider>
    <AppSidebar />
  <div className=" w-full">
  {/* <SidebarTrigger /> */}
  <WelcomeContainer />
  {children}</div>
    </SidebarProvider>)
}
export default DashboradProvider
