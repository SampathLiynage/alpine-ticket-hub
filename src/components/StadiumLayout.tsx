
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
  // Filter out standing tickets
  const seatedTickets = tickets.filter(ticket => ticket.row !== "-");
  
  // Pre-booked seats (simulate some already sold seats)
  const preBookedSeats = [2, 5, 8, 11, 15, 18, 22, 25, 28, 31];
  const allBookedSeats = [...bookedSeats, ...preBookedSeats];
  
  // Group tickets by section
  const ticketsBySection = seatedTickets.reduce((acc, ticket) => {
    if (!acc[ticket.section]) {
      acc[ticket.section] = [];
    }
    acc[ticket.section].push(ticket);
    return acc;
  }, {} as Record<string, Ticket[]>);

  const sectionColors = {
    'Tribune A': 'bg-blue-100 border-blue-300',
    'Tribune B': 'bg-red-100 border-red-300',
    'Tribune C': 'bg-purple-100 border-purple-300',
    'Tribune Nord': 'bg-green-100 border-green-300',
    'Tribune Sud': 'bg-orange-100 border-orange-300',
    'Tribune Ovest': 'bg-pink-100 border-pink-300',
    'Tribune Principal': 'bg-blue-100 border-blue-300',
    'Tribune Latéral': 'bg-red-100 border-red-300',
    'Haupttribüne': 'bg-blue-100 border-blue-300',
    'Gegentribüne': 'bg-red-100 border-red-300'
  };

  const getSectionColor = (section: string) => {
    return sectionColors[section] || 'bg-gray-100 border-gray-300';
  };

  // Organize sections by position around the pitch
  const leftSections = [];
  const rightSections = [];
  const availableSections = Object.keys(ticketsBySection);
  
  availableSections.forEach((section, index) => {
    if (index < Math.ceil(availableSections.length / 2)) {
      leftSections.push(section);
    } else {
      rightSections.push(section);
    }
  });

  const SectionComponent = ({ section, sectionTickets }) => {
    // Sort tickets by row and seat for organized display
    const sortedTickets = sectionTickets.sort((a, b) => {
      const rowA = parseInt(a.row) || 0;
      const rowB = parseInt(b.row) || 0;
      if (rowA !== rowB) return rowA - rowB;
      return parseInt(a.seat) - parseInt(b.seat);
    });

    // Group by rows for realistic layout
    const ticketsByRow = sortedTickets.reduce((acc, ticket) => {
      if (!acc[ticket.row]) {
        acc[ticket.row] = [];
      }
      acc[ticket.row].push(ticket);
      return acc;
    }, {} as Record<string, Ticket[]>);

    return (
      <div className={`${getSectionColor(section)} rounded-lg p-3 border-2 mb-4`}>
        <div className="text-center mb-2">
          <Badge variant="outline" className="font-semibold text-xs">
            {section}
          </Badge>
        </div>
        
        {/* Rows of seats */}
        <div className="space-y-1">
          {Object.entries(ticketsByRow).map(([row, rowTickets]) => (
            <div key={row} className="flex items-center gap-1">
              <div className="text-xs text-gray-500 w-6 text-center font-mono">
                R{row}
              </div>
              <div className="flex gap-1 flex-wrap">
                {rowTickets.map((ticket) => {
                  const isBooked = allBookedSeats.includes(ticket.id);
                  const isPreBooked = preBookedSeats.includes(ticket.id);
                  
                  return (
                    <button
                      key={ticket.id}
                      onClick={() => !isBooked && onSeatSelect(ticket)}
                      disabled={isBooked}
                      className={`
                        w-6 h-6 rounded text-xs font-semibold transition-all duration-200 border
                        ${isBooked 
                          ? isPreBooked 
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed border-gray-400'
                            : 'bg-red-400 text-white cursor-not-allowed border-red-500'
                          : 'bg-green-400 text-white hover:bg-green-500 hover:scale-110 cursor-pointer border-green-500'
                        }
                      `}
                      title={
                        isBooked 
                          ? isPreBooked ? 'Already sold' : 'Just booked'
                          : `Row ${ticket.row}, Seat ${ticket.seat} - CHF ${ticket.price}`
                      }
                    >
                      {ticket.seat}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-gray-600 mt-2 text-center">
          {sectionTickets.filter(t => !allBookedSeats.includes(t.id)).length} available
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Stadium Layout</h2>
      
      {/* Stadium Container */}
      <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-lg p-6">
        <div className="flex gap-6">
          {/* Left Side Sections */}
          <div className="flex-1">
            {leftSections.map(section => (
              <SectionComponent 
                key={section} 
                section={section} 
                sectionTickets={ticketsBySection[section]} 
              />
            ))}
          </div>

          {/* Center - Pitch */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="text-sm text-gray-600 mb-2 text-center font-semibold">PITCH</div>
              <div className="h-40 bg-gradient-to-b from-green-400 to-green-500 rounded flex items-center justify-center">
                <span className="text-white font-semibold">Playing Field</span>
              </div>
            </div>
          </div>

          {/* Right Side Sections */}
          <div className="flex-1">
            {rightSections.map(section => (
              <SectionComponent 
                key={section} 
                section={section} 
                sectionTickets={ticketsBySection[section]} 
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded border border-green-500"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded border border-gray-400"></div>
            <span>Already Sold</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded border border-red-500"></div>
            <span>Just Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StadiumLayout;
