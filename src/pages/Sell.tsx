
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, Mail, Lock, Calendar, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const clubGames = [
  { id: 1, homeTeam: "FC Zurich", awayTeam: "FC Basel", date: "2025-01-15", time: "18:30" },
  { id: 2, homeTeam: "FC Zurich", awayTeam: "Young Boys", date: "2025-01-25", time: "20:00" },
  { id: 3, homeTeam: "FC Zurich", awayTeam: "FC St. Gallen", date: "2025-02-05", time: "18:30" },
  { id: 4, homeTeam: "FC Zurich", awayTeam: "Servette FC", date: "2025-02-15", time: "16:00" },
  { id: 5, homeTeam: "FC Zurich", awayTeam: "FC Lugano", date: "2025-02-25", time: "19:30" },
];

const Sell = () => {
  const [currentStep, setCurrentStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedGames, setSelectedGames] = useState([]);
  const [bankInfo, setBankInfo] = useState({
    iban: "",
    name: "",
    address: ""
  });
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate OAuth verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock logic: only specific emails have access
    const validEmails = ["member@fczurich.ch", "season@fczurich.ch", "vip@fczurich.ch"];
    
    if (validEmails.includes(email.toLowerCase()) && password.length > 0) {
      setCurrentStep("selectGames");
      toast({
        title: "Access Granted",
        description: "Welcome back, season ticket holder!",
      });
    } else {
      setShowAccessDenied(true);
    }
    
    setIsLoading(false);
  };

  const handleGameSelection = (gameId) => {
    setSelectedGames(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  const handleSubmitListing = async () => {
    if (selectedGames.length === 0) {
      toast({
        title: "No games selected",
        description: "Please select at least one game to list.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate listing submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCurrentStep("confirmation");
    setIsLoading(false);
    
    toast({
      title: "Tickets Listed Successfully!",
      description: `${selectedGames.length} tickets have been submitted for approval.`,
    });
  };

  const renderLoginStep = () => (
    <div className="max-w-md mx-auto">
      <Card className="border-blue-200 shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Club Member Login</CardTitle>
          <CardDescription>
            Login with your club credentials to verify your season ticket
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Club Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="member@fczurich.ch"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
            <strong>Demo credentials:</strong><br />
            Email: member@fczurich.ch<br />
            Password: any password
          </div>
          
          <Button 
            onClick={handleLogin}
            disabled={!email || !password || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Verifying..." : "Verify Season Ticket"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderGameSelection = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Games to Sell</h2>
        <p className="text-lg text-gray-600">
          Choose which games you can't attend and want to resell
        </p>
      </div>

      <div className="grid gap-4">
        {clubGames.map((game) => (
          <Card key={game.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id={`game-${game.id}`}
                    checked={selectedGames.includes(game.id)}
                    onCheckedChange={() => handleGameSelection(game.id)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {game.homeTeam} vs {game.awayTeam}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(game.date).toLocaleDateString('de-CH')} at {game.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Est. Value</div>
                  <div className="font-semibold text-blue-600">CHF 65-85</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-xl">Banking Information</CardTitle>
          <CardDescription>
            Where should we send your payment when tickets sell?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="iban">IBAN</Label>
              <Input
                id="iban"
                placeholder="CH93 0076 2011 6238 5295 7"
                value={bankInfo.iban}
                onChange={(e) => setBankInfo(prev => ({ ...prev, iban: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Account Holder Name</Label>
              <Input
                id="name"
                placeholder="Max Mustermann"
                value={bankInfo.name}
                onChange={(e) => setBankInfo(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Musterstrasse 123, 8001 Zurich"
              value={bankInfo.address}
              onChange={(e) => setBankInfo(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {selectedGames.length} game{selectedGames.length !== 1 ? 's' : ''} selected
        </div>
        <Button
          onClick={handleSubmitListing}
          disabled={selectedGames.length === 0 || isLoading}
          className="bg-blue-600 hover:bg-blue-700 px-8"
        >
          {isLoading ? "Submitting..." : "List Tickets for Sale"}
        </Button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="max-w-2xl mx-auto text-center">
      <Card className="border-green-200 shadow-xl">
        <CardContent className="p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tickets Listed Successfully!
          </h2>
          
          <p className="text-lg text-gray-600 mb-6">
            Your {selectedGames.length} ticket{selectedGames.length !== 1 ? 's have' : ' has'} been submitted for admin approval. 
            You'll receive email notifications when they're approved and when they sell.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-800 space-y-1 text-left">
              <li>• Admin will review and approve your listings within 24 hours</li>
              <li>• Approved tickets will appear on the marketplace</li>
              <li>• You'll get paid within 48 hours of each sale</li>
              <li>• Seatwell takes a 5% service fee from each sale</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setCurrentStep("login");
                setSelectedGames([]);
                setEmail("");
                setPassword("");
              }}
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              List More Tickets
            </Button>
            <Button
              onClick={() => window.location.href = "/"}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Back to Homepage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      {/* Page Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Sell Your Tickets</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Turn your unused season tickets into cash. Safe, secure, and officially approved.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        {currentStep === "login" && renderLoginStep()}
        {currentStep === "selectGames" && renderGameSelection()}
        {currentStep === "confirmation" && renderConfirmation()}
      </section>

      {/* Access Denied Dialog */}
      <Dialog open={showAccessDenied} onOpenChange={setShowAccessDenied}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <DialogTitle className="text-xl text-red-900">Access Denied</DialogTitle>
            <DialogDescription className="text-base text-red-700">
              You do not own a seasonal ticket for this club. Only verified season ticket holders can sell tickets on Seatwell.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-red-50 p-4 rounded-lg mt-4 mb-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800 text-left">
                <p className="font-medium mb-1">To sell tickets, you need:</p>
                <ul className="space-y-1">
                  <li>• Valid season ticket membership</li>
                  <li>• Club-registered email address</li>
                  <li>• Account in good standing</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Button
            onClick={() => setShowAccessDenied(false)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Sell;
