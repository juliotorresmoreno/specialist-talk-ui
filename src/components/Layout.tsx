import { Menu } from "./Menu";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  return (
    <main className="flex flex-1">
      <div className="flex flex-1">
        <div className="w-[300px] bg-white border-r-2 hidden md:block">
          <Menu />
        </div>
        <div className="flex flex-1 bg-white">{props.children}</div>
      </div>
    </main>
  );
}
