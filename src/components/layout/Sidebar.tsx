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
  SidebarHeader,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SIDEBAR } from '@/fixtures/sidebar.fixture';
import { ChevronUp, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DropdownMenuSitebar from '../common/DropwnMenu';
import { USER_MENU } from '@/fixtures/sidebar.fixture';
import type { Role } from '@/types/common';
import { logout } from '@/api/slices/authSlice';
import { useAppDispatch } from '@/api/hooks';
import { SIDEBAR_FOOTER } from '@/fixtures/sidebar.fixture';

type AppSidebarProps = {
  username: string;
  role: Role;
  avatar: string;
  email: string;
};

export function AppSidebar({ username, role, avatar, email }: AppSidebarProps) {
  const sidebarConfig = SIDEBAR[role];
  const footer = SIDEBAR_FOOTER;

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Sidebar side="left" className="text-(--primary-text)">
      {role == 'GUEST' && (
        <SidebarHeader className="bg-(--primary-background-light) text-(--primary-text)">
          <Button
            variant="secondary"
            className="px-1 py-1.5 w-full justify-start gap-2"
            asChild
          >
            <Link to="/login">
              <LogIn className="size-4" />
              <span>Log In</span>
            </Link>
          </Button>
        </SidebarHeader>
      )}
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
                        {item.icon && <item.icon />}
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

      {role !== 'GUEST' && (
        <SidebarFooter className="bg-(--primary-background-light) border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex flex-col justify-center items-cnter">
                {footer.map(item => (
                  <SidebarMenuButton asChild>
                    <Link to={item.path}>
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                ))}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center bg-muted">
                      <img
                        src={avatar}
                        alt="user avatar"
                        className="w-13 h-13 rounded-full cursor-pointer"
                      />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{username}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {email}
                      </span>
                    </div>
                    <ChevronUp className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="right"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center bg-muted">
                        <img
                          src={avatar}
                          alt="user avatar"
                          className="w-13 h-13 rounded-full cursor-pointer"
                        />
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {username}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuSitebar items={USER_MENU} />
                  <Button
                    className="w-full"
                    onClick={handleLogout}
                    variant={'secondary'}
                  >
                    Logout
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

export default AppSidebar;
