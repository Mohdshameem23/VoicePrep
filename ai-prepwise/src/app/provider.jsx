"use client"
import { supabase } from '../../services/supabaseClient';
import React, { useEffect, useState } from 'react';
import { UserDetailContext } from '../../context/userDetailContext';

function Provider({ children }) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        console.log('Provider mounted - Starting CreateNewUser');

        // Run once to populate user if already signed in
        CreateNewUser();

        // Listen for auth state changes (login, logout, token refresh)
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event, session);
            // Re-run user creation/check when auth state changes
            CreateNewUser();
        });

        return () => {
            // Unsubscribe listener on unmount
            try {
                if (authListener && typeof authListener.unsubscribe === 'function') {
                    authListener.unsubscribe();
                } else if (authListener && authListener.subscription && typeof authListener.subscription.unsubscribe === 'function') {
                    authListener.subscription.unsubscribe();
                }
            } catch (e) {
                console.warn('Failed to unsubscribe auth listener', e);
            }
        };
    }, []);

    const CreateNewUser = async () => {
        try {
            console.log('Checking current user...');
            const authResponse = await supabase.auth.getUser();
            console.log('Auth response:', authResponse);

            const { data: { user: authUser } } = authResponse;
            if (!authUser) {
                console.log('No user found');
                return;
            }
            console.log('User found:', authUser);

            console.log('Checking if user exists in database...');
            let { data: existingUsers, error: selectError } = await supabase
                .from('users')
                .select("*")
                .eq('email', authUser.email);

            console.log('Database query response:', { existingUsers, selectError });

            if (selectError) {
                console.error('Error checking user:', selectError);
                return;
            }

            if (!existingUsers || existingUsers.length === 0) {
                console.log('User not found in database, creating new user...');
                const userData = {
                    email: authUser.email,
                    name: authUser.user_metadata?.full_name,
                    picture: authUser.user_metadata?.avatar_url
                };
                console.log('Attempting to insert user data:', userData);

                const { data: newUser, error: insertError } = await supabase
                    .from('users')
                    .insert([userData]);

                if (insertError) {
                    console.error('Error creating user:', insertError);
                    return;
                }
                console.log('New user successfully created:', newUser);
                setUser(newUser[0]);
            } else {
                console.log('Existing user found:', existingUsers);
                setUser(existingUsers[0]);
            }
        } catch (error) {
            console.error('Authentication error:', error);
            console.error('Error stack:', error.stack);
        }
    };

    return (
        <>
        <UserDetailContext.Provider value={{user,setUser}}>
            {children}
        </UserDetailContext.Provider>
        </>
    );
}

    export default Provider;
