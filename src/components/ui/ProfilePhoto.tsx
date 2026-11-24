import profilePhoto from '../../assets/profile.jpg';

export function ProfilePhoto({ size = 96, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src={profilePhoto}
      width={size}
      height={size}
      alt="Portrait of Ei Chan Myat"
      className={`block object-cover ${className}`}
      style={{ width: size, height: size }}
      draggable={false}
    />
  );
}
