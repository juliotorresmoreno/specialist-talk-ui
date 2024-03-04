"use client";

import { Sidebar as SidebarFB } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

export function Sidebar() {
  return (
    <SidebarFB aria-label="Default SidebarFB example">
      <SidebarFB.Items>
        <SidebarFB.ItemGroup>
          <SidebarFB.Item href="#" icon={HiChartPie}>
            Dashboard
          </SidebarFB.Item>
          <SidebarFB.Item
            href="#"
            icon={HiViewBoards}
            label="Pro"
            labelColor="dark"
          >
            Kanban
          </SidebarFB.Item>
          <SidebarFB.Item href="#" icon={HiInbox} label="3">
            Inbox
          </SidebarFB.Item>
          <SidebarFB.Item href="#" icon={HiUser}>
            Users
          </SidebarFB.Item>
          <SidebarFB.Item href="#" icon={HiShoppingBag}>
            Products
          </SidebarFB.Item>
          <SidebarFB.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </SidebarFB.Item>
          <SidebarFB.Item href="#" icon={HiTable}>
            Sign Up
          </SidebarFB.Item>
        </SidebarFB.ItemGroup>
      </SidebarFB.Items>
    </SidebarFB>
  );
}
