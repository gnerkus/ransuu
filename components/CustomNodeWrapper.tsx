import { ReactElement } from "react";

type CustomNodeWrapperProps = {
  children: ReactElement | ReactElement[];
};

function CustomNodeWrapper({ children }: CustomNodeWrapperProps) {
  return (
    <div className="svgGenNode min-w-[200px] active:border border-gray-500">
      {children}
    </div>
  );
}

export default CustomNodeWrapper;
