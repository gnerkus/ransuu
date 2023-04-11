import { ReactElement } from "react";

type GroupProps = {
  children: ReactElement | ReactElement[];
};

export default function Group({ children }: GroupProps) {
  return <g>{children}</g>;
}
