
type Props = {
  size?: number;
  alt?: string;
  className?: string;
};

const DefaultUserIcon = ({ size = 32, alt = 'App Icon', className }: Props) => {
  return (
    <img
      src="/assets/kkrn_icon_user_1.svg"
      width={size}
      height={size}
      alt={alt}
      className={className}
    />
  );
};


export default DefaultUserIcon;
