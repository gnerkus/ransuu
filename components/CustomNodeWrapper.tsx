import { ReactNode } from "react";

type CustomNodeWrapperProps = {
  children: ReactNode | ReactNode[];
};

function CustomNodeWrapper({ children }: CustomNodeWrapperProps) {
  return (
    <div className="svgGenNode min-w-[200px] active:border active:border-gray-400 active:rounded-xl shadow-lg shadow-gray-200">
      {children}
    </div>
  );
}

export default CustomNodeWrapper;
