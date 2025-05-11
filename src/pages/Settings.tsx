import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Pencil, 
  Save, 
  Store, 
  User, 
  Users 
} from "lucide-react";

const Settings = () => {
  const [shopDetails, setShopDetails] = useState({
    name: "VRTHEDARZI Shop",
    address: "123 Fashion Street, Textile Market, Mumbai, 400001",
    phone: "+91 98765 43210",
    email: "contact@vrthedarzi.com",
    gstin: "27AAPFU0939F1ZV",
  });

  const [editing, setEditing] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

      <Tabs defaultValue="shop" className="space-y-4">
        <TabsList>
          <TabsTrigger value="shop">
            <Store className="mr-2 h-4 w-4" />
            Shop Details
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="shop" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Shop Information</CardTitle>
                  <CardDescription>Your shop details that appear on receipts and invoices</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setEditing(!editing)}
                >
                  {editing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </>
                  ) : (
                    <>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shop-name">Shop Name</Label>
                  <Input 
                    id="shop-name" 
                    value={shopDetails.name}
                    readOnly={!editing}
                    className={!editing ? "bg-muted" : ""}
                    onChange={(e) => 
                      setShopDetails({...shopDetails, name: e.target.value})
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={shopDetails.address}
                    readOnly={!editing}
                    className={!editing ? "bg-muted" : ""}
                    onChange={(e) => 
                      setShopDetails({...shopDetails, address: e.target.value})
                    }
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={shopDetails.phone}
                      readOnly={!editing}
                      className={!editing ? "bg-muted" : ""}
                      onChange={(e) => 
                        setShopDetails({...shopDetails, phone: e.target.value})
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={shopDetails.email}
                      readOnly={!editing}
                      className={!editing ? "bg-muted" : ""}
                      onChange={(e) => 
                        setShopDetails({...shopDetails, email: e.target.value})
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstin">GSTIN (Tax Identification)</Label>
                  <Input 
                    id="gstin" 
                    value={shopDetails.gstin}
                    readOnly={!editing}
                    className={!editing ? "bg-muted" : ""}
                    onChange={(e) => 
                      setShopDetails({...shopDetails, gstin: e.target.value})
                    }
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receipt Customization</CardTitle>
              <CardDescription>Customize how your receipts look</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="logo">Shop Logo</Label>
                  <div className="flex items-center justify-center border-2 border-dashed rounded-md h-32">
                    <Button variant="outline">Upload Logo</Button>
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="receipt-note">Receipt Footer Note</Label>
                  <Input
                    id="receipt-note"
                    placeholder="Thank you for your business!"
                  />
                  <p className="text-sm text-muted-foreground">This note will appear at the bottom of all receipts.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage access to the tailoring shop system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-tailor-blue rounded-full w-10 h-10 flex items-center justify-center text-white">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Admin User</p>
                      <p className="text-sm text-muted-foreground">admin@tailorproshop.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="border-tailor-blue text-tailor-blue font-normal">
                      Owner
                    </Badge>
                  </div>
                </div>
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Configure your system preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email notifications for new orders</p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">Automatic Backups</Label>
                  <p className="text-sm text-muted-foreground">Automatically backup your data daily</p>
                </div>
                <Switch id="auto-backup" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Badge = ({ children, className, variant = "default" }: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: "default" | "outline"; 
}) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        variant === "outline" ? "border" : "bg-primary text-primary-foreground"
      } ${className}`}
    >
      {children}
    </span>
  );
};

export default Settings;
