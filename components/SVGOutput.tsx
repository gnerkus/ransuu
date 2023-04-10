import { useEffect, useRef, useMemo } from "react";
import { SVG } from "@svgdotjs/svg.js";

export default function SVGOutput() {
  const SVGWrapperRefElement = useRef<HTMLDivElement>(null);
  const SVGContainer = useMemo(() => SVG(), []);

  const draw = () => {
    SVGContainer.add(SVG().rect(100, 100).fill("#ff0000"));
  };

  const clear = () => {
    SVGContainer.clear();
  };

  useEffect(() => {
    if (SVGWrapperRefElement?.current) {
      if (SVGWrapperRefElement?.current?.children.length < 1) {
        SVGContainer.addTo(SVGWrapperRefElement?.current).size("100%", "100%");
      }
    }
  }, [SVGWrapperRefElement, SVGContainer]);

  return (
    <div className="">
      <button onClick={draw}>Draw</button>
      <button onClick={clear}>Clear</button>
      <div ref={SVGWrapperRefElement} className="w-[512px] h-[512px]" />
    </div>
  );
}
