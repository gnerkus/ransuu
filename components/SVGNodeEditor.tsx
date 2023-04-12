import { useStoreApi } from "reactflow";
import BasicFlow from "./BasicFlow";
import Group from "./Group";
import Path from "./Path";
import SVGOutput from "./SVGOutput";

export default function SVGNodeEditor() {
  return (
    <>
      <BasicFlow />
      <SVGOutput width={512} height={512}>
        <Group>
          <Path
            path={{
              points: [
                { x: 32, y: 32 },
                { x: 128, y: 32 },
                { x: 128, y: 128 },
                { x: 32, y: 128 },
              ],
              attributes: { fill: "#ff0000", stroke: "##ffffff" },
            }}
          />
        </Group>
      </SVGOutput>
    </>
  );
}
