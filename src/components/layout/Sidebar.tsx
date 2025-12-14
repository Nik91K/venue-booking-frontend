import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SIDEBAR } from '@/fixtures/sidebar.fixture';
import { USER_DATA } from '@/fixtures/user.fixture';
import type { Role } from '@/types/common';
import { ChevronUp, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DropdownMenuSitebar from '../common/DropwnMenu';
import { USER_MENU } from '@/fixtures/sidebar.fixture';
import { userAvatar } from '@/hooks/userAvatar';
import { useAppSelector } from '@/api/hooks';

type AppSidebarProps = {
  role?: Role;
  username?: string;
};

export function AppSidebar({ username = 'user' }: AppSidebarProps) {
  const role = useAppSelector(state => state.role.role);
  const sidebarConfig = SIDEBAR[role];
  const userData = USER_DATA[role];

  return (
    <Sidebar side="left" className="text-(--primary-text)">
      <SidebarContent className="bg-(--primary-background-light) text-(--primary-text)">
        {sidebarConfig.map(section => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-(--primary-text)">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.path}>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="bg-(--primary-background-light) border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            {userData ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center bg-muted">
                      <img
                        src={userAvatar(username)}
                        alt="user avatar"
                        className="w-13 h-13 rounded-full cursor-pointer"
                      />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {userData.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {userData.email}
                      </span>
                    </div>
                    <ChevronUp className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="top"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center bg-muted">
                        <img
                          src={userAvatar(username)}
                          alt="user avatar"
                          className="w-13 h-13 rounded-full cursor-pointer"
                        />
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {userData.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {userData.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuSitebar items={USER_MENU} />
                  <Button className="w-full">Logout</Button>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="secondary"
                className="w-full justify-start gap-2"
                asChild
              >
                <Link to="/login">
                  <LogIn className="size-4" />
                  <span>Log In</span>
                </Link>
              </Button>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
