import BasicFlow from "./BasicFlow";
import Group from "./Group";
import Rect from "./Rect";
import SVGOutput from "./SVGOutput";

export default function SVGNodeEditor() {
  return (
    <>
      <BasicFlow />
      <SVGOutput width={512} height={512}>
        <Group>
          <Rect width={64} height={64} x={32} y={32} />
        </Group>
      </SVGOutput>
    </>
  );
}
