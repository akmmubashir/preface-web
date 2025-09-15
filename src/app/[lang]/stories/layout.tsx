import { ReactNode } from "react";
import { ApplicationLayout } from "@/app/[lang]/application-layout";

interface Props {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

const Layout: React.FC<Props> = async ({ children, params }) => {
  return <ApplicationLayout params={params}>{children}</ApplicationLayout>;
};

export default Layout;
