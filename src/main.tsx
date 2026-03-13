import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { HashRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <MantineProvider>
          <App />
        </MantineProvider>
      </HashRouter>
    </Provider>
  </StrictMode>,
)
