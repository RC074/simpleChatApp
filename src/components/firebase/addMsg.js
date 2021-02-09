import { firestore } from "./firebase";
import { fb } from "./firebase";

const addMsg = async (user, content) => {
  firestore.collection("chat").add({
    user,
    content,
    timestamp: fb.firestore.FieldValue.serverTimestamp(),
  });
  const snapShot = await firestore
    .collection("chat")
    .orderBy("timestamp", "asc")
    .get();
  if (snapShot.docs.length >= 10) {
    await firestore.collection("chat").doc(snapShot.docs[0].id).delete();
  }
};

export default addMsg;
