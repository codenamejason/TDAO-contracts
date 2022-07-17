import axios from "axios";
import React, { useEffect, useState } from "react";

const server = "http://localhost:4001";

const Notifications = ({ address }) => {
  const [notifications, setNotifications] = useState([{ id: 1, message: "this is a test notification!" }]);

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
    <div>
      <div>
        {notifications.length > 0 ? (
          notifications.map((item, index) => {
            return (
              <div>
                <div>
                  ID: {item.id} Message: {item.message}
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
