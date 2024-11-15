"use server";

import { signOut } from "@/app/auth.config";

export const removeSession = async () => {
  await signOut();
};
