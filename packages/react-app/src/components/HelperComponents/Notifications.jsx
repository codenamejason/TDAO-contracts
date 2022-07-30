import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";

const NotificationCard = lazy(() => import("./NotificationCard.jsx"));

const server = "http://localhost:4001";

const Notifications = ({ address }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "this is a test notification!", state: "Published" },
    { id: 2, message: "this is a test notification!", state: "Comment" },
    { id: 3, message: "this is a test notification!", state: "Rejected" },
  ]);

  // get the notifs on page load
  useEffect(() => {
    const getNotificationsForUser = async () => {
      try {
        const response = await axios.get(`${server}/api/notifications/`, {
          walletId: address,
        });
        if (response?.data?.success) {
        } else {
          //
          setNotifications(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // getNotificationsForUser();
  }, [address]);

  return (
    <div className="flex flex-col p-8 bg-white space-y-4">
      <div className="ml-1 -mt-1 font-bold cursor-pointer text-xl text-left">Notifications</div>
      <div>
        {notifications.length > 0 ? (
          notifications.map((item, index) => {
            return (
              <Suspense fallback={<div>Loading Notifications...</div>}>
                <NotificationCard key={index} state={item.state}></NotificationCard>
              </Suspense>
            );
          })
        ) : (
          <div>You have no Notifications</div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
