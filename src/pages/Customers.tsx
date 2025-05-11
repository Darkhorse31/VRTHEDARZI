
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Search, 
  FileDown, 
  ListFilter, 
  UserPlus, 
  Eye 
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  customerCode: string;
  measurements: {
    shirt: {
      chest: string;
      waist: string;
      length: string;
      shoulder: string;
    };
    pant: {
      waist: string;
      length: string;
      bottom: string;
    };
  };
  lastOrder: string;
  totalOrders: number;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Vikram Singh",
    phone: "+91 98765 43210",
    email: "vikram@example.com",
    customerCode: "CS001",
    measurements: {
      shirt: {
        chest: "42",
        waist: "38",
        length: "30",
        shoulder: "18",
      },
      pant: {
        waist: "34",
        length: "40",
        bottom: "16",
      },
    },
    lastOrder: "2023-04-15",
    totalOrders: 5,
  },
  {
    id: "2",
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "priya@example.com",
    customerCode: "CS002",
    measurements: {
      shirt: {
        chest: "36",
        waist: "32",
        length: "26",
        shoulder: "16",
      },
      pant: {
        waist: "28",
        length: "38",
        bottom: "14",
      },
    },
    lastOrder: "2023-05-20",
    totalOrders: 3,
  },
  {
    id: "3",
    name: "Ravi Kumar",
    phone: "+91 76543 21098",
    email: "ravi@example.com",
    customerCode: "CS003",
    measurements: {
      shirt: {
        chest: "40",
        waist: "36",
        length: "28",
        shoulder: "17.5",
      },
      pant: {
        waist: "32",
        length: "39",
        bottom: "15",
      },
    },
    lastOrder: "2023-06-10",
    totalOrders: 7,
  },
  {
    id: "4",
    name: "Ananya Patel",
    phone: "+91 65432 10987",
    email: "ananya@example.com",
    customerCode: "CS004",
    measurements: {
      shirt: {
        chest: "34",
        waist: "30",
        length: "25",
        shoulder: "15.5",
      },
      pant: {
        waist: "26",
        length: "36",
        bottom: "13",
      },
    },
    lastOrder: "2023-07-05",
    totalOrders: 2,
  },
];

const CustomerMeasurementForm = ({ 
  header, 
  fields 
}: { 
  header: string; 
  fields: { label: string; id: string; placeholder?: string; unit?: string; }[] 
}) => (
  <div className="space-y-4">
    <h3 className="font-medium">{header}</h3>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>
            {field.label} {field.unit && <span className="text-xs text-muted-foreground">({field.unit})</span>}
          </Label>
          <Input id={field.id} placeholder={field.placeholder || ""} />
        </div>
      ))}
    </div>
  </div>
);

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddCustomer, setOpenAddCustomer] = useState(false);

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <div className="flex items-center gap-2">
          <Dialog open={openAddCustomer} onOpenChange={setOpenAddCustomer}>
            <DialogTrigger asChild>
              <Button className="bg-tailor-blue hover:bg-tailor-blue/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Enter customer details and measurements
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Customer Details</TabsTrigger>
                  <TabsTrigger value="measurements">Measurements</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 py-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter customer's full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerCode">Customer Code</Label>
                      <Input id="customerCode" placeholder="CS001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="customer@example.com" type="email" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="measurements" className="space-y-6 py-4">
                  <CustomerMeasurementForm
                    header="Shirt Measurements"
                    fields={[
                      { label: "Chest", id: "shirt-chest", unit: "inches" },
                      { label: "Waist", id: "shirt-waist", unit: "inches" },
                      { label: "Length", id: "shirt-length", unit: "inches" },
                      { label: "Shoulder", id: "shirt-shoulder", unit: "inches" },
                    ]}
                  />
                  <CustomerMeasurementForm
                    header="Pant Measurements"
                    fields={[
                      { label: "Waist", id: "pant-waist", unit: "inches" },
                      { label: "Length", id: "pant-length", unit: "inches" },
                      { label: "Bottom", id: "pant-bottom", unit: "inches" },
                    ]}
                  />
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAddCustomer(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    setOpenAddCustomer(false);
                    // Add customer logic here
                  }}
                  className="bg-tailor-blue hover:bg-tailor-blue/90"
                >
                  Save Customer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <ListFilter className="h-4 w-4" />
        </Button>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.customerCode}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>
                      <div>{customer.phone}</div>
                      <div className="text-xs text-muted-foreground">{customer.email}</div>
                    </TableCell>
                    <TableCell>{new Date(customer.lastOrder).toLocaleDateString()}</TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>{customer.name}</DialogTitle>
                            <DialogDescription>
                              Customer Code: {customer.customerCode}
                            </DialogDescription>
                          </DialogHeader>

                          <Tabs defaultValue="details">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="details">Details</TabsTrigger>
                              <TabsTrigger value="measurements">Measurements</TabsTrigger>
                              <TabsTrigger value="orders">Orders</TabsTrigger>
                            </TabsList>

                            <TabsContent value="details" className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Contact Information</p>
                                  <p className="text-sm">{customer.phone}</p>
                                  <p className="text-sm">{customer.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Customer Since</p>
                                  <p className="text-sm">April 15, 2023</p>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="measurements" className="space-y-6 py-4">
                              <div className="space-y-4">
                                <h3 className="font-medium">Shirt Measurements</h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">Chest</p>
                                    <p className="text-sm">{customer.measurements.shirt.chest} inches</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Waist</p>
                                    <p className="text-sm">{customer.measurements.shirt.waist} inches</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Length</p>
                                    <p className="text-sm">{customer.measurements.shirt.length} inches</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Shoulder</p>
                                    <p className="text-sm">{customer.measurements.shirt.shoulder} inches</p>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h3 className="font-medium">Pant Measurements</h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">Waist</p>
                                    <p className="text-sm">{customer.measurements.pant.waist} inches</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Length</p>
                                    <p className="text-sm">{customer.measurements.pant.length} inches</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Bottom</p>
                                    <p className="text-sm">{customer.measurements.pant.bottom} inches</p>
                                  </div>
                                </div>
                              </div>
                              <Button className="w-full">Download Measurement Card</Button>
                            </TabsContent>

                            <TabsContent value="orders" className="py-4">
                              <div className="space-y-4">
                                <div className="flex justify-between">
                                  <p className="text-sm font-medium">Order #123</p>
                                  <p className="text-sm text-blue-600">Paid</p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-sm font-medium">Order #118</p>
                                  <p className="text-sm text-green-600">Delivered</p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-sm font-medium">Order #112</p>
                                  <p className="text-sm text-green-600">Delivered</p>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                          
                          <DialogFooter>
                            <Button variant="outline">
                              Edit
                            </Button>
                            <Button className="bg-tailor-blue hover:bg-tailor-blue/90">
                              New Order
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No customers found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;
