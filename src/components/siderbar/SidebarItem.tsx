"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItemProps = {
  icon: React.ReactNode;
  title: string;
  href: string;
};

export function SidebarItem({ title, href, icon }: SidebarItemProps) {
  const path = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl group-hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white ${
          path === href
            ? "text-white  bg-gradient-to-r from-sky-600 to-cyan-400"
            : ""
        } `}
      >
        {icon}
        <span className="-mr-1 font-medium group-hover:text-white-700">
          {title}
        </span>
      </Link>
    </li>
  );
}
