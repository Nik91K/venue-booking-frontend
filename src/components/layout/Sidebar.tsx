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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SIDEBAR } from '@/fixtures/sidebar.fixture';
import { USER_DATA } from '@/fixtures/user.fixture';
import type { Role } from '@/types/common';
import {
  ChevronUp,
  LogIn,
  Settings,
  CreditCard,
  LogOut,
  UserCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Avatar from 'boring-avatars';
import { Link } from 'react-router-dom';

type AppSidebarProps = {
  role?: Role;
};

const AVATAR_COLORS = {
  user: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
  moderator: ['#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4'],
  admin: ['#7209b7', '#560bad', '#480ca8', '#3a0ca3', '#3f37c9'],
  superAdmin: ['#d00000', '#dc2f02', '#e85d04', '#f48c06', '#faa307'],
  guest: ['#94a3b8', '#64748b', '#475569', '#334155', '#1e293b'],
};

export function AppSidebar({ role = 'guest' }: AppSidebarProps) {
  const sidebarConfig = SIDEBAR[role];
  const userData = USER_DATA[role];

  return (
    <Sidebar side="right" className="text-(--primary-text)">
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
                      <Avatar
                        size={32}
                        name={userData.name}
                        variant="beam"
                        colors={AVATAR_COLORS[role] || AVATAR_COLORS.guest}
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
                        <Avatar
                          size={32}
                          name={userData.name}
                          variant="beam"
                          colors={AVATAR_COLORS[role] || AVATAR_COLORS.guest}
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
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 size-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 size-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 size-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 size-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
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
