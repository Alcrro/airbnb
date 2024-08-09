"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IWidth {
  width: null | number;
  setWidth: Dispatch<SetStateAction<null | number>>;
}

const WidthContext = createContext<IWidth>({
  width: null,
  setWidth: (): null => null,
});

export const WidthProvider = ({ children }: { children: ReactNode }) => {
  const [width, setWidth] = useState<null | number>(null);
  //   console.log(width);

  // useEffect(() => {
  //   !width === null
  //     ? null
  //     : window.addEventListener("resize", function () {
  //         setWidth(window.innerWidth);
  //       });
  // }, [width]);

  return (
    <WidthContext.Provider value={{ width, setWidth }}>
      {children}
    </WidthContext.Provider>
  );
};

export const useWidth = () => useContext(WidthContext);
