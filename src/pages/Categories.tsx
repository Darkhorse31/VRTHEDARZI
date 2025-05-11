
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
  Pencil, 
  Plus, 
  Search, 
  Trash2, 
  SquarePen,
  Menu 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  color: string;
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Shirt",
    description: "Formal and casual shirts for men",
    itemCount: 24,
    color: "#3b82f6", // blue
  },
  {
    id: "2",
    name: "Pant",
    description: "Formal and casual pants for men",
    itemCount: 18,
    color: "#10b981", // green
  },
  {
    id: "3",
    name: "Kurta",
    description: "Traditional Indian kurtas",
    itemCount: 12,
    color: "#f97316", // orange
  },
  {
    id: "4",
    name: "Suit",
    description: "Business, wedding and special event suits",
    itemCount: 8,
    color: "#8b5cf6", // purple
  },
  {
    id: "5",
    name: "Sherwani",
    description: "Traditional Indian wedding wear",
    itemCount: 6,
    color: "#ec4899", // pink
  },
  {
    id: "6",
    name: "Blazer",
    description: "Formal and semi-formal blazers",
    itemCount: 10,
    color: "#f43f5e", // rose
  },
];

const colorOptions = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#10b981" },
  { name: "Orange", value: "#f97316" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Yellow", value: "#eab308" },
  { name: "Cyan", value: "#06b6d4" },
];

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: category.color }} 
            />
            <CardTitle className="text-base">{category.name}</CardTitle>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <p className="text-xs text-muted-foreground">{category.itemCount} items</p>
        <Button variant="outline" size="sm" className="h-8">
          <SquarePen className="mr-2 h-4 w-4" />
          View Items
        </Button>
      </CardFooter>
    </Card>
  );
};

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    color: colorOptions[0].value,
  });

  const filteredCategories = mockCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Clothing Categories</h1>
        <Dialog open={openAddCategory} onOpenChange={setOpenAddCategory}>
          <DialogTrigger asChild>
            <Button className="bg-tailor-blue hover:bg-tailor-blue/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new clothing category</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Shirt, Pant, Kurta"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of the category"
                  value={newCategory.description}
                  onChange={(e) => 
                    setNewCategory({ ...newCategory, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Color Tag</Label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={cn(
                        "flex h-10 w-full items-center justify-center rounded-md border text-xs",
                        newCategory.color === color.value
                          ? "border-neutral-900 dark:border-neutral-100"
                          : "border-neutral-200 dark:border-neutral-800"
                      )}
                      style={{ 
                        backgroundColor: color.value + "20", // Add transparency 
                      }}
                      onClick={() => 
                        setNewCategory({ ...newCategory, color: color.value })
                      }
                    >
                      <span
                        className="h-6 w-6 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenAddCategory(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-tailor-blue hover:bg-tailor-blue/90"
                onClick={() => {
                  // Logic to add new category
                  setOpenAddCategory(false);
                  setNewCategory({
                    name: "",
                    description: "",
                    color: colorOptions[0].value,
                  });
                }}
              >
                Create Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No categories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
