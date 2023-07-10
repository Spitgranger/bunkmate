declare module 'MapCardTypes' {

    /**object properties containing info about the rental unit*/
    export interface Listing {
        /**@readonly backend id*/
        readonly _id: string
        /**address of the ideal rental location*/
        address: string
        /**Number of beds, baths and square footage*/
        bedBath: string
        /**Image of the rental unit*/
        image: string
        /**Price of the rental unit*/
        price: string
    }

    /**object properties containing info about the user themselves*/
    export interface Profile {
        /**@readonly - For mongo db*/
        readonly __v: number
        /**@readonly - backend id*/
        readonly _id: string
        /**User's Biography*/
        about: string
        /**User's address*/
        address: string
        /**age of the user*/
        age: string
        /** @readonly - Birthday of the user*/
        readonly birthday: string
        /**Smokes cannabis yes or no*/
        cannabis: string
        /**City the user currently lives in*/
        city: string
        /**The rated cleanliness level of the user*/
        cleanliness: string
        /**The country the user currently resides in*/
        country: string
        /**Light, Moderate, Heavy Drinker*/
        drinking: string
        /**Highest education level so far*/
        education: string
        /**Email used to sign up for the account*/
        email: string
        /**is user currently employed yes or no*/
        employment: string
        /**User's First name*/
        firstName: string
        /**User's gender*/
        gender: string
        /**Does the user have pets*/
        havePets: string
        /**User's Last name*/
        lastName: string
        /**Current occupation if none then student*/
        occupation: string
        /**User's phone number*/
        phone: string
        /**base64 string user avatar*/
        picture: string
        /**Province the user currently resides in*/
        province: string
        /** early bird, normal, night owl*/
        sleepSchedule: string
        /** Does the user smoke yes or no*/
        smoking: string
        /** Does the user tolerate guests yes or no*/
        tolerateGuests: string
        /** Does the user tolerate pets yes or no*/
        toleratePets: string
        /**user Id*/
        readonly user: string
    }

    /**object properties containing info about the request that was made*/
    export type Request = {
        /**@readonly - For mongo db*/
        readonly __v: number
        /**@readonly - backend id*/
        readonly _id: string
        /**Group biography*/
        aboutUs: string
        /**address of dream rental location*/
        address: string
        /**Move in date*/
        dateValue: string
        /**How far the group or user is willing to move away from dream rental location if needed*/
        flexibility: string
        /**tags summarizing the group ex. lgbt friendly, non-smoker*/
        groupTags: Array<string>
        /**Lease duration*/
        idealLengthStay: string
        /**Coordinates of the rental unit*/
        idealLocation: [number, number]
        /**Attach current roommates profiles through messaging page*/
        linkChats: Array<number>
        /**@see Listing - Details on the rental unit*/
        listing: Array<Listing>
        /**Id used to return listing object*/
        listingObject: string
        /**Number of roommates the group or individual is looking for*/
        numRoommates: string
        /**@see Profile - Profiles of the group members*/
        profile: Array<Profile>
        /**Age range of the ideal roommate*/
        rangeSliderValue: [number, number]
        /**Group or individual rent budget*/
        rentBudget: number
        /**request string*/
        request: string
        /**ideal roommate gender*/
        roommateGender: string
        /**@readonly - user id*/
        readonly user: string
    }

    /**coordinates used to set a portion of the map to the center of screen*/
    export type Center = {
        //The Latitude
        lat: number
        //The Longitude
        lng: number
    }

    /**the props for the map profile card*/
    export interface MapCardProps {
        /**@see Request - See the request object shape*/
        request: Request
        /**@see Center - See the Center object shape*/
        center: Center
    }

    /**Generic Type function for adding two numbers */
    export type SumFunction = (arg_0: T, arg_1: T) => T
    /**Generic Type function for asynchronous functions */
    export type AsyncFunction<T> = (...args: T) => any
    /**Generic Type function for generic functions */
    export type GenericFunction<T> = (...args: T) => any
    /**Generic Type function for functions that perform actions */
    export type ActionHandler = (...args: T) => void;
}
