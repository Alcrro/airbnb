"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface INavbar {
  isActive: number;
  setIsActive: Dispatch<SetStateAction<number>>;
  indexNavbarType: number;
  setIndexNavbarType: Dispatch<SetStateAction<number>>;
}

const NavbarContext = createContext<INavbar>({
  isActive: -1,
  setIsActive: (): number => 0,
  indexNavbarType: -1,
  setIndexNavbarType: (): number => -1,
});

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(0);
  const [indexNavbarType, setIndexNavbarType] = useState(-1);

  return (
    <NavbarContext.Provider
      value={{ isActive, setIsActive, indexNavbarType, setIndexNavbarType }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => useContext(NavbarContext);
