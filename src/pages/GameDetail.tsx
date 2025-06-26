
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle2 } from "lucide-react";
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
      { id: 1, section: "Tribune A", row: "12", seat: "15", price: 85, seller: "Club Member #2847", seatId: "A12-15" },
      { id: 2, section: "Tribune B", row: "8", seat: "22", price: 65, seller: "Club Member #1923", seatId: "B8-22" },
      { id: 3, section: "Stehplatz", row: "-", seat: "General", price: 45, seller: "Club Member #3456", seatId: "ST-001" },
      { id: 4, section: "Tribune A", row: "15", seat: "8", price: 85, seller: "Club Member #7821", seatId: "A15-8" },
      { id: 5, section: "Tribune C", row: "5", seat: "12", price: 75, seller: "Club Member #4567", seatId: "C5-12" },
    ]
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
    description: "Exciting match between two competitive teams",
    tickets: [
      { id: 1, section: "VIP", row: "1", seat: "5", price: 65, seller: "Club Member #1234", seatId: "VIP1-5" },
      { id: 2, section: "Tribune A", row: "10", seat: "12", price: 55, seller: "Club Member #5678", seatId: "A10-12" },
      { id: 3, section: "Tribune B", row: "7", seat: "18", price: 45, seller: "Club Member #9012", seatId: "B7-18" },
      { id: 4, section: "Tribune C", row: "12", seat: "6", price: 40, seller: "Club Member #3456", seatId: "C12-6" },
      { id: 5, section: "Stehplatz", row: "-", seat: "General", price: 35, seller: "Club Member #7890", seatId: "ST-002" },
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
    description: "Mountain derby with passionate fans",
    tickets: [
      { id: 1, section: "VIP", row: "2", seat: "8", price: 75, seller: "Club Member #2468", seatId: "VIP2-8" },
      { id: 2, section: "Tribune A", row: "6", seat: "14", price: 60, seller: "Club Member #1357", seatId: "A6-14" },
      { id: 3, section: "Tribune B", row: "11", seat: "20", price: 50, seller: "Club Member #9753", seatId: "B11-20" },
      { id: 4, section: "Tribune C", row: "8", seat: "9", price: 45, seller: "Club Member #8642", seatId: "C8-9" },
      { id: 5, section: "Stehplatz", row: "-", seat: "General", price: 40, seller: "Club Member #5319", seatId: "ST-003" },
    ]
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
    description: "Local rivalry with great atmosphere",
    tickets: [
      { id: 1, section: "VIP", row: "1", seat: "10", price: 45, seller: "Club Member #1111", seatId: "VIP1-10" },
      { id: 2, section: "Tribune A", row: "5", seat: "7", price: 35, seller: "Club Member #2222", seatId: "A5-7" },
      { id: 3, section: "Tribune A", row: "8", seat: "15", price: 35, seller: "Club Member #3333", seatId: "A8-15" },
      { id: 4, section: "Tribune B", row: "4", seat: "11", price: 30, seller: "Club Member #4444", seatId: "B4-11" },
      { id: 5, section: "Tribune B", row: "9", seat: "3", price: 30, seller: "Club Member #5555", seatId: "B9-3" },
      { id: 6, section: "Tribune C", row: "6", seat: "13", price: 28, seller: "Club Member #6666", seatId: "C6-13" },
      { id: 7, section: "Tribune C", row: "10", seat: "8", price: 28, seller: "Club Member #7777", seatId: "C10-8" },
      { id: 8, section: "Stehplatz", row: "-", seat: "General", price: 25, seller: "Club Member #8888", seatId: "ST-004" },
    ]
  }
};

const GameDetail = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

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

  const handleSeatSelect = (seatId) => {
    setSelectedSeat(seatId);
    const ticket = game.tickets.find(t => t.seatId === seatId);
    if (ticket) {
      setSelectedTicket(ticket);
    }
  };

  const handleBuyTicket = async () => {
    if (!selectedTicket) return;
    
    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsBooking(false);
    setShowConfirmation(true);
    
    toast({
      title: "Ticket Booked Successfully!",
      description: `Your ticket for ${game.homeTeam} vs ${game.awayTeam} has been reserved.`,
    });
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

      {/* Stadium Layout */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Stadium Layout - Select Your Seat</h2>
          <StadiumLayout
            availableTickets={game.tickets}
            selectedSeat={selectedSeat}
            onSeatSelect={handleSeatSelect}
          />
        </div>
      </section>

      {/* Available Tickets */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Tickets</h2>
          
          <div className="grid gap-4">
            {game.tickets.map((ticket) => (
              <Card 
                key={ticket.id} 
                className={`hover:shadow-lg transition-shadow border-l-4 cursor-pointer ${
                  selectedTicket?.id === ticket.id ? 'border-l-green-600 bg-green-50' : 'border-l-blue-600'
                }`}
                onClick={() => {
                  setSelectedTicket(ticket);
                  setSelectedSeat(ticket.seatId);
                }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <Badge 
                          variant="outline" 
                          className={`text-blue-700 border-blue-200 ${
                            ticket.section === 'VIP' ? 'bg-purple-100 border-purple-200 text-purple-700' : ''
                          }`}
                        >
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTicket(ticket);
                          setSelectedSeat(ticket.seatId);
                        }}
                        className={`px-6 ${
                          selectedTicket?.id === ticket.id 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                      >
                        {selectedTicket?.id === ticket.id ? 'Selected' : 'Select Seat'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedTicket && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setSelectedTicket(selectedTicket)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                Buy Selected Ticket - CHF {selectedTicket.price}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Purchase Dialog */}
      <Dialog open={!!selectedTicket && !showConfirmation} onOpenChange={() => setSelectedTicket(null)}>
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

      <Footer />
    </div>
  );
};

export default GameDetail;
