"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface Guests {
  adults: number;
  children: number;
  infants: number;
}

interface INavbar {
  isActive: number;
  setIsActive: Dispatch<SetStateAction<number>>;
  indexNavbarType: number;
  setIndexNavbarType: Dispatch<SetStateAction<number>>;
  searchLocation: string;
  setSearchLocation: Dispatch<SetStateAction<string>>;
  checkIn: string;
  setCheckIn: Dispatch<SetStateAction<string>>;
  checkOut: string;
  setCheckOut: Dispatch<SetStateAction<string>>;
  guests: Guests;
  setGuests: Dispatch<SetStateAction<Guests>>;
  experienceQuery: string[];
  setExperienceQuery: Dispatch<SetStateAction<string[]>>;
}

const NavbarContext = createContext<INavbar>({
  isActive: -1,
  setIsActive: (): number => 0,
  indexNavbarType: -1,
  setIndexNavbarType: (): number => -1,
  searchLocation: "",
  setSearchLocation: () => {},
  checkIn: "",
  setCheckIn: () => {},
  checkOut: "",
  setCheckOut: () => {},
  guests: { adults: 0, children: 0, infants: 0 },
  setGuests: () => {},
  experienceQuery: [],
  setExperienceQuery: () => {},
});

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(0);
  const [indexNavbarType, setIndexNavbarType] = useState(-1);
  const [searchLocation, setSearchLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState<Guests>({ adults: 0, children: 0, infants: 0 });
  const [experienceQuery, setExperienceQuery] = useState<string[]>([]);

  return (
    <NavbarContext.Provider
      value={{
        isActive, setIsActive,
        indexNavbarType, setIndexNavbarType,
        searchLocation, setSearchLocation,
        checkIn, setCheckIn,
        checkOut, setCheckOut,
        guests, setGuests,
        experienceQuery, setExperienceQuery,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => useContext(NavbarContext);
