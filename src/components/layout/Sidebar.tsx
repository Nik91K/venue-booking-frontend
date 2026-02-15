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
} from '@components/ui/sidebar';
import { SIDEBAR } from '@fixtures/sidebar.fixture';
import { ChevronUp, LogIn } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Link } from 'react-router-dom';
import type { Role } from '@/types/common';
import { SIDEBAR_FOOTER } from '@fixtures/sidebar.fixture';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import UserDropdownMenu from '@components/common/UserDropdownMenu';

type AppSidebarProps = {
  username: string;
  role: Role;
  avatar: string;
  email: string;
};

export function AppSidebar({ username, role, avatar, email }: AppSidebarProps) {
  const sidebarConfig = SIDEBAR[role];
  const footer = SIDEBAR_FOOTER;

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
                  <SidebarMenuButton key={item.path} asChild>
                    <Link to={item.path}>
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                ))}
              </div>
              <UserDropdownMenu
                avatar={avatar}
                username={username}
                email={email}
              >
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={avatar} alt="User avatar" />
                    <AvatarFallback>User avatar</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{username}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {email}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </UserDropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

export default AppSidebar;
