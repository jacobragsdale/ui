// Every line breaks one rule family; test/lint.test.js asserts each is still reported.
import { Button } from "#components/ui/button";

export function Violations(props: { tone: string }) {
  const value = JSON.parse("{}") as { a: number };
  return (
    <div className="p-[13px] bg-pink-500 rounded-huge" style={{ color: "red" }}>
      <Button className="p-4">Save {value.a}</Button>
      <Button className={props.tone}>Dynamic</Button>
      <img src="x.png" />
    </div>
  );
}
