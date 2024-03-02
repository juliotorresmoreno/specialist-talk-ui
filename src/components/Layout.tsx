interface LayoutProps {
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  return <div>{props.children}</div>;
}
