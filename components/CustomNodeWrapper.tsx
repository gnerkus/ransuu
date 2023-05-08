import { ReactNode } from "react";

type CustomNodeWrapperProps = {
  children: ReactNode | ReactNode[];
};

function CustomNodeWrapper({ children }: CustomNodeWrapperProps) {
  return (
    <div className="svgGenNode min-w-[200px] active:border active:border-gray-500 active:rounded-lg">
      {children}
    </div>
  );
}

export default CustomNodeWrapper;
