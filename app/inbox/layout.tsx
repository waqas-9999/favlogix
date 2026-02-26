// app/inbox/layout.tsx
import Header from "@/components/global/header/header";

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-[7.75px]">
      <Header />
      {children}
    </div>
  );
}