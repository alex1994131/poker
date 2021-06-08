import React, { Suspense ,lazy} from "react"
import { Provider } from "react-redux"
import { Layout } from "./utility"
import { store } from "./redux/storeConfig/store"
import ReactDOM from "react-dom"
import Spinner from "./components/@vuexy/spinner/Fallback-spinner"

const LazyApp = lazy(() => import("./App"))
ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <Layout>
          <LazyApp />
        </Layout>
      </Suspense>
    </Provider>,
  document.getElementById("root")
)