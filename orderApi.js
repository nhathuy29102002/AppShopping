import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import i18n from 'i18next';
import { pick } from 'lodash';

import { db } from '~/config';
import { COLLECTIONS, ORDER_STATUSES } from '~/constants';

const add = async (userId, data) => {
  try {
    const items = data.map((element) => {
      return pick(element, ['id', 'price', 'priceOld', 'quantity']);
    });

    const totalAmount = items.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0,
    );

    const userRef = doc(db, COLLECTIONS.USERS, userId);

    const docSnap = await getDoc(userRef);

    const user = docSnap.data();

    const userPick = pick(user, ['fullname', 'address', 'phoneNumber']);

    const docRef = await addDoc(collection(db, COLLECTIONS.ORDERS), {
      uid: userId,
      items: items,
      status: ORDER_STATUSES.PENDING,
      totalAmount: totalAmount,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      address: userPick,
    });

    // Add the id field
    await updateDoc(docRef, {
      id: docRef.id,
    });

    return {
      status: 'success',
    };
  } catch (error) {
    console.log(error);
  }
};

/**
 * Cập nhật lại trạng thái đơn hàng với vai trò Admin
 */
const updateStatus = async (docId, status) => {
  try {
    const docRef = doc(db, COLLECTIONS.ORDERS, docId);

    // Cập nhật field status
    await updateDoc(docRef, {
      status,
    });
    return {
      status: 'success',
      message: i18n.t('successfully'),
    };
  } catch (error) {}
};

export const orderApi = {
  add,
  updateStatus,
};
