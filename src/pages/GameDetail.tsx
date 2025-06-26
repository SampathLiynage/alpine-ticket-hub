import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle2, Bell } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StadiumLayout from "@/components/StadiumLayout";

const gameData = {
  1: {
    id: 1,
    homeTeam: "FC Zurich",
    awayTeam: "FC Basel",
    date: "2025-01-15",
    time: "18:30",
    stadium: "Letzigrund Stadium",
    hasTickets: true,
    ticketCount: 12,
    priceRange: "CHF 45-85",
    description: "Classic Swiss derby between two powerhouse teams",
    tickets: [
      { id: 1, section: "Tribune A", row: "12", seat: "15", price: 85, seller: "Club Member #2847" },
      { id: 2, section: "Tribune B", row: "8", seat: "22", price: 65, seller: "Club Member #1923" },
      { id: 3, section: "Stehplatz", row: "-", seat: "General", price: 45, seller: "Club Member #3456" },
      { id: 4, section: "Tribune A", row: "15", seat: "8", price: 85, seller: "Club Member #7821" },
      { id: 5, section: "Tribune C", row: "5", seat: "12", price: 75, seller: "Club Member #4567" },
      { id: 6, section: "Tribune B", row: "10", seat: "5", price: 70, seller: "Club Member #8901" },
      { id: 7, section: "Tribune A", row: "18", seat: "20", price: 85, seller: "Club Member #2345" },
      { id: 8, section: "Stehplatz", row: "-", seat: "General", price: 45, seller: "Club Member #6789" },
      { id: 9, section: "Tribune C", row: "7", seat: "9", price: 75, seller: "Club Member #1234" },
      { id: 10, section: "Tribune B", row: "12", seat: "18", price: 65, seller: "Club Member #5678" },
      { id: 11, section: "Tribune A", row: "6", seat: "11", price: 85, seller: "Club Member #9012" },
      { id: 12, section: "Tribune C", row: "14", seat: "3", price: 75, seller: "Club Member #3456" }
    ]
  },
  2: {
    id: 2,
    homeTeam: "Young Boys",
    awayTeam: "FC St. Gallen",
    date: "2025-01-18",
    time: "20:00",
    stadium: "Wankdorf Stadium",
    hasTickets: false,
    ticketCount: 0,
    priceRange: "CHF 50-90",
    description: "Exciting match at the iconic Wankdorf Stadium",
    tickets: []
  },
  3: {
    id: 3,
    homeTeam: "FC Lugano",
    awayTeam: "Grasshopper Club",
    date: "2025-01-22",
    time: "16:00",
    stadium: "Cornaredo Stadium",
    hasTickets: true,
    ticketCount: 8,
    priceRange: "CHF 35-65",
    description: "Southern Swiss football at its finest",
    tickets: [
      { id: 1, section: "Tribune Nord", row: "8", seat: "12", price: 65, seller: "Club Member #1001" },
      { id: 2, section: "Tribune Sud", row: "15", seat: "6", price: 55, seller: "Club Member #1002" },
      { id: 3, section: "Curva", row: "-", seat: "General", price: 35, seller: "Club Member #1003" },
      { id: 4, section: "Tribune Ovest", row: "10", seat: "20", price: 60, seller: "Club Member #1004" },
      { id: 5, section: "Tribune Nord", row: "5", seat: "8", price: 65, seller: "Club Member #1005" },
      { id: 6, section: "Tribune Sud", row: "12", seat: "14", price: 55, seller: "Club Member #1006" },
      { id: 7, section: "Curva", row: "-", seat: "General", price: 35, seller: "Club Member #1007" },
      { id: 8, section: "Tribune Ovest", row: "7", seat: "16", price: 60, seller: "Club Member #1008" }
    ]
  },
  4: {
    id: 4,
    homeTeam: "FC Sion",
    awayTeam: "Servette FC",
    date: "2025-01-25",
    time: "19:30",
    stadium: "Stade Tourbillon",
    hasTickets: true,
    ticketCount: 5,
    priceRange: "CHF 40-75",
    description: "Mountain football meets city elegance",
    tickets: [
      { id: 1, section: "Tribune Principal", row: "10", seat: "15", price: 75, seller: "Club Member #2001" },
      { id: 2, section: "Tribune Latéral", row: "8", seat: "22", price: 60, seller: "Club Member #2002" },
      { id: 3, section: "Kop", row: "-", seat: "General", price: 40, seller: "Club Member #2003" },
      { id: 4, section: "Tribune Principal", row: "12", seat: "8", price: 75, seller: "Club Member #2004" },
      { id: 5, section: "Tribune Latéral", row: "6", seat: "18", price: 60, seller: "Club Member #2005" }
    ]
  },
  5: {
    id: 5,
    homeTeam: "FC Thun",
    awayTeam: "FC Aarau",
    date: "2025-01-28",
    time: "15:00",
    stadium: "Arena Thun",
    hasTickets: false,
    ticketCount: 0,
    priceRange: "CHF 30-55",
    description: "Challenge League excitement in Thun",
    tickets: []
  },
  6: {
    id: 6,
    homeTeam: "FC Winterthur",
    awayTeam: "FC Schaffhausen",
    date: "2025-02-01",
    time: "17:00",
    stadium: "Schützenwiese",
    hasTickets: true,
    ticketCount: 15,
    priceRange: "CHF 25-45",
    description: "Local derby in the heart of Winterthur",
    tickets: [
      { id: 1, section: "Haupttribüne", row: "5", seat: "10", price: 45, seller: "Club Member #3001" },
      { id: 2, section: "Gegentribüne", row: "8", seat: "15", price: 35, seller: "Club Member #3002" },
      { id: 3, section: "Stehplatz", row: "-", seat: "General", price: 25, seller: "Club Member #3003" },
      { id: 4, section: "Haupttribüne", row: "12", seat: "7", price: 45, seller: "Club Member #3004" },
      { id: 5, section: "Gegentribüne", row: "6", seat: "20", price: 35, seller: "Club Member #3005" },
      { id: 6, section: "Stehplatz", row: "-", seat: "General", price: 25, seller: "Club Member #3006" },
      { id: 7, section: "Haupttribüne", row: "9", seat: "12", price: 45, seller: "Club Member #3007" },
      { id: 8, section: "Gegentribüne", row: "11", seat: "8", price: 35, seller: "Club Member #3008" },
      { id: 9, section: "Stehplatz", row: "-", seat: "General", price: 25, seller: "Club Member #3009" },
      { id: 10, section: "Haupttribüne", row: "7", seat: "18", price: 45, seller: "Club Member #3010" },
      { id: 11, section: "Gegentribüne", row: "14", seat: "5", price: 35, seller: "Club Member #3011" },
      { id: 12, section: "Stehplatz", row: "-", seat: "General", price: 25, seller: "Club Member #3012" },
      { id: 13, section: "Haupttribüne", row: "15", seat: "22", price: 45, seller: "Club Member #3013" },
      { id: 14, section: "Gegentribüne", row: "3", seat: "11", price: 35, seller: "Club Member #3014" },
      { id: 15, section: "Stehplatz", row: "-", seat: "General", price: 25, seller: "Club Member #3015" }
    ]
  }
};

const GameDetail = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);

  const game = gameData[Number(gameId)];

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Header />
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Game not found</h1>
          <Button onClick={() => navigate('/buy')} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBuyTicket = async () => {
    if (!selectedTicket) return;
    
    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add the ticket to booked seats
    setBookedSeats(prev => [...prev, selectedTicket.id]);
    
    setIsBooking(false);
    setShowConfirmation(true);
    setSelectedTicket(null);
    
    toast({
      title: "Ticket Booked Successfully!",
      description: `Your ticket for ${game.homeTeam} vs ${game.awayTeam} has been reserved.`,
    });
  };

  const handleNotifyWhenAvailable = () => {
    setShowNotification(true);
    toast({
      title: "Notification Set!",
      description: `You'll be notified when tickets become available for ${game.homeTeam} vs ${game.awayTeam}.`,
    });
  };

  const handleSeatSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      {/* Back Button */}
      <div className="py-4 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/buy')}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
      </div>

      {/* Game Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {game.homeTeam} vs {game.awayTeam}
              </h1>
              <p className="text-xl text-blue-100 mb-6">{game.description}</p>
              
              <div className="space-y-2 text-blue-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg">{new Date(game.date).toLocaleDateString('de-CH')} at {game.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{game.stadium}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-lg">{game.ticketCount} tickets available</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">{game.priceRange}</div>
                <div className="text-blue-200">Price Range</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!game.hasTickets ? (
        // No Tickets Available Section
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-50 rounded-lg p-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">No Tickets Available</h2>
              <p className="text-xl text-gray-600 mb-8">
                Sorry, there are currently no tickets available for this match. 
                We'll notify you as soon as tickets become available.
              </p>
              <Button 
                onClick={handleNotifyWhenAvailable}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                <Bell className="w-5 h-5 mr-2" />
                Notify When Available
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Stadium Layout */}
          <section className="py-8 px-4 bg-white border-b">
            <StadiumLayout 
              tickets={game.tickets}
              onSeatSelect={handleSeatSelect}
              bookedSeats={bookedSeats}
            />
          </section>

          {/* Available Tickets List */}
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Tickets</h2>
              
              <div className="grid gap-4">
                {game.tickets
                  .filter(ticket => !bookedSeats.includes(ticket.id))
                  .map((ticket) => (
                  <Card key={ticket.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-600">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <Badge variant="outline" className="text-blue-700 border-blue-200">
                              {ticket.section}
                            </Badge>
                            {ticket.row !== "-" && (
                              <span className="text-sm text-gray-600">
                                Row {ticket.row}, Seat {ticket.seat}
                              </span>
                            )}
                            {ticket.row === "-" && (
                              <span className="text-sm text-gray-600">
                                {ticket.seat} Admission
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            Sold by: {ticket.seller}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              CHF {ticket.price}
                            </div>
                            <div className="text-sm text-gray-500">
                              incl. fees
                            </div>
                          </div>
                          <Button
                            onClick={() => setSelectedTicket(ticket)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                          >
                            Select Seat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {bookedSeats.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    {bookedSeats.length} seat(s) have been booked and are no longer available.
                  </p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Purchase Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              Review your ticket selection before booking
            </DialogDescription>
          </DialogHeader>
          
          {selectedTicket && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {game.homeTeam} vs {game.awayTeam}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>{new Date(game.date).toLocaleDateString('de-CH')} at {game.time}</div>
                  <div>{game.stadium}</div>
                  <div>{selectedTicket.section} - {selectedTicket.row !== "-" ? `Row ${selectedTicket.row}, Seat ${selectedTicket.seat}` : selectedTicket.seat}</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-blue-600">CHF {selectedTicket.price}</span>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedTicket(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleBuyTicket}
              disabled={isBooking}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isBooking ? "Booking..." : "Buy Ticket"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl">Ticket Booked Successfully!</DialogTitle>
            <DialogDescription className="text-base">
              Your ticket has been reserved. Check your email for booking confirmation and payment instructions.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => {
                setShowConfirmation(false);
                navigate('/buy');
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Back to Games
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notification Dialog */}
      <Dialog open={showNotification} onOpenChange={setShowNotification}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
            <DialogTitle className="text-2xl">Notification Set!</DialogTitle>
            <DialogDescription className="text-base">
              We'll send you an email as soon as tickets become available for this match.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowNotification(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default GameDetail;
