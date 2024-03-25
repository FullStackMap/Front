import { FormEvent } from 'react';
import { StarSvg } from './StarSvg';

export type StarLikeComponentProps = {
  ChangeRating: (rating: number) => void;
};

export const StarLikeComponent = (props: StarLikeComponentProps) => {
  const updateRating = (e: FormEvent<HTMLFormElement>) => {
    props.ChangeRating((e.target as any).value);
  };

  const ratings = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ];

  return (
    <>
      <form
        className="rating"
        onChange={(e: FormEvent<HTMLFormElement>) => updateRating(e)}>
        <div className="rating__stars">
          {ratings.map(rating => {
            return (
              <input
                key={rating.value}
                type="radio"
                id={`rating-${rating.value}`}
                name="RateStart"
                value={rating.value}
                className={`rating__input rating__input-${rating.value}`}
              />
            );
          })}
          {ratings.map(rating => {
            return (
              <label
                key={rating.value}
                className="rating__label"
                htmlFor={`rating-${rating.value}`}>
                <StarSvg />
              </label>
            );
          })}
        </div>
      </form>
    </>
  );
};
