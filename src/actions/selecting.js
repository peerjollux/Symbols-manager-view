export const selectNext = prevState => {
  const { selected } = prevState;
  const length = selected.length;

  if(length > 0){
    selected[selected] = selected[selected] + 1;
  }

  const newState = { selected }

  return newState;
}
