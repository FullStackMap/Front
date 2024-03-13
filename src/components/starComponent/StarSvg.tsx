import './StarStyle.scss';

export const StarSvg = () => {
  return (
    <>
      <svg
        className="rating__star"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true">
        <g transform="translate(16,16)">
          <circle
            className="rating__star-ring"
            fill="none"
            stroke="#000"
            strokeWidth="16"
            r="8"
            transform="scale(0)"
          />
        </g>
        <g
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <g transform="translate(16,16) rotate(180)">
            <polygon
              className="rating__star-stroke"
              points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
              fill="none"
            />
            <polygon
              className="rating__star-fill"
              points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
              fill="#000"
            />
          </g>
          <g
            transform="translate(16,16)"
            strokeDasharray="12 12"
            strokeDashoffset="12">
            <polyline
              className="rating__star-line"
              transform="rotate(0)"
              points="0 4,0 16"
            />
            <polyline
              className="rating__star-line"
              transform="rotate(72)"
              points="0 4,0 16"
            />
            <polyline
              className="rating__star-line"
              transform="rotate(144)"
              points="0 4,0 16"
            />
            <polyline
              className="rating__star-line"
              transform="rotate(216)"
              points="0 4,0 16"
            />
            <polyline
              className="rating__star-line"
              transform="rotate(288)"
              points="0 4,0 16"
            />
          </g>
        </g>
      </svg>
    </>
  );
};
