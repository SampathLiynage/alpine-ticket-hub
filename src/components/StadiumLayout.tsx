
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
  // Filter out standing tickets and group by section
  const seatTickets = tickets.filter(ticket => ticket.row !== "-");
  const ticketsBySection = seatTickets.reduce((acc, ticket) => {
    if (!acc[ticket.section]) {
      acc[ticket.section] = [];
    }
    acc[ticket.section].push(ticket);
    return acc;
  }, {} as Record<string, Ticket[]>);

  // Pre-booked seats (simulate some already booked seats)
  const preBookedSeats = [2, 5, 8, 15, 22, 28, 35];
  const allBookedSeats = [...bookedSeats, ...preBookedSeats];

  const sectionColors = {
    'Tribune A': 'bg-blue-100 border-blue-300',
    'Tribune B': 'bg-red-100 border-red-300',
    'Tribune C': 'bg-purple-100 border-purple-300',
    'Haupttribüne': 'bg-green-100 border-green-300',
    'Gegentribüne': 'bg-yellow-100 border-yellow-300',
    'Tribune Nord': 'bg-indigo-100 border-indigo-300',
    'Tribune Sud': 'bg-pink-100 border-pink-300',
    'Tribune Ovest': 'bg-orange-100 border-orange-300',
    'Tribune Principal': 'bg-teal-100 border-teal-300',
    'Tribune Latéral': 'bg-cyan-100 border-cyan-300'
  };

  const getSectionColor = (section: string) => {
    return sectionColors[section] || 'bg-gray-100 border-gray-300';
  };

  // Get sections for top and bottom
  const sectionNames = Object.keys(ticketsBySection);
  const topSections = sectionNames.slice(0, 3);
  const bottomSections = sectionNames.slice(3, 6);

  const renderSection = (sectionName: string) => {
    const sectionTickets = ticketsBySection[sectionName] || [];
    if (sectionTickets.length === 0) return null;

    // Group tickets by row for better organization
    const ticketsByRow = sectionTickets.reduce((acc, ticket) => {
      if (!acc[ticket.row]) {
        acc[ticket.row] = [];
      }
      acc[ticket.row].push(ticket);
      return acc;
    }, {} as Record<string, Ticket[]>);

    const rows = Object.keys(ticketsByRow).sort((a, b) => parseInt(a) - parseInt(b));

    return (
      <div key={sectionName} className={`${getSectionColor(sectionName)} rounded-lg p-3 border-2`}>
        <div className="text-center mb-2">
          <Badge variant="outline" className="text-xs font-semibold">
            {sectionName}
          </Badge>
        </div>
        
        <div className="space-y-1">
          {rows.map(rowNumber => {
            const rowTickets = ticketsByRow[rowNumber].sort((a, b) => parseInt(a.seat) - parseInt(b.seat));
            return (
              <div key={rowNumber} className="flex items-center gap-1">
                <div className="text-xs text-gray-500 w-6 text-center">R{rowNumber}</div>
                <div className="flex gap-1">
                  {rowTickets.map((ticket) => {
                    const isBooked = allBookedSeats.includes(ticket.id);
                    
                    return (
                      <button
                        key={ticket.id}
                        onClick={() => !isBooked && onSeatSelect(ticket)}
                        disabled={isBooked}
                        className={`
                          w-6 h-6 rounded text-xs font-semibold transition-all duration-200 flex items-center justify-center
                          ${isBooked 
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                            : 'bg-green-500 text-white hover:bg-green-600 hover:scale-110 cursor-pointer'
                          }
                        `}
                        title={
                          isBooked 
                            ? `Seat booked - Row ${ticket.row}, Seat ${ticket.seat}` 
                            : `Row ${ticket.row}, Seat ${ticket.seat} - CHF ${ticket.price}`
                        }
                      >
                        {ticket.seat}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-xs text-gray-600 mt-2 text-center">
          {sectionTickets.filter(t => !allBookedSeats.includes(t.id)).length} available
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Stadium Layout</h2>
      
      <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-lg p-6">
        {/* Top Sections */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {topSections.map(sectionName => renderSection(sectionName))}
        </div>

        {/* Playing Field */}
        <div className="bg-white rounded-lg p-4 my-6 mx-8">
          <div className="h-24 bg-green-500 rounded flex items-center justify-center relative">
            <span className="text-white font-semibold">PLAYING FIELD</span>
            <div className="absolute top-2 left-2 w-8 h-8 border-2 border-white rounded"></div>
            <div className="absolute top-2 right-2 w-8 h-8 border-2 border-white rounded"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-2 border-white rounded"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-2 border-white rounded"></div>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-3 gap-4">
          {bottomSections.map(sectionName => renderSection(sectionName))}
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
        </div>
      </div>
    </div>
  );
};

export default StadiumLayout;
