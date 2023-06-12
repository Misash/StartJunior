import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  set,
  serverTimestamp,
} from "firebase/database";

// const firebaseConfig = {
//   apiKey: 'TU_API_KEY',
//   authDomain: 'TU_AUTH_DOMAIN',
//   databaseURL: 'TU_DATABASE_URL',
//   projectId: 'TU_PROJECT_ID',
//   storageBucket: 'TU_STORAGE_BUCKET',
//   messagingSenderId: 'TU_MESSAGING_SENDER_ID',
//   appId: 'TU_APP_ID',
// };

//FIREBASE CONFIG

const firebaseConfig = {
  apiKey: "AIzaSyCdCqnnk-dXPk-fuWXPjyiUYztvG8tDtJ0",
  authDomain: "makerpunks-d628e.firebaseapp.com",
  projectId: "makerpunks-d628e",
  storageBucket: "makerpunks-d628e.appspot.com",
  messagingSenderId: "41744131899",
  appId: "1:41744131899:web:aa149e97ec00696693391e",
  measurementId: "G-MRRG1JNW49",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

// END FIREBASE CONFIG


const formatTimestamp = (timestamp) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "America/Lima", // Set the desired timezone (e.g., Peru)
  }

  return new Date(timestamp).toLocaleString("es-PE", options);
}



function FeedbackBox(){

  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  


  const handleSubmit = () => {
    const feedbackRef = ref(database, "feedbacks");
    const newFeedbackRef = push(feedbackRef);
    set(newFeedbackRef, {
      message: feedback,
      timestamp: serverTimestamp(),
      adminTime: formatTimestamp(Date.now()) 
    });

    setFeedback("");
    setShowModal(false);
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <Button variant="info" onClick={() => setShowModal(true)}>
        Have Feedback?
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Have feedback?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="feedbackTextarea">
              <Form.Control
                as="textarea"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="See a bug? I'm a human so please be nice and I'll fix it! For Support"
                rows={4}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="info" onClick={handleSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FeedbackBox;
