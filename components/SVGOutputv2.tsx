import { DAGFunctions, Shape } from "@/svggraph/types";
import { serializeAttributes } from "@/svggraph/utils";
import { stringifyPathData } from "@/utils/pointsToSVG";

/**
 * How does the render work
 *
 * Goal: we build an svg from the ground up
 *
 * Input (via props):
 *  - dagFunctions: DAGFunctions (from graph)
 *  - shape: Shape (from state)
 *
 * If there is a single item:
 * 1. create an <svg> [DONE]
 * 2. create a <g> [DONE]
 * 3. create a <path> [DONE]
 * 4. get the function from dagFunctions.path [DONE]
 * 5. apply the function to shape.path [DONE]
 * 6. stringify the result and set it as the "d" of the path [DONE]
 * 7. for each attribute [DONE]
 *  1. get the attributes function from dagFunctions
 *  2. get the original value from shape
 *  3. apply the function to the original value
 *  4. serialize the result
 *  5. set as prop
 *
 */

type SVGOutputv2Props = {
  width: number;
  height: number;
  shape: Shape;
  dagFunctions: DAGFunctions;
};

export default function SVGOutputv2({
  width,
  height,
  shape,
  dagFunctions,
}: SVGOutputv2Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
    >
      {/* main path */}
      <g {...serializeAttributes(shape.attributes, dagFunctions.attributes, 0)}>
        <path
          d={stringifyPathData({
            pathData: dagFunctions.path(shape.path, 0),
          })}
        ></path>
      </g>
    </svg>
  );
}
