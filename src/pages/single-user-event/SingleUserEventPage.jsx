import { format } from 'date-fns';
import React from 'react';

const SingleUserEventPage = () => {
  const response = {
    'Total Tickets': 1000,
    'Total Tickets Sold': 700,
    Categories: [
      {
        CategoryID: '1',
        Name: 'General Admission',
        Price: 50,
        'Max Limit': 500,
        'Tickets Sold': 300,
        'Tickets Left': 200,
        'Max Per Person': 5,
        highest_bid: 150,
        lowest_resold: 25,
        highest_resold: 100
      },
      {
        CategoryID: '2',
        Name: 'VIP',
        Price: 100,
        'Max Limit': 200,
        'Tickets Sold': 100,
        'Tickets Left': 100,
        'Max Per Person': 3,
        highest_bid: 300,
        lowest_resold: 50,
        highest_resold: 200
      }
    ],
    'Attendee List': [
      {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'johndoe@example.com',
        CreationDate: '2022-01-01T12:00:00',
        Status: 'Checked_In',
        TransactionID: '12345'
      },
      {
        FirstName: 'Jane',
        LastName: 'Smith',
        Email: 'janesmith@example.com',
        CreationDate: '2022-01-02T10:00:00',
        Status: 'Checked_In',
        TransactionID: '67890'
      }
    ],
    'Resold Tickets': 50,
    'Total Resold Revenue': 2500,
    'Resold Revenue Share to Business': 1250,
    'Total Revenue': 5000
  };

  const {
    'Total Tickets': totalTickets,
    'Total Tickets Sold': totalTicketsSold,
    Categories,
    'Attendee List': attendeeList,
    'Resold Tickets': resoldTickets,
    'Total Resold Revenue': totalResoldRevenue,
    'Resold Revenue Share to Business': resoldRevenueShare,
    'Total Revenue': totalRevenue
  } = response;

  const percentageSold = (totalTicketsSold / totalTickets) * 100;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-medium">Organizer Dashboard</h1>

      {/* Ticket Summary */}
      <div className="mb-12">
        <h2 className="mb-4 text-xl font-medium">Ticket Summary</h2>
        <div className="p-4 text-gray-600 bg-gray-100 border rounded-lg">
          <div className="mb-4">
            <p>Total Tickets: {totalTickets}</p>
            <p>Total Tickets Sold: {totalTicketsSold}</p>
          </div>
          <div className="relative h-3 bg-gray-200 rounded-md">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-md"
              style={{ width: `${percentageSold}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {percentageSold.toFixed(2)}% Tickets Sold
          </p>
        </div>
      </div>

      {/* Ticket Categories */}
      <div className="mb-12">
        <h2 className="mb-4 text-xl font-medium">Ticket Categories</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Categories.map((category, index) => (
            <div
              key={index}
              className="p-4 text-gray-600 bg-gray-100 border rounded-lg"
            >
              <h3 className="mb-2 text-lg font-medium text-black">
                {category.Name}
              </h3>
              <p>Price: ${category.Price}</p>
              <p>Max Limit: {category['Max Limit']}</p>
              <p>Tickets Sold: {category['Tickets Sold']}</p>
              <p>Tickets Left: {category['Tickets Left']}</p>
              <p>Max Per Person: {category['Max Per Person']}</p>
              <p>Highest Bid: ${category.highest_bid}</p>
              <p>Lowest Resold: ${category.lowest_resold}</p>
              <p>Highest Resold: ${category.highest_resold}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="p-4 mb-12 text-gray-600 bg-gray-100 border rounded-lg">
        <h2 className="mb-4 text-xl font-medium text-black">Revenue Summary</h2>
        <p>Resold Tickets: {resoldTickets}</p>
        <p>Total Resold Revenue: ${totalResoldRevenue}</p>
        <p>Resold Revenue Share to Business: ${resoldRevenueShare}</p>
        <p>Total Revenue: ${totalRevenue}</p>
      </div>

      {/* Attendee List */}
      <div className="mb-12">
        <h2 className="mb-4 text-xl font-medium">Attendee List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="font-medium border-b">
              <tr>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Purchase Date</th>
                {/* Add more columns if needed */}
              </tr>
            </thead>
            <tbody>
              {attendeeList.map((attendee, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{attendee.FirstName}</td>
                  <td className="px-4 py-2">{attendee.LastName}</td>
                  <td className="px-4 py-2">{attendee.Email}</td>
                  <td className="px-4 py-2">
                    {format(attendee.CreationDate, 'dd MMM yyyy')}
                  </td>
                  {/* Add more columns if needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleUserEventPage;
