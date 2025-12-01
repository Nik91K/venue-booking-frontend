import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SIDEBAR } from '@/fixtures/sidebar.fixture';
import type { Role } from '@/types/common';

type AppSidebarProps = {
  role?: Role;
};

export function AppSidebar({ role = 'guest' }: AppSidebarProps) {
  const sidebarConfig = SIDEBAR[role];

  return (
    <Sidebar side="right" className="text-(--primary-text)">
      <SidebarContent className="bg-(--primary-background-light) text-(--primary-text)">
        {sidebarConfig.map(section => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-(--primary-text)">
              Application
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map(item => {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.path}>
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
