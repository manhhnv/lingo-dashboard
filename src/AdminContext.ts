import { createContext, useContext } from 'react'
import { Admin } from './types/Admin'

export type AdminContextType = {
    admin: Admin;
}

export const AdminContext = createContext<AdminContextType>({admin: {}});
export const useAdmin = () => useContext(AdminContext);