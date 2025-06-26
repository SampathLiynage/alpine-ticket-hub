
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Shield, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const upcomingGames = [
  {
    id: 1,
    homeTeam: "FC Zurich",
    awayTeam: "FC Basel",
    date: "2025-01-15",
    time: "18:30",
    stadium: "Letzigrund Stadium",
    hasTickets: true,
    ticketCount: 12
  },
  {
    id: 2,
    homeTeam: "Young Boys",
    awayTeam: "FC St. Gallen", 
    date: "2025-01-18",
    time: "20:00",
    stadium: "Wankdorf Stadium",
    hasTickets: false,
    ticketCount: 0
  },
  {
    id: 3,
    homeTeam: "FC Lugano",
    awayTeam: "Grasshopper Club",
    date: "2025-01-22",
    time: "16:00",
    stadium: "Cornaredo Stadium",
    hasTickets: true,
    ticketCount: 8
  },
  {
    id: 4,
    homeTeam: "FC Sion",
    awayTeam: "Servette FC",
    date: "2025-01-25",
    time: "19:30",
    stadium: "Stade Tourbillon",
    hasTickets: true,
    ticketCount: 5
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Trusted Swiss Platform</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Resell Your<br />
            <span className="text-blue-200">Sports Tickets</span><br />
            <span className="text-3xl lg:text-5xl font-light">Easily & Securely</span>
          </h1>
          
          <p className="text-xl lg:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Switzerland's premier platform for season ticket holders to resell tickets they can't use. 
            Safe, simple, and connected to your club membership.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/buy">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-4 h-auto font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Users className="w-5 h-5 mr-2" />
                Buy a Ticket
              </Button>
            </Link>
            <Link to="/sell">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 text-lg px-8 py-4 h-auto font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Calendar className="w-5 h-5 mr-2" />
                Sell a Ticket
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Seatwell?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The trusted platform connecting Swiss sports fans with secure ticket resale
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300 border-blue-100">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Secure & Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Only verified season ticket holders can sell. All transactions are protected and guaranteed.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300 border-blue-100">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Club Connected</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Integrated with official club systems. Your membership is verified automatically.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300 border-blue-100">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Easy Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  List tickets in seconds. Get paid instantly when they sell. No hassle, no waiting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Games on the Horizon */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Games on the Horizon</h2>
            <p className="text-xl text-gray-600">
              Upcoming matches with ticket availability
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {upcomingGames.map((game) => (
              <Card key={game.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-l-4 border-l-blue-600">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {game.homeTeam} vs {game.awayTeam}
                    </CardTitle>
                    {game.hasTickets ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                        <XCircle className="w-3 h-3 mr-1" />
                        No Tickets
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-base">
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(game.date).toLocaleDateString('de-CH')} at {game.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{game.stadium}</span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {game.hasTickets ? (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-medium">
                        {game.ticketCount} tickets available
                      </span>
                      <Link to={`/buy/game/${game.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          View Tickets
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <p className="text-gray-500 text-sm">Check back later for ticket availability</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
