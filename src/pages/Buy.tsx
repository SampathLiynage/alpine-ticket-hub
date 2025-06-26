
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Search, Filter, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const allGames = [
  {
    id: 1,
    homeTeam: "FC Zurich",
    awayTeam: "FC Basel",
    date: "2025-01-15",
    time: "18:30",
    stadium: "Letzigrund Stadium",
    hasTickets: true,
    ticketCount: 12,
    priceRange: "CHF 45-85"
  },
  {
    id: 2,
    homeTeam: "Young Boys",
    awayTeam: "FC St. Gallen", 
    date: "2025-01-18",
    time: "20:00",
    stadium: "Wankdorf Stadium",
    hasTickets: false,
    ticketCount: 0,
    priceRange: "CHF 50-90"
  },
  {
    id: 3,
    homeTeam: "FC Lugano",
    awayTeam: "Grasshopper Club",
    date: "2025-01-22",
    time: "16:00",
    stadium: "Cornaredo Stadium",
    hasTickets: true,
    ticketCount: 8,
    priceRange: "CHF 35-65"
  },
  {
    id: 4,
    homeTeam: "FC Sion",
    awayTeam: "Servette FC",
    date: "2025-01-25",
    time: "19:30",
    stadium: "Stade Tourbillon",
    hasTickets: true,
    ticketCount: 5,
    priceRange: "CHF 40-75"
  },
  {
    id: 5,
    homeTeam: "FC Thun",
    awayTeam: "FC Aarau",
    date: "2025-01-28",
    time: "15:00",
    stadium: "Arena Thun",
    hasTickets: false,
    ticketCount: 0,
    priceRange: "CHF 30-55"
  },
  {
    id: 6,
    homeTeam: "FC Winterthur",
    awayTeam: "FC Schaffhausen",
    date: "2025-02-01",
    time: "17:00",
    stadium: "Schützenwiese",
    hasTickets: true,
    ticketCount: 15,
    priceRange: "CHF 25-45"
  }
];

const Buy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredGames = allGames.filter(game => {
    const matchesSearch = game.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.stadium.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "available" && game.hasTickets) ||
                         (filterStatus === "unavailable" && !game.hasTickets);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      {/* Page Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Buy Tickets</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Find and purchase tickets from verified season ticket holders across Switzerland
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search teams or stadiums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48 h-12">
                  <SelectValue placeholder="Filter by availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                  <SelectItem value="available">Tickets Available</SelectItem>
                  <SelectItem value="unavailable">No Tickets</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Games List */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredGames.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No games found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredGames.map((game) => (
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
                      <div className="space-y-2 text-gray-600">
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
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 font-medium">
                            <Users className="w-4 h-4 inline mr-1" />
                            {game.ticketCount} tickets available
                          </span>
                          <span className="font-semibold text-blue-600">
                            {game.priceRange}
                          </span>
                        </div>
                        <Link to={`/buy/game/${game.id}`} className="block">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            View Tickets
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500 text-sm mb-2">No tickets available yet</p>
                        <Button variant="outline" disabled className="w-full">
                          Notify When Available
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Buy;
