import {createContext, ReactNode} from "react";

export const formatContext = createContext(null)

export default function FormatProvider({children}: { children: ReactNode }) {

    const capitalizedName = (name: string): string => {
        return `${name.charAt(0).toUpperCase() + name.slice(1)}`
    };

    interface Birthday {
        birthday: string
    }

    const calculateAge = (profile: Birthday) => {
        const birthdate: string = profile.birthday;
        const currentDate: string = new Date().toISOString().slice(0, 10);
        return Math.floor((new Date(currentDate).getTime() - new Date(birthdate).getTime()) / 31557600000);
    };

    return (
        <formatContext.Provider value={{capitalizedName, calculateAge}}>
            {children}
        </formatContext.Provider>
    )

}