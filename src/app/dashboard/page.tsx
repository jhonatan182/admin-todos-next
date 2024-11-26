import { WidgetItem } from "@/components";
import { auth } from "../auth.config";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid gap-6 ">
      <WidgetItem title="Usuario conectado">
        <div className="flex flex-col">
          <span>{session.user?.name}</span>
          <span>{session.user?.image}</span>
          <span>{session.user?.email}</span>

          <div>{JSON.stringify(session, null, 2)}</div>
        </div>
      </WidgetItem>
    </div>
  );
}
