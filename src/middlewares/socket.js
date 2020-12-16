export default function socketMiddlewate(store) {
  return next => action => {
    return next(action);
  };
}

