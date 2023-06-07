import { call, takeEvery, put } from "redux-saga/effects";
import { sagaActions } from "./sagaActions";
import { IProduct } from "model/typescript";
import axios from "axios";

export async function fetchProducts(): Promise<IProduct[]> {
  return await axios.get(`https://fakestoreapi.com/products`);
}

function* fetchProductsSaga() {
  try {
    const { data } = yield call(fetchProducts);
    console.log(data);
    yield put({ type: "PRODUCTS_FETCH_SUCCEEDED", products: data });
  } catch (e) {
    // yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_PRODUCTS_SAGA, fetchProductsSaga);
}
