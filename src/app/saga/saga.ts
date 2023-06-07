import { call, takeEvery, put } from "redux-saga/effects";
import { sagaActions } from "./sagaActions";
import { setProducts } from "app/slices/productSlice";
import { fetchProducts } from "api/fetchProducts";

function* fetchProductsSaga() {
  try {
    const { data } = yield call(fetchProducts);
    yield put(setProducts(data));
  } catch (e) {
    console.error("fetchProductsSaga error:", e);
  }
}

export function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_PRODUCTS_SAGA, fetchProductsSaga);
}
