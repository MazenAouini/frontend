import React from 'react';
import { useParams } from 'react-router-dom';
import new_collections from '../../components/assets/products/data';

const SingleProduct = () => {
  const { id } = useParams();
  const product = new_collections.find(item => item.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="sproduct">
      {/* Your single product view implementation */}
    </div>
  );
};

export default SingleProduct;
