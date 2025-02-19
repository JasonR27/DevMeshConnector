import { useContext, useState, useEffect, createContext, ReactNode } from 'react';
// import { supabaseClient } from '../../config/supabase-client';
import { getUserInfo } from '../services/api';
import { AxiosResponse } from 'axios';
// import { useQuery } from '@tanstack/react-query';
import CustomToast from '../components/CustomToast';
import { logInUser as apiLogin } from '../services/api'; // Import the login function

// Create the AuthContext with the appropriate type
export const AuthContext = createContext<Partial<AuthContextType> | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState<{ title: string; message: string; variant: string } | null>({ title: 'string', message: 'string', variant: 'warning' });
    const [showToast, setShowToast] = useState(false);
    // const [tokenjwt, setTokenjwt] = useState<string>(''); 
    // const token = localStorage.getItem('token');

    const login = async (user: IPossibleUser): Promise<AxiosResponse> => {
        try {
            // const { token, user: userData } = await apiLogin(user); // Call the login API
            const response: AxiosResponse<{  user: IUser }> = await apiLogin(user);
            setUser(response.data.user); // Update the context with user data
            console.log('login on Auth.tsx login response.data.user: ', response.data.user);
            console.log('login on Auth.tsx login user state: ', user);
            setToastMessage({
                title: 'User  Info fetched',
                message: 'Successfully fetched user information',
                variant: 'success',
            });
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Handle error as needed
        }
    };

    useEffect(() => {
        
        const setData = async () => {
            setLoading(false);
            try {
                console.log('in useffect Auth, setData')
                // console.log('token: ', token)
                const response: AxiosResponse<{ user: IUser }> = await getUserInfo();
                // removes sensitive data from the user info on context here 
                console.log('response.data.user: ', response.data.user)
                setUser(response.data.user); // Update the context with user data
                console.log('user: ', user)
                
                // reminder! also change db model to store token and secret on separate table with higher RLS security
                setToastMessage({
                    title: 'User Info fetched',
                    message: 'Successfully fetched user information',
                    variant: 'success',
                });
            } catch (error) {
                console.error('Couldnt fetch user data:', error);
                setToastMessage({
                    title: 'User Info couldnt be fetched',
                    message: 'Couldnt fetched user info',
                    variant: 'Warning',
                });
                throw error; // Handle error as needed
            }
        };

        setData();

        return () => {
            // Cleanup if needed
        };
    }, []);

    // AuthContextType

    return (
        <AuthContext.Provider value={{ user, setUser, login }}>
            {toastMessage && (
                <CustomToast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    title={toastMessage.title}
                    message={toastMessage.message}
                    variant={toastMessage.variant}
                />
            )}
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Export the useAuth hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 