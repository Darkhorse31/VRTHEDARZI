
import { 
  Users, 
  Scissors, 
  ShoppingBag, 
  LayoutDashboard, 
  Settings,
  ChevronRight,
  Menu
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useMatch } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Categories", href: "/categories", icon: Scissors },
  { name: "Orders", href: "/orders", icon: ShoppingBag },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state, open, setOpen } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    return !!useMatch({ path, end: path === "/" });
  };

  return (
    <Sidebar
      className={cn(
        "border-r bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      <div className={cn(
        "flex h-16 items-center justify-between border-b px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/c624ed7f-bbf0-4a28-9ed7-0575d4251d4b.png" 
              alt="VRTHEDARZI Logo" 
              className="h-8 w-auto" 
            />
            <span className="font-poppins text-lg font-semibold">VRTHEDARZI</span>
          </div>
        )}
        <SidebarTrigger>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Menu className="h-4 w-4" />
          </Button>
        </SidebarTrigger>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="py-2">
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        isActive(item.href)
                          ? "bg-sidebar-accent text-tailor-blue font-medium"
                          : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
