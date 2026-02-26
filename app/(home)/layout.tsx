export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black -z-50 min-h-screen text-white">
      {children}
    </div>
  );
}