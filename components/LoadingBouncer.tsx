interface Props {
  style: string;
}

const LoadingBouncer = ({ style }: Props) => {
  return (
    <div className={style}>
      <div
        className={`h-4 w-4 bg-current rounded-full mr-1 animate-bounce0`}
      ></div>
      <div
        className={`h-4 w-4 bg-current rounded-full mr-1 animate-bounce200`}
      ></div>
      <div
        className={`h-4 w-4 bg-current rounded-full animate-bounce400 `}
      ></div>
    </div>
  );
};

export default LoadingBouncer;
