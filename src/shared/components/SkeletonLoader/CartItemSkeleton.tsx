import Skeleton from './Skeleton';

interface CartItemSkeletonProps {
  count?: number;
}

const CartItemSkeleton: React.FC<CartItemSkeletonProps> = ({ count = 3 }) => (
  <div>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="skeleton-list-item">
        <div className="skeleton-list-item__image">
          <Skeleton variant="rectangular" width="80px" height="80px" />
        </div>
        <div className="skeleton-list-item__content">
          <Skeleton variant="text" width="80%" height="18px" />
          <Skeleton variant="text" width="40%" height="16px" />
          <Skeleton variant="text" width="60%" height="16px" />
        </div>
      </div>
    ))}
  </div>
);

export default CartItemSkeleton;
