import { ReactElement } from "react";

type CustomNodeWrapperProps = {
  children: ReactElement | ReactElement[];
};

function CustomNodeWrapper({ children }: CustomNodeWrapperProps) {
  return (
    <div className="svgGenNode min-w-[200px] active:border active:border-gray-500 active:rounded-lg">
      {children}
    </div>
  );
}

export default CustomNodeWrapper;
