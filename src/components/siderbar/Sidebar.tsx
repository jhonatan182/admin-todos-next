import Image from "next/image";

import { LogoutButton, SidebarItem } from "..";
import {
  IoBaseballOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListCircleOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { auth } from "@/app/auth.config";

const menuItem = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "Rest TODOS",
    href: "/dashboard/rest-todos",
  },
  {
    icon: <IoListCircleOutline />,
    title: "Server Actions",
    href: "/dashboard/server-todos",
  },
  {
    icon: <IoCodeWorkingOutline />,
    title: "Cookies",
    href: "/dashboard/cookies",
  },
  {
    icon: <IoBaseballOutline />,
    title: "Productos",
    href: "/dashboard/products",
  },
  {
    icon: <IoPersonOutline />,
    title: "Perfil",
    href: "/dashboard/profile",
  },
];

export async function Sidebar() {
  const session = await auth();

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="mt-8 text-center">
          <Image
            src={
              session?.user?.image
                ? session.user.image.trim()
                : "https://avatars.githubusercontent.com/u/124599?v=4"
            }
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={200}
            height={200}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session?.user?.name || "No name"}
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItem.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
}
