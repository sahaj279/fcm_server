import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";
import cors from "cors";

//STORES THE PATH FOR THE DOWNLOADED FIREBASE PRIVATE KEY
process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());
app.use(cors());

initializeApp({
  credential: applicationDefault(),
  prijectId: "notification-fcm-6ebaf",
});

//API FOR FCM
app.post("/send", (req, res) => {
  //when data is sent through body in json form sent through thunder client or postman
  const receivedToken = req.body.fcmToken;
  const receivedTitle = req.body.title;
  const receivedBody = req.body.body;

  const message = {
    notification: {
      title: receivedTitle == null ? "title" : receivedTitle,
      body: receivedBody == null ? "body" : receivedBody,
    },
    token:
      "cPoagzLlS6K_jtjTKU5RJP:APA91bEXwFnXJ8vzH_58ydUpiDmhgW7_W83s7hRulE0Puq5FRsnRPh0pl-vGE4w1KQLnnJX8KpH8hak0x6gm__QDBh4noaPMzQo_QPubelO3Vesq6wO2kFVq8Nl787I7Kv_er_MX_j_z",
  };
  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token: receivedToken,
      });
      console.log("Successfully sent message :", response);
    })
    .catch((error) => {
      res.status(400).send(error);

      console.log("Something went wrong :", error);
    });
});

//SERVER
app.listen(3000, function () {
  console.log("Server started at 3000");
});
