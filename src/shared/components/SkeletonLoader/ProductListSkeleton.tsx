import Skeleton from './Skeleton';

const ProductCardSkeleton: React.FC = () => (
  <div className="skeleton-card" aria-busy="true" aria-label="Cargando producto">
    <div className="skeleton-card__image">
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </div>
    <div className="skeleton-card__content">
      <Skeleton variant="text" width="100%" height="20px" />
      <Skeleton variant="text" width="60%" height="16px" />
      <Skeleton variant="text" width="80%" height="16px" />
      <Skeleton variant="rectangular" width="100%" height="40px" />
    </div>
  </div>
);

interface ProductListSkeletonProps {
  count?: number;
}

const ProductListSkeleton: React.FC<ProductListSkeletonProps> = ({ count = 8 }) => (
  <div className="skeleton-grid">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export { ProductCardSkeleton, ProductListSkeleton };
export default ProductListSkeleton;
