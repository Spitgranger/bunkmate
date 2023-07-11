import {createContext, ReactNode} from "react";

interface Birthday {
    birthday: string
}

interface FormatContextProps {
    capitalizedName: (name: string) => string
    calculateAge: (profile: Birthday) => number
}

const DefaultFormatContextProps = {
    capitalizedName: () => "",
    calculateAge: () => 0
}
export const formatContext = createContext<FormatContextProps>(DefaultFormatContextProps)

export default function FormatProvider({children}: { children: ReactNode }) {

    const capitalizedName = (name: string): string => {
        return `${name.charAt(0).toUpperCase() + name.slice(1)}`
    };

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