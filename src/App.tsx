import { useRef, useState } from "react"
import { IntegerInput } from "./components/integer-input"

export function App() {
  const ref = useRef<HTMLInputElement>(null)
  const [val, setVal] = useState<number | null>(null)

  return (
    <>
      <span>name goes here</span>
      <form>
        <IntegerInput ref={ref} value={val} onChange={setVal} />
        <IntegerInput ref={ref} value={val} onChange={setVal} />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
