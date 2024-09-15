import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Suspense fallback={<div>Loading...</div>}>{/* Dinamik olarak yüklenen bileşenlerin yüklenmesini beklemek için kullanılır. */}
		<BrowserRouter>
			<StyleSheetManager shouldForwardProp={(prop) => prop !== "shake"}>{/* styled-components için stil özelliklerini yönetir. Belirli props'ları geçirmeyi kontrol eder. */}
				<App />
			</StyleSheetManager>
		</BrowserRouter>
	</Suspense>
);
