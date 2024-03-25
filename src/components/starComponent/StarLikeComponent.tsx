import { FormEvent } from 'react';
import { StarSvg } from './StarSvg';

export type StarLikeComponentProps = {
  ChangeRating: (rating: number) => void;
};

export const StarLikeComponent = (props: StarLikeComponentProps) => {
  const updateRating = (e: FormEvent<HTMLInputElement>) => {
    props.ChangeRating(parseInt(e.currentTarget.value, 10));
  };

  const ratings = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ];

  return (
    <div className="rating">
      <div className="rating__stars">
        {ratings.map((rating) => {
          return (
            <input
              key={rating.value}
              type="radio"
              id={`rating-${rating.value}`}
              name="RateStart"
              value={rating.value.toString()}
              className={`rating__input rating__input-${rating.value}`}
              onChange={updateRating}
            />
          );
        })}
        {ratings.map((rating) => {
          return (
            <label className="rating__label" htmlFor={`rating-${rating.value}`}>
              <StarSvg />
            </label>
          );
        })}
      </div>
    </div>
  );
};
