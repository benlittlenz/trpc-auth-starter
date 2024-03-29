import { SideNav } from "./SideNav/SideNav";

interface MainContainerProps {
  children: React.ReactNode;
}

export default function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="h-screen flex overflow-hidden">
      <SideNav />
      <main className="flex-1 relative overflow-y-auto focus:outline-none px-8 pt-10">
        {children}
      </main>
    </div>
  );
}
