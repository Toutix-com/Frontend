import { format } from 'date-fns';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { privateAxiosInstance } from '../../utils/axiosConfig';
import { activeCurrency } from '../../constants/currency';

const SingleUserEventPage = () => {
  const { eventID } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [organizerData, setOrganizerData] = useState({});

  const fetchOrganizerData = async () => {
    try {
      const { data } = await privateAxiosInstance.get(
        `/organiser/${eventID}/ticket_info`
      );
      console.log(data);
      setOrganizerData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.status &&
        error.response.status === 404
      ) {
        // Redirect to login page
        navigate(routes.home);
      }
    }
  };

  useEffect(() => {
    if (!eventID) {
      // Redirect to home page
      navigate(routes.home);
      return;
    }
    fetchOrganizerData();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="container flex flex-col w-full p-4 lg:mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-medium">Organizer Dashboard</h1>

          {/* Ticket Summary */}
          <div className="mb-12">
            <h2 className="mb-4 text-xl font-medium">Ticket Summary</h2>
            <div className="p-4 text-gray-600 bg-gray-100 border rounded-lg">
              <div className="mb-4">
                <p>
                  Total Tickets: <strong>{organizerData?.Total_Tickets}</strong>{' '}
                </p>
                <p>
                  Total Tickets Sold:{' '}
                  <strong>{organizerData?.Total_Tickets_Sold}</strong>
                </p>
              </div>
              <div className="relative h-3 bg-gray-200 rounded-md">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-500 rounded-md"
                  style={{
                    width: `${
                      (organizerData?.Total_Tickets_Sold /
                        organizerData?.Total_Tickets) *
                      100
                    }%`
                  }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {(
                  (organizerData?.Total_Tickets_Sold /
                    organizerData?.Total_Tickets) *
                  100
                ).toFixed(2)}
                % Tickets Sold
              </p>
            </div>
          </div>

          {/* Ticket Categories */}
          <div className="mb-12">
            <h2 className="mb-4 text-xl font-medium">Ticket Categories</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {organizerData?.Categories.map((category, index) => (
                <div
                  key={index}
                  className="p-4 text-gray-600 bg-gray-100 border rounded-lg"
                >
                  <h3 className="mb-2 text-lg font-medium text-black">
                    {category.Name}
                  </h3>
                  <p>
                    Price: {activeCurrency}
                    {category.Price}
                  </p>
                  <p>
                    Max Limit: <strong>{category['Max Limit']}</strong>
                  </p>
                  <p>
                    Tickets Sold: <strong>{category['Tickets Sold']}</strong>
                  </p>
                  <p>
                    Tickets Left: <strong>{category['Tickets Left']}</strong>
                  </p>
                  <p>
                    Max Per Person:{' '}
                    <strong>{category['Max Per Person']}</strong>
                  </p>
                  <p>
                    Highest Bid:{' '}
                    <strong>
                      {activeCurrency}
                      {category.highest_bid}
                    </strong>
                  </p>
                  <p>
                    Lowest Resold:{' '}
                    <strong>
                      {activeCurrency}
                      {category.lowest_resold}
                    </strong>
                  </p>
                  <p>
                    Highest Resold:{' '}
                    <strong>
                      {activeCurrency}
                      {category.highest_resold}
                    </strong>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Summary */}
          <div className="p-4 mb-12 text-gray-600 bg-gray-100 border rounded-lg">
            <h2 className="mb-4 text-xl font-medium text-black">
              Revenue Summary
            </h2>
            <p>
              Resold Tickets: <strong>{organizerData?.Resold_Tickets}</strong>{' '}
            </p>
            <p>
              Total Resold Revenue:{' '}
              <strong>
                {activeCurrency}
                {organizerData?.Total_Resold_Revenue}
              </strong>
            </p>
            <p>
              Resold Revenue Share to Business:{' '}
              <strong>
                {activeCurrency}
                {organizerData?.Resold_Revenue_Share_to_Business}
              </strong>
            </p>
            <p>
              Total Revenue:{' '}
              <strong>
                {activeCurrency}
                {organizerData?.Total_Revenue}
              </strong>
            </p>
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
                  {organizerData['Attendee List']?.map((attendee, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{attendee?.FirstName}</td>
                      <td className="px-4 py-2">{attendee?.LastName}</td>
                      <td className="px-4 py-2">{attendee?.Email}</td>
                      <td className="px-4 py-2">
                        {format(attendee?.CreationDate, 'dd MMM yyyy')}
                      </td>
                      {/* Add more columns if needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SingleUserEventPage;
