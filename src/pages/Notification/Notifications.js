import React, { useEffect, useState } from "react";
import "../../styles/Pages/Notifications.scss";
import Notification from "../../components/Notification/Notification";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { NotificationsOff } from "@mui/icons-material";

const Notifications = () => {

  const [notifications, setNotifications] = useState([]);

  const [user] = useAuthState(auth);

  const { data: currentUser } = useFetchUserDataQuery(user?.uid);

  useEffect(() => {
    const q = query(collection(db, `users/${currentUser?.docId}/Notifications`), orderBy('sentAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      setNotifications(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    }
    )
  }, [currentUser?.docId]);

  const NoNotification = (
    <div className="noNotification">
      <NotificationsOff sx={{ fontSize: '6rem', color: 'white' }} />
      <p>No Notification</p>
    </div>
  );

  return (
    <section className="notifications-section">
      {notifications.length !== 0 && <h1>Notifications</h1>}
      {notifications.length === 0 ? NoNotification :
        <div>
          {notifications.map(notification => (
            <Notification key={notification.id}
              notificationId={notification.id}
              sentAt={new Date(notification.data.sentAt?.toDate())}
              notificationData={notification.data} />)
          )}
        </div>
      }
    </section>
  )
};

export default Notifications;