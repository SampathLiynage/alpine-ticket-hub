
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Ticket {
  id: number;
  section: string;
  row: string;
  seat: string;
  price: number;
  seller: string;
  seatId: string;
}

interface StadiumLayoutProps {
  availableTickets: Ticket[];
  selectedSeat: string | null;
  onSeatSelect: (seatId: string) => void;
}

const StadiumLayout = ({ availableTickets, selectedSeat, onSeatSelect }: StadiumLayoutProps) => {
  // Create a comprehensive stadium layout
  const createSeatGrid = (section: string, rows: number, seatsPerRow: number, startRow = 1) => {
    const seats = [];
    for (let row = startRow; row < startRow + rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId = `${section}${row}-${seat}`;
        const isAvailable = availableTickets.some(ticket => ticket.seatId === seatId);
        const isSelected = selectedSeat === seatId;
        const ticket = availableTickets.find(t => t.seatId === seatId);
        
        seats.push({
          id: seatId,
          row,
          seat,
          section,
          isAvailable,
          isSelected,
          price: ticket?.price || 0,
          isVIP: section === 'VIP'
        });
      }
    }
    return seats;
  };

  // Generate seats for different sections
  const vipSeats = createSeatGrid('VIP', 3, 8, 1);
  const tribuneASeats = createSeatGrid('A', 8, 12, 5);
  const tribuneBSeats = createSeatGrid('B', 8, 12, 4);
  const tribuneCSeats = createSeatGrid('C', 6, 10, 6);
  
  // Standing area (Stehplatz) - represented as general admission blocks
  const stehplatzAreas = [
    { id: 'ST-001', section: 'Stehplatz', isAvailable: availableTickets.some(t => t.seatId === 'ST-001') },
    { id: 'ST-002', section: 'Stehplatz', isAvailable: availableTickets.some(t => t.seatId === 'ST-002') },
    { id: 'ST-003', section: 'Stehplatz', isAvailable: availableTickets.some(t => t.seatId === 'ST-003') },
    { id: 'ST-004', section: 'Stehplatz', isAvailable: availableTickets.some(t => t.seatId === 'ST-004') },
  ];

  const renderSeat = (seat: any) => {
    const baseClasses = "w-4 h-4 rounded-sm cursor-pointer transition-all duration-200 border";
    let seatClasses = baseClasses;
    
    if (seat.isSelected) {
      seatClasses += " bg-green-500 border-green-600 scale-110";
    } else if (seat.isAvailable) {
      if (seat.isVIP) {
        seatClasses += " bg-purple-400 border-purple-500 hover:bg-purple-500";
      } else {
        seatClasses += " bg-blue-400 border-blue-500 hover:bg-blue-500";
      }
    } else {
      seatClasses += " bg-gray-200 border-gray-300 cursor-not-allowed";
    }

    return (
      <div
        key={seat.id}
        className={seatClasses}
        onClick={() => seat.isAvailable && onSeatSelect(seat.id)}
        title={seat.isAvailable ? `${seat.section} Row ${seat.row} Seat ${seat.seat} - CHF ${seat.price}` : 'Not available'}
      />
    );
  };

  const renderStehplatz = (area: any) => {
    const isSelected = selectedSeat === area.id;
    let areaClasses = "w-16 h-8 rounded cursor-pointer transition-all duration-200 border-2 flex items-center justify-center text-xs font-medium";
    
    if (isSelected) {
      areaClasses += " bg-green-500 border-green-600 text-white scale-105";
    } else if (area.isAvailable) {
      areaClasses += " bg-yellow-400 border-yellow-500 text-yellow-900 hover:bg-yellow-500";
    } else {
      areaClasses += " bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed";
    }

    return (
      <div
        key={area.id}
        className={areaClasses}
        onClick={() => area.isAvailable && onSeatSelect(area.id)}
        title={area.isAvailable ? `Standing Area - Available` : 'Not available'}
      >
        ST
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Legend */}
      <div className="flex justify-center gap-6 mb-8 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-400 border border-purple-500 rounded-sm"></div>
          <span className="text-sm">VIP Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 border border-blue-500 rounded-sm"></div>
          <span className="text-sm">Regular Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded-sm"></div>
          <span className="text-sm">Standing Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 border border-green-600 rounded-sm"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded-sm"></div>
          <span className="text-sm">Not Available</span>
        </div>
      </div>

      {/* Stadium Layout */}
      <div className="bg-gradient-to-b from-green-100 to-green-200 rounded-lg p-8">
        {/* VIP Section */}
        <div className="text-center mb-6">
          <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 mb-2">
            VIP Section
          </Badge>
          <div className="grid grid-cols-8 gap-1 justify-center max-w-xs mx-auto">
            {vipSeats.map(renderSeat)}
          </div>
        </div>

        {/* Tribune A */}
        <div className="mb-6">
          <div className="text-center mb-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
              Tribune A
            </Badge>
          </div>
          <div className="grid grid-cols-12 gap-1 justify-center max-w-md mx-auto">
            {tribuneASeats.map(renderSeat)}
          </div>
        </div>

        {/* Playing Field */}
        <div className="bg-white rounded p-4 mb-6 mx-auto max-w-lg">
          <div className="text-sm text-gray-600 mb-2 text-center">PITCH</div>
          <div className="h-24 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white font-semibold">Playing Field</span>
          </div>
        </div>

        {/* Tribune B */}
        <div className="mb-6">
          <div className="text-center mb-2">
            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
              Tribune B
            </Badge>
          </div>
          <div className="grid grid-cols-12 gap-1 justify-center max-w-md mx-auto">
            {tribuneBSeats.map(renderSeat)}
          </div>
        </div>

        {/* Standing Areas */}
        <div className="mb-6">
          <div className="text-center mb-2">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
              Stehplatz (Standing)
            </Badge>
          </div>
          <div className="flex justify-center gap-4">
            {stehplatzAreas.map(renderStehplatz)}
          </div>
        </div>

        {/* Tribune C */}
        <div>
          <div className="text-center mb-2">
            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
              Tribune C
            </Badge>
          </div>
          <div className="grid grid-cols-10 gap-1 justify-center max-w-sm mx-auto">
            {tribuneCSeats.map(renderSeat)}
          </div>
        </div>
      </div>

      {/* Selected Seat Info */}
      {selectedSeat && (
        <div className="mt-6 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            {(() => {
              const ticket = availableTickets.find(t => t.seatId === selectedSeat);
              if (ticket) {
                return (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Selected Seat</h3>
                    <p className="text-sm text-gray-600">
                      {ticket.section} {ticket.row !== "-" ? `- Row ${ticket.row}, Seat ${ticket.seat}` : `- ${ticket.seat}`}
                    </p>
                    <p className="text-lg font-bold text-blue-600 mt-1">
                      CHF {ticket.price}
                    </p>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default StadiumLayout;
