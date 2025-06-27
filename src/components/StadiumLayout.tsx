
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface Ticket {
  id: number;
  section: string;
  row: string;
  seat: string;
  price: number;
  seller: string;
}

interface StadiumLayoutProps {
  tickets: Ticket[];
  onSeatSelect: (ticket: Ticket) => void;
  bookedSeats: number[];
}

const StadiumLayout = ({ tickets, onSeatSelect, bookedSeats }: StadiumLayoutProps) => {
  // Group tickets by section for better organization
  const ticketsBySection = tickets.reduce((acc, ticket) => {
    if (!acc[ticket.section]) {
      acc[ticket.section] = [];
    }
    acc[ticket.section].push(ticket);
    return acc;
  }, {} as Record<string, Ticket[]>);

  const sectionColors = {
    'Haupttribüne': 'bg-blue-200 border-blue-400',
    'Gegentribüne': 'bg-red-200 border-red-400',
    'Stehplatz': 'bg-yellow-200 border-yellow-400',
    'Tribune A': 'bg-blue-200 border-blue-400',
    'Tribune B': 'bg-red-200 border-red-400',
    'Tribune C': 'bg-purple-200 border-purple-400',
    'Tribune Nord': 'bg-green-200 border-green-400',
    'Tribune Sud': 'bg-orange-200 border-orange-400',
    'Tribune Ovest': 'bg-pink-200 border-pink-400',
    'Curva': 'bg-yellow-200 border-yellow-400',
    'Tribune Principal': 'bg-blue-200 border-blue-400',
    'Tribune Latéral': 'bg-red-200 border-red-400',
    'Kop': 'bg-yellow-200 border-yellow-400'
  };

  const getSectionColor = (section: string) => {
    return sectionColors[section] || 'bg-gray-200 border-gray-400';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Stadium Layout</h2>
      
      {/* Stadium Container */}
      <div className="bg-gradient-to-b from-green-100 to-green-200 rounded-lg p-6">
        {/* Pitch */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600 mb-2 text-center">PITCH</div>
          <div className="h-32 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white font-semibold">Playing Field</span>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(ticketsBySection).map(([section, sectionTickets]) => (
            <div key={section} className={`${getSectionColor(section)} rounded-lg p-4 border-2`}>
              <div className="text-center mb-3">
                <Badge variant="outline" className="font-semibold">
                  {section}
                </Badge>
              </div>
              
              {/* Seats Grid */}
              <div className="grid grid-cols-4 gap-1">
                {sectionTickets.map((ticket) => {
                  const isBooked = bookedSeats.includes(ticket.id);
                  const isStanding = ticket.row === "-";
                  
                  return (
                    <button
                      key={ticket.id}
                      onClick={() => !isBooked && onSeatSelect(ticket)}
                      disabled={isBooked}
                      className={`
                        w-8 h-8 rounded text-xs font-semibold transition-all duration-200
                        ${isBooked 
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                          : 'bg-green-500 text-white hover:bg-green-600 hover:scale-110 cursor-pointer'
                        }
                        ${isStanding ? 'rounded-none' : ''}
                      `}
                      title={
                        isBooked 
                          ? 'Seat booked' 
                          : isStanding 
                            ? `Standing - CHF ${ticket.price}` 
                            : `Row ${ticket.row}, Seat ${ticket.seat} - CHF ${ticket.price}`
                      }
                    >
                      {isStanding ? 'S' : ticket.seat}
                    </button>
                  );
                })}
              </div>
              
              <div className="text-xs text-gray-600 mt-2 text-center">
                {sectionTickets.filter(t => !bookedSeats.includes(t.id)).length} available
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500"></div>
            <span>Standing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StadiumLayout;
