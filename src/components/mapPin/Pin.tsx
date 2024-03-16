import { memo } from 'react';

const Pin = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 0C7.5 0 4 3.5 4 8C4 14 12 24 12 24C12 24 20 14 20 8C20 3.5 16.5 0 12 0ZM12 12C10.3 12 9 10.7 9 9C9 7.3 10.3 6 12 6C13.7 6 15 7.3 15 9C15 10.7 13.7 12 12 12Z"
        fill="#FF0000"
      />
    </svg>
  );
};

const MemoizedPin = memo(Pin);

export default MemoizedPin;
