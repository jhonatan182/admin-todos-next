"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const session = useSession();

  console.log("render");

  return (
    <div>
      <h1>Page Profile</h1>
      <hr />

      <div className="flex flex-col">
        <span>{session.data?.user?.name ?? "No Name"}</span>
        <span>{session.data?.user?.email ?? "No Email"}</span>
        <span>{session.data?.user?.image ?? "No Image"}</span>
      </div>
    </div>
  );
}
