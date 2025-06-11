
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Book, User, Calendar, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Borrowing() {
  const [searchTerm, setSearchTerm] = useState("");

  const activeBorrowings = [
    {
      id: 1,
      bookTitle: "The Great Gatsby",
      bookAuthor: "F. Scott Fitzgerald",
      memberName: "John Doe",
      borrowDate: "2024-05-15",
      dueDate: "2024-06-15",
      status: "Active",
      daysLeft: 12,
    },
    {
      id: 2,
      bookTitle: "To Kill a Mockingbird",
      bookAuthor: "Harper Lee",
      memberName: "Jane Smith",
      borrowDate: "2024-05-20",
      dueDate: "2024-06-20",
      status: "Active",
      daysLeft: 17,
    },
    {
      id: 3,
      bookTitle: "1984",
      bookAuthor: "George Orwell",
      memberName: "Alice Johnson",
      borrowDate: "2024-04-10",
      dueDate: "2024-05-10",
      status: "Overdue",
      daysLeft: -8,
    },
  ];

  const borrowingHistory = [
    {
      id: 4,
      bookTitle: "Pride and Prejudice",
      bookAuthor: "Jane Austen",
      memberName: "Bob Wilson",
      borrowDate: "2024-03-01",
      returnDate: "2024-03-28",
      status: "Returned",
    },
    {
      id: 5,
      bookTitle: "The Catcher in the Rye",
      bookAuthor: "J.D. Salinger",
      memberName: "John Doe",
      borrowDate: "2024-02-15",
      returnDate: "2024-03-10",
      status: "Returned",
    },
  ];

  const filteredActiveBorrowings = activeBorrowings.filter((borrowing) =>
    borrowing.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    borrowing.memberName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHistory = borrowingHistory.filter((borrowing) =>
    borrowing.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    borrowing.memberName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      case "Returned":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft < 0) return "text-red-600";
    if (daysLeft <= 3) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Borrowing Management</h1>
          <p className="text-muted-foreground mt-2">Track book borrowings and returns</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Borrowing
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>New Book Borrowing</DialogTitle>
              <DialogDescription>Record a new book borrowing transaction.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="member">Member</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">John Doe</SelectItem>
                    <SelectItem value="2">Jane Smith</SelectItem>
                    <SelectItem value="3">Alice Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="book">Book</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select book" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">The Great Gatsby</SelectItem>
                    <SelectItem value="2">To Kill a Mockingbird</SelectItem>
                    <SelectItem value="3">1984</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" />
              </div>
              <Button className="w-full">Record Borrowing</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by book title or member name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs for Active and History */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Borrowings ({activeBorrowings.length})</TabsTrigger>
          <TabsTrigger value="history">Borrowing History ({borrowingHistory.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredActiveBorrowings.map((borrowing) => (
              <Card key={borrowing.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{borrowing.bookTitle}</CardTitle>
                      <CardDescription>by {borrowing.bookAuthor}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(borrowing.status)}>{borrowing.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-2" />
                      {borrowing.memberName}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      Borrowed: {new Date(borrowing.borrowDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      Due: {new Date(borrowing.dueDate).toLocaleDateString()}
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <span className={`text-sm font-medium ${getDaysLeftColor(borrowing.daysLeft)}`}>
                          {borrowing.daysLeft >= 0 
                            ? `${borrowing.daysLeft} days left`
                            : `${Math.abs(borrowing.daysLeft)} days overdue`
                          }
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        Extend Due Date
                      </Button>
                      <Button size="sm" className="flex-1">
                        Mark as Returned
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredHistory.map((borrowing) => (
              <Card key={borrowing.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{borrowing.bookTitle}</CardTitle>
                      <CardDescription>by {borrowing.bookAuthor}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(borrowing.status)}>{borrowing.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-2" />
                      {borrowing.memberName}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      Borrowed: {new Date(borrowing.borrowDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      Returned: {new Date(borrowing.returnDate!).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {((filteredActiveBorrowings.length === 0 && searchTerm) || 
        (filteredHistory.length === 0 && searchTerm)) && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No borrowing records found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}
