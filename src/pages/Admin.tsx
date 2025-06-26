import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Shield, Lock, Users, Calendar, DollarSign, CheckCircle, XCircle, Clock, Eye, Edit, Trash2, Plus, UserCheck, UserX } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

const mockListings = [
  {
    id: 1,
    seller: "Club Member #2847",
    game: "FC Zurich vs FC Basel",
    date: "2025-01-15",
    section: "Tribune A",
    price: 85,
    status: "pending",
    submittedAt: "2025-01-10T10:00:00Z"
  },
  {
    id: 2,
    seller: "Club Member #1923",
    game: "FC Zurich vs Young Boys",
    date: "2025-01-25",
    section: "Tribune B",
    price: 65,
    status: "approved",
    submittedAt: "2025-01-09T14:30:00Z"
  },
  {
    id: 3,
    seller: "Club Member #3456",
    game: "FC Zurich vs FC Basel",
    date: "2025-01-15",
    section: "Stehplatz",
    price: 45,
    status: "sold",
    submittedAt: "2025-01-08T16:45:00Z"
  }
];

const mockUsers = [
  {
    id: 1,
    name: "Hans Müller",
    email: "hans.mueller@email.ch",
    membershipId: "2847",
    status: "verified",
    joinDate: "2023-08-15",
    ticketsSold: 12,
    ticketsBought: 8
  },
  {
    id: 2,
    name: "Maria Schmidt",
    email: "maria.schmidt@email.ch",
    membershipId: "1923",
    status: "verified",
    joinDate: "2024-01-20",
    ticketsSold: 7,
    ticketsBought: 15
  },
  {
    id: 3,
    name: "Thomas Weber",
    email: "thomas.weber@email.ch",
    membershipId: "3456",
    status: "pending",
    joinDate: "2024-12-10",
    ticketsSold: 2,
    ticketsBought: 3
  },
  {
    id: 4,
    name: "Anna Zimmermann",
    email: "anna.zimmermann@email.ch",
    membershipId: "4789",
    status: "suspended",
    joinDate: "2023-05-12",
    ticketsSold: 25,
    ticketsBought: 5
  }
];

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState(mockListings);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showListingDetails, setShowListingDetails] = useState(false);

  // Game Management State
  const [games, setGames] = useState([
    { id: 1, homeTeam: "FC Zurich", awayTeam: "FC Basel", date: "2025-01-15", time: "18:30", stadium: "Letzigrund" },
    { id: 2, homeTeam: "FC Zurich", awayTeam: "Young Boys", date: "2025-01-25", time: "20:00", stadium: "Letzigrund" },
    { id: 3, homeTeam: "FC Zurich", awayTeam: "FC St. Gallen", date: "2025-02-05", time: "18:30", stadium: "Letzigrund" }
  ]);
  const [showGameDialog, setShowGameDialog] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);

  // User Management State
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  // Game Form
  const gameForm = useForm({
    defaultValues: {
      homeTeam: "",
      awayTeam: "",
      date: "",
      time: "",
      stadium: ""
    }
  });

  const handleAdminLogin = async () => {
    setIsLoading(true);
    
    // Simulate admin authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock admin credentials
    if (email === "admin@seatwell.ch" && password === "admin123") {
      setIsLoggedIn(true);
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the Seatwell Admin Panel",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin credentials",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleListingAction = async (listingId, action) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setListings(prev => prev.map(listing => 
      listing.id === listingId 
        ? { ...listing, status: action }
        : listing
    ));
    
    const actionText = action === "approved" ? "approved" : "rejected";
    toast({
      title: `Listing ${actionText}`,
      description: `The ticket listing has been ${actionText} successfully.`,
    });
    
    setIsLoading(false);
    setShowListingDetails(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      case "sold": return "bg-blue-100 text-blue-800 border-blue-200";
      case "verified": return "bg-green-100 text-green-800 border-green-200";
      case "suspended": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return <Clock className="w-3 h-3" />;
      case "approved": return <CheckCircle className="w-3 h-3" />;
      case "rejected": return <XCircle className="w-3 h-3" />;
      case "sold": return <DollarSign className="w-3 h-3" />;
      case "verified": return <UserCheck className="w-3 h-3" />;
      case "suspended": return <UserX className="w-3 h-3" />;
      default: return null;
    }
  };

  // Game Management Functions
  const handleAddGame = () => {
    setEditingGame(null);
    gameForm.reset();
    setShowGameDialog(true);
  };

  const handleEditGame = (game) => {
    setEditingGame(game);
    gameForm.reset(game);
    setShowGameDialog(true);
  };

  const handleDeleteGame = (game) => {
    setGameToDelete(game);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteGame = () => {
    setGames(prev => prev.filter(game => game.id !== gameToDelete.id));
    toast({
      title: "Game Deleted",
      description: "The game has been removed from the schedule.",
    });
    setShowDeleteConfirm(false);
    setGameToDelete(null);
  };

  const onGameSubmit = (data) => {
    if (editingGame) {
      setGames(prev => prev.map(game => 
        game.id === editingGame.id ? { ...game, ...data } : game
      ));
      toast({
        title: "Game Updated",
        description: "The game details have been updated successfully.",
      });
    } else {
      const newGame = {
        id: Math.max(...games.map(g => g.id)) + 1,
        ...data
      };
      setGames(prev => [...prev, newGame]);
      toast({
        title: "Game Added",
        description: "New game has been added to the schedule.",
      });
    }
    setShowGameDialog(false);
  };

  // User Management Functions
  const handleUserStatusChange = async (userId, newStatus) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    toast({
      title: "User Status Updated",
      description: `User status has been changed to ${newStatus}.`,
    });
    
    setIsLoading(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="w-full max-w-md mx-4">
          <Card className="border-blue-200 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <CardTitle className="text-3xl font-bold">Admin Portal</CardTitle>
              <CardDescription className="text-base">
                Secure access to Seatwell administration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@seatwell.ch"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                <strong>Demo credentials:</strong><br />
                Email: admin@seatwell.ch<br />
                Password: admin123
              </div>
              
              <Button 
                onClick={handleAdminLogin}
                disabled={!email || !password || isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
              >
                {isLoading ? "Authenticating..." : "Access Admin Panel"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Seatwell Admin</h1>
                <p className="text-xs text-gray-500">Administrative Dashboard</p>
              </div>
            </div>
            
            <Button
              onClick={() => setIsLoggedIn(false)}
              variant="outline"
              size="sm"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Listings</p>
                  <p className="text-3xl font-bold text-gray-900">{listings.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {listings.filter(l => l.status === "pending").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-green-600">
                    {listings.filter(l => l.status === "approved").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tickets Sold</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {listings.filter(l => l.status === "sold").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Ticket Listings
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Game Management
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              User Management
            </TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Ticket Listings Management
                </CardTitle>
                <CardDescription>
                  Review, approve, or reject ticket listings from season ticket holders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <Card key={listing.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{listing.game}</h3>
                              <Badge className={getStatusColor(listing.status)}>
                                {getStatusIcon(listing.status)}
                                <span className="ml-1 capitalize">{listing.status}</span>
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>Seller: {listing.seller}</div>
                              <div>Section: {listing.section} • Price: CHF {listing.price}</div>
                              <div>Submitted: {new Date(listing.submittedAt).toLocaleDateString('de-CH')}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedListing(listing);
                                setShowListingDetails(true);
                              }}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            
                            {listing.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleListingAction(listing.id, "approved")}
                                  className="bg-green-600 hover:bg-green-700"
                                  disabled={isLoading}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleListingAction(listing.id, "rejected")}
                                  disabled={isLoading}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Games Tab - Enhanced */}
          <TabsContent value="games">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Game Schedule Management
                </CardTitle>
                <CardDescription>
                  Manage upcoming games and their ticket availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {games.map((game) => (
                    <Card key={game.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {game.homeTeam} vs {game.awayTeam}
                            </h3>
                            <div className="text-sm text-gray-600">
                              <div>{new Date(game.date).toLocaleDateString('de-CH')} at {game.time}</div>
                              <div>{game.stadium}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditGame(game)}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleDeleteGame(game)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button 
                    onClick={handleAddGame}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Game
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab - Enhanced */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  User Management
                </CardTitle>
                <CardDescription>
                  Manage user accounts, permissions, and season ticket verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Membership ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>#{user.membershipId}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {getStatusIcon(user.status)}
                            <span className="ml-1 capitalize">{user.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.joinDate).toLocaleDateString('de-CH')}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Sold: {user.ticketsSold}</div>
                            <div>Bought: {user.ticketsBought}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowUserDetails(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {user.status === "pending" && (
                              <Button
                                size="sm"
                                onClick={() => handleUserStatusChange(user.id, "verified")}
                                className="bg-green-600 hover:bg-green-700"
                                disabled={isLoading}
                              >
                                Verify
                              </Button>
                            )}
                            {user.status === "verified" && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleUserStatusChange(user.id, "suspended")}
                                disabled={isLoading}
                              >
                                Suspend
                              </Button>
                            )}
                            {user.status === "suspended" && (
                              <Button
                                size="sm"
                                onClick={() => handleUserStatusChange(user.id, "verified")}
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={isLoading}
                              >
                                Reactivate
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Game Dialog */}
      <Dialog open={showGameDialog} onOpenChange={setShowGameDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingGame ? "Edit Game" : "Add New Game"}</DialogTitle>
            <DialogDescription>
              {editingGame ? "Update the game details" : "Add a new game to the schedule"}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...gameForm}>
            <form onSubmit={gameForm.handleSubmit(onGameSubmit)} className="space-y-4">
              <FormField
                control={gameForm.control}
                name="homeTeam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Home Team</FormLabel>
                    <FormControl>
                      <Input placeholder="FC Zurich" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={gameForm.control}
                name="awayTeam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Away Team</FormLabel>
                    <FormControl>
                      <Input placeholder="FC Basel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={gameForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={gameForm.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={gameForm.control}
                name="stadium"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stadium</FormLabel>
                    <FormControl>
                      <Input placeholder="Letzigrund" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowGameDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingGame ? "Update Game" : "Add Game"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Game Confirmation */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Game</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this game? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {gameToDelete && (
            <div className="py-4">
              <p className="font-medium">{gameToDelete.homeTeam} vs {gameToDelete.awayTeam}</p>
              <p className="text-sm text-gray-600">
                {new Date(gameToDelete.date).toLocaleDateString('de-CH')} at {gameToDelete.time}
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteGame}>
              Delete Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Details Dialog */}
      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about the user account
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Name</Label>
                  <p className="text-base font-semibold">{selectedUser.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Email</Label>
                  <p className="text-base">{selectedUser.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Membership ID</Label>
                  <p className="text-base">#{selectedUser.membershipId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <Badge className={getStatusColor(selectedUser.status)}>
                    {getStatusIcon(selectedUser.status)}
                    <span className="ml-1 capitalize">{selectedUser.status}</span>
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Join Date</Label>
                  <p className="text-base">{new Date(selectedUser.joinDate).toLocaleDateString('de-CH')}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Activity</Label>
                  <div className="text-base">
                    <div>Tickets Sold: {selectedUser.ticketsSold}</div>
                    <div>Tickets Bought: {selectedUser.ticketsBought}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDetails(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Listing Details Dialog */}
      <Dialog open={showListingDetails} onOpenChange={setShowListingDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ticket Listing Details</DialogTitle>
            <DialogDescription>
              Review all information for this ticket listing
            </DialogDescription>
          </DialogHeader>
          
          {selectedListing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Game</Label>
                  <p className="text-base font-semibold">{selectedListing.game}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Date</Label>
                  <p className="text-base">{new Date(selectedListing.date).toLocaleDateString('de-CH')}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Seller</Label>
                  <p className="text-base">{selectedListing.seller}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <Badge className={getStatusColor(selectedListing.status)}>
                    {getStatusIcon(selectedListing.status)}
                    <span className="ml-1 capitalize">{selectedListing.status}</span>
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Section</Label>
                  <p className="text-base">{selectedListing.section}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Price</Label>
                  <p className="text-base font-semibold text-blue-600">CHF {selectedListing.price}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Submitted</Label>
                <p className="text-base">{new Date(selectedListing.submittedAt).toLocaleString('de-CH')}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowListingDetails(false)}>
              Close
            </Button>
            {selectedListing?.status === "pending" && (
              <>
                <Button
                  onClick={() => handleListingAction(selectedListing.id, "rejected")}
                  variant="destructive"
                  disabled={isLoading}
                >
                  Reject Listing
                </Button>
                <Button
                  onClick={() => handleListingAction(selectedListing.id, "approved")}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  Approve Listing
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
