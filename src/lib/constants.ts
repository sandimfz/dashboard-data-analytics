// Saat dev, gunakan '' agar fetch lewat vite proxy (/api/...)
// Saat production, set VITE_API_BASE_URL ke URL backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
