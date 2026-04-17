import React, { createContext } from "react";

const initialUserContext = {
	user: null,
	setUser: () => {}
};

export const UserDetailContext = createContext(initialUserContext);

export const useUser = () => {
	const context = React.useContext(UserDetailContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserDetailContext.Provider');
	}
	return context;
};