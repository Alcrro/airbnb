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
}

const NavbarContext = createContext<INavbar>({
  isActive: -1,
  setIsActive: (): number => 0,
});

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(0);

  return (
    <NavbarContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => useContext(NavbarContext);
