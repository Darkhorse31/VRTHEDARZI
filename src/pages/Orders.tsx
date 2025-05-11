import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  FileDown, 
  ListFilter, 
  MoreHorizontal, 
  PackagePlus, 
  Pencil, 
  Search,
  FileText
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface Order {
  id: string;
  orderId: string;
  customer: {
    name: string;
    code: string;
  };
  items: {
    category: string;
    quantity: number;
  }[];
  instructions: string;
  status: "Pending" | "Paid" | "Delivered";
  totalAmount: number;
  date: string;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderId: "ORD-124",
    customer: {
      name: "Vikram Singh",
      code: "CS001",
    },
    items: [
      { category: "Shirt", quantity: 2 },
      { category: "Pant", quantity: 1 },
    ],
    instructions: "Need the shirts by next Friday for an event.",
    status: "Pending",
    totalAmount: 1200,
    date: "2023-04-20",
  },
  {
    id: "2",
    orderId: "ORD-123",
    customer: {
      name: "Priya Sharma",
      code: "CS002",
    },
    items: [
      { category: "Suit", quantity: 1 },
    ],
    instructions: "Special stitching for wedding.",
    status: "Paid",
    totalAmount: 2500,
    date: "2023-04-15",
  },
  {
    id: "3",
    orderId: "ORD-122",
    customer: {
      name: "Ravi Kumar",
      code: "CS003",
    },
    items: [
      { category: "Shirt", quantity: 3 },
    ],
    instructions: "Office wear shirts, regular fit.",
    status: "Delivered",
    totalAmount: 1800,
    date: "2023-04-10",
  },
  {
    id: "4",
    orderId: "ORD-121",
    customer: {
      name: "Ananya Patel",
      code: "CS004",
    },
    items: [
      { category: "Kurta", quantity: 2 },
      { category: "Pant", quantity: 2 },
    ],
    instructions: "Festival wear, bright colors.",
    status: "Pending",
    totalAmount: 3200,
    date: "2023-04-05",
  },
];

const orders = [...mockOrders, ...mockOrders.map(order => ({
  ...order,
  id: `${parseInt(order.id) + 4}`,
  orderId: `ORD-${parseInt(order.orderId.split('-')[1]) + 4}`,
  date: new Date(new Date(order.date).setDate(new Date(order.date).getDate() - 30)).toISOString().split('T')[0]
}))];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [openNewOrder, setOpenNewOrder] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [reportType, setReportType] = useState<string>("daily");
  const [dateRange, setDateRange] = useState<string>("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>;
      case "Paid":
        return <Badge variant="outline" className="border-blue-600 text-blue-600">Paid</Badge>;
      case "Delivered":
        return <Badge variant="outline" className="border-green-600 text-green-600">Delivered</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report has been generated successfully.`,
    });
    setOpenReportDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Dialog open={openReportDialog} onOpenChange={setOpenReportDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Report</DialogTitle>
                <DialogDescription>
                  Create a custom report based on your requirements.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select
                    value={reportType}
                    onValueChange={setReportType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Report</SelectItem>
                      <SelectItem value="weekly">Weekly Report</SelectItem>
                      <SelectItem value="monthly">Monthly Report</SelectItem>
                      <SelectItem value="custom">Custom Date Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {reportType === "custom" && (
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <Input 
                      type="text" 
                      placeholder="e.g., Apr 1, 2023 - Apr 30, 2023" 
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenReportDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-tailor-blue hover:bg-tailor-blue/90" 
                  onClick={handleGenerateReport}
                >
                  Generate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={openNewOrder} onOpenChange={setOpenNewOrder}>
            <DialogTrigger asChild>
              <Button className="bg-tailor-blue hover:bg-tailor-blue/90">
                <PackagePlus className="mr-2 h-4 w-4" />
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>
                  Create a new order for a customer
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select 
                    value={selectedCustomer}
                    onValueChange={setSelectedCustomer}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CS001">Vikram Singh (CS001)</SelectItem>
                      <SelectItem value="CS002">Priya Sharma (CS002)</SelectItem>
                      <SelectItem value="CS003">Ravi Kumar (CS003)</SelectItem>
                      <SelectItem value="CS004">Ananya Patel (CS004)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Item Category</Label>
                  <Select 
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select item category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shirt">Shirt</SelectItem>
                      <SelectItem value="pant">Pant</SelectItem>
                      <SelectItem value="kurta">Kurta</SelectItem>
                      <SelectItem value="suit">Suit</SelectItem>
                      <SelectItem value="sherwani">Sherwani</SelectItem>
                      <SelectItem value="blazer">Blazer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input type="number" id="quantity" defaultValue="1" min="1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input type="number" id="price" min="0" step="100" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea id="instructions" placeholder="Any special requirements or notes" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Order Status</Label>
                  <Select defaultValue="pending">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenNewOrder(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-tailor-blue hover:bg-tailor-blue/90"
                  onClick={() => {
                    setOpenNewOrder(false);
                    setSelectedCustomer("");
                    setSelectedCategory("");
                    // Logic to create order
                  }}
                >
                  Create Order
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
            placeholder="Search orders..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-base">Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>
                      <div>{order.customer.name}</div>
                      <div className="text-xs text-muted-foreground">{order.customer.code}</div>
                    </TableCell>
                    <TableCell>
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.quantity} x {item.category}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileDown className="mr-2 h-4 w-4" />
                            Generate Receipt
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No orders found matching your search.
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

export default Orders;
