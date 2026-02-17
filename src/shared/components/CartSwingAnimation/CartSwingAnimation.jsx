import React, { useState, useRef, useEffect } from "react";
import "./cartAnimations.scss";

/**
 * CartSwingAnimation Component
 * Displays an animated product being added to cart with swing effect
 *
 * Usage:
 * const cartAnimRef = useRef();
 *
 * // Trigger animation on add to cart
 * cartAnimRef.current?.triggerAnimation(productName);
 *
 * <CartSwingAnimation ref={cartAnimRef} cartIconRef={cartIconElementRef} />
 */

const CartSwingAnimation = React.forwardRef(({ onAnimationComplete }, ref) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [productName, setProductName] = useState("");
  const containerRef = useRef(null);

  React.useImperativeHandle(ref, () => ({
    triggerAnimation: (name = "Product") => {
      setProductName(name);
      setIsAnimating(true);

      // Reset animation after completion
      setTimeout(() => {
        setIsAnimating(false);
        onAnimationComplete?.();
      }, 1000);
    },
  }));

  return (
    <>
      {isAnimating && (
        <div ref={containerRef} className="cart-swing-animation">
          <div className="product-item-animate">
            <span className="product-text">{productName}</span>
            <span className="check-icon">✓</span>
          </div>
        </div>
      )}
    </>
  );
});

CartSwingAnimation.displayName = "CartSwingAnimation";

export default CartSwingAnimation;
