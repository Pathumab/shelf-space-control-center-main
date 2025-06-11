
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Dashboard } from "@/components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Books } from "@/components/Books";
import { Members } from "@/components/Members";
import { Borrowing } from "@/components/Borrowing";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card flex items-center px-6 shadow-sm">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">LibraryHub</h1>
              <span className="text-sm text-muted-foreground">Management System</span>
            </div>
          </header>
          <main className="flex-1 p-6 bg-muted/10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/books" element={<Books />} />
              <Route path="/members" element={<Members />} />
              <Route path="/borrowing" element={<Borrowing />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
