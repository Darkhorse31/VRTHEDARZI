
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBag, CreditCard, AlertTriangle } from "lucide-react";

const DashboardCard = ({ title, value, description, icon: Icon, className }: {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  className?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${className}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Customers"
          value={35}
          description="+2 this week"
          icon={Users}
          className="text-tailor-blue"
        />
        <DashboardCard
          title="Total Orders"
          value={124}
          description="12 pending orders"
          icon={ShoppingBag}
          className="text-tailor-gold"
        />
        <DashboardCard
          title="Revenue"
          value="₹24,500"
          description="+₹4,200 this week"
          icon={CreditCard}
          className="text-green-600"
        />
        <DashboardCard
          title="Delayed Orders"
          value={5}
          description="Needs attention"
          icon={AlertTriangle}
          className="text-tailor-red"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your most recent orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "ORD-124", customer: "Vikram Singh", status: "Pending", amount: "₹1,200" },
                { id: "ORD-123", customer: "Priya Sharma", status: "Delivered", amount: "₹2,500" },
                { id: "ORD-122", customer: "Ravi Kumar", status: "Paid", amount: "₹1,800" },
                { id: "ORD-121", customer: "Ananya Patel", status: "Pending", amount: "₹3,200" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{order.amount}</p>
                      <p 
                        className={`text-xs ${
                          order.status === "Delivered" 
                            ? "text-green-600" 
                            : order.status === "Pending" 
                              ? "text-amber-500" 
                              : "text-blue-600"
                        }`}
                      >
                        {order.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Popular Items</CardTitle>
            <CardDescription>Most requested items this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Formal Shirt", orders: 24, percent: 40 },
                { name: "Dress Pants", orders: 18, percent: 30 },
                { name: "Wedding Suit", orders: 12, percent: 20 },
                { name: "Kurta", orders: 6, percent: 10 },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.orders} orders</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-tailor-blue rounded-full" 
                        style={{ width: `${item.percent}%` }} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{item.percent}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
