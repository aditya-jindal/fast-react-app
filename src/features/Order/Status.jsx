function Status({ children, color }) {
  return (
    <div
      className={
        color +
        " inline-block rounded-full px-2 py-1 text-sm font-semibold uppercase text-stone-100"
      }
    >
      {children}
    </div>
  );
}

export default Status;
