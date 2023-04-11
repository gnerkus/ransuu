import { Point } from "@/types/path";

/**
 * Remove floating-point numbers leading zero.
 *
 * @example
 * 0.5 → .5
 *
 * @example
 * -0.5 → -.5
 */
const removeLeadingZero = (num: number): string => {
  var strNum = num.toString();

  if (0 < num && num < 1 && strNum.charAt(0) === "0") {
    strNum = strNum.slice(1);
  } else if (-1 < num && num < 0 && strNum.charAt(1) === "0") {
    strNum = strNum.charAt(0) + strNum.slice(2);
  }
  return strNum;
};

const stringifyNumber = (number: number, precision?: number) => {
  if (precision != null) {
    const ratio = 10 ** precision;
    number = Math.round(number * ratio) / ratio;
  }
  // remove zero whole from decimal number
  return removeLeadingZero(number);
};

/**
 * Elliptical arc large-arc and sweep flags are rendered with spaces
 * because many non-browser environments are not able to parse such paths
 *
 */
const stringifyArgs = (
  command: string,
  args: number[],
  precision?: number,
  disableSpaceAfterFlags?: boolean
) => {
  let result = "";
  let prev = "";
  for (let i = 0; i < args.length; i += 1) {
    const number = args[i];
    const numberString = stringifyNumber(number, precision);
    if (
      disableSpaceAfterFlags &&
      (command === "A" || command === "a") &&
      // consider combined arcs
      (i % 7 === 4 || i % 7 === 5)
    ) {
      result += numberString;
    } else if (i === 0 || numberString.startsWith("-")) {
      // avoid space before first and negative numbers
      result += numberString;
    } else if (prev.includes(".") && numberString.startsWith(".")) {
      // remove space before decimal with zero whole
      // only when previous number is also decimal
      result += numberString;
    } else {
      result += ` ${numberString}`;
    }
    prev = numberString;
  }
  return result;
};

type PathDataCommand =
  | "M"
  | "m"
  | "Z"
  | "z"
  | "L"
  | "l"
  | "H"
  | "h"
  | "V"
  | "v"
  | "C"
  | "c"
  | "S"
  | "s"
  | "Q"
  | "q"
  | "T"
  | "t"
  | "A"
  | "a";

type PathDataItem = {
  command: PathDataCommand;
  args: number[];
};

type StringifyPathDataOptions = {
  pathData: PathDataItem[];
  precision?: number;
  disableSpaceAfterFlags?: boolean;
};

const stringifyPathData = ({
  pathData,
  precision,
  disableSpaceAfterFlags,
}: StringifyPathDataOptions) => {
  // combine sequence of the same commands
  let combined = [] as PathDataItem[];
  for (let i = 0; i < pathData.length; i += 1) {
    const { command, args } = pathData[i];
    if (i === 0) {
      combined.push({ command, args });
    } else {
      /**
       * @type {PathDataItem}
       */
      const last = combined[combined.length - 1];
      // match leading moveto with following lineto
      if (i === 1) {
        if (command === "L") {
          last.command = "M";
        }
        if (command === "l") {
          last.command = "m";
        }
      }
      if (
        (last.command === command &&
          last.command !== "M" &&
          last.command !== "m") ||
        // combine matching moveto and lineto sequences
        (last.command === "M" && command === "L") ||
        (last.command === "m" && command === "l")
      ) {
        last.args = [...last.args, ...args];
      } else {
        combined.push({ command, args });
      }
    }
  }
  let result = "";
  for (const { command, args } of combined) {
    result +=
      command + stringifyArgs(command, args, precision, disableSpaceAfterFlags);
  }
  return result;
};

export function pointsToPath(pointsList: Point[]): string {
  const unterminatedPath = pointsList.reduce((acc, point) => {
    return `${acc} ${point.x} ${point.y}`;
  }, "M");

  return unterminatedPath + "Z";
}

export function rectToPath(
  width: number,
  height: number,
  originX: number,
  originY: number,
  precision?: number
): string {
  const pathData = [
    { command: "M" as PathDataCommand, args: [originX, originY] },
    { command: "H" as PathDataCommand, args: [originX + width] },
    { command: "V" as PathDataCommand, args: [originY + height] },
    { command: "H" as PathDataCommand, args: [originX] },
    { command: "z" as PathDataCommand, args: [] },
  ];

  return stringifyPathData({ pathData, precision });
}
