// https://michalzalecki.com/nominal-typing-in-typescript/
type Constrained<E> = E & { readonly rulrConstraint: unique symbol };

export default Constrained;
