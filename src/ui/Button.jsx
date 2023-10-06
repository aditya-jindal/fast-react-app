function Button({ children, onClick, type, disabled }) {
  const base =
    " transition-color rounded-full bg-yellow-400 font-semibold uppercase text-stone-800 duration-300 hover:bg-yellow-300 disabled:cursor-not-allowed";
  const styles = {
    primary: base + " text-l px-4 py-2",
    secondary: base + " px-4 py-2 text-xs",
    minus: base + " px-3 py-1 text-sm ",
    plus: base + " px-2.5 py-1 text-sm ",
    clear:
      "transition-color rounded-full font-semibold uppercase text-stone-400 border-2 border-stone-300 duration-300 hover:bg-stone-200 text-l px-4 py-2",
  };
  return (
    <button
      disabled={disabled}
      type="submit"
      onClick={onClick}
      className={styles[type]}
    >
      {children}
    </button>
  );
}

export default Button;
