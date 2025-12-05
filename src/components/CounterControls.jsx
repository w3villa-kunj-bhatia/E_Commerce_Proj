import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../redux/counterSlice.js";
import styles from "../App.module.css";

function CounterControls() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.counter.value);

  return (
    <div className={styles.card}>
      <h2>Global Counter</h2>
      <p>Current value: {value}</p>
      <div className={styles.btnRow}>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        <button onClick={() => dispatch(increment())}>+1</button>
      </div>
    </div>
  );
}

export default CounterControls;
