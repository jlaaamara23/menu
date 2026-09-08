import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import ToastContainer from './components/ui/Toast'
import AdminLayout, { ProtectedRoute } from './components/admin/AdminLayout'
import MenuPage from './pages/MenuPage'
import AdminLoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import ProductsPage from './pages/admin/ProductsPage'
import CategoriesPage from './pages/admin/CategoriesPage'
import ImagesPage from './pages/admin/ImagesPage'
import SettingsPage from './pages/admin/SettingsPage'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MenuPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="images" element={<ImagesPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
